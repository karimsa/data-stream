/**
 * lib/utils/pluck.js - data-stream
 * Pluck out specific values from data.
 * 
 * Licensed under GPL-3.0.
 * Copyright (C) 2015 Karim Alibhai.
 */

'use strict';

var pluck = require('pluck');
exports.fn.pluck = function (key) {
    return this.map(pluck(key));
};
