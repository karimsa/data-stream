# Utilitiy transforms

These transforms are miscellaneous in category.

## Methods

### debounce(timeout)

Debounces the passthrough function of the stream by `timeout` milliseconds.

Example:

```javascript
// debouncing is useful when receiving calculated
// instantaenous data from the stream, data which
// would otherwise require an entire collection.
// i.e. average, deviation, summary, probability.
var stream = data()
	.sum()
	.debounce(100)
	.stdout();

// without debouncing, this script would cause an
// overload of consecutive numbers being printed.
// with the debounce, it prints with delay.
setTimeout(function(){ stream.write(1) },1);
```

### json()

Parses incoming data as JSON, and re-emits the object.

Example:

```javascript
// .json() is enough to transform the data
var stream = data().json(),
	people = ['Bruce', 'Selina', 'Dick'];

// iterate over each data
stream.forEach(function (person) {
	console.log('hello, %s', person.name);
});

// print random people in proper JSON format
setTimeout(function () {
	var rnd = Math.round(Math.round() * (people.length - 1));
	stream.write('{"people":"' + people[rnd] + '"}');
}, 500);
```

### pluck(key)

Pluck `key` out of incoming objects.

Example:

```javascript
// this makes the above example simpler
var stream = data()
		.pluck('name')
		.forEach(console.log),
	people = ['Bruce', 'Selina', 'Dick'];

// print random people in proper JSON format
setTimeout(function () {
	var rnd = Math.round(Math.round() * (people.length - 1));
	stream.write({ people: people[rnd] });
}, 500);
```

### stdout()

Pipes concatenated stringified data to node's stdout stream.

Example:

```javascript
// you should apply your other transforms
// before using .stdout(), and then you can
// write whatever data you want.
data()
	.stdout()
	.write('hello, world.')
	.write({ msg: 'hello, world.' })
	.write(4);

// prints:
// hello, world.
// {msg:"hello, world."}
// 4
```

### stringify()

For objects, this will run `JSON.stringify`. For everything else, it
will use the `String` constructor.

```javascript
data()
	.stringify()
	.stdout() // prints: {msg:"hello, world."}
	.write({ msg: 'hello, world.' });
```