#version 300 es

precision mediump float;

in vec2 pos;
out vec4 color;

uniform sampler2D u_tex;
uniform vec2 aspect;
uniform float t;
uniform vec2 center;

const float maxRadius = 0.15;

// Spherical function modified from Daniel Shiffman
vec2 Spherical( vec2 pos) 
{
   float r = sqrt(pos.x*pos.x + pos.y*pos.y);
   float theta = atan(pos.y, pos.x);
   vec2 w = vec2(r, theta);
   return w;
}

// The craniod function renders a rough approximation of a human head so I am using that to create the effect, although any shape could be used.
float craniodR(float theta, float a, float b, float m, float p, float s) {
   return
        a * sin(theta) +
        b * sqrt(1.0 - p * pow(cos(theta), 2.0)) +
        m * sqrt(1.0 - s * pow(cos(theta), 2.0)); 
}

// https://mathworld.wolfram.com/Cranioid.html
// https://mathworld.wolfram.com/Cranioid.html
float CraniodSDF(vec2 uv, vec2 radius) {
    vec2 q;
    float p = 0.75;
    float s = 0.75;
    float a = 0.65;
    float b = 2.15;
    float m = 0.0;
    float d = Spherical(uv).x;
    float theta = Spherical(uv).y;
    float r = craniodR(theta, a, b, m, p, s);
        
    q.x = radius.x * r * cos(theta);
    q.y = radius.y * r * sin(theta);
  
   return d -= length(q); 
}

// Showwave functions from Barney Codes
// https://www.youtube.com/watch?v=ZcRptHYY3zM

float getOffsetStrength(float t, vec2 dir) {
  float d = CraniodSDF(dir/aspect, vec2(t * maxRadius));
  d *= 1. - smoothstep(0., 0.05, abs(d)); // Mask the ripple
  d *= smoothstep(0., 0.05, t); // Smooth intro
  d *= 1. - smoothstep(0.5, 1., t); // Smooth outro
  return d;
}

vec2 shockwaveDirection(vec2 center, vec2 pos) {
  vec2 dir = center - pos;
  return normalize(dir);
}

float shockwave(vec2 dir, float t, float maxRadius) {
  float d = CraniodSDF(dir/aspect, vec2(0.5)) - t * maxRadius;
  //float d = length(dir/aspect) - t * maxRadius;
  d *= 1. - smoothstep(0., 0.05, abs(d)); // Smooth the ripple
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
  // 0. Normal sampling
  color = texture(u_tex, pos);
  
  // 2. Shockwave
 // vec2 center = vec2(0.5);
 //  vec2 dir = center - pos;
 //   float d = CraniodSDF(dir/aspect, vec2(t * maxRadius));
 //  d *= 1. - smoothstep(0., 0.075, abs(d)); // Smooth the ripple
 //  dir = normalize(dir);
 //  color = texture(u_tex, pos + dir * d);
  
  // 3. Animation
   vec2 dir = center - pos;
  float d = getOffsetStrength(t, dir);
   dir = normalize(dir);
  color = texture(u_tex, pos + dir * d);
}