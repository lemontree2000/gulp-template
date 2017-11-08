const SRC_DIR = './src/';                  // 源文件目录
const DIST_DIR = './dist/';               // 文件输入存放的目录 
const DIST_FILES = DIST_DIR + '**';       // 目标路径下的所有文件

var config = {
  src: SRC_DIR,
  dist: DIST_DIR,
  dist_files: DIST_FILES,
  html: {
    dir: SRC_DIR,
    src: SRC_DIR + '*.html',
    dist: DIST_DIR
  },
  lib: {
    dir: SRC_DIR + 'lib',
    src: SRC_DIR + 'lib/**/*',            // assets目录：./src/assets  
    dist: DIST_DIR + 'lib'                // assets文件build后存放的目录：./dist/assets 
  },
  css: {
    src: SRC_DIR + 'css/**/*.css',        // CSS目录：./src/css/ 
    dist: DIST_DIR + 'css',               // CSS文件build后存放的目录：./dist/css  
    dir: SRC_DIR  + 'css'                 // CSS文件build后存放的目录：./dist/css  
  },
  less: {
    src: SRC_DIR + 'less/**/*.less',      // less目录：./src/less/  
    dist: DIST_DIR + 'css',               // less文件生成CSS后存放的目录：./dist/css 
    dir: SRC_DIR + 'less'                 // less文件生成CSS后存放的目录：./dist/css 
  },
  js: {
    src: SRC_DIR + 'js/**/*.js',          // JS目录：./src/js/  
    dist: DIST_DIR + 'js',                 // JS文件build后存放的目录：./dist/js 
    dir: SRC_DIR + 'js',                  // JS文件build后存放的目录：./dist/js 
    build_name: 'build.js'                // 合并后的js的文件名 
  },
  img: {
    src: SRC_DIR + 'images/**/*',         // images目录：./src/images/  
    dist: DIST_DIR + 'images',            // images文件build后存放的目录：./dist/images
    dir: SRC_DIR + 'images'               // images文件build后存放的目录：./dist/images
  }
};

module.exports = config;
