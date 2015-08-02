/**
 * lib/utils/stdout.js - data-stream
 * Make incoming data appropriate for logging.
 * 
 * Licensed under GPL-3.0.
 * Copyright (C) 2015 Karim Alibhai.
 */

'use strict';

exports.fn.stdout = function (seperator) {
    return this.stringify()
        .join(seperator || '\n')
        .pipe(process.stdout);
};
