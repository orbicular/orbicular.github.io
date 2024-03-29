const vshader = `
varying vec2 v_uv;
void main() {	
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
const fshader = `
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 v_uv;

float random (vec2 st) {
  float a = mix(1.0, 3.0, u_mouse.x/u_resolution.x);
  float b = mix(100000.0, 100000000.0, u_mouse.y/u_resolution.y);
  float c = mix(0.0, 1.0, u_mouse.y/u_resolution.y);
  return fract(cos(dot(st, vec2((a+u_time/5.0), (b+u_time/5.0)))) * (c+u_time/5.0) );
}

void main(){   
  vec3 color = random(v_uv)*vec3(1.0);
	gl_FragColor  = vec4(color, 1.0);
}
`






const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock();

const geometry = new THREE.PlaneGeometry(2, 2);
const uniforms = {
  u_color_a: { value: new THREE.Color(0xff0000) },
  u_color_b: { value: new THREE.Color(0x00ffff) },
  u_time: { value: 0.0 },
  u_mouse: { value: { x: 0.0, y: 0.0 } },
  u_resolution: { value: { x: 0, y: 0 } }
}

const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vshader,
  fragmentShader: fshader
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 1;

onWindowResize();
if ('ontouchstart' in window) {
  document.addEventListener('touchmove', move);
} else {
  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('mousemove', move);
}

function move(evt) {
  uniforms.u_mouse.value.x = (evt.touches) ? evt.touches[0].clientX : evt.clientX;
  uniforms.u_mouse.value.y = (evt.touches) ? evt.touches[0].clientY : evt.clientY;
}

document.getElementById("second").addEventListener("click", animate);

function onWindowResize(event) {
  const aspectRatio = window.innerWidth / window.innerHeight;
  let width, height;
  if (aspectRatio >= 1) {
    width = 1;
    height = (window.innerHeight / window.innerWidth) * width;

  } else {
    width = aspectRatio;
    height = 1;
  }
  camera.left = -width;
  camera.right = width;
  camera.top = height;
  camera.bottom = -height;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = window.innerWidth;
  uniforms.u_resolution.value.y = window.innerHeight;
}



var audio = new Audio('radionoise.mp3');
audio.loop = true;

function animate() {
  requestAnimationFrame(animate);
  uniforms.u_time.value += clock.getDelta();
  renderer.render(scene, camera);
  document.getElementById('second').innerHTML = clock.getElapsedTime();
  audio.play();
  //audio.volume = 1 - (Math.ceil(uniforms.u_mouse.value.y * 10 / uniforms.u_resolution.value.y) / 10);
  audio.volume = Math.floor(uniforms.u_mouse.value.y * 10 / uniforms.u_resolution.value.y) / 10;
  document.getElementById('second').style.textDecoration = 'none';

  console.log((1 - (Math.ceil(uniforms.u_mouse.value.x * 10 / uniforms.u_resolution.value.x) / 10)) * (Math.floor(uniforms.u_mouse.value.y * 10 / uniforms.u_resolution.value.y) / 10));
}


