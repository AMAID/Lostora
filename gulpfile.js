var gulp = require('gulp')
var jade = require('gulp-jade')
var uglify = require('gulp-uglify')
var browserSync = require('browser-sync')


var reload=browserSync.reload
var paths={
    html:"build",
    js:"build",

    jade:"src/jade/*.jade",
    script:["src/js/*.js","bower_components/jquery/dist/jquery.min.js"]
}

gulp.task("browser-sync",function(){
    browserSync({
        server:{
            baseDir:"build"
        }
    })
    gulp.watch(paths.jade,["html",reload])
    gulp.watch(paths.script,["js",reload])
})
gulp.task("html",function(){
    gulp.src(paths.jade)
        .pipe(jade())
        .pipe(gulp.dest(paths.html))
})

gulp.task("js",function(){
    gulp.src(paths.script)
        .pipe(uglify())
        .pipe(gulp.dest(paths.js))
})

gulp.task("default",function(){
    gulp.run("html","js","browser-sync")
})