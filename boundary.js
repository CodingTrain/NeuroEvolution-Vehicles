// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
// https://youtu.be/TOEi6T2mtHo

// 2D Ray Casting
// https://editor.p5js.org/codingtrain/sketches/Nqsq3DFv-

/**
 * @tutorial https://www.npmjs.com/package/@types/p5
 * @description run npm i @types/p5
 */

/// <reference path="../node_modules/@types/p5/index.d.ts" />
/// <reference path="../node_modules/@types/p5/global.d.ts" />

/// <reference path="./type/p5.d.ts" /> 

class Boundary {
  constructor(x1, y1, x2, y2) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
  }

  midpoint() {
    return createVector((this.a.x + this.b.x) * 0.5, (this.a.y + this.b.y) * 0.5);
  }

  show() {
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
