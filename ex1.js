#! /usr/bin/env node

'use strict';

var path = require('path');
var fs = require('fs');
var getStdin = require('get-stdin');

var args = require('minimist')(process.argv.slice(2), {
    boolean: [
        'help',
        'in',
    ],
    string: [
        'file',
    ],
});

if (args['help']) {
    printHelp();
} else if (args.in || args._.includes('-')) {
    getStdin().then(processFile).catch(error);
} else if (args.file) {
    fs.readFile(path.resolve(args.file), function(err, contents) {
        if (err) {
            console.log(err);
        } else {
            processFile(contents.toString());
        }
    });
} else {
    error();
}

// *************************************** //

function error(message) {
    console.log(message);
}

function processFile(content) {
    console.log(content.toString());
}

function printHelp() {
	console.log('ex1.js usage file');
	console.log('--file:{FILENAME}');
	console.log('--in or - for cat');
    console.log('     --help');
    console.log('');
    console.log('     --help    print help needed');
}
