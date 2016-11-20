'use strict';
const pathExists = require('path-exists');
const pLocate = require('p-locate');

module.exports = (iterable, opts) => pLocate(iterable, el => pathExists(el), opts);

module.exports.sync = iterable => {
	for (const x of iterable) {
		if (pathExists.sync(x)) {
			return x;
		}
	}
};
