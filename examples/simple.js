var datum = require('../');
var streamify = require('stream-array');

streamify([
	{
		price: 1.15
	},
	{
		price: 1.00
	},
	{
		price: 0.75
	},
	{
		price: 0.50
	}
]).pipe(datum()
		.pluck('price')
		.map(function (num) { return num * 1.13; })
		.forEach(function (num) { console.log('$ %s', Math.round(100 * num) / 100); })
		.probability()
		.debounce(500)
		.forEach(function (P) {
			console.log('probability of $ 1.13 => %s%', 100 * P('<=1.25'));
		}));