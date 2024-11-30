let video;
let faceMesh;
let faces = [];
let triangles;
let uvCoords;
let img, stem;
let w = 50;

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
  img = loadImage("pumpkin_face-18.jpg");
  stem = loadImage("pumpkin-top.png");
}

// function mousePressed() {
//   console.log(faces);
// }

function gotFaces(results) {
  faces = results;
}

function setup() {
  createCanvas(600, 600, WEBGL);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  faceMesh.detectStart(video, gotFaces);
  triangles = faceMesh.getTriangles();
  uvCoords = faceMesh.getUVCoords();
  //console.log(uvCoords);
}

function draw() {
  orbitControl();
  translate(-width / 2, -height / 2);

  background(0);

  if (faces.length > 0) {
    let face = faces[0];

    let k = face.keypoints[10];
    push();
    translate(k.x - w / 2, k.y - w);
    image(stem, 0, 0, w, w);
    pop();

    texture(img);
    textureMode(NORMAL);
    noStroke();
    beginShape(TRIANGLES);
    for (let i = 0; i < triangles.length; i++) {
      let tri = triangles[i];
      let [a, b, c] = tri;
      let pointA = face.keypoints[a];
      let pointB = face.keypoints[b];
      let pointC = face.keypoints[c];
      let uvA = uvCoords[a];
      let uvB = uvCoords[b];
      let uvC = uvCoords[c];

      vertex(pointA.x, pointA.y, pointA.z, uvA[0], uvA[1]);
      vertex(pointB.x, pointB.y, pointB.z, uvB[0], uvB[1]);
      vertex(pointC.x, pointC.y, pointC.z, uvC[0], uvC[1]);
    }
    endShape();
  }
}

function mousePressed() {
  save("pumpkin.jpg");
}
