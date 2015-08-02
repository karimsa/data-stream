/**
 * lib/index.js - data-stream
 * Base class for data-stream.
 * 
 * Licensed under GPL-3.0.
 * Copyright (C) 2015 Karim Alibhai.
 */

'use strict';

var Stream = require('stream'),
    through = require('through'),
    merge = require('merge-stream'),
    isStream = require('is-stream');

class DataStream extends Stream {
    constructor() {
        super();

        // mark as duplex
        this.readable = this.writable = true;

        // create an underlying stream for
        // handling the transforms
        this._stream = through();

        // maintain binding to top-most stream
        this.write = this._stream.write.bind(this._stream);
        this.end = this._stream.end.bind(this._stream);

        // for branching out
        this.isStream = isStream;
    }

    // clone the current data-stream
    clone() {
        var stream = new DataStream();

        stream._stream = this._stream;
        stream.write = this.write;
        stream.end = this.end;

        return stream;
    }

    // pipe to the actual underlying stream
    pipe(target) {
        this._stream.pipe(target);
        return this;
    }

    // reverse-pipe
    take(stream) {
        stream.pipe(this);
        return this;
    }

    // merge with another stream
    and(stream) {
        this._stream = merge(this._stream, stream);
        return this;
    }

    // for appending a new transform stream
    append(stream) {
        this._stream = this._stream.pipe(stream);
        return this;
    }
}

// proxy `.on` for 'data' event
var on = DataStream.prototype.on;
DataStream.prototype.on = function (event, callback) {
    if (event === 'data') return this._stream.on('data', callback);
    return on.apply(this, arguments);
};

// expose constructor
export default (options) => new DataStream(options);

// expose prototype
exports.fn = DataStream.prototype;
