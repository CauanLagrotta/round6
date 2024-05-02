//configurando cena
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

//Renderizador
const renderer = new THREE.WebGLRenderer()
//Tamanho da tela que vai ser renderizada
renderer.setSize(window.innerWidth, window.innerHeight);

//linkando o renderizador
document.body.appendChild(renderer.domElement);

//declarando o cubo
const geometry = new THREE.BoxGeometry()
//declarando o material do cubo
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
//aplicando o material no cubo
const cube = new THREE.Mesh(geometry, material)

//adicionando o cubo na tela
scene.add(cube);

//configurar a profundidade da câmera
camera.position.z = 5;

function animate(){
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();