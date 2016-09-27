/// <binding BeforeBuild='clean:reflect' AfterBuild='copy:reflect' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    async = require('async'),
    clean = require('gulp-clean'),
    ts = require('gulp-typescript'),
    uglify = require('gulp-uglify'),
    pump = require('pump');

var devroot = './wwwroot/', webroot = './wwwroot/', publishroot = './PublishOutput/';

var paths = {
    lib: {
        dest: webroot + 'node_modules/',
    },

    app: {
        dest: webroot + 'app',
        tsSrc: devroot + 'app/*.ts',
    },

    ts: {
        config: devroot + 'tsconfig.json',
    },
};

// Clean libs from wwwroot.
gulp.task('clean:libs', () => {
    return gulp.src(paths.lib.dest)
        .pipe(clean());
});

// Copy libs to wwwroot.
gulp.task('copy:libs', () => {
    gulp.src([
            'core-js/client/**',
            'systemjs/dist/system.src.js',
            'reflect-metadata/**',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            '@types/**',
            'jquery/dist/jquery.*js',
            'bootstrap/dist/js/bootstrap.*js',
            'bootstrap/dist/css/bootstrap.*css',
            'bootstrap/dist/fonts/**',
    ], {
        cwd: 'node_modules/**'
    })
        .pipe(gulp.dest(paths.lib.dest));
});

// Clean reflect from wwwroot/node_modules.
gulp.task('clean:reflect', () => {
    return gulp.src(paths.lib.dest + 'reflect-metadata')
        .pipe(clean());
});

// Copy reflect to wwwroot/node_modules.
gulp.task('copy:reflect', () => {
    gulp.src([
            'reflect-metadata/**',
    ], {
        cwd: 'node_modules/**'
    })
        .pipe(gulp.dest(paths.lib.dest));
});

// Copy wwwroot to PublishOutput.
gulp.task('publish:prod', (cb) => {
    async.series([
       (next) => {
           // Clean PublishOutput.
           console.log(`Cleaning ${publishroot} ...`);
           gulp.src(publishroot)
               .pipe(clean())
               .on('finish', next);
       },

       (next) => {
           // Copy wwwroot.
           console.log(`Copying ${webroot} to ${publishroot} ...`);
           gulp.src([
            webroot + '**',
           ])
               .pipe(gulp.dest(publishroot))
               .on('finish', next);
       },

       (next) => {
           // Clean tsconfig.json, *.ts/*.map.
           console.log(`Cleaning tsconfig.json/*.ts/*.map ...`);
           gulp.src(publishroot + 'tsconfig.json')
               .pipe(clean());
           gulp.src(publishroot + '**/*.ts')
               .pipe(clean());
           gulp.src(publishroot + '**/*.map')
               .pipe(clean())
               .on('finish', next);
       },

       (next) => {
           // Minify.
           console.log(`Minifying *.js in ${publishroot} ...`);
           pump([
              gulp.src(publishroot + '**/*.js'),
              uglify(),
              gulp.dest(publishroot)
           ])
               .on('finish', next);
       },
    ], cb);
});

// Compile *.ts in wwwroot/app.
gulp.task('tsc', () => {
    var tsProject = ts.createProject(paths.ts.config, { typescript: require('typescript') });
    var tsResult = gulp.src([
        paths.app.tsSrc
    ])
    .pipe(tsProject(ts.reporter.fullReporter()));
    return tsResult.js.pipe(gulp.dest(paths.app.dest));
});

// Watch changes to app/*.ts and compile.
gulp.task('tsc:w', ['tsc'], () => {
    return gulp.watch(paths.app.tsSrc, ['tsc']);
});

gulp.task('default:dev', ['copy:libs', 'tsc:w']);