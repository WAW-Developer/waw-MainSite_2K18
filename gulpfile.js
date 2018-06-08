var pjson = require('./package.json');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var preprocess = require('gulp-preprocess');


const _WAW_Site = {
    dist_Path: './public/',
    ThirdParty_Path: 'thirds/',
    build: '0011'
};


// Options for preprocess
_WAW_Site.preprocess_Options = {
  context: {
      version : pjson.version + '.build' + _WAW_Site.build
  }
};


gulp.task("clean", function (_done) {
  // return del("build");
  let _target_path = _WAW_Site.dist_Path + '**';
  
  del.sync([_target_path]);
  
  /*
  del([_target_path]).then(paths => {
      // console.log('Deleted files and folders:\n', paths.join('\n'));
      _done();
  });
  */
  
  _done();
  
});



gulp.task('copy_LibsFor_Webcomponents', function(_done) {
  
  let _target_path = _WAW_Site.dist_Path + _WAW_Site.ThirdParty_Path; 
  
  gulp.src([
      './node_modules/@webcomponents/**/*',
      '!./node_modules/@webcomponents/**/tests/**/*',
      '!./node_modules/@webcomponents/**/tests',
      '!./node_modules/@webcomponents/**/src/**/*',
      '!./node_modules/@webcomponents/**/src',
      '!./node_modules/@webcomponents/**/examples/**/*',
      '!./node_modules/@webcomponents/**/examples'
      ],

      { base : './node_modules/@webcomponents/' })
      .pipe(gulp.dest(_target_path))
      .on('end', _done);
  
});


gulp.task('copy_LibsFor_LitHTML', function(_done) {
  
  let _target_path = _WAW_Site.dist_Path + _WAW_Site.ThirdParty_Path; 
  let _base_path = './node_modules/';
  
  gulp.src([
      _base_path + '/lit-html/**/*',
      '!' + _base_path + '/lit-html/**/src/**/*',
      '!' + _base_path + '/lit-html/**/src'
      ],

      { base : _base_path })
      .pipe(gulp.dest(_target_path))
      .on('end', _done);
  
});


gulp.task('copy_LibsFor_LitElement', function(_done) {
  
  let _target_path = _WAW_Site.dist_Path + _WAW_Site.ThirdParty_Path; 
  let _base_path = './node_modules/@polymer/';
  
  gulp.src([
      _base_path + '/lit-element/**/*',
      '!' + _base_path + '/lit-element/**/src/**/*',
      '!' + _base_path + '/lit-element/**/src',
      '!' + _base_path + '/lit-element/**/demo/**/*',
      '!' + _base_path + '/lit-element/**/demo',
      '!' + _base_path + '/lit-element/**/test/**/*',
      '!' + _base_path + '/lit-element/**/test'
      ],

      { base : _base_path })
      .pipe(gulp.dest(_target_path))
      .on('end', _done);
  
});


gulp.task('copy_LibsFor_Polymer', function(_done) {
  
  let _target_path = _WAW_Site.dist_Path + _WAW_Site.ThirdParty_Path; 
  
  gulp.src([
      './node_modules/@polymer/polymer/**/*',
      '!./node_modules/@polymer/polymer/**/bower_components/**/*',
      '!./node_modules/@polymer/polymer/**/dist/**/*'
      ],

      { base : './node_modules/@polymer/' })
      .pipe(gulp.dest(_target_path))
      .on('end', _done);
  
});


gulp.task('copy_Libs_ThirdParty', function(_done) {
  runSequence(['copy_LibsFor_Webcomponents', 'copy_LibsFor_LitHTML', 'copy_LibsFor_Polymer'],
      _done);
});


gulp.task('copy_AppLib', function(_done) {
  
  let _target_path = _WAW_Site.dist_Path + 'lib/'; 
  
  gulp.src([
      './lib_dist/**/*'
      ],

      { base : './lib_dist/' })
      .pipe(gulp.dest(_target_path))
      .on('end', _done);
  
});


gulp.task('copy_Code', function(_done) {
  
  let _target_path = _WAW_Site.dist_Path; 
  
  gulp.src([
      './src/**/*'
      ],

      { base : './src/' })
      
      .pipe(preprocess({
          context: {
              version : pjson.version + '.build' + _WAW_Site.build
          }
      })) //To set environment variables in-line
      
      .pipe(gulp.dest(_target_path))
      .on('end', _done);
});


gulp.task('preprocess_html', function(_done) {
  
  let _target_path = _WAW_Site.dist_Path; 
  
  gulp.src([
      _target_path + '/**/*.html'
      ],

      { base : _target_path })
      
      .pipe(preprocess({
          context: _WAW_Site.preprocess_Options.context
      })) //To set environment variables in-line
      
      .pipe(gulp.dest(_target_path))
      
//      .pipe(gulp.dest(function (file) {
//              return file.base;
//          }))
      
      .on('end', _done);
});



gulp.task('preprocess_js', function(_done) {
  
  let _target_path = _WAW_Site.dist_Path; 
  
  gulp.src([
      _target_path + '/**/*.js',
      '!' + _target_path + '/thirds/**/*'
      ],

      { base : _target_path })
      
      .pipe(preprocess({
          context: _WAW_Site.preprocess_Options.context
      })) //To set environment variables in-line
      
      .pipe(gulp.dest(_target_path))
      
//      .pipe(gulp.dest(function (file) {
//              return file.base;
//          }))
      
      .on('end', _done);
});



gulp.task('copyAndpreprocess_code', function(_done) {
  runSequence('copy_Code', 'preprocess_html', 'preprocess_js',
      _done);
});



gulp.task('copy_Resources', function(_done) {
  
  let _target_path = _WAW_Site.dist_Path; 
  
  gulp.src([
      './resources/**/*'
      ],

      { base : './' })
      .pipe(gulp.dest(_target_path))
      .on('end', _done);
  
});

gulp.task('all', function(_callback) {
  runSequence('clean', 'copy_Libs_ThirdParty', 'copy_AppLib', 
      'copyAndpreprocess_code', 
      'copy_Resources',
      _callback);
});


gulp.task('default', 
    ['all']);
