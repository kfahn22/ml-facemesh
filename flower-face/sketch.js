let video;
let faceMesh;
let faces = [];
let midpoints = [];
let triangles;
let uvCoords;
let img;
let c;

// let palette = [
//   [204, 81, 249, 150],
//   [120, 67, 175, 150],
//   [177, 33, 230, 150],
//   [168, 60, 231, 150],
//   [193, 72, 239, 150],
//   [138, 5, 169, 150],
//   [98, 0, 39, 150],
// ];

let palette = [
  [235, 182, 147],
  [233, 205, 194],
  [235, 188, 193],
  [223, 133, 113],
  [207, 116, 102],
  [208, 133, 127],
];

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
  img = loadImage("chrys_center.png");
}

function mousePressed() {
  console.log(faces);
}

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
  background(0);
  orbitControl();
  translate(-width / 2, -height / 2);

  //image(video, 0, 0);
  let oval;
  if (faces.length > 0) {
    let face = faces[0];
    oval = face.faceOval;
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

    let n = oval.keypoints.length;
    for (let i = 0; i < n-1; i += 2) {
      let k = oval.keypoints[i];

      let angle = -90 + (i * 360) / n;

      if (i % 3 == 0) {
        c = palette[0];
      } else if (i % 3 == 1) {
        c = palette[1];
      } else if (i % 3 == 2) {
        c = palette[2];
      }
      noStroke();

      c[3] = 150;
      fill(c);
      petal(k.x, k.y, 20, 6, 3, 0, 0, angle);

      if (i % 3 == 0) {
        c = palette[3];
      } else if (i % 3 == 1) {
        c = palette[4];
      } else if (i % 3 == 2) {
        c = palette[5];
      }
      c[3] = 200;
      fill(c);
      noStroke();
      petal(k.x, k.y, 19, 5, 2, 0, 0, angle);
    }

    for (let i = 1; i < n - 1; i += 2) {
      let k = oval.keypoints[i];

      let angle = -90 + (i * 360) / n;

      if (i % 3 == 0) {
        c = palette[0];
      } else if (i % 3 == 1) {
        c = palette[1];
      } else if (i % 3 == 2) {
        c = palette[2];
      }
      noStroke();
      c[3] = 150;
      fill(c);
      petal(k.x, k.y, 19.5, 6, 3, 0, 0, angle);
      if (i % 3 == 0) {
        c = palette[0];
      } else if (i % 3 == 1) {
        c = palette[1];
      } else if (i % 3 == 2) {
        c = palette[2];
      }

      c[3] = 200;
      fill(c);
      petal(k.x, k.y, 18, 5, 2, 0, 0, angle);
    }
  }
}

function petal(x, y, r, a, b, c, d, angle) {
  push();
  translate(x, y);
  rotate(radians(angle));
  let adj = radians(d);
  beginShape();
  for (let theta = adj; theta < PI - adj; theta += 0.01) {
    let x = r * a * sin(theta) - c;
    let y = r * b * sin(theta) * cos(theta);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function mousePressed() {
  save("flower.jpg");
}
