// Base code from Daniel Shiffman's tutorial about the ml5 FaceMesh model
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/facemesh
// https://editor.p5js.org/kfahn/sketches/bmSF2Kcuv

let video;

let faceMesh;
let faces = [];
let offsetX = 0;
let offsetY = 0;
let faceShader;
let img;
let t = 0;
let rawOffsetX, rawOffsetY;

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
  faceShader = loadShader("face.vert", "face.frag");
  img = loadImage("at.jpg");
}

function gotFaces(results) {
  faces = results;
}

function setup() {
  createCanvas(400, 400, WEBGL);
  shader(faceShader);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  clear();

  if (faces.length > 0) {
    let face = faces[0];
    let box = face.box;
    //console.log(box)

    let rawOffsetX = box.xMin; //+ box.width / 2;
    let rawOffsetY = box.yMin + box.height / 2;

    faceShader.setUniform("u_tex", img);
    faceShader.setUniform("u_resolution", [width, height]);
    faceShader.setUniform("t", pow(t, 1 / 1.5));
    faceShader.setUniform("aspect", [1, width / height]);
    setCenter(rawOffsetX, rawOffsetY);

    if (t < 1) {
      t += 0.005;
    } else {
      t = 0;
    }

    rect(0, 0, width, height);
  }
}

// Thanks to Barney Codes for this approach!!
// https://www.youtube.com/watch?v=ZcRptHYY3zM
function setCenter(offsetX, offsetY) {
  faceShader.setUniform("center", [offsetX / width, offsetY / height]);
}

function mousePressed() {
  save("faceMesh.jpg");
}
