/**
 * test/test-math.js - data-stream
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

describe('math transforms', () => {
    describe('.average()', () => {
        it('should average 3, 50, and 265 to 106', (done) =>
            data()
            .average()
            .debounce(10)
            .forEach((average) => {
                average.should.be.exactly(106);
                done();
            })
            .write(3)
            .write(50)
            .write(265)
        );
    });

    describe('.probability()', () => {
        it('should estimate probability of heads', (done) => {
            var stream = data()
                .probability()
                .debounce(10)
                .forEach((P) => {
                    P('H').should.be.approximately(0.5, 0.2);
                    done();
                }),
                coin = ['H', 'T'];

            for (var i = 0; i < 50; i += 1) {
                stream.write(coin[Math.round(Math.random())]);
            }
        });
    });

    describe('.sum()', () => {
        it('should add 1, 2, and 3 to 6', (done) =>
            data()
            .sum()
            .debounce(100)
            .forEach((sum) => {
                sum.should.be.exactly(6);
                done();
            })
            .write(1)
            .write(2)
            .write(3)
        );
    });
});
