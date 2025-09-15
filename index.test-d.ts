import {expectType} from 'tsd';
import {locatePath, locatePathSync} from './index.js';

const files = [
	'unicorn.png',
	'rainbow.png',
	'pony.png',
];

expectType<Promise<string | undefined>>(locatePath(files));
expectType<Promise<string | undefined>>(locatePath(files, {concurrency: 2}));
expectType<Promise<string | undefined>>(locatePath(files, {preserveOrder: false}));
expectType<Promise<string | undefined>>(locatePath(files, {cwd: '.'}));
expectType<Promise<string | undefined>>(locatePath(files, {cwd: new URL('file:///path/to/cwd/')}));
expectType<Promise<string | undefined>>(locatePath(files, {type: 'file'}));
expectType<Promise<string | undefined>>(locatePath(files, {type: 'directory'}));
expectType<Promise<string | undefined>>(locatePath(files, {type: 'both'}));
expectType<Promise<string | undefined>>(locatePath(files, {allowSymlinks: true}));
expectType<Promise<string | undefined>>(locatePath(files, {allowSymlinks: false}));

expectType<string | undefined>(locatePathSync(files));
expectType<string | undefined>(locatePathSync(files, {cwd: '.'}));
expectType<string | undefined>(locatePathSync(files, {cwd: new URL('file:///path/to/cwd/')}));
expectType<string | undefined>(locatePathSync(files, {type: 'file'}));
expectType<string | undefined>(locatePathSync(files, {type: 'directory'}));
expectType<string | undefined>(locatePathSync(files, {type: 'both'}));
expectType<string | undefined>(locatePathSync(files, {allowSymlinks: true}));
expectType<string | undefined>(locatePathSync(files, {allowSymlinks: false}));
