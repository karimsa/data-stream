/**
 * lib/array/join.js - data-stream
 * Join all data with a seperator.
 * 
 * Licensed under GPL-3.0.
 * Copyright (C) 2015 Karim Alibhai.
 */

'use strict';

exports.fn.join = function (seperator) {
    seperator = seperator || ',';
    var first = true;
    return this.map((data) => {
        if (first) {
            first = false;
            return data;
        }

        return seperator + data;
    });
};
