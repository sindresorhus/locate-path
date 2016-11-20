# locate-path [![Build Status](https://travis-ci.org/sindresorhus/locate-path.svg?branch=master)](https://travis-ci.org/sindresorhus/locate-path)

> Get the first path that exists on disk of multiple paths


## Install

```
$ npm install --save locate-path
```


## Usage

Here we find the first file that exists on disk, in array order.

```js
const locatePath = require('locate-path');

const files = [
	'unicorn.png',
	'rainbow.png', // only this one actually exists on disk
	'pony.png'
];

locatePath(files, {concurrency: 1}).then(foundPath => {
	console.log(foundPath);
	//=> 'rainbow'
});
```


## API

### locatePath(input, [options])

Returns a `Promise` for the first path that exists or `undefined` if none exists.

#### input

Type: `Iterable<string>`

Paths to check.

Set `{concurrency: 1}` to preserve the search order.

#### options

Type: `Object`

##### concurrency

Type: `number`<br>
Default: `Infinity`<br>
Minimum: `1`

Number of concurrently pending promises.

### locatePath.sync(input)

Returns the first path that exists or `undefined` if none exists.

#### input

Type: `Iterable<string>`

Paths to check.


## Related

- [path-exists](https://github.com/sindresorhus/path-exists) - Check if a path exists


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
