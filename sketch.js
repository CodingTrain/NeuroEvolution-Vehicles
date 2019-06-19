// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
// https://youtu.be/TOEi6T2mtHo

// 2D Ray Casting
// https://editor.p5js.org/codingtrain/sketches/Nqsq3DFv-

const TOTAL = 100;
const MUTATION_RATE = 0.1;
const LIFESPAN = 25;
const SIGHT = 50;

const TRACK_CHECKPOINT_AMOUNT = 60;

let generationCount = 0;

let walls = [];
let ray;

let population = [];
let savedParticles = [];

let start, end;

let speedSlider;

let inside = [];
let outside = [];
let checkpoints = [];

// around 5-6 successfully completed rounds will make the fitness of 500+
// so maxFitness is set to 500
// thus the changeMap will flag becomes true and we will create new map
// when any of the particle completes multiple rounds in current map
// this will help to make the current generation to work on new map
// and generalize to variety of maps
const maxFitness = TRACK_CHECKPOINT_AMOUNT * 5;
let changeMap = false;



function setup() {
  createCanvas(1200, 800);

  tf.setBackend('cpu');
  buildTrack(TRACK_CHECKPOINT_AMOUNT);
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

  let bestP = population[0];
  for (let n = 0; n < cycles; n++) {
    for (let particle of population) {
      particle.look(walls);
      particle.check(checkpoints);
      particle.bounds();
      particle.update();
      particle.show();

      // Get the best one
      if (particle.fitness > bestP.fitness) {
        bestP = particle;
      }
    }

    for (let i = population.length - 1; i >= 0; i--) {
      const particle = population[i];
      if (particle.dead || particle.finished) {
        savedParticles.push(population.splice(i, 1)[0]);
      }

      if (!changeMap && particle.fitness > maxFitness) {
        changeMap = true;
      }
    }

    if (population.length !== 0 && changeMap) {
      for (let i = population.length - 1; i >= 0; i--) {
        savedParticles.push(population.splice(i, 1)[0]);
      }

      buildTrack(TRACK_CHECKPOINT_AMOUNT);
      nextGeneration();
      generationCount++;
      changeMap = false;
    }

    if (population.length == 0) {
      buildTrack(TRACK_CHECKPOINT_AMOUNT);
      nextGeneration();
      generationCount++;
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

  bestP.highlight();

  fill(255);
  textSize(24);
  noStroke();
  text('generation ' + generationCount, 10, 50);

  // ellipse(start.x, start.y, 10);
  // ellipse(end.x, end.y, 10);
}
