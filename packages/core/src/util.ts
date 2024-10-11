import chalk from 'chalk';
import { remove } from 'fs-extra';
import globby, { sync as globbySync } from 'globby';
import { readFileSync, readdir, statSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

export async function getNeedPackageDirNames(
  dirName: string,
  targetDirTag: string
) {
  return new Promise<string[]>((resolve) => {
    readdir(dirName, (err, files) => {
      if (err) {
        console.error(chalk.redBright('Error read package directory: ', err));
        return;
      }

      // 筛选出以 pages 开头的文件夹
      const targetDirNames = files.filter((file) => {
        const fullPath = join(dirName, file);

        return (
          statSync(fullPath).isDirectory() && file.startsWith(targetDirTag)
        );
      });

      resolve(targetDirNames);
    });
  });
}

export function replacePackageFiles(
  dirName: string,
  nodeModulesPattern: RegExp
) {
  const files = globbySync(`${dirName}/**/*.{js,json}`);

  for (const filePath of files) {
    const fullPath = join(process.cwd(), filePath);
    let content = readFileSync(fullPath, 'utf8');
    let match;
    let isMatched = false;

    while ((match = nodeModulesPattern.exec(content)) !== null) {
      isMatched = true;
      const assetPath = match[0];
      // 主包、子包对 node_modules 的相对路径引用需要去掉一个 ../
      content = content.replace(assetPath, assetPath.slice(3));
    }

    if (isMatched) {
      try {
        writeFileSync(fullPath, content);
      } catch (err) {
        console.error(chalk.redBright('Failed to write package file: ', err));
      }
    }
  }
}

export async function deletePackageNodeModulesPageDir(dirName: string) {
  let needPackagePagesNames = await getChildrenDirNamesByFilePath(dirName);

  // 匹配 package/node-modules 里面的 pages 路径
  const packageNodeModulesPagesPaths = await globby(`${dirName}/**/pages`, {
    onlyDirectories: true, // 只匹配目录
  });
  const packageNodeModulesPagesPath = packageNodeModulesPagesPaths?.[0];

  if (packageNodeModulesPagesPath) {
    return;
  }

  const packageNodeModulesPagesDirNames = await getChildrenDirNamesByFilePath(
    packageNodeModulesPagesPath
  );
  const needPageDirNames = packageNodeModulesPagesDirNames.filter((dirName) => {
    return needPackagePagesNames.includes(basename(dirName));
  });

  // 收集 package/node-modules pages 的公共依赖
  if (needPageDirNames.length > 0) {
    const needCommonPageDirNames: string[] = [];
    needPageDirNames.forEach((pageDirName) => {
      try {
        const content = readFileSync(
          join(packageNodeModulesPagesPath, pageDirName, './index.json'),
          'utf8'
        );
        const usingComponents = (
          JSON.parse(content) as Record<string, Record<string, string>>
        ).usingComponents;

        Object.keys(usingComponents).forEach((key) => {
          const path = formatPath(usingComponents[key]);

          if (
            path.startsWith('components') ||
            path.startsWith('node-modules')
          ) {
            return;
          }

          const commonPageDirName = path.split('/')[0];

          if (!needCommonPageDirNames.includes(commonPageDirName)) {
            needCommonPageDirNames.push(commonPageDirName);
          }
        });
      } catch (err) {
        console.error(
          chalk.redBright(
            'Failed to read package node-modules pages file: ',
            err
          )
        );
      }
    });

    if (needCommonPageDirNames.length > 0) {
      needPackagePagesNames = needPackagePagesNames.concat(
        needCommonPageDirNames
      );
    }
  }

  readdir(packageNodeModulesPagesPath, (err, files) => {
    if (err) {
      console.error(
        chalk.redBright(
          `Error read package node-modules pages directory ${packageNodeModulesPagesPath}: `,
          err?.message
        )
      );
      return;
    }

    const dirNames = files.filter((file) => {
      const fullPath = join(packageNodeModulesPagesPath, file);

      return statSync(fullPath).isDirectory();
    });

    for (const dirName of dirNames) {
      if (!needPackagePagesNames.includes(dirName)) {
        remove(join(packageNodeModulesPagesPath, dirName), (err) => {
          if (err) {
            console.error(
              chalk.redBright(
                `Error remove package node-modules pages directory: ${err?.message}`
              )
            );
          }
        });
      }
    }
  });
}

async function getChildrenDirNamesByFilePath(dirName: string) {
  return new Promise<string[]>((resolve) => {
    readdir(dirName, (err, files) => {
      if (err) {
        console.error(
          chalk.redBright(`Error read package pages directory ${dirName}:`, err)
        );
        return;
      }

      const dirNames = files.filter((file) => {
        const fullPath = join(dirName, file);

        return statSync(fullPath).isDirectory();
      });

      resolve(dirNames);
    });
  });
}

function formatPath(pathName: string) {
  while (pathName.startsWith('../')) {
    pathName = pathName.slice(3);
  }

  while (pathName.startsWith('./')) {
    pathName = pathName.slice(2);
  }

  return pathName;
}

export function deleteOriginNodeModules(dirName: string) {
  remove(dirName, (err) => {
    if (err) {
      console.error(
        chalk.redBright(`Error delete node-modules: ${err?.message}`)
      );
    }
  });
}
