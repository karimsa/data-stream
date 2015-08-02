/**
 * lib/array/forEach.js - data-stream
 * Iterate over each stream item.
 * 
 * Licensed under GPL-3.0.
 * Copyright (C) 2015 Karim Alibhai.
 */

'use strict';

exports.fn.forEach = function (fn) {
    return this.map((data) => {
        fn(data);
        return data;
    });
};
