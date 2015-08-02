# data-stream ![travis-ci build status](https://magnum.travis-ci.com/karimsa/pennyworth.svg?token=bynzkcTP4XciV8soPs5e&branch=master)

powerful data manipulation with node.js streams.

## Usage

To start using, install it into your project, create a new data-stream, apply your transforms, then treat as a regular stream:

```javascript
var data = require('../');
var stream = data()
	.sum()
	.debounce(100)
	.forEach(console.log);

setInterval(function(){ stream.write(1) }, 1);
```

*See [examples/sum.js](examples/sum.js).*

## API documentation

For the full API specification, please see [doc/index.md](doc/index.md).

## License

Licensed under [GPL-3.0]().