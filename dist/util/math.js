/**
* Returns the next prime number after the given integer.
*/
export function nextPrime(n) {
    if (!Number.isInteger(n)) {
        throw Error('Please pass an integer as a parameter');
    }
    // Search for the next prime until it is found
    while (!isPrime(++n)) {
    }
    return n;
}
/**
* Returns true if the number is prime, false otherwise.
*/
export function isPrime(n) {
    if (!Number.isInteger(n) || n <= 1) {
        return false;
    }
    // Check if any of the numbers, up to the square root of the number, evenly
    // divide the number
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}
/**
* Returns the point where two lines intersect. The first line is defined by the
* points p1 and p2. The second line is defined by the points p3 and p4.
*/
export function PointWhereTwoLinesIntersect(p1, p2, p3, p4) {
    let slope1 = (p2.y - p1.y) / (p2.x - p1.x);
    let slope2 = (p4.y - p3.y) / (p4.x - p3.x);
    let b1 = (p2.y - p2.x * slope1);
    let b2 = (p4.y - p4.x * slope2);
    let x = (b2 - b1) / (slope1 - slope2);
    let y;
    if (!isFinite(slope1)) {
        x = p1.x;
        y = p3.y + slope2 * (x - p3.x);
    }
    else if (!isFinite(slope2)) {
        x = p3.x;
        y = p1.y + slope1 * (x - p1.x);
    }
    else {
        y = p1.y + slope1 * (x - p1.x);
    }
    return { x: x, y: y };
}
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
export function trapezoidalWave(t, a = 1, λ = 1) {
    return (x) => {
        x = Math.abs(x);
        // normalize x to always be in the range from 0 to λ
        x = (x - t) % λ;
        if (x < 0) {
            return 0;
        }
        else if (x < λ * 1 / 6) {
            return a * 6 * x / λ;
        }
        else if (x <= λ * 1 / 2) {
            return a;
        }
        else if (x < λ * 2 / 3) {
            return a * 4 - a * 6 * x / λ;
        }
        else {
            return 0;
        }
    };
}
//# sourceMappingURL=math.js.map