/**
 * lib/utils/stringify.js - data-stream
 * Stringify all incoming data.
 * 
 * Licensed under GPL-3.0.
 * Copyright (C) 2015 Karim Alibhai.
 */

'use strict';

exports.fn.stringify = function () {
    return this.map((data) => typeof data === 'object' ? JSON.stringify(data) : String(data));
};
