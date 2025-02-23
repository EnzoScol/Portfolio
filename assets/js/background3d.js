const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.body.insertBefore(renderer.domElement, document.body.firstChild);
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.zIndex = '-1';

// Création des cubes flottants
const cubes = [];
for (let i = 0; i < 50; i++) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: Math.random() * 0xff00ff,
        transparent: true,
        opacity: 0.6,
        wireframe: Math.random() > 0.5
    });
    const cube = new THREE.Mesh(geometry, material);
    
    cube.position.x = Math.random() * 40 - 20;
    cube.position.y = Math.random() * 40 - 20;
    cube.position.z = Math.random() * 40 - 20;
    
    cube.rotation.x = Math.random() * Math.PI;
    cube.rotation.y = Math.random() * Math.PI;
    
    cubes.push(cube);
    scene.add(cube);
}

// Ajout de lumières
const light1 = new THREE.PointLight(0xff00ff, 1, 100);
light1.position.set(10, 10, 10);
scene.add(light1);

const light2 = new THREE.PointLight(0x00ffff, 1, 100);
light2.position.set(-10, -10, -10);
scene.add(light2);

camera.position.z = 30;

// Animation
function animate() {
    requestAnimationFrame(animate);
    
    cubes.forEach((cube, i) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.position.y += Math.sin(Date.now() * 0.001 + i) * 0.02;
    });

    // Effet de mouvement de caméra basé sur la position de la souris
    const mouseX = (window.mouseX || 0) - window.innerWidth / 2;
    const mouseY = (window.mouseY || 0) - window.innerHeight / 2;
    camera.position.x += (mouseX * 0.0005 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.0005 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Suivi de la position de la souris
window.addEventListener('mousemove', (e) => {
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;
});

animate(); 