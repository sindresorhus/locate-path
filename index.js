'use strict';
const path = require('path');
const pathExists = require('path-exists');
const pLocate = require('p-locate');

module.exports = (paths, options) => {
	options = {
		cwd: process.cwd(),
		...options
	};

	return pLocate(paths, path_ => pathExists(path.resolve(options.cwd, path_)), options);
};

module.exports.sync = (paths, options) => {
	options = {
		cwd: process.cwd(),
		...options
	};

	for (const path_ of paths) {
		if (pathExists.sync(path.resolve(options.cwd, path_))) {
			return path_;
		}
	}
};
