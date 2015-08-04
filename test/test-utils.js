/**
 * test/test-utils.js - data-stream
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

import 'mocha';
import 'should';
import data from '../';
import through from 'through';
import intercept from 'intercept-stdout';

describe('utility transforms', () => {
    describe('.debounce()', () =>
        it('should not emit data for at least 100ms', (done) => {
            var tstart = +new Date();
            data()
                .debounce(100)
                .forEach(() => {
                    ((+new Date()) - tstart).should.be.approximately(100, 10);
                    done();
                })
                .write('data')
                .write('data')
                .write('data')
                .write('data');
        })
    );

    describe('.json() and .stringify()', () => {
        it('should parse a stringified object properly', (done) =>
            data()
            .json()
            .forEach((obj) => {
                obj.should.be.an.instanceOf(Object);
                obj.should.have.property('test');
                obj.test.should.eql('success');
                done();
            })
            .write('{"test":"success"}')
        );

        it('should stringify object properly', (done) =>
            data()
            .stringify()
            .forEach((obj) => {
                obj.should.be.an.instanceOf(String);
                obj.should.be.eql('{"test":"success"}');
                done();
            })
            .write({
                test: 'success'
            })
        );

        it('should stringify then parse again', (done) =>
            data()
            .stringify()
            .forEach((obj) => {
                obj.should.be.an.instanceOf(String);
                obj.should.be.eql('{"test":"success"}');
            })
            .json()
            .forEach((obj) => {
                obj.should.be.an.instanceOf(Object);
                obj.should.have.property('test');
                obj.test.should.eql('success');
                done();
            })
            .write({
                test: 'success'
            })
        );
    });

    describe('.pluck()', () => {
        it('should pluck string out of object', (done) =>
            data()
            .pluck('key')
            .forEach((data) => {
                data.should.eql('hello, world');
                done();
            })
            .write({
                key: 'hello, world'
            })
        );

        it('should pluck string out of object out of object', (done) =>
            data()
            .pluck('event.key')
            .forEach((data) => {
                data.should.eql('hello, world');
                done();
            })
            .write({
                event: {
                    key: 'hello, world'
                }
            })
        );
    });

    describe('.stdout()', () => {
        it('should output simple datum to stdout', (done) => {
            var unhook = intercept((data) => {
                data.should.eql('\0');
                unhook();
                done();
            });

            data().stdout().write('\0');
        });

        it('should output datums with newlines', (done) => {
            var stream = data().stdout().write('\0'),
                unhook = intercept((data) => {
                    data.should.eql('\n\0');
                    console.log('"%s"', data);
                    unhook();
                    done();
                });

            stream.write('\0');
        });
    });
});
