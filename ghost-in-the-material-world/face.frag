#version 300 es

precision mediump float;

in vec2 pos;
out vec4 color;

uniform sampler2D u_tex;
uniform vec2 aspect;
uniform float t;
uniform vec2 center;
const float maxRadius = 0.1;

// Spherical function modified from Daniel Shiffman
vec2 Spherical(vec2 pos) 
{
   float r = sqrt(pos.x*pos.x + pos.y*pos.y);
   float theta = atan(pos.y, pos.x);
   vec2 w = vec2(r, theta);
   return w;
}

// The craniod function renders a rough approximation of a human head so I am using that to create the ghost effect, although any shape could be used.
// https://mathworld.wolfram.com/Cranioid.html
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

// Shockwave function from Barney Codes
// https://www.youtube.com/watch?v=ZcRptHYY3zM
float shockwave(vec2 dir, float t) {
  float d = CraniodSDF(dir/aspect, vec2(t * maxRadius));
  d *= 1. - 0.9 * smoothstep(0., 0.05, abs(d)); // Mask the ripple
  d *= smoothstep(0., 0.05, t); // Smooth intro
  d *= 1. - smoothstep(0.5, 1., t); // Smooth outro
  return d;
}

// Frag file uses new syntax
// Need to adjust coordinate system
// Previous:
// vec2 uv = (gl_FragCoord.xy - 0.5*u_resolution.xy)/u_resolution.y;
// New: 
// vec2 center = vec2(0.5);
// vec2 dir = center - pos;
// vec2 pos = dir/aspect;

// In this case, center is defined as the center of FaceMesh bounding box and is a uniform we are getting from the p5.sketch 

void main() {
  color = texture(u_tex, pos);
  vec2 dir = center - pos;
  
  // Add shockwave
  float d = shockwave(dir, t);
  dir = normalize(dir);

  //color replaces gl_FragColor;
  color = texture(u_tex, pos + dir * d);
}