let img, map;
let mouth, eyes, nose;

function preload() {
  img = loadImage("FullSizeRender.jpeg");
  //map = loadImage("mesh_map.jpg");
}

function setup() {
  createCanvas(800, 800);

  mouth = bicorn(150);
  nose = quadrilateral(60, 3);
  eyes = quadrilateral(105, 3);
}

function draw() {
  background(img);
  //background(map)
  fill(0);

  // mouth
  push();
  translate(width / 2, height / 2 + 105);
  beginShape();
  for (p of mouth) {
    vertex(p.x, p.y);
  }
  endShape();
  pop();

  // nose
  push();
  translate(width / 2, height / 2 + 55);
  rotate(PI / 6);
  beginShape();
  for (p of nose) {
    vertex(p.x, p.y);
  }
  endShape();
  pop();

  // left eye
  push();
  translate(width / 2 - 100, height / 2 - 70);
  rotate(-PI / 6);
  beginShape();
  for (p of eyes) {
    vertex(p.x, p.y);
  }
  endShape();
  pop();

  // right eye
  push();
  translate(width / 2 + 100, height / 2 - 70);
  rotate(-PI / 6);
  beginShape();
  for (p of eyes) {
    vertex(p.x, p.y);
  }
  endShape();
  pop();
}

// https://mathcurve.com/courbes2d.gb/bicorne/bicorne.shtml
function bicorn(r) {
  let points = [];
  for (let theta = 0; theta < TWO_PI; theta += 0.05) {
    let x = r * sin(theta);
    let y = (r * pow(cos(theta), 2)) / (2.3 + cos(theta));
    points.push(createVector(x, y));
  }
  return points;
}

function quadrilateral(r, m) {
  let points = [];
  for (let theta = 0; theta < TWO_PI; theta += TWO_PI / m) {
    let x = r * cos(theta);
    let y = r * sin(theta);
    points.push(createVector(x, y));
  }
  return points;
}

function mousePressed() {
  save("pumpkin_face.jpg");
}
