'use strict';
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const pLocate = require('p-locate');

const fsStat = promisify(fs.stat);
const fsLStat = promisify(fs.lstat);

const typeMappings = {
	directory: 'isDirectory',
	file: 'isFile'
};

function checkType({type}) {
	if (type === undefined || type in typeMappings) {
		return;
	}

	throw new TypeError(`Invalid type specified: ${type}`);
}

const matchType = (type, stat) => type === undefined || stat[typeMappings[type]]();

module.exports = (paths, options) => {
	options = {
		cwd: process.cwd(),
		followSymlinks: true,
		...options
	};
	checkType(options);
	const statFn = options.followSymlinks ? fsStat : fsLStat;

	return pLocate(paths, async path_ => {
		try {
			const stat = await statFn(path.resolve(options.cwd, path_));
			return matchType(options.type, stat);
		} catch (error) {
			return false;
		}
	}, options);
};

module.exports.sync = (paths, options) => {
	options = {
		cwd: process.cwd(),
		followSymlinks: true,
		...options
	};
	checkType(options);
	const statFn = options.followSymlinks ? fs.statSync : fs.lstatSync;

	for (const path_ of paths) {
		try {
			const stat = statFn(path.resolve(options.cwd, path_));

			if (matchType(options.type, stat)) {
				return path_;
			}
		} catch (error) {
		}
	}
};
