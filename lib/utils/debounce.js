/**
 * lib/utils/debounce.js - data-stream
 * Debounce stream's passthrough.
 * 
 * Licensed under GPL-3.0.
 * Copyright (C) 2015 Karim Alibhai.
 */

'use strict';

var debounce = require('debounce-stream');
exports.fn.debounce = (timeout) => this.append(debounce(timeout));
