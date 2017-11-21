var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');          // 处理css中浏览器兼容的前缀  
var rename = require('gulp-rename');                      //重命名  
var cssnano = require('gulp-cssnano');                    // css的层级压缩合并
var less = require('gulp-less');                          //less
var jshint = require('gulp-jshint');                      //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）  
var uglify = require('gulp-uglify');                      //js压缩  
var concat = require('gulp-concat');                      //合并文件  
// var imagemin = require('gulp-imagemin');                  //图片压缩 
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var Config = require('./gulpfile.config.js');
//======= gulp dev 开发环境下 ===============
function dev() {
    /** 
     * HTML处理 
     */
    gulp.task('html:dev', function () {
        return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dist)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * lib文件夹下的所有文件处理 
     */
    gulp.task('lib:dev', function () {
        return gulp.src(Config.lib.src).pipe(gulp.dest(Config.lib.dist)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * CSS样式处理 
     */
    gulp.task('css:dev', function () {
        return gulp.src(Config.css.src).pipe(gulp.dest(Config.css.dist)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * less样式处理 
     */
    gulp.task('less:dev', function () {
        return gulp.src(Config.less.src).pipe(less()).pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
        })).pipe(gulp.dest(Config.less.dist)).pipe(reload({
            stream: true
        }));
    });
    
    /** 
     * js处理 
     */
    gulp.task('js:dev', function () {
        return gulp.src(Config.js.src).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(gulp.dest(Config.js.dist)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * 图片处理 
     */
    // gulp.task('images:dev', function () {
    //     return gulp.src(Config.img.src).pipe(imagemin([
    //         imagemin.gifsicle({interlaced: true}),
    //         imagemin.jpegtran({progressive: true}),
    //         imagemin.optipng({optimizationLevel: 5})
    //     ])).pipe(gulp.dest(Config.img.dist)).pipe(reload({
    //         stream: true
    //     }));
    // });

    gulp.task('dev', ['html:dev', 'css:dev', 'less:dev', 'js:dev', 'lib:dev', 'images:dev'], function () {
        browserSync.init({
            server: {
                baseDir: Config.dist
            }
            , notify: false
        });
        /**
         * watch 的时候路径不要用 './path'，直接使用 'path' 即可，不然会导致新增文件无法被 watch。
         * path.slice(2) 为了watch到文件的删除和新增
         */
        // Watch .html files  
        gulp.watch(Config.html.src.slice(2), ['html:dev']);
        // Watch .css files  
        gulp.watch(Config.css.src.slice(2), ['css:dev']);
        // Watch .less files  
        gulp.watch(Config.less.src.slice(2), ['less:dev']);
        // Watch lib files  
        gulp.watch(Config.lib.src.slice(2), ['lib:dev']);
        // Watch .js files  
        gulp.watch(Config.js.src.slice(2), ['js:dev']);
        // Watch image files  
        // gulp.watch(Config.img.src.slice(2), ['images:dev']);
    });
}
//======= gulp dev 开发环境下 ===============
module.exports = dev;