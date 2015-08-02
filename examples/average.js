var data = require('../');
var stream = data()
	.average()
	.debounce(500)
	.stdout();

stream.write(1);
stream.write(2);
stream.write(3);
stream.write(4);