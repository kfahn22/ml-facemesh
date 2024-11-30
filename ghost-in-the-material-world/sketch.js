// Base code from Daniel Shiffman's tutorial about the ml5 FaceMesh model
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/facemesh
// https://editor.p5js.org/kfahn/sketches/bmSF2Kcuv

let video;
let faceMesh;
let faces = [];
let faceShader;
let img;
let t = 0.15;

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
  faceShader = loadShader("face.vert", "face.frag");
  img = loadImage("at.jpg");
}

function gotFaces(results) {
  faces = results;
}

function setup() {
  createCanvas(800, 800, WEBGL);
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

    let centerX = box.xMax + box.width / 2;
    let centerY = box.yMax + box.height / 2;

    faceShader.setUniform("u_tex", img);
    faceShader.setUniform("t", pow(t, 1 / 1.5));
    faceShader.setUniform("aspect", [1, width / height]);
    setCenter(centerX, centerY);

    if (t < 1) {
      t += 0.005;
    } else {
      t = 0.15;
    }

    rect(0, 0, width, height);
  }
}

// Thanks to Barney Codes for this approach!!
// https://www.youtube.com/watch?v=ZcRptHYY3zM
function setCenter(cX, cY) {
  faceShader.setUniform("center", [cX / width, cY / height]);
}

function mousePressed() {
  save("faceMesh.jpg");
}
