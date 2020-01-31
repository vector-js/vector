import Point from '../elements/math/point.js';
/**
* Returns the next prime number after the given integer.
*/
export declare function nextPrime(n: number): number;
/**
* Returns true if the number is prime, false otherwise.
*/
export declare function isPrime(n: number): boolean;
/**
* Returns the point where two lines intersect. The first line is defined by the
* points p1 and p2. The second line is defined by the points p3 and p4.
*/
export declare function PointWhereTwoLinesIntersect(p1: Point, p2: Point, p3: Point, p4: Point): Point;
/**
* This function generates a particular trapezoidal wave function. The wave starts
* at 0 and linearly increases to the amplitude of the wave in 1/6 the period. It
* stays at the amplitude for 1/3 the period, then decreases linearly to 0 in 1/6
* the period where it stays at 0 for the remaind period of 1/3.
*
* t - shifts the wave forwards or backwards (TODO: shifted too far right causes
* a bug where the waveform doesn't appear when it should)
* a - is the amplitude of the wave
* λ - is the period of the wave
*/
export declare function trapezoidalWave(t: number, a?: number, λ?: number): (x: number) => number;
