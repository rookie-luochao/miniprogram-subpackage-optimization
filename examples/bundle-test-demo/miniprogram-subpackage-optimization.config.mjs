import miniprogramSubpackageOptimization from 'miniprogram-subpackage-optimization';

miniprogramSubpackageOptimization({
  projectDistPath: './dist/build/mp-weixin',
  originDirName: 'node-modules',
  targetDirTag: 'pages',
  vendorPathPattern: /(\.\.\/)+common\/vendor\.js/g,
  nodeModulesPathPattern: /(\.\.\/)+node-modules\/[^"']*/g,
});
