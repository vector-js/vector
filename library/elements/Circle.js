import Ellipse from './Ellipse.js';
export default class Circle extends Ellipse {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(cx, cy, r) {
        super(cx, cy, r, r);
    }
    /**
    * Sets the value of the radius of this circle.
    */
    set r(value) {
        this.rx = value;
        this.rx = value;
    }
    /**
    * Returns the radius of this circle.
    */
    get r() {
        return this.rx;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2lyY2xlLmpzIiwic291cmNlUm9vdCI6Ii4vc291cmNlLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvQ2lyY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLGNBQWMsQ0FBQztBQUduQyxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxPQUFPO0lBSTFDOztNQUVFO0lBQ0YsWUFBYSxFQUFTLEVBQUUsRUFBUyxFQUFFLENBQVE7UUFDekMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUksQ0FBQyxDQUFFLEtBQVk7UUFDakIsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDaEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDbEIsQ0FBQztJQUVEOztNQUVFO0lBQ0YsSUFBSSxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFbGxpcHNlIGZyb20gJy4vRWxsaXBzZS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2lyY2xlIGV4dGVuZHMgRWxsaXBzZSB7XG5cbiByb290OiBTVkdFbGxpcHNlRWxlbWVudDtcblxuIC8qKlxuICogQ29uc3RydWN0cyBhIHJlY3RhbmdsZSBlbGVtZW50IGF0IHRoZSBwb3NpdGlvbiAoeCx5KVxuICovXG4gY29uc3RydWN0b3IoIGN4Om51bWJlciwgY3k6bnVtYmVyLCByOm51bWJlciApIHtcbiAgIHN1cGVyKGN4LCBjeSwgciwgcik7XG4gfVxuXG4gLyoqXG4gKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGUgcmFkaXVzIG9mIHRoaXMgY2lyY2xlLlxuICovXG4gc2V0IHIoIHZhbHVlOm51bWJlciApIHtcbiAgIHRoaXMucnggPSB2YWx1ZTtcbiAgIHRoaXMucnggPSB2YWx1ZTtcbiB9XG5cbiAvKipcbiAqIFJldHVybnMgdGhlIHJhZGl1cyBvZiB0aGlzIGNpcmNsZS5cbiAqL1xuIGdldCByKCk6bnVtYmVyIHtcbiAgIHJldHVybiB0aGlzLnJ4O1xuIH1cbn1cbiJdfQ==