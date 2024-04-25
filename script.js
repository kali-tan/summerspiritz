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

window.addEventListener('resize', onWindowResize);

// Create a scene
var scene = new THREE.Scene();

// Create a camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 9; // Increase the distance of the camera from the scene

// Create a renderer with a specified background color
var renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable alpha for transparency
renderer.setClearColor(0xffffff, 0); // Set clear color to white with 0 opacity
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Update renderer size on window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// adding lighting
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Define the height and radius of the cylinder
var height = 5.5;
var radius = 1;
var separation = 3; // Adjust the separation between cylinders

// Define the number of segments
var radialSegments = 32;
var heightSegments = 1; // Set to 1 to create only one segment for the height

// Create cylinder geometry
var geometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments, heightSegments, false);

var textureLoader = new THREE.TextureLoader();
var sideTexture = textureLoader.load('files/silvercan.jpeg');
var topTexture = textureLoader.load('files/leisure_lime_package.png');
var bottomTexture = textureLoader.load('files/soda_can_top.png');

// Create materials for top, bottom, and side
var topMaterial = new THREE.MeshPhongMaterial({ map: topTexture });
var bottomMaterial = new THREE.MeshPhongMaterial({ map: bottomTexture });
var sideMaterial = new THREE.MeshPhongMaterial({ map: sideTexture });

// Create mesh with multi-material
var materials = [topMaterial, bottomMaterial, sideMaterial];

// Define the height offset for the cans
var heightOffset = 3;

// Create cylinders and position them
var cylinder1 = new THREE.Mesh(geometry, materials);
var cylinder2 = new THREE.Mesh(geometry, materials);
var cylinder3 = new THREE.Mesh(geometry, materials);
var cylinder4 = new THREE.Mesh(geometry, materials);
cylinder1.position.y = heightOffset;
cylinder2.position.y = heightOffset;
cylinder3.position.y = heightOffset;
cylinder4.position.y = heightOffset;
cylinder1.position.x = -separation * 2;
cylinder2.position.x = 0.6 * separation;
cylinder3.position.x = -separation * 0.6;
cylinder4.position.x = separation * 2;
scene.add(cylinder1, cylinder2, cylinder3, cylinder4);


// Render the scene
function animate() {
    requestAnimationFrame(animate);
    cylinder1.rotation.y += 0.02; // Rotate the cylinders
    cylinder2.rotation.y += 0.02;
    cylinder3.rotation.y += 0.02;
    cylinder4.rotation.y += 0.02;
    renderer.render(scene, camera);
}
animate();


