var datum = require('../');
var stream = datum()

	// we use the instantaneous reduce to
	// sum up all the elements and emit the
	// latest sum
	.sum()
	
	// debouncing this stream will help us receive
	// less sums since we don't actually care about
	// dealing with every single updated sum
	.debounce(1000)
	
	// node's stdout stream expects the incoming data
	// to be either strings or buffers that can be easily
	// printed. the `.stdout()` helper stringies and concatenates
	// all the incoming data and then pipes it to the stdout
	// stream
	.stdout();

// and now we can endlessly emit 1s and watch the sum grow
setInterval(function(){ stream.write(1) }, 1);