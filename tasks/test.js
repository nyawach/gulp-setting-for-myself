import gulp from 'gulp';
import DefaultRegistry from 'undertaker-registry';

class TestTask extends DefaultRegistry {
  init() {
    gulp.task('task:test', cb => {
      console.log('task:test done!');
      cb()
    });
  }
};

module.exports = new TestTask();

