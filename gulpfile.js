'use strict';

// Hey!

//                           _               
//    ________  ____ ___  __(_)_______  _____
//   / ___/ _ \/ __ `/ / / / / ___/ _ \/ ___/
//  / /  /  __/ /_/ / /_/ / / /  /  __(__  ) 
// /_/   \___/\__, /\__,_/_/_/   \___/____/  
//              /_/                          

var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  exec = require('child_process').exec,
  Q = require('q'),
  shell = require('gulp-shell'),
  // Asset compilation and image crunching
  // are long-running tasks. I'm using two
  // Q promises to relieve some pain.
  assetsPromise = Q.defer(),
  imagesPromise = Q.defer(),
  // gulp-load-plugins will find modules in
  // package.json that start with 'gulp-' and
  // automatically load them into the $ object.
  // Note that modules with dashes in the name
  // become camelCase in $ object.
  $ = require('gulp-load-plugins')();


//        _           __   
//       (_)___ _____/ /__ 
//      / / __ `/ __  / _ \
//     / / /_/ / /_/ /  __/
//  __/ /\__,_/\__,_/\___/ 
// /___/                   

// Let's take all of the jade templates, pre-process them,
// and story them in dist
gulp.task('templates', function() {
  return gulp.src('src/templates/pages/**/*.jade')
  .pipe($.jade({
    basedir: "src/templates",
    pretty: true
  }))
  .pipe(gulp.dest('dist'));
});


//          __        __         
//    _____/ /___  __/ /__  _____
//   / ___/ __/ / / / / _ \/ ___/
//  (__  ) /_/ /_/ / /  __(__  ) 
// /____/\__/\__, /_/\___/____/  
//          /____/               

// Let's crunch *local* styles  
// in src/styles/main.scss and put them dist/styles
gulp.task('styles', function () {
  return gulp.src('src/stylesheets/main.scss')
    .pipe($.sass({
      // gulp-sass was blowing up without the next two line
      sourceComments: 'map', 
      sourceMap: 'sass', 
      style: 'expanded',
      // include boubon (for local styles only)
      includePaths: require('node-bourbon').includePaths 
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('dist/stylesheets'))
    .pipe($.size());
});

//        _     
//       (_)____
//      / / ___/
//     / (__  ) 
//  __/ /____/  
// /___/        

// Just run everything through JS Hint.
// Don't move the files though. We'll do that later.
gulp.task('scripts', function () {
  return gulp.src('src/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter($.jshintStylish))
    .pipe(gulp.dest('dist/scripts'))
    .pipe($.size());
});

// bower components
gulp.task('bower-components', function () {
  gulp.src('src/bower_components/{,*/}*{,*/}*.*')
  .pipe(gulp.dest('dist/bower_components'))
});

// favicon
gulp.task('favicon', function () {
  gulp.src('src/favicon.ico')
  .pipe(gulp.dest('dist'))
});


//                         __     __          _ __    __
//   ____ ______________  / /_   / /_  __  __(_) /___/ /
//  / __ `/ ___/ ___/ _ \/ __/  / __ \/ / / / / / __  / 
// / /_/ (__  |__  )  __/ /_   / /_/ / /_/ / / / /_/ /  
// \__,_/____/____/\___/\__/  /_.___/\__,_/_/_/\__,_/   
                                                     
// This task does a number of things. It's responsible for
// calling useref, which 
//    * looks at the build directives in the html,
//    * concatenates all of the files,
//    * replaces the multiple refs with a ref to the build file,
//    * and copies the build file to dist
// 
// We also use gulp-filter to grab just the JS and just the CSS
// optimize, minify, etc.

gulp.task('asset-build', ['templates', 'styles', 'scripts'], function () {
  // quick error handler for gulp-plumber
  var onError = function (err) {
    console.error(err);
    throw err;
  };

  // grab all the html in .tmp
  return gulp.src('.tmp/**/*.html')
    
    // added gulp-plumber here since you'll often need
    // more info on why these stream failed
    .pipe(plumber({
      errorHandler: onError
    }))

    // useref all the html, and look in app
    // for files references in the html
    .pipe($.useref.assets({
      searchPath: ['src']
    }))

    // uglify if it's js, optimize if it's css
    .pipe($.if('**/*.js', $.uglify()))
    .pipe($.if('**/*.css', $.csso()))
    
    // useref requires a call to restore() and useref()
    // when you're done
    .pipe($.useref.restore())
    .pipe($.useref())

    // throw it all into dist
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});


//     _                                
//    (_)___ ___  ____ _____ ____  _____
//   / / __ `__ \/ __ `/ __ `/ _ \/ ___/
//  / / / / / / / /_/ / /_/ /  __(__  ) 
// /_/_/ /_/ /_/\__,_/\__, /\___/____/  
//                   /____/             

// Look in both local app/images and ghost-shield for images,
// optimize them and put them in dist/images
gulp.task('images',  function () {
  return gulp.src(['src/images/**/*'])
    // .pipe($.cache($.imagemin({
    //   optimizationLevel: 3,
    //   progressive: true,
    //   interlaced: true
    // })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

//                                 _               
//     ____  _________  ____ ___  (_)_______  _____
//    / __ \/ ___/ __ \/ __ `__ \/ / ___/ _ \/ ___/
//   / /_/ / /  / /_/ / / / / / / (__  )  __(__  ) 
//  / .___/_/   \____/_/ /_/ /_/_/____/\___/____/  
// /_/                                             

// Later, we'll call gulp.start('asset-build') and 
// gulp.start('image-build'), which don't return promises. 
// These are just thin wrappers that makes the builds into deps, 
// and each resolves a promise in the global scope afterwards.
// 
// This is pretty silly and should be refactored.
gulp.task('asset-build-promise', ['asset-build'], function(){
  assetsPromise.resolve();
})

gulp.task('images-promise', ['images'], function(){
  imagesPromise.resolve();
})


//     ____            __      
//    / __/___  ____  / /______
//   / /_/ __ \/ __ \/ __/ ___/
//  / __/ /_/ / / / / /_(__  ) 
// /_/  \____/_/ /_/\__/____/  

// take fonts out of ghost-shield and move them to dist
gulp.task('fonts', function () {
  return gulp.src(['src/fonts/**/*'])
    .pipe($.filter('**/*.{eot,svg,ttf,woff,css}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});


                                 
//   _________  ____ _____ ___  ___ 
//  / ___/ __ \/ __ `/ __ `__ \/ _ \
// / /__/ / / / /_/ / / / / / /  __/
// \___/_/ /_/\__,_/_/ /_/ /_/\___/ 
                                 
// Copy the CNAME file over to dist
gulp.task('cname', function () {
  return gulp.src('CNAME')
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

//          _ __                                 
//    _____(_) /____        ____ ___  ____ _____ 
//   / ___/ / __/ _ \______/ __ `__ \/ __ `/ __ \
//  (__  ) / /_/  __/_____/ / / / / / /_/ / /_/ /
// /____/_/\__/\___/     /_/ /_/ /_/\__,_/ .___/ 
//                                      /_/      

// After build-step-1 promise is resolved , we can
// safely generate a sitemap and put it in dist
gulp.task('sitemap', function () {
  gulp.src('dist/**/*.html', {
    read: false
  }).pipe($.sitemap({
      siteUrl: 'http://flackap.com'
  }))
  .pipe(gulp.dest('dist'));
});

//     __          _ __    __        __                 
//    / /_  __  __(_) /___/ /  _____/ /____  ____  _____
//   / __ \/ / / / / / __  /  / ___/ __/ _ \/ __ \/ ___/
//  / /_/ / /_/ / / / /_/ /  (__  ) /_/  __/ /_/ (__  ) 
// /_.___/\__,_/_/_/\__,_/  /____/\__/\___/ .___/____/  
//                                       /_/            

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.rimraf());
});


// clean is a dependency of this task, but can't be run asynchronously 
// with the other nested tasks. This build task should ideally wait for 
// all tasks to complete, but because gulp.start doesn't return promises
// and I can only return one promise, I ended up splitting this into two tasks.
// asset-build and image-build are the two longest running task by far, so I'm
// only looking for those two promises to be resolved.
gulp.task('build-step-1', ['clean'], function(){
  gulp.start('cname');
  gulp.start('asset-build-promise');
  gulp.start('fonts');
  gulp.start('favicon');
  gulp.start('bower-components');
  return assetsPromise.promise;

});

// this task depends on build-step-1 to complete
gulp.task('build-step-2', ['build-step-1'], function(){
  gulp.start('sitemap');
  gulp.start('images-promise');
  return imagesPromise.promise;
});


//        __           __                                 __ 
//   ____/ /__  ____  / /___  __  ______ ___  ___  ____  / /_
//  / __  / _ \/ __ \/ / __ \/ / / / __ `__ \/ _ \/ __ \/ __/
// / /_/ /  __/ /_/ / / /_/ / /_/ / / / / / /  __/ / / / /_  
// \__,_/\___/ .___/_/\____/\__, /_/ /_/ /_/\___/_/ /_/\__/  
//          /_/            /____/                            

// this task relies on the build-step-2 task having run, which will
// have triggered all other relevant build tasks. It takes everything
// in dist and commits it to gh-pages and pushes.
// 
// deploy script from: https://github.com/X1011/git-directory-deploy
gulp.task('deploy', ['build-step-2'], function() {
  var deployPromise = Q.defer();
  exec('sh deploy.sh', function(){
    deployPromise.resolve();
  });

  return deployPromise.promise;
});


//     __                 __       __         
//    / /___  _________ _/ /  ____/ /__ _   __
//   / / __ \/ ___/ __ `/ /  / __  / _ \ | / /
//  / / /_/ / /__/ /_/ / /  / /_/ /  __/ |/ / 
// /_/\____/\___/\__,_/_/   \__,_/\___/|___/  
                                           
// Mostly the same ol' same ol' local dev tasks you know and love.
gulp.task('connect', function () {
  var connect = require('connect');
  var app = connect()
    .use(require('connect-livereload')({ port: 35719 }))
    .use(connect.static('src'))
    .use(connect.static('dist'))
    .use(connect.directory('src'));

  require('http').createServer(app)
    .listen(1337)
    .on('listening', function () {
      console.log('Started connect web server on http://0.0.0.0:1337');
    });
});

gulp.task('serve', ['connect', 'styles', 'templates'], function () {
  require('opn')('http://0.0.0.0:1337');
});

gulp.task('watch', ['connect', 'serve'], function () {
  var server = $.livereload();

  // watch for changes

  gulp.watch([
    'src/templates/**/*.jade',
    'src/*.html',
    'dist/stylesheets/**/*.*',
    'src/scripts/**/*.js',
    'src/images/**/*'
  ]).on('change', function (file) {
    server.changed(file.path);
  });

  gulp.watch('src/templates/**/*.jade', ['templates']);
  gulp.watch('src/stylesheets/**/*.scss', ['styles']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('express', ['watch', 'serve'], function(){})

// work on build
