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

var BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);

if (args['help']) {
    printHelp();
} else if (args.in || args._.includes('-')) {
    processFile(process.stdin);
} else if (args.file) {
    let stream = fs.createReadStream(path.resolve(BASE_PATH || __dirname, args.file));
    processFile(stream);
} else {
    error();
}

// *************************************** //

function error(message) {
    console.log(message);
}

function processFile(inStream) {
    let outStream = inStream;
    let targetStream = process.stdout;
    outStream.pipe(targetStream);
}

function printHelp() {
	console.log('ex1.js usage file');
	console.log(""); 	
	console.log('     --file:{FILENAME}');
	console.log('     --in or - for cat');
    console.log('     --help');
    console.log('');
    console.log('     --help    print help needed');
}
