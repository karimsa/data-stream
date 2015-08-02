/**
 * lib/math/average.js - data-stream
 * Calculate and pass down an average of values.
 * 
 * Licensed under GPL-3.0.
 * Copyright (C) 2015 Karim Alibhai.
 */

'use strict';

exports.fn.average = function () {
    var sum = 0,
        n = 0;

    return this.map((num) => {
        sum += num;
        n += 1;

        return sum / n;
    });
};
