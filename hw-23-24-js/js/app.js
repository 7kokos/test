requirejs.config({
	paths: {
		'jquery' : 'https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery'
	},
	shin: {
		'jquery': {
			exports : 'jQuery'
		}
	}
});

require(
	[
	'module1',
	'module2',
	'jquery'
	],
	function (module1, module2, $) {
		console.log('$', $);
		console.log('modile 1', module1);
		console.log('modile 2', module2);
		module1.sayHello();
		module2.someMethod();
	}
);