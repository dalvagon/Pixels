let img;
let particles = [];
let WORKER_COUNT = 2000;

function preload() {
  img = loadImage("nature.jpg");
}

function setup() {
  createCanvas(img.width * 2, img.height);
  background(0);
  image(img, 0, 0);
  translate(img.width, 0);
  // filter(GRAY);

  for (let i = 0; i < WORKER_COUNT; i++) {
    particles.push(new Particle(random(img.width), random(img.height)));
  }
  img.loadPixels();
}

function draw() {
  translate(img.width, 0);

  for (let particle of particles) {
    let c = get(particle.position.x, particle.position.y);
    let r = red(c);
    let g = green(c);
    let b = blue(c);
    let f = p5.Vector.fromAngle(
      (particle.position.x * r * 0.0001 +
        particle.position.y * g * 0.0001 +
        frameCount * b * 0.0001) *
        TWO_PI *
        2,
      5
    );
    particle.addForce(f);
    // particle.update();
    particle.display(c);
  }
}
