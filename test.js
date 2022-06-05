import process from 'node:process';
import test from 'ava';
import {locatePath, locatePathSync} from './index.js';

const paths = [
	'noop.foo',
	'unicorn.png',
	'index.js',
	'test.js',
];

test('async', async t => {
	t.is(await locatePath(paths), 'index.js');
	t.is(await locatePath(['nonexistant']), undefined);
	t.is(await locatePath(['noop', 'unicorn'], {cwd: 'fixture'}), 'unicorn');
	t.is(await locatePath(['noop', 'unicorn'], {cwd: new URL('fixture', import.meta.url)}), 'unicorn');
	t.is(await locatePath(['index.js'], {type: 'directory'}), undefined);
	t.is(await locatePath(['fixture'], {type: 'file'}), undefined);
	t.is(await locatePath(['fixture']), undefined);
	t.is(await locatePath(['fixture'], {type: 'directory'}), 'fixture');

	await t.throwsAsync(locatePath(['fixture'], {type: 'rainbows'}), {
		instanceOf: Error,
		message: 'Invalid type specified: rainbows',
	});

	await t.throwsAsync(locatePath(['fixture'], {type: 'toString'}), {
		instanceOf: Error,
		message: 'Invalid type specified: toString',
	});

	await t.throwsAsync(locatePath(['fixture'], {type: 1}), {
		instanceOf: Error,
		message: 'Invalid type specified: 1',
	});

	if (process.platform !== 'win32') {
		t.is(await locatePath(['file-link', 'unicorn'], {cwd: 'fixture', type: 'file'}), 'file-link');
		t.is(await locatePath(['directory-link', 'unicorn'], {cwd: 'fixture', type: 'file'}), 'unicorn');
		t.is(await locatePath(['directory-link', 'unicorn'], {cwd: 'fixture', type: 'directory'}), 'directory-link');

		t.is(await locatePath(['file-link', 'unicorn'], {cwd: 'fixture', allowSymlinks: false, type: 'file'}), 'unicorn');
		t.is(await locatePath(['directory-link', 'unicorn'], {cwd: 'fixture', allowSymlinks: false, type: 'directory'}), undefined);
	}
});

test('sync', t => {
	t.is(locatePathSync(paths), 'index.js');
	t.is(locatePathSync(['nonexistant']), undefined);
	t.is(locatePathSync(['noop', 'unicorn'], {cwd: 'fixture'}), 'unicorn');
	t.is(locatePathSync(['noop', 'unicorn'], {cwd: new URL('fixture', import.meta.url)}), 'unicorn');
	t.is(locatePathSync(['index.js'], {type: 'directory'}), undefined);
	t.is(locatePathSync(['fixture'], {type: 'file'}), undefined);
	t.is(locatePathSync(['fixture']), undefined);
	t.is(locatePathSync(['fixture'], {type: 'directory'}), 'fixture');

	t.throws(() => {
		locatePathSync(['fixture'], {type: 'rainbows'});
	}, {
		instanceOf: Error,
		message: 'Invalid type specified: rainbows',
	});

	t.throws(() => {
		locatePathSync(['fixture'], {type: 'toString'});
	}, {
		instanceOf: Error,
		message: 'Invalid type specified: toString',
	});

	t.throws(() => {
		locatePathSync(['fixture'], {type: 1});
	}, {
		instanceOf: Error,
		message: 'Invalid type specified: 1',
	});

	if (process.platform !== 'win32') {
		t.is(locatePathSync(['file-link', 'unicorn'], {cwd: 'fixture', type: 'file'}), 'file-link');
		t.is(locatePathSync(['directory-link', 'unicorn'], {cwd: 'fixture', type: 'file'}), 'unicorn');
		t.is(locatePathSync(['directory-link', 'unicorn'], {cwd: 'fixture', type: 'directory'}), 'directory-link');

		t.is(locatePathSync(['file-link', 'unicorn'], {cwd: 'fixture', allowSymlinks: false, type: 'file'}), 'unicorn');
		t.is(locatePathSync(['directory-link', 'unicorn'], {cwd: 'fixture', allowSymlinks: false, type: 'directory'}), undefined);
	}
});
