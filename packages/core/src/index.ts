import chalk from 'chalk';
import { copySync } from 'fs-extra';
import { sync as globbySync } from 'globby';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  deleteOriginNodeModules,
  deletePackageNodeModulesPageDir,
  getNeedPackageDirNames,
  replacePackageFiles,
} from './util';

export interface IMiniprogramSubpackageOptimizationOptions {
  projectDistPath?: string;
  originDirName?: string;
  targetDirTag?: string;
  vendorPathPattern?: RegExp;
  nodeModulesPathPattern?: RegExp;
}

const defaultVendorPathPattern = /(\.\.\/)+common\/vendor\.js/g;
const defaultNodeModulesPathPattern = /(\.\.\/)+node-modules\/[^"']*/g;

export default async function miniprogramSubpackageOptimization(
  options: IMiniprogramSubpackageOptimizationOptions
) {
  const {
    projectDistPath = './dist/build/mp-weixin',
    originDirName = 'node-modules',
    targetDirTag = 'pages',
    vendorPathPattern = defaultVendorPathPattern,
    nodeModulesPathPattern = defaultNodeModulesPathPattern,
  } = options;
  const cwdPath = process.cwd();
  const nodeModulesDirPath = join(cwdPath, projectDistPath, originDirName);

  if (!existsSync(nodeModulesDirPath)) {
    console.error(
      chalk.redBright('node-modules does not exist in the current directory')
    );
    process.exit(1);
  }

  const packageDirNames: string[] = await getNeedPackageDirNames(
    join(cwdPath, projectDistPath),
    targetDirTag
  );

  modifyPackageFiles();

  // 调整 package 目录文件对 node-modules 的引用
  function modifyPackageFiles() {
    for (const packageDirName of packageDirNames) {
      replacePackageFiles(
        `${projectDistPath}/${packageDirName}`,
        nodeModulesPathPattern
      );
    }
  }

  modifyNodeModulesFiles();

  // 调整 node-modules 目录文件对 vendor.js 的引用
  function modifyNodeModulesFiles() {
    const files = globbySync(`${projectDistPath}/${originDirName}/**/*.js`);

    for (const filePath of files) {
      const fullPath = join(cwdPath, filePath);
      let content = readFileSync(fullPath, 'utf8');
      let match;
      let isMatched = false;

      while ((match = vendorPathPattern.exec(content)) !== null) {
        isMatched = true;
        const assetPath = match[0];
        // 原始 node_modules 中的 js 文件对 vendor.js 的相对路径引用需要增加一个 ../
        content = content.replace(assetPath, `../${assetPath}`);
      }

      if (isMatched) {
        try {
          writeFileSync(fullPath, content);
        } catch (err) {
          console.error(
            chalk.redBright('Failed to write node-modules file: ', err)
          );
        }
      }
    }
  }

  copyNodeModulesToPackage(packageDirNames, nodeModulesDirPath);

  // 拷贝 node-modules 到 package
  function copyNodeModulesToPackage(
    dirNames: string[],
    nodeModulesDirPath: string
  ) {
    const currentDirPath = join(cwdPath, projectDistPath);

    dirNames.forEach((dirName) => {
      const targetPath = join(currentDirPath, dirName, originDirName);

      try {
        copySync(nodeModulesDirPath, targetPath);
      } catch (err) {
        console.error(
          chalk.redBright(
            `Error copy node_module to package directory ${dirName}: `,
            err
          )
        );
      }
    });
  }

  deletePackageNodeModulesPageDirs();

  // 删除 package/node-modules 多余的文件
  function deletePackageNodeModulesPageDirs() {
    for (const packageDirName of packageDirNames) {
      void deletePackageNodeModulesPageDir(
        join(cwdPath, projectDistPath, packageDirName)
      );
    }
  }

  deleteOriginNodeModules(nodeModulesDirPath);

  console.log(chalk.greenBright('Success optimize miniprogram subpackage'));
}
