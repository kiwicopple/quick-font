var fileinclude = require("gulp-file-include");
var gulp = require("gulp");

function defaultTask(cb) {
  gulp.task("fileinclude", function() {
    gulp
      .src(["index.html"])
      .pipe(
        fileinclude({
          prefix: "@@",
          basepath: "@file"
        })
      )
      .pipe(gulp.dest("./"));
  });
  cb();
}

exports.default = defaultTask;
