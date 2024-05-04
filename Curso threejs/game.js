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

//instanciando o loader
const loader = new THREE.GLTFLoader();

//Carregando a árvore
loader.load('./tree/scene.gltf', (gltf) => {
   scene.add(gltf.scene)
   gltf.scene.scale.set(16, 16, 16)
  gltf.scene.position.set(0, -6, -12)
});

//classe player
//classe player
class player {
  constructor() {
    const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const player = new THREE.Mesh(geometry, material);
    scene.add(player);
    this.player = player;
    player.position.x = 3;
    player.position.y = 0;
    player.position.z = 0;

    this.playerInfo = {
      positionX: 6,
      velocity: 0
    };
  }

  anda() {
    this.playerInfo.velocity = 0.08;
  }

  update() {
    this.checa();
    this.playerInfo.positionX -= this.playerInfo.velocity;
    this.player.position.x = this.playerInfo.positionX;
  }

  para() {
    this.playerInfo.velocity = 0;
  }

  checa(){
    if(this.playerInfo.velocity > 0 && !tadecostas){
      text.innerText = "Você Perdeu!";
      gamestatus = "fimdejogo";
    }

    if(this.playerInfo.positionX < -6){
      text.innerText = "Você Venceu!";
      gamestatus = "fimdejogo";
  }
}
}
function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

//classe boneca
class boneca{
  constructor(){
    //carregando o modelo 3d da pasta model
    loader.load("./model/scene.gltf", (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.scale.set(0.4, 0.4, 0.4);
      gltf.scene.position.set(0, -1, -1);
      this.Boneca1 = gltf.scene;
    });
  }

  praTras(){
    gsap.to(this.Boneca1.rotation, {y: -3.15, duration: 1});
    setTimeout(() => tadecostas = true, 150)
  }

  praFrente(){
    gsap.to(this.Boneca1.rotation, {y: 0, duration: 1});
    setTimeout(() => tadecostas = false, 450)
  }

  async start(){
    this.praTras();
    await delay((Math.random() * 1000) + 1000);

    this.praFrente();
    await delay((Math.random() * 1000) + 1000);

    this.start();
  }
}

let Player1 = new player();
let Boneca1 = new boneca();
const text = document.querySelector(".text");
const tmaximo = 10;
let gamestatus = "esperando"
let tadecostas = true;

async function init(){
  await delay(500);
  text.innerText = "Começando em 3...";
  await delay(500);
  text.innerText = "Começando em 2...";
  await delay(500);
  text.innerText = "Começando em 1...";
  await delay(1000);
  text.innerText = "Vai!";
  startGame();
}

function startGame(){
  gamestatus = "jogando";
  Boneca1.start();
  setTimeout(()=> {
    if(gamestatus != "fimdejogo"){
      text.innerText = "Acabou o Tempo!";
      gamestatus = "fimdejogo";
    }
  }, tmaximo*1000)
}

init()

setTimeout(()=>{
  Boneca1.praTras}, 1000);  

//adicionando luz
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

renderer.setClearColor(0xffffff, 1);

//configurar a profundidade da câmera
camera.position.z = 5;

function animate(){
  if(gamestatus == "fimdejogo") return;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  Player1.update();
}

animate();

//capturando a resolução da tela
window.addEventListener("resize", onWindowResize, false)
  
//funcão para redimensionar a tela
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight // pega a resolução da tela
  camera.updateProjectionMatrix() 
  renderer.setSize(window.innerWidth, window.innerHeight)
}

//pressiona a tecla para andar
window.addEventListener("keydown", (event) => {
  if(gamestatus != "jogando") return;
  if (event.key === "ArrowLeft") {
    Player1.anda();
  }
  
})

//libera a tecla
window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    Player1.para();
  }
})