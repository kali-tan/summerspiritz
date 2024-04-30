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

$(".flavors").click(
    function(){
        window.location.href='flavors.html';
    }
);

$(".cart").click(
    function(){
        window.location.href='cart.html';
    }
);

$(".contact").click(
    function(){
        window.location.href='contact.html';
    }
);

window.addEventListener('resize', onWindowResize);

// scene
var scene = new THREE.Scene();

// camera
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10; // Increase the distance of the camera from the scene

// Create a renderer with a specified background color
var renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable alpha for transparency
renderer.setClearColor(0xffffff, 0); // Set clear color to white with 0 opacity
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//renderer size on window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//lighting
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

//the height and radius of the cylinder
var height = 5.5;
var radius = 1;
var separation = 3; // Adjust the separation between cylinders

// number of segments
var radialSegments = 32;
var heightSegments = 1; // Set to 1 to create only one segment for the height

//cylinder geometry
var geometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments, heightSegments, false);

// var textureLoader = new THREE.TextureLoader();
// var sideTexture = textureLoader.load('files/silvercan.jpeg');
// var topTexture = textureLoader.load('files/leisure_lime_package.png');
// var bottomTexture = textureLoader.load('files/soda_can_top.png');

// // Create materials for top, bottom, and side
// var topMaterial = new THREE.MeshPhongMaterial({ map: topTexture });
// var bottomMaterial = new THREE.MeshPhongMaterial({ map: bottomTexture });
// var sideMaterial = new THREE.MeshPhongMaterial({ map: sideTexture });

// // Create mesh with multi-material
// var materials = [topMaterial, bottomMaterial, sideMaterial];

var textureLoader = new THREE.TextureLoader();

// textures for each can
var sideTexture1 = textureLoader.load('files/silvercan.jpeg');
var topTexture1 = textureLoader.load('files/leisure_lime_package.png');
var bottomTexture1 = textureLoader.load('files/soda_can_top.png');

// materials for can 1
var topMaterial1 = new THREE.MeshPhongMaterial({ map: topTexture1, shininess: 100 });
var bottomMaterial1 = new THREE.MeshPhongMaterial({ map: bottomTexture1, shininess: 100  });
var sideMaterial1 = new THREE.MeshPhongMaterial({ map: sideTexture1, shininess: 100  });

// textures for each can
var sideTexture2 = textureLoader.load('files/silvercan.jpeg');
var topTexture2 = textureLoader.load('files/wasted_watermelon.png');
var bottomTexture2 = textureLoader.load('files/soda_can_top.png');

// materials for can 2
var topMaterial2 = new THREE.MeshPhongMaterial({ map: topTexture2, shininess: 100  });
var bottomMaterial2 = new THREE.MeshPhongMaterial({ map: bottomTexture2, shininess: 100  });
var sideMaterial2 = new THREE.MeshPhongMaterial({ map: sideTexture2, shininess: 100  });


// textures for each can
var sideTexture3 = textureLoader.load('files/silvercan.jpeg');
var topTexture3 = textureLoader.load('files/twisted_tangerine.png');
var bottomTexture3 = textureLoader.load('files/soda_can_top.png');

// materials for can 3
var topMaterial3 = new THREE.MeshPhongMaterial({ map: topTexture3, shininess: 100  });
var bottomMaterial3 = new THREE.MeshPhongMaterial({ map: bottomTexture3, shininess: 100  });
var sideMaterial3 = new THREE.MeshPhongMaterial({ map: sideTexture3, shininess: 100  });

// textures for each can
var sideTexture4 = textureLoader.load('files/silvercan.jpeg');
var topTexture4 = textureLoader.load('files/pina_paradise.png');
var bottomTexture4 = textureLoader.load('files/soda_can_top.png');

// materials for can 4
var topMaterial4 = new THREE.MeshPhongMaterial({ map: topTexture4, shininess: 100  });
var bottomMaterial4 = new THREE.MeshPhongMaterial({ map: bottomTexture4, shininess: 100  });
var sideMaterial4 = new THREE.MeshPhongMaterial({ map: sideTexture4, shininess: 100  });

// Create mesh with multi-material for cans
var materials1 = [topMaterial1, bottomMaterial1, sideMaterial1];
var cylinder1 = new THREE.Mesh(geometry, materials1);

var materials2 = [topMaterial2, bottomMaterial2, sideMaterial2];
var cylinder2 = new THREE.Mesh(geometry, materials2);

var materials3 = [topMaterial3, bottomMaterial3, sideMaterial3];
var cylinder3 = new THREE.Mesh(geometry, materials3);

var materials4 = [topMaterial4, bottomMaterial4, sideMaterial4];
var cylinder4 = new THREE.Mesh(geometry, materials4);

var heightOffset = 0.2;

cylinder1.position.y = heightOffset;
cylinder2.position.y = heightOffset;
cylinder3.position.y = heightOffset;
cylinder4.position.y = heightOffset;
cylinder1.position.x = -separation * 2;
cylinder2.position.x = 0.6 * separation;
cylinder3.position.x = -separation * 0.6;
cylinder4.position.x = separation * 2;
scene.add(cylinder1, cylinder2, cylinder3, cylinder4);

// Create a raycaster
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// Function to handle mouse move
function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster's position and direction
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the raycaster
    var intersects = raycaster.intersectObjects(scene.children, true);

    // Reset scale and rotation for all cylinders
    cylinder1.scale.set(1, 1, 1);
    cylinder2.scale.set(1, 1, 1);
    cylinder3.scale.set(1, 1, 1);
    cylinder4.scale.set(1, 1, 1);
    cylinder1.rotation.x = 0;
    cylinder2.rotation.x = 0;
    cylinder3.rotation.x = 0;
    cylinder4.rotation.x = 0;

    // Check if the ray intersects with any cylinders
    if (intersects.length > 0) {
        var intersectedObject = intersects[0].object;
        // Check which cylinder is intersected
        if (intersectedObject === cylinder1 || intersectedObject.parent === cylinder1) {
            handleHover(cylinder1);
        } else if (intersectedObject === cylinder2 || intersectedObject.parent === cylinder2) {
            handleHover(cylinder2);
        } else if (intersectedObject === cylinder3 || intersectedObject.parent === cylinder3) {
            handleHover(cylinder3);
        } else if (intersectedObject === cylinder4 || intersectedObject.parent === cylinder4) {
            handleHover(cylinder4);
        }
    }
}

// Add event listener for mouse move
document.addEventListener('mousemove', onMouseMove, false);

// Function to handle hover effect
function handleHover(cylinder) {
    cylinder.scale.set(1.2, 1.2, 1.2); // Scale up by 20%
    cylinder.rotation.x = Math.PI / 6; // Tilt by 30 degrees (in radians)
}


function animate() {
    requestAnimationFrame(animate);
    cylinder1.rotation.y += 0.02; 
    cylinder2.rotation.y += 0.02;
    cylinder3.rotation.y += 0.02;
    cylinder4.rotation.y += 0.02;
    renderer.render(scene, camera);
}
animate();
