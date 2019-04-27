# locate-path [![Build Status](https://travis-ci.org/sindresorhus/locate-path.svg?branch=master)](https://travis-ci.org/sindresorhus/locate-path)

> Get the first path that exists on disk of multiple paths


## Install

```
$ npm install locate-path
```


## Usage

Here we find the first file that exists on disk, in array order.

```js
const locatePath = require('locate-path');

const files = [
	'unicorn.png',
	'rainbow.png', // Only this one actually exists on disk
	'pony.png'
];

(async () => {
	console(await locatePath(files));
	//=> 'rainbow'
})();
```


## API

### locatePath(paths, [options])

Returns a `Promise<string>` for the first path that exists or `undefined` if none exists.

#### paths

Type: `Iterable<string>`

Paths to check.

#### options

Type: `Object`

##### concurrency

Type: `number`<br>
Default: `Infinity`<br>
Minimum: `1`

Number of concurrently pending promises.

##### preserveOrder

Type: `boolean`<br>
Default: `true`

Preserve `paths` order when searching.

Disable this to improve performance if you don't care about the order.

##### cwd

Type: `string`<br>
Default: `process.cwd()`

Current working directory.

##### type

Type: `string`<br>
Default: `undefined`<br>
Allowed Values: `file` or `directory`

If defined this restricts the type of paths that can match.

##### followSymlinks

Type: `boolean`<br>
Default: `true`

Follow symbolic links when checking `options.type`.

### locatePath.sync(paths, [options])

Returns the first path that exists or `undefined` if none exists.

#### paths

Type: `Iterable<string>`

Paths to check.

#### options

Type: `Object`

##### cwd

Same as above.

##### type

Same as above.

##### followSymlinks

Same as above.


## Related

- [path-exists](https://github.com/sindresorhus/path-exists) - Check if a path exists


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
