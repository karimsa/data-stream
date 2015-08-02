/**
 * lib/array/filter.js - data-stream
 * Filter out unwanted stream data.
 * 
 * Licensed under GPL-3.0.
 * Copyright (C) 2015 Karim Alibhai.
 */

'use strict';

var map = require('map-stream'),
    defer = require('promise-defer');

exports.fn.filter = function (fn) {
    return this.append(map((data, next) => {
        var deferred = defer();
        deferred.promise.then((cont) => {
            if (cont) next(null, data);
            else next();
        }, next);

        try {
            var retval = fn.call({
                promise: deferred
            }, data);
            if (retval !== undefined) deferred.resolve(retval);
        } catch (err) {
            deferred.reject(err);
        }
    }));
};
