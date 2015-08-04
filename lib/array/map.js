/**
 * lib/array/map.js - data-stream
 * Iterate over and change all data passing through stream.
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

var map = require('map-stream'),
    defer = require('promise-defer');

exports.fn.map = function (fn) {
    return this.append(map((data, next) => {
        var deferred = defer();
        deferred.promise.then((newData) => next(null, newData), next);

        try {
            var retval = fn.call({
                promise: deferred
            }, data);
            if (retval) deferred.resolve(retval);
        } catch (err) {
            deferred.reject(err);
        }
    }));
};
