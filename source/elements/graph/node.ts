import Ellipse from '../svg/ellipse.js';
import Group from '../svg/group.js';
import Text from '../svg/text.js';
import Edge from './edge.js';

//Bostock had something about fitting text here, seems cool https://observablehq.com/@mbostock/fit-text-to-circle
/**
* A Node is a basic element with a position, radius, and text held within it.
*/
export default class Node extends Group {

  nodeName: Text;
  nodeEllipse: Ellipse;
  edges: Set<Edge>;
  private _cx:number;
  private _text:string;
  private _cy:number;
  private _rx:number;
  private _ry:number;

  /**
  * Constructs a Node element at the position (x,y) with radius r containing the string text
  */
  constructor( cx:number, cy:number, rx:number, ry:number, text:string ) {
   super();

   this._cx = cx;
   this._cy = cy;
   this._text = text;
   this._rx = rx;
   this._ry = ry;

   this.edges = new Set<Edge>();

   this.nodeName = new Text(cx, cy, text);
   this.nodeName.style.textAnchor = "middle";
   this.nodeName.root.setAttribute("alignment-baseline", "middle");
   this.nodeEllipse = new Ellipse(cx, cy, rx, ry);
   this.nodeEllipse.fill = '#f8f8f8';

   this.root.appendChild(this.nodeEllipse.root);
   this.root.appendChild(this.nodeName.root);
  }

  /**
  * Returns the number of edges coming out of this node.
  */
  edgeWeight(): number{
    return this.edges.size
  }

  /**
  * Translates this node and all inner elements by x, y.
  */
  translate(x:number, y:number){
    this.nodeEllipse.cx += x;
    this.nodeName.x += x;

    this._cx += x;

    this.nodeEllipse.cy += y;
    this.nodeName.y += y;

    this._cy += y;
  }

  /**
  * Getter for the cx of this node.
  */
  get cx(){
    return this._cx;
  }

  /**
  * Getter for cy of this node
  */
  get cy(){
    return this._cy;
  }

  /**
  * Getter for rx of this node
  */
  get rx(){
    return this._rx;
  }

  /**
  * Getter for ry of this node
  */
  get ry(){
    return this._ry;
  }

  /**
  * Getter for the text of this node
  */
  get label(){
    return this._text;
  }

  /**
  * Setter for the text of this node
  */
  set label(text:string){
    this.nodeName.contents = text
    this._text = text;
  }

  /**
  * Setter for rx of this node
  */
  set rx(rx:number){
    this._rx = rx;
    this.nodeEllipse.rx = rx;
  }

  /**
  * Setter for ry of this node
  */
  set ry(ry:number){
    this._rx = ry;
    this.nodeEllipse.rx = ry;
  }

  /**
  * Adds an edge to this node.
  */
  addEdge(edge:Edge):void {
    this.edges.add(edge);
  }
}
