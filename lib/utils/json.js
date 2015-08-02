/**
 * lib/utils/json.js - data-stream
 * Parse all incoming data to JSON.
 * 
 * Licensed under GPL-3.0.
 * Copyright (C) 2015 Karim Alibhai.
 */

'use strict';

exports.fn.json = function () {
    return this.map((data) => JSON.parse(data));
};
