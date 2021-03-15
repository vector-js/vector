
/**
 * 
 */
export class Observable {

  constructor() {
  }

  /**
   * Subscribe to another observables data stream
   */
  subscribe( ...elements:Observable[] ) {
    throw new Error('Not Implemented')
  }

  /**
   * Returns the dependent listeners or "subscribers" of this observable.
   */
  subscribers() : Observable[] {
    throw new Error('Not Implemented')
  }

  /**
   * Start emitting the data stream
   */
  start() {

  }

  /**
   * 
   */
  next() {

  }

  /**
   * 
   */
  complete() {

  }

  error( message:string ) {

  }

  /**
   * 
   */
  static from( target:EventTarget, event:string ) : Observable {
    throw new Error('not implemented')
  }
}

class Range extends Observable {

  private _min:number
  private _max:number
  private _current:number

  constructor(min:number, max:number) {
    super()
    this._current = this._min
    if( Number.isInteger(min) && Number.isInteger(max)) {
      this.start()
    } else {
      this.error(`The min and max numbers provided must be integers. The numbers provided were:\nmin:${min}\nmax:${max}`)
    }
  }

  start() {
    return this._current = this._min
  }

  next() : number {
    ++this._current
    if( this._current === this._max ) {
      this.complete()
    } else {
      return ++this._current
    }
  }
}

class Num extends Observable {

  private x:number

  constructor( x:number ) {
    super()
  }
}

class Point {
  x: Num
  y: Num
}

class Circle extends Observable {

  private _cx: Num
  private _cy: Num
  private _radius: Num

  constructor(center:Point, ) {
    super()

  }
}

