let kMax;
let step;
let n = 300; // number of blobs
let radius = 10; // diameter of the circle
let inter = 0.1; // difference between the sizes of two blobs
let maxNoise = 1000;
let noiseProg = (x) => (x * x);
let newred = 255;
let newblue = 80;
let newgreen = 180;
let cnv;

function setup() {

	socket = io.connect('https://imaginaryuniverse.herokuapp.com/');
	socket.on('number', newOperated);
	cnv = createCanvas(windowWidth, windowHeight);	
  	colorMode(RGB);
  	angleMode(DEGREES);
  	noFill();
  	noLoop();
  	kMax = random(0.5, 1);
  	step = 0.01;
	save(cnv, '/Users/midori/workplace/imargnaryuniverse/server/test.jpg');
}

function newOperated(data) {
	randomSeed(data.value);
    newred = random(0, 255);
	newblue = random(0, 255);
	newgreen = random(0, 255);
	console.log(data.value);
	kMax = random(0.5, 1);
	draw();
	save(cnv, './test.jpg');
}

function draw() {

	background(0)
    for (let i = 0; i < n; i++) {
	
	stroke(noise(4*i)*newred, noise(2*i)*newblue, noise(3*i)*newgreen);
	
	let size = radius + i * inter;
	let k = kMax * sqrt(i / n);
	let noisiness = maxNoise * noiseProg(i / n);
	    beginShape();
	let angleStep = 0.25;
	blob(size, width / 2, height / 2, k, i * step, noisiness);
	
	}
}

function blob(size, xCenter, yCenter, k, t, noisiness) {

    beginShape();
    let angleStep = 0.25;
    for (let theta = 0; theta < 360; theta += angleStep) {
	let r1, r2;
	
	r1 = cos(theta) + 1;
	r2 = sin(theta) + 1;
	let r = size + noise(k * r1, k * r2, t) * noisiness;
	let x = xCenter + r * cos(theta);
	let y = yCenter + r * sin(theta);
	curveVertex(x, y);
  }
    endShape(CLOSE);
}

