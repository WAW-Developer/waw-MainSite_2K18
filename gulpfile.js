var pjson = require('./package.json');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');


const _EcmTys_FACTORY = {
    dist_Path: './public/',
    ThirdParty_Path: 'thirds/'
};


gulp.task("clean", function (_done) {
  // return del("build");
  let _target_path = _EcmTys_FACTORY.dist_Path + '**';
  
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
  
  let _target_path = _EcmTys_FACTORY.dist_Path + _EcmTys_FACTORY.ThirdParty_Path; 
  
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
  
  let _target_path = _EcmTys_FACTORY.dist_Path + _EcmTys_FACTORY.ThirdParty_Path; 
  let _base_path = './node_modules/';
  
  gulp.src([
      './node_modules/lit-html/**/*',
      '!' + _base_path + '/lit-html/**/src/**/*',
      '!' + _base_path + '/lit-html/**/src'
      ],

      { base : './node_modules/' })
      .pipe(gulp.dest(_target_path))
      .on('end', _done);
  
});


gulp.task('copy_LibsFor_Polymer', function(_done) {
  
  let _target_path = _EcmTys_FACTORY.dist_Path + _EcmTys_FACTORY.ThirdParty_Path; 
  
  gulp.src([
      './node_modules/@polymer/polymer/**/*',
      '!./node_modules/@polymer/polymer/**/bower_components/**/*',
      '!./node_modules/@polymer/polymer/**/dist/**/*'
      ],

      { base : './node_modules/@polymer/' })
      .pipe(gulp.dest(_target_path))
      .on('end', _done);
  
});


gulp.task('copy_Libs', function(_done) {
  runSequence(['copy_LibsFor_Webcomponents', 'copy_LibsFor_LitHTML', 'copy_LibsFor_Polymer'],
      _done);
});


gulp.task('copy_Code', function(_done) {
  
  let _target_path = _EcmTys_FACTORY.dist_Path; 
  
  gulp.src([
      './src/**/*'
      ],

      { base : './src/' })
      .pipe(gulp.dest(_target_path))
      .on('end', _done);
});



gulp.task('all', function(_callback) {
  runSequence('clean', 'copy_Libs', 'copy_Code',
              _callback);
});


gulp.task('default', 
    ['all']);
