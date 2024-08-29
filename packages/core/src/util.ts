import chalk from 'chalk';
import { remove } from 'fs-extra';
import globby, { sync as globbySync } from 'globby';
import { readFileSync, readdir, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export async function getNeedPakcageDirNames(
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
  const needPackagePageNames = await getNeedPackagePageNames();

  async function getNeedPackagePageNames() {
    return new Promise<string[]>((resolve) => {
      readdir(dirName, (err, files) => {
        if (err) {
          console.error(
            chalk.redBright(
              `Error read package pages directory ${dirName}:`,
              err
            )
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

  const pageDirNames = await globby(`${dirName}/**/pages`, {
    onlyDirectories: true, // 只匹配目录
  });

  pageDirNames.forEach((pageDirName) => {
    readdir(pageDirName, (err, files) => {
      if (err) {
        console.error(
          chalk.redBright(
            `Error read package node-modules pages directory ${pageDirName}: `,
            err?.message
          )
        );
        return;
      }

      const dirNames = files.filter((file) => {
        const fullPath = join(pageDirName, file);

        return statSync(fullPath).isDirectory();
      });

      for (const dirName of dirNames) {
        if (!needPackagePageNames.includes(dirName)) {
          remove(join(pageDirName, dirName), (err) => {
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
  });
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
