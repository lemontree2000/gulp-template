var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀  
var rename = require('gulp-rename'); //重命名  
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var less = require('gulp-less'); //less
var jshint = require('gulp-jshint'); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）  
var uglify = require('gulp-uglify'); //js压缩  
var concat = require('gulp-concat'); //合并文件  
// var imagemin = require('gulp-imagemin'); //图片压缩 
var Config = require('./gulpfile.config.js');
//======= gulp build 打包资源 ===============
function prod() {
    /** 
     * HTML处理 
     */
    gulp.task('html', function () {
        return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dist));
    });
    /** 
     * lib文件夹下的所有文件处理 
     */
    gulp.task('lib', function () {
        return gulp.src(Config.lib.src).pipe(gulp.dest(Config.lib.dist));
    });
    /** 
     * CSS样式处理 
     */
    gulp.task('css', function () {
        return gulp.src(Config.css.src).pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: false 
         })).pipe(gulp.dest(Config.css.dist)).pipe(rename({
                suffix: '.min'
        })).pipe(cssnano()) //执行压缩  
        .pipe(gulp.dest(Config.css.dist));
    });
    /** 
     * less样式处理 
     */
    gulp.task('less', function () {
        return gulp.src(Config.less.src).pipe(autoprefixer({
           browsers: ['last 2 versions', 'Android >= 4.0'],
           cascade: false 
        })).pipe(less()).pipe(gulp.dest(Config.less.dist)).pipe(rename({
                suffix: '.min'
            })) //rename压缩后的文件名  
        .pipe(cssnano()) //执行压缩  
        .pipe(gulp.dest(Config.less.dist));
    });
    /** 
     * js处理 
     */
    gulp.task('js', function () {
        return gulp.src(Config.js.src).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(gulp.dest(Config.js.dist)).pipe(rename({
            suffix: '.min'
        })).pipe(uglify()).pipe(gulp.dest(Config.js.dist));
    });
    /** 
     * 合并所有js文件并做压缩处理 
     */
    gulp.task('js-concat', function () {
        return gulp.src(Config.js.src).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(concat(Config.js.build_name)).pipe(gulp.dest(Config.js.dist)).pipe(rename({
            suffix: '.min'
        })).pipe(uglify()).pipe(gulp.dest(Config.js.dist));
    });
    /** 
     * 图片处理 
     */
    // gulp.task('images', function () {
    //     return gulp.src(Config.img.src).pipe(imagemin({
    //         optimizationLevel: 3
    //         , progressive: true
    //         , interlaced: true
    //     })).pipe(gulp.dest(Config.img.dist));
    // });
    gulp.task('build', ['html', 'css', 'less', 'js', 'lib', 'js-concat']);
}
module.exports = prod;
