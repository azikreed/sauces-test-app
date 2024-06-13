const {exec} = require('child_process');

const watchScss = exec('npm run watch:scss');
watchScss.stdout.pipe(process.stdout);
watchScss.stderr.pipe(process.stderr);

const serve = exec('npm run serve');
serve.stdout.pipe(process.stdout);
serve.stderr.pipe(process.stderr);