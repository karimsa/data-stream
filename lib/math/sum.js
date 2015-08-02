/**
 * lib/math/sum.js - data-stream
 * Pass an updated sum of data down the stream.
 * 
 * Licensed under GPL-3.0.
 * Copyright (C) 2015 Karim Alibhai.
 */

exports.fn.sum = function () {
    return this.reduce((prev, next) => prev + parseFloat(next), 0);
};
