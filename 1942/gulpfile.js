var gulp = require("gulp");
var watch = require("gulp-watch");
var gutil = require("gulp-util");

gulp.task("default", function() {

    gulp.src("source/**/*")
        .pipe(gulp.dest("public"));
});

gulp.task("watch", function() {
    var source = "source";
    gulp.src(source + "/**/*", { base: source })
        .pipe(watch(source, { base: source })
            .on("error", gutil.log))
        .pipe(gulp.dest("public"));
});