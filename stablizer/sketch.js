// https://assets.editor.p5js.org/617057cf46b27800249b9fba/7a86516d-d5df-47d9-8563-4f36f2a0890a.png

let video;
let faceMesh;
let faces = [];
let offsetX = 0;
let offsetY = 0;

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
}

function gotFaces(results) {
  faces = results;
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  faceMesh.detectStart(video, gotFaces);
  //   triangles = faceMesh.getTriangles();
  //   uvCoords = faceMesh.getUVCoords();
}

function draw() {
  translate(-width / 2, -height / 2);
  background(0);

  if (faces.length > 0) {
    let face = faces[0];
    let box = face.box;

    let centerX = width / 2;
    let centerY = height / 2;

    let rawOffsetX = centerX - box.xMin - box.width / 2;
    let rawOffsetY = centerY - box.yMin - box.height / 2;

    offsetX = lerp(offsetX, rawOffsetX, 0.05);
    offsetY = lerp(offsetY, rawOffsetY, 0.05);

    translate(offsetX, offsetY);
    image(video, 0, 0);
  }
}
