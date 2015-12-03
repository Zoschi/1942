var gulp = require("gulp");
var watch = require("gulp-watch");


gulp.task("copy-scripts", function(test) {

    gulp.src("source/js/*.js")
        .pipe(gulp.dest("public/js/"));
});

gulp.task("watch", function() {
    var source = "source";
    gulp.src(source + "/*", { base: source })
        .pipe(watch(source, { base: source }))
        .pipe(gulp.dest("public"));
});