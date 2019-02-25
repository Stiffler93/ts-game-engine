export class Point {

  constructor(public x: number, public y: number) {
  }

  public add(x: number, y: number) {
    this.x += x;
    this.y += y;
  }
}
