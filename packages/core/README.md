# 介绍

[![GitHub Repo stars](https://img.shields.io/github/stars/rookie-luochao/miniprogram-subpackage-optimization?style=social)](https://github.com/rookie-luochao/miniprogram-subpackage-optimization) [![npm (scoped)](https://img.shields.io/npm/v/miniprogram-subpackage-optimization)](https://www.npmjs.com/package/miniprogram-subpackage-optimization) ![GitHub tag](https://img.shields.io/github/v/tag/rookie-luochao/miniprogram-subpackage-optimization?include_prereleases)

一个帮助你优化小程序分包目录的 Nodejs 插件

## 使用

```bash
# npm
npm i miniprogram-subpackage-optimization --save-dev

# pnpm
pnpm i miniprogram-subpackage-optimization -D
```

在`项目根目录`新建 `miniprogram-subpackage-optimization.config.mjs` or `miniprogram-subpackage-optimization.config.cjs`

```js
// es
import miniprogramSubpackageOptimization from 'miniprogram-subpackage-optimization';

// cjs
const miniprogramSubpackageOptimization2 = require('miniprogram-subpackage-optimization');

miniprogramSubpackageOptimization({
  projectDistPath: './dist/build/mp-weixin',
  originDirName: 'node-modules',
  targetDirTag: 'pages',
  vendorPathPattern: /(\.\.\/)+common\/vendor\.js/g,
  nodeModulesPathPattern: /(\.\.\/)+node-modules\/[^"']*/g,
});
```

在 `package.json` 的 `script` 中添加命令: `"miniprogram-subpackage-optimization": "node ./miniprogram-subpackage-optimization.config.mjs"`

生成结果：

```bash
npm run miniprogram-subpackage-optimization
```

## 参数

| 属性 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| projectDistPath | 否 | string | './dist/build/mp-weixin' | 自定义 dist 目录 |
| originDirName | 否 | string | 'node-modules' | 自定义公共依赖目录名称 |
| targetDirTag | 否 | string | 'pages' | 主包、子包目录名称标识 |
| vendorPathPattern | 否 | RegExp | /(\.\.\/)+common\/vendor\.js/g | 匹配 vendor.js 引用的正则 |
| nodeModulesPathPattern | 否 | RegExp | /(\.\.\/)+node-modules\/[^"']\*/g | 匹配 node-modules 引用的正则 |

## 贡献

### 环境要求

- node 18+
- pnpm 9+

### 提交 Pull Request

1. 熟悉 [Pull Request]("https://help.github.com/articles/using-pull-requests") 规范
2. fork 此仓库
3. 开一个新分支修改代码：`git checkout -b my-branch main`
4. 确保你的代码可以通过所有测试用例(新增功能需要添加新的功能测试用例)：`pnpm test`
5. 创建 changeset 文件通过命令：`pnpm changeset`
6. 使用 commit 提交你的修改(需遵循 commitlint 规范)
7. 发起 Pull Request

## License

[MIT](https://github.com/rookie-luochao/miniprogram-subpackage-optimization/blob/main/LICENSE)
