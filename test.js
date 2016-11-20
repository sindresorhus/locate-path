import test from 'ava';
import m from './';

const input = [
	'noop.foo',
	'unicorn.png',
	'index.js',
	'test.js'
];

test('async', async t => {
	t.is(await m(input, {concurrency: 1}), 'index.js');
	t.is(await m(['nonexistant'], {concurrency: 1}), undefined);
});

test('sync', t => {
	t.is(m.sync(input), 'index.js');
	t.is(m.sync(['nonexistant']), undefined);
});
