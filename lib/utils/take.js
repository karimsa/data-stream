/**
 * lib/utils/take.js - data-stream
 * Collect up n datums and emit together.
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

var map = require('map-stream');

exports.fn.take = function (n) {
    var buffer = [];

    return this.append(map((datum, next) => {
        // collect up the datums in a buffer
        buffer.push(datum);

        // if we have reached the ideal length,
        // we emit and reset the buffer
        if (buffer.length === n) {
            var tmp = buffer;
            buffer = [];

            // emit the buffer we collected up
            next(null, tmp);
        } else {
            // if we haven't reached the buffer length yet,
            // we should filter the datum out
            next();
        }
    }));
};
