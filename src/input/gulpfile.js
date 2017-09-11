var gulp = require('gulp');
var sass = require('gulp-sass');

var minify=require('gulp-minify-css'),   //css压缩

    uglify=require('gulp-uglify'); //js压缩

var jshint=require('gulp-jshint');  //js检查

gulp.task('default',function() {

    //编译sass 读取 编译 输出到新文件夹中
    gulp.task('sass',function(){
        gulp.src('css/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./out'));
    });

    //gulp.run('sass');
    //gulp.watch('./css/*.scss', ['sass']);
    gulp.task('sass:watch', function () {
        gulp.watch('./css/*.scss', ['sass']);
    });

});


gulp.task('script', function() {
    return gulp.src('dist/css/*.css')      //压缩的文件
        .pipe(minify())
        .pipe(gulp.dest('dist/min/'))   //输出文件夹
});
gulp.task('minifyjs',function(){
    return gulp.src('dist/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/min/'))
});

/*
gulp.task("jsHintCheck",function(){
    gulp.src("js/!*.js")
        /!*.pipe(jshint())
        .pipe(jshint.reporter("default"))*!/

        .pipe(jshint())
       // .pipe(jshint.reporter("stylish"))
        .pipe(jshint.reporter("jshint-stylish"))  //或直接引用，不使用上一行的方式


});*/


var map = require("map-stream");
var customerReporter = map(function(file,cb){
    if(!file.jshint.success){
        //打印出错误信息
        console.log("jshint fail in:" + file.path);
        file.jshint.results.forEach(function(err){
            if(err){
                console.log(err);
                console.log("在 "+file.path+" 文件的第"+err.error.line+" 行的第"+err.error.character+" 列发生错误");
            }
        });
    }
});

gulp.task("jsHintCheck",function(){
    gulp.src("js/*.js")
        .pipe(jshint())
        .pipe(customerReporter);
});