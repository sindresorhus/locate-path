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
expectType<Promise<string | undefined>>(locatePath(files, {type: 'file'}));
expectType<Promise<string | undefined>>(locatePath(files, {type: 'directory'}));
expectType<Promise<string | undefined>>(locatePath(files, {allowSymlinks: true}));
expectType<Promise<string | undefined>>(locatePath(files, {allowSymlinks: false}));

expectType<string | undefined>(locatePath.sync(files));
expectType<string | undefined>(locatePath.sync(files, {cwd: '.'}));
expectType<string | undefined>(locatePath.sync(files, {type: 'file'}));
expectType<string | undefined>(locatePath.sync(files, {type: 'directory'}));
expectType<string | undefined>(locatePath.sync(files, {allowSymlinks: true}));
expectType<string | undefined>(locatePath.sync(files, {allowSymlinks: false}));
