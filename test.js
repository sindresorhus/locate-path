import test from 'ava';
import m from './';

const input = [
	'noop.foo',
	'unicorn.png',
	'index.js',
	'test.js'
];

test('async', async t => {
	t.is(await m(input), 'index.js');
	t.is(await m(['nonexistant']), undefined);
	t.is(await m(['noop', 'unicorn'], {cwd: 'fixture'}), 'unicorn');
});

test('sync', t => {
	t.is(m.sync(input), 'index.js');
	t.is(m.sync(['nonexistant']), undefined);
	t.is(m.sync(['noop', 'unicorn'], {cwd: 'fixture'}), 'unicorn');
});
