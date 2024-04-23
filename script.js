$(".about").click(
    function(){
        window.location.href='about.html';
    }
);

$(".name").click(
    function(){
        window.location.href='index.html';
    }
);

// Create a scene
var scene = new THREE.Scene();

// Create a camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// adding lighting
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);


// Create cylinder geometry
var geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('files/leisure_lime_package.png');
var material = new THREE.MeshBasicMaterial({ map: texture });
var cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);

// Add interactivity to the cylinder
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        // Apply your interactive logic here
        cylinder.rotation.x += 0.01;
        cylinder.rotation.y += 0.01;
    }
}

window.addEventListener('mousemove', onMouseMove);

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
