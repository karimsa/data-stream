# Array transforms

These transform methods are based on the array prototype.

## Methods

### filter(callback)

Iterate over stream data and removed unwanted pieces.

**synchronous example:**

```javascript
// this stream will only allow positive
// numbers to pass through
var stream = data().filter(function (num) {
	return num > 0;
}).stdout();

stream.write(-5);
stream.write(-3);
stream.write(6);
stream.write(8);

// prints:
// 6
// 8
```

**asynchronous example:**

```javascript
// this stream will only allow positive
// numbers to pass through
var stream = data().filter(function (num) {
	var promise = this.promise;
	
	// async magic with promises
	setTimeout(function () {
		promise.resolve(num > 0);
	}, 1);
}).stdout();

stream.write(-5);
stream.write(-3);
stream.write(6);
stream.write(8);

// prints:
// 6
// 8
```

### forEach(callback)

Iterate over each passing datum.

Example:

```javascript
var stream = data().forEach(function (data) {
	console.log('data: "%s"', data);
});

stream.write('hello, world.');
stream.write('bye.');

// prints:
// data: "hello, world."
// data: "bye."
```

### join(seperator)

Prepends all incoming data with seperator to simulate `array.join()`.

Example:

```javascript
var stream = data().join(',').pipe(process.stdout);

stream.write('hello');
stream.write('world');

// prints:
// hello,world
```

### map(callback)

Maps over incoming data with callback for transforming data.

**synchronous example:**

```javascript
// this stream will cast positive numbers to
// negative and vice versa
var stream = data().map(function (num) {
	return num * -1;
}).stdout();

stream.write(-5);
stream.write(-3);
stream.write(6);
stream.write(8);

// prints:
// 5
// 3
// -6
// -8
```

**asynchronous example:**

```javascript
// this stream will cast positive numbers to
// negative and vice versa
var stream = data().filter(function (num) {
	var promise = this.promise;
	
	// async magic with promises
	setTimeout(function () {
		promise.resolve(num * -1);
	}, 1);
}).stdout();

stream.write(-5);
stream.write(-3);
stream.write(6);
stream.write(8);

// prints:
// 5
// 3
// -6
// -8
```

### reduce(callback, initial)

