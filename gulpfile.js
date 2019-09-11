const {src, dest, series} = require('gulp');
const cleanCss = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const less = require('gulp-less');

function css() {
    return src([
            'src/components/**/*.less',
            'node_modules/angular-material/angular-material.css'
        ])
        .pipe(less())
        .pipe(concatCss('styles.css'))
        .pipe(cleanCss())
        .pipe(dest('public/stylesheets'))
}

exports.css = css;
exports.default = series(css);
