import test from 'ava';
import locatePath from '.';

const paths = [
	'noop.foo',
	'unicorn.png',
	'index.js',
	'test.js'
];

test('async', async t => {
	t.is(await locatePath(paths), 'index.js');
	t.is(await locatePath(['nonexistant']), undefined);
	t.is(await locatePath(['noop', 'unicorn'], {cwd: 'fixture'}), 'unicorn');
	t.is(await locatePath(['index.js'], {type: 'directory'}), undefined);
	t.is(await locatePath(['fixture'], {type: 'file'}), undefined);
	t.is(await locatePath(['fixture']), 'fixture');

	if (process.platform !== 'win32') {
		t.is(await locatePath(['file-link', 'unicorn'], {cwd: 'fixture', type: 'file'}), 'file-link');
		t.is(await locatePath(['dir-link', 'unicorn'], {cwd: 'fixture', type: 'file'}), 'unicorn');
		t.is(await locatePath(['dir-link', 'unicorn'], {cwd: 'fixture', type: 'directory'}), 'dir-link');

		t.is(await locatePath(['file-link', 'unicorn'], {cwd: 'fixture', followSymlinks: false, type: 'file'}), 'unicorn');
		t.is(await locatePath(['dir-link', 'unicorn'], {cwd: 'fixture', followSymlinks: false, type: 'directory'}), undefined);
	}
});

test('sync', t => {
	t.is(locatePath.sync(paths), 'index.js');
	t.is(locatePath.sync(['nonexistant']), undefined);
	t.is(locatePath.sync(['noop', 'unicorn'], {cwd: 'fixture'}), 'unicorn');
	t.is(locatePath.sync(['index.js'], {type: 'directory'}), undefined);
	t.is(locatePath.sync(['fixture'], {type: 'file'}), undefined);
	t.is(locatePath.sync(['fixture']), 'fixture');

	if (process.platform !== 'win32') {
		t.is(locatePath.sync(['file-link', 'unicorn'], {cwd: 'fixture', type: 'file'}), 'file-link');
		t.is(locatePath.sync(['dir-link', 'unicorn'], {cwd: 'fixture', type: 'file'}), 'unicorn');
		t.is(locatePath.sync(['dir-link', 'unicorn'], {cwd: 'fixture', type: 'directory'}), 'dir-link');

		t.is(locatePath.sync(['file-link', 'unicorn'], {cwd: 'fixture', followSymlinks: false, type: 'file'}), 'unicorn');
		t.is(locatePath.sync(['dir-link', 'unicorn'], {cwd: 'fixture', followSymlinks: false, type: 'directory'}), undefined);
	}
});
