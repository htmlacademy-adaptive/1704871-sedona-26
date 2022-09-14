import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
// import htmlmin from 'gulp-htmlmin';
// import terser from 'gulp-terser';
// import squoosh from 'gulp-libsquoosh';
// import svgo from 'gulp-svgmin';
// import svgstore from 'gulp-svgstore';
// import del from 'del';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

// export const html = () => {
//   return gulp.src('source/*.html')
//   .pipe(htmlmin({ collapseWhitespace: true }))
//   .pipe(gulp.dest('build'));
// }

// scripts

// export const script = () => {
//   return gulp.src('source/js/*.js')
//   .pipe(terser())
//   .pipe(gulp.dest('build/js'))
// }

// Images
// export const images = () => {
//   return gulp.src('source/img/**/*.{jpg,jpeg,png}')
//   .pipe(squoosh({
//     webp: {}
//   }))
//   .pipe(gulp.dest('build/img'))
// }

// Webp

// export const createWebp = () => {
//   return gulp.src('source/img/**/*.{jpg,jpeg,png}')
//   .pipe(squoosh({
//     webp: {}
//   }))
//   .pipe(gulp.dest('build/img'));
// }

// SVG

// export svg = () => {
//   gulp.src('source/img/*/**/.svg')
//   .pipe(svgo())
//   .pipe(gulp.dest('build/img));
// }

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}


export default gulp.series(
  styles, server, watcher // html добавить
);
