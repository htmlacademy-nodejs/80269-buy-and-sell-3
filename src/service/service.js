'use strict';

const version = require(`./cli/version`);
const help = require(`./cli/help`);
const generate = require(`./cli/generate`);

version.run();
help.run();
generate.run([3]);
