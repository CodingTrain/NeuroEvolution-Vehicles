// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
// https://youtu.be/TOEi6T2mtHo

// 2D Ray Casting
// https://editor.p5js.org/codingtrain/sketches/Nqsq3DFv-

const TOTAL = 100;
const MUTATION_RATE = 0.05;
const LIFESPAN = 50;
const SIGHT = 50;

let walls = [];
let ray;

let population = [];
let savedParticles = [];

let start, end;

let speedSlider;

let inside = [];
let outside = [];
let checkpoints = [];

function buildTrack() {
  checkpoints = [];
  inside = [];
  outside = [];

  let noiseMax = 5;
  const total = 100;
  const pathWidth = 30;
  let startX = random(1000);
  let startY = random(1000);
  for (let i = 0; i < total; i++) {
    let a = map(i, 0, total, 0, TWO_PI);
    let xoff = map(cos(a), -1, 1, 0, noiseMax) + startX;
    let yoff = map(sin(a), -1, 1, 0, noiseMax) + startY;
    let xr = map(noise(xoff, yoff), 0, 1, 100, width * 0.6);
    let yr = map(noise(xoff, yoff), 0, 1, 100, height * 0.6);
    let x1 = width / 2 + (xr - pathWidth) * cos(a);
    let y1 = height / 2 + (yr - pathWidth) * sin(a);
    let x2 = width / 2 + (xr + pathWidth) * cos(a);
    let y2 = height / 2 + (yr + pathWidth) * sin(a);
    checkpoints.push(new Boundary(x1, y1, x2, y2));
    inside.push(createVector(x1, y1));
    outside.push(createVector(x2, y2));
  }
  walls = [];
  for (let i = 0; i < checkpoints.length; i++) {
    let a1 = inside[i];
    let b1 = inside[(i + 1) % checkpoints.length];
    walls.push(new Boundary(a1.x, a1.y, b1.x, b1.y));
    let a2 = outside[i];
    let b2 = outside[(i + 1) % checkpoints.length];
    walls.push(new Boundary(a2.x, a2.y, b2.x, b2.y));
  }

  start = checkpoints[0].midpoint();
  end = checkpoints[checkpoints.length - 1].midpoint();
}

function setup() {
  createCanvas(1200, 800);

  tf.setBackend('cpu');
  buildTrack();
  // let a = inside[inside.length - 1];
  // let b = outside[outside.length - 1];
  // walls.push(new Boundary(a.x, a.y, b.x, b.y));

  for (let i = 0; i < TOTAL; i++) {
    population[i] = new Particle();
  }

  speedSlider = createSlider(1, 10, 1);
}

function draw() {
  const cycles = speedSlider.value();
  background(0);

  for (let n = 0; n < cycles; n++) {
    for (let particle of population) {
      particle.look(walls);
      particle.check(checkpoints);
      particle.bounds();
      particle.update();
      particle.show();
    }

    for (let i = population.length - 1; i >= 0; i--) {
      const particle = population[i];
      if (particle.dead || particle.finished) {
        savedParticles.push(population.splice(i, 1)[0]);
      }
    }

    if (population.length == 0) {
      buildTrack();
      nextGeneration();
    }
  }

  for (let cp of checkpoints) {
    //strokeWeight(2);
    //cp.show();
  }
  for (let wall of walls) {
    wall.show();
  }
  for (let particle of population) {
    particle.show();
  }

  // ellipse(start.x, start.y, 10);
  // ellipse(end.x, end.y, 10);
}
