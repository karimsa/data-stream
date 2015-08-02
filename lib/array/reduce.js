/**
 * lib/array/reduce.js - data-stream
 * Reduce data to a single data point.
 * 
 * Licensed under GPL-3.0.
 * Copyright (C) 2015 Karim Alibhai.
 */

'use strict';

var map = require('map-stream');

exports.fn.reduce = function (fn, initial) {
    var value = initial | 0;
    return this.append(map((data, next) => {
        value = fn(value, data);
        next(null, value);
    }));
};
