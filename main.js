'use strict';

const fs = require('fs');
const yaml = require('yaml');

const server_conf = yaml.parse(fs.readFileSync(__dirname + '/conf/server_conf.yml', 'utf-8'));

