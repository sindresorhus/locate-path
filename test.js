import test from 'ava';
import locatePath from '.';

const input = [
	'noop.foo',
	'unicorn.png',
	'index.js',
	'test.js'
];

test('async', async t => {
	t.is(await locatePath(input), 'index.js');
	t.is(await locatePath(['nonexistant']), undefined);
	t.is(await locatePath(['noop', 'unicorn'], {cwd: 'fixture'}), 'unicorn');
});

test('sync', t => {
	t.is(locatePath.sync(input), 'index.js');
	t.is(locatePath.sync(['nonexistant']), undefined);
	t.is(locatePath.sync(['noop', 'unicorn'], {cwd: 'fixture'}), 'unicorn');
});
