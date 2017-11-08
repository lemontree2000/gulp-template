var prod = require('./build/gulpfile.prod.js');
var dev = require('./build/gulpfile.dev.js');
var init = require('./build/gulpfile.init.js');
prod();
dev();
init();