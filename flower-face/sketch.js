let video;
let faceMesh;
let faces = [];
let midpoints = [];
//let petals = [];
let triangles;
let uvCoords;
let img, mums;
let c;

let palette = [
  [255, 218, 31, 200],
  [255, 199, 31, 200],
  [255, 180, 31, 200],
  [255, 162, 31, 200],
  [255, 143, 31, 200],
];

let flowerPalette = [
  [229, 223, 75, 200],
  [228, 287, 162, 200],
  [217, 214, 159, 200],
  [209, 202, 42, 200],
  [215, 213, 154, 200],
  [206, 206, 105, 200],
];

let purplePalette = [
  [204, 81, 249, 150],
  [120, 67, 175, 150],
  [177, 33, 230, 150],
  [168, 60, 231, 150],
  [193, 72, 239, 150],
  [138, 5, 169, 150],
  [98, 0, 39, 150],
];

let pinkPalette = [
  [235, 182, 147],
  [233, 205, 194],
  [235, 188, 193],
  [223, 133, 113],
  [207, 116, 102],
  [208, 133, 127],
];

let silhouette = [
  10, // top
  338,
  297,
  332,
  284,
  251,
  389,
  356,
  454,
  323, // midright
  361,
  288,
  397,
  365,
  379,
  378,
  400,
  377,
  152, // bottom
  148,
  176,
  149,
  150,
  136,
  172,
  58,
  132,
  93,
  234, // midleft
  127,
  162,
  21,
  54,
  103,
  67,
  109,
];

let innerSilhouette = [
  151,
  337,
  299,
  333,
  298,
  301,
  368,
  264,
  447,
  366, // midright
  401,
  435,
  367,
  364,
  394,
  395,
  369,
  396,
  175,
  171,
  140,
  170,
  169,
  135,
  138,
  215,
  177,
  137,
  227,
  34,
  139,
  71,
  68,
  104,
  69,
  108,
];

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
  img = loadImage("chrys_center.png");
  // mums = loadImage("mums.jpg");
  // petal = loadImage("petal.jpg");
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
  //image(mums, -width/2, -height/2)
  orbitControl();
  translate(-width / 2, -height / 2);

  //image(video, 0, 0);

  if (faces.length > 0) {
    let face = faces[0];

    //         let n = silhouette.length;
    //         for (let i = 0; i < n; i+=2) {
    //           let index = silhouette[i];
    //           let k = face.keypoints[index];

    //           let angle = -90 + (i * 360) / n;
    //           if (i % 3 == 0) {
    //             c = pinkPalette[0];
    //           } else if (i % 4 == 1) {
    //              c = pinkPalette[1];
    //           } else if (i % 4 == 2) {
    //              c = pinkPalette[2];
    //           }
    //           noStroke();
    //           // stroke(255,115, 132, 220);
    //           // strokeWeight(2)
    //           c[3] = 150;
    //           fill(c);
    //           petal(k.x, k.y, 20, 6, 3, 22, 0, angle);
    //          // petal(k.x, k.y, 10, 6, 3, 22, 0, angle);
    //            if (i % 3 == 0) {
    //             c = pinkPalette[3];
    //           } else if (i % 4 == 1) {
    //              c = pinkPalette[4];
    //           } else if (i % 4 == 2) {
    //              c = pinkPalette[5];
    //           }
    //           c[3]= 200;
    //           fill(c)
    //           noStroke()
    //           //petal(k.x, k.y, 9, 5, 2, 15, 0, angle);
    //          petal(k.x, k.y, 19, 5, 2, 15, 0, angle);
    //         }

    //          for (let i = 1; i < n; i+= 2) {
    //           let index = silhouette[i];
    //           let k = face.keypoints[index];

    //           let angle = -90 + (i * 360) / n;

    //           if (i % 3 == 0) {
    //             c = pinkPalette[0];
    //           } else if (i % 4 == 1) {
    //              c = pinkPalette[1];
    //           } else if (i % 4 == 2) {
    //              c = pinkPalette[2];
    //           }
    //           noStroke();
    //           c[3] = 150;
    //           fill(c);
    //          petal(k.x, k.y, 19.5, 6, 3, 20, 0, angle);
    //            if (i % 3 == 0) {
    //             c = pinkPalette[3];
    //           } else if (i % 4 == 1) {
    //              c = pinkPalette[4];
    //           } else if (i % 4 == 2) {
    //              c = pinkPalette[5];
    //           }

    //           c[3]=  200;
    //           fill(c)
    //        petal(k.x, k.y, 18, 5, 2, 15, 0, angle);
    //         }

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
    

    let n = silhouette.length;
    for (let i = 0; i < n; i += 2) {
      let index = silhouette[i];
      let k = face.keypoints[index];

      let angle = -90 + (i * 360) / n;
      // if (i % 3 == 0) {
      //   c = purplePalette[0];
      // } else if (i % 4 == 1) {
      //   c = purplePalette[1];
      // } else if (i % 4 == 2) {
      //   c = purplePalette[2];
      // }
      if (i % 3 == 0) {
        c = pinkPalette[0];
      } else if (i % 3 == 1) {
        c = pinkPalette[1];
      } else if (i % 3 == 2) {
        c = pinkPalette[2];
      }
      noStroke();
      // stroke(255,115, 132, 220);
      // strokeWeight(2)
      c[3] = 150;
      fill(c);
      petal(k.x, k.y, 20, 6, 3, 0, 0, angle);
      // petal(k.x, k.y, 10, 6, 3, 22, 0, angle);

      if (i % 3 == 0) {
        c = pinkPalette[3];
      } else if (i % 3 == 1) {
        c = pinkPalette[4];
      } else if (i % 3 == 2) {
        c = pinkPalette[5];
      }
      //  if (i % 3 == 0) {
      //   c = purplePalette[3];
      // } else if (i % 4 == 1) {
      //   c = purplekPalette[4];
      // } else if (i % 4 == 2) {
      //   c = purplePalette[5];
      // }
      c[3] = 200;
      fill(c);
      noStroke();
      //petal(k.x, k.y, 9, 5, 2, 15, 0, angle);
      petal(k.x, k.y, 19, 5, 2, 0, 0, angle);
    }

    for (let i = 1; i < n; i += 2) {
      let index = silhouette[i];
      let k = face.keypoints[index];

      let angle = -90 + (i * 360) / n;

      c = assignColor(pinkPalette, i)
      // if (i % 3 == 0) {
      //   c = pinkPalette[0];
      // } else if (i % 3 == 1) {
      //   c = pinkPalette[1];
      // } else if (i % 3 == 2) {
      //   c = pinkPalette[2];
      // }
      // if (i % 3 == 0) {
      //   c = purplePalette[0];
      // } else if (i % 4 == 1) {
      //   c = purplePalette[1];
      // } else if (i % 4 == 2) {
      //   c = purplePalette[2];
      // }
      noStroke();
      c[3] = 150;
      fill(c);
      petal(k.x, k.y, 19.5, 6, 3, 0, 0, angle);
      if (i % 3 == 0) {
        c = pinkPalette[0];
      } else if (i % 3 == 1) {
        c = pinkPalette[1];
      } else if (i % 3 == 2) {
        c = pinkPalette[2];
      }
      // if (i % 3 == 0) {
      //   c = purplePalette[3];
      // } else if (i % 4 == 1) {
      //   c = purplePalette[4];
      // } else if (i % 4 == 2) {
      //   c = purplePalette[5];
      // }

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

function assignColor(palette, i) {
  let c;
  //let index = 0;
  c = palette[i % palette.length];
// if (i % 3 == 0) {
//   c = palette[0];
// } else if (i % 3 == 1) {
//   c = palette[1];
// } else if (i % 3 == 2) {
//   c = palette[2];
// }
//index += 1;
}

// // https://mathcurve.com/courbes2d.gb/bouche/bouche.shtml
//   kissCurve() {
//     for (let theta = 0; theta < TWO_PI; theta += 0.05) {
//       let x = this.a * this.r * cos(theta);
//       let y = this.b * this.r * pow(sin(theta), 3);
//       this.points.push(createVector(x, y));
//     }
//   }
// function flowerPetal(x, y, r, a, b, c, d, angle) {
//    push();
//   translate(x, y);
//   rotate(radians(angle));
//   let adj = radians(d);
//   beginShape();
//   for (let theta = 0; theta < TWO_PI; theta += 0.01) {
//     let x = r * 1.3 * cos(theta) - c;
//     let y = r * 0.6 * pow(sin(theta), 3);
//     vertex(x, y);
//   }
//   let r1 = r + 5;
//   endShape(CLOSE);
//   beginShape();
//   for (let theta = 0; theta < PI; theta += 0.01) {
//     let x = r1 * 1.4 * cos(theta) - c;
//     let y = r1 * 0.8 * pow(sin(theta), 3);
//     vertex(x, y);
//   }
//   endShape(CLOSE);
//   pop();
// }

// function innerPetal(x, y, r, a, b, c, d, angle) {
//    push();
//   translate(x, y);
//   rotate(radians(angle));
//   let adj = radians(d);
//   beginShape();
//   for (let theta = adj; theta < PI-adj; theta += 0.01) {
//     let x = r * 1.3 * cos(theta) - c;
//     let y = r * 0.6 * pow(sin(theta), 3);
//     vertex(x, y);
//   }
//   endShape(CLOSE);
//   pop();
// }
