/**
 * lib/array/map.js - data-stream
 * Iterate over and change all data passing through stream.
 * 
 * Licensed under GPL-3.0.
 * Copyright (C) 2015 Karim Alibhai.
 */

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
