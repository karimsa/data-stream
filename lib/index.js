/**
 * lib/index.js - data-stream
 * Base class for data-stream.
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
        var write = this._stream.write.bind(this._stream);
        this.write = function () {
            write.apply(this, arguments);
            return this;
        };

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
