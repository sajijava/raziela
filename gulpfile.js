var gulp  = require('gulp');
var gutil  = require('gulp-util');
var gless  = require('gulp-less');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var notifier = require('node-notifier');
var pkg        = require('./package.json');
var header     = require('gulp-header');

var banner = ['/**',  
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' * <%= pkg.description %>',
  ' * <%= pkg.author.name %> <<%= pkg.author.email %>>',
  ' */',
  ''].join('\n');

gulp.task('compile-less',function(){
	gulp.src('./public/less/*.less')
    .pipe(gless())
   // .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./public/css/'))
});

gulp.task('watch-less', function() {  
  gulp.watch('./public/less/**/*.less' , ['compile-less']);
});

var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

gulp.task('build-js',function(){
	
	var bundler = watchify(browserify({
			entries:['./public/jsx/app.jsx'],
			transform:[reactify],
			extensions:['.jsx'],
			debug:true,
			cache:{},
			packageCache:{},
			fullPaths:true
		}))
	
	function build(file){
		if (file) {
			gutil.log("Recompiling " + file);
		}
		return bundler
		.bundle()
		.on('error',notify)
		.pipe(source('raziela.js'))
		.pipe(gulp.dest('./public/js/'));
	}
	
	build();
	bundler.on('update',build)
});



gulp.task('default',['build-js',	'compile-less','watch-less'])