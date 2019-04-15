import {expectType} from 'tsd';
import locatePath = require('.');

const files = [
	'unicorn.png',
	'rainbow.png',
	'pony.png'
];

expectType<Promise<string | undefined>>(locatePath(files));
expectType<Promise<string | undefined>>(locatePath(files, {concurrency: 2}));
expectType<Promise<string | undefined>>(locatePath(files, {preserveOrder: false}));
expectType<Promise<string | undefined>>(locatePath(files, {cwd: '.'}));

expectType<string | undefined>(locatePath.sync(files));
expectType<string | undefined>(locatePath.sync(files, {cwd: '.'}));
