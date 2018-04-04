const args = ['start'];
const opts = { stdiio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', args, opts);
