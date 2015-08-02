/**
 * lib/probability.js - data-stream
 * Create probability mappings for data.
 * 
 * Licensed under GPL-3.0.
 * Copyright (C) 2015 Karim Alibhai.
 */

'use strict';

exports.fn.probability = function () {
    var freq = {},
        events = 0,
        compare = {
            '>': (a, b) => a > b,
            '<': (a, b) => a < b,
            '=': (a, b) => a === b,
            '>=': (a, b) => a >= b,
            '<=': (a, b) => a <= b
        };

    return this.map((data) => {
        data = String(data);
        if (!freq[data]) freq[data] = 0;

        freq[data] += 1;
        events += 1;

        return function (key) {
            if (compare.hasOwnProperty(key[0])) {
                var sign = key[0],
                    sum = 0;

                key = key.substr(1);
                if (key[0] === '=') {
                    sign += '=';
                    key = key.substr(1);
                }

                key = parseFloat(key);
                for (var event in freq) {
                    if (freq.hasOwnProperty(event) && compare[sign](parseFloat(event), key)) {
                        sum += freq[event];
                    }
                }

                return sum / events;
            }

            return freq[String(key)] / events;
        };
    });
};
