/**
 * lib/probability.js - data-stream
 * Create probability mappings for data.
 * 
 * data-stream: powerful data manipulation with node.js streams.
 * Copyright (C) 2015 Karim Alibhai.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 **/

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
