import Point from '../elements/math/point.js';

/**
* Returns the next prime number after the given integer.
*/
export function nextPrime( n:number ) {
  if( !Number.isInteger(n)) {
    throw Error('Please pass an integer as a parameter');
  }

  // Search for the next prime until it is found
  while( !isPrime(++n)){
  }
  return n;
}

/**
* Returns true if the number is prime, false otherwise.
*/
export function isPrime( n:number) {
  if( !Number.isInteger(n) || n <= 1 ) {
    return false;
  }

  // Check if any of the numbers, up to the square root of the number, evenly
  // divide the number
  for( let i = 2; i <= Math.sqrt(n); i++ ) {
    if( n % i == 0 ) {
      return false;
    }
  }

  return true;
}

/**
* Returns the point where two lines intersect. The first line is defined by the
* points p1 and p2. The second line is defined by the points p3 and p4.
*/
export function PointWhereTwoLinesIntersect( p1:Point, p2:Point, p3:Point, p4:Point ) : Point {
  let slope1 = (p2.y - p1.y)/(p2.x - p1.x);
  let slope2 = (p4.y - p3.y)/(p4.x - p3.x);
  let b1 = (p2.y - p2.x*slope1);
  let b2 = (p4.y - p4.x*slope2);
  let x = (b2 - b1)/(slope1 - slope2);
  let y;
  if( !isFinite(slope1)) {
    x = p1.x;
    y = p3.y + slope2*(x - p3.x);
  } else if ( !isFinite(slope2)) {
    x = p3.x;
    y = p1.y + slope1*(x - p1.x);
  } else {
    y = p1.y + slope1*(x - p1.x);
  }
  return {x:x, y:y};
}

/**
*
*/
export function trapezoidalWave( ) {

}
