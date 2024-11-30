# ml5 FaceMesh Model

Daniel Shiffman recented released a [tutorial](https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/facemesh) about the ml5 FaceMesh model. While it is possible to use the FaceMesh model in ways that are inappropriate or unethical, I have used it to create some (very) silly visual effects.

## Ghost in the Material World

The first effect adapts some clever shader code from [Barney Codes](https://www.youtube.com/watch?v=ZcRptHYY3zM) to create a shockwave effect centered around the bounding box for the face. 

First, we need to calculate the (centerX, centerY) to pass to the frag file. I have to confess that this was the hardest part. Adding the midpoint of the box width and height to (box.xMax, boxyMax) seems counter-intuitive (at least to me), but my guess is that is necessary because the video is flipped.

```JavaScript
let centerX = box.xMax + box.width / 2;
let centerY = box.yMax + box.height / 2;
```

We then use an adapted function from Barney Codes to update the "center" sent to the frag file in draw.

```JavaScript
function setCenter(offsetX, offsetY) {
  faceShader.setUniform("center", [offsetX / width, offsetY / height]);
}
```

Although this is certainly not necessary, I am using the [Craniod](https://mathworld.wolfram.com/Cranioid.html) function to create the "ghost" head.  

```GLSL
vec2 Spherical(vec2 pos) 
{
   float r = sqrt(pos.x*pos.x + pos.y*pos.y);
   float theta = atan(pos.y, pos.x);
   vec2 w = vec2(r, theta);
   return w;
}
float CraniodSDF(vec2 pos, vec2 radius) {
    vec2 q;
    float d = Spherical(pos).x;
    float theta = Spherical(pos).y;
    float r = 0.65 * sin(theta) +
        2.15 * sqrt(1.0 - 0.75 * pow(cos(theta), 2.0));   
        
    q.x = radius.x * r * cos(theta);
    q.y = radius.y * r * sin(theta);
  
   return d -= length(q); 
}
```

We are then using the shockwave function from Barney Codes to create a "ghostly" shockwave.

```GLSL
float shockwave(vec2 dir, float t) {
  float d = CraniodSDF(dir/aspect, vec2(t * maxRadius));
  d *= 1. - 0.9 * smoothstep(0., 0.05, abs(d)); // Mask the ripple
  d *= smoothstep(0., 0.05, t); // Smooth intro
  d *= 1. - smoothstep(0.5, 1., t); // Smooth outro
  return d;
}
```

<p align="center"><img src="assets/faceMesh.jpg" alt="Ghosts in the material world" width="800px"></p>

## Pumpkin Face

<p align="center"><img src="assets/pumpkin.jpg" alt="Pumpkin Face" width="800px"></p>

## Flower Face

<p align="center"><img src="assets/flower.jpg" alt="Flower Face" width="800px"></p>
