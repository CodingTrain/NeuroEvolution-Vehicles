/// <reference path="./sketch.js" />
/// <reference path="./boundary.js" />
/**
 * @param {number} checkpointAmount 
 */
function buildTrack(checkpointAmount) {
    checkpoints = [];
    inside = [];
    outside = [];

    let noiseMax = 4;
    const total = checkpointAmount;
    const pathWidth = 60;
    let startX = random(1000);
    let startY = random(1000);
    for (let i = 0; i < total; i++) {
        let a = map(i, 0, total, 0, TWO_PI);
        let xoff = map(cos(a), -1, 1, 0, noiseMax) + startX;
        let yoff = map(sin(a), -1, 1, 0, noiseMax) + startY;
        let xr = map(noise(xoff, yoff), 0, 1, 100, width * 0.5);
        let yr = map(noise(xoff, yoff), 0, 1, 100, height * 0.5);
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