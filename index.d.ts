declare namespace locatePath {
	interface Options {
		/**
		Current working directory.

		@default process.cwd()
		*/
		readonly cwd?: string;
	}

	interface AsyncOptions extends Options {
		/**
		Number of concurrently pending promises. Minimum: `1`.

		@default Infinity
		*/
		readonly concurrency?: number;

		/**
		Preserve `input` order when searching.

		Disable this to improve performance if you don't care about the order.

		@default true
		*/
		readonly preserveOrder?: boolean;
	}
}

declare const locatePath: {
	/**
	Get the first path that exists on disk of multiple paths.

	@param input - Paths to check.
	@returns The first path that exists or `undefined` if none exists.

	@example
	```
	import locatePath = require('locate-path');

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
	*/
	(input: Iterable<string>, options?: locatePath.AsyncOptions): Promise<
		string | undefined
	>;

	/**
	Synchronously get the first path that exists on disk of multiple paths.

	@param input - Paths to check.
	@returns The first path that exists or `undefined` if none exists.
	*/
	sync(
		input: Iterable<string>,
		options?: locatePath.Options
	): string | undefined;
};

export = locatePath;
