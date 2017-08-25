const THREE = require('three')
const ThreeBSP = require('three-js-csg')(THREE)
const walipini = require('walipini-model-3d')

const addPlane = function(colori, scene) {
    // Add plane
    var planeGeometry = new THREE.PlaneGeometry(400, 400);
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0x00ff00
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -0.2;
    scene.add(plane);
};

var addLights = function(scene) {
    // Set the ambient light
    var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(30, 30, 10);
    spotLight.shadowCameraNear = 2;
    spotLight.shadowCameraFar = 50;
    spotLight.castShadow = true;

    scene.add(spotLight);

    var spotLight2 = new THREE.SpotLight(0xffffff);
    spotLight2.position.set(-30, 30, 10);
    spotLight2.shadowCameraNear = 2;
    spotLight2.shadowCameraFar = 50;
    spotLight2.castShadow = true;

    scene.add(spotLight2);
};

var createCube = function(x, y, z, width, height, length, color, scene) {
    // Add some geometry
    var cubeGeometry = new THREE.BoxGeometry(width, height, length);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: color
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.set(x, y, z);

    return cube;
};

var drawCube = function(x, y, z, width, height, length, color, scene) {
    scene.add(createCube(x, y, z, width, height, length, color, scene));
};

const create = function(scene) {
    const walipiniOptions = {
        winterSolsticeElevation: 18.65,
        ground: {
            width: 20,
            length: 20,
            grass: {
                thickness: 0.05,
                color: 'green'
            },
            soil: {
                thickness: 0.4,
                color: 'brown'
            },
            underSoil: {
                thickness: 4,
                color: 'yellow'
            }
        },
        walipini: {
            width: 3,
            length: 10,
            dig: {
                depth: 1.3
            },
            orientation: 90,
            wall: {
                thickness: 0.5,
                frontHeight: 0.75,
                backHeight: 0.76,
                color: 'gray'
            },
            roof: {
                topDistance: 1.25,
                beam: {
                    width: 0.05,
                    height: 0.1
                },
                frontWindow: { color: 'gray' },
                topWindow: { color: 'gray' }
            },
            door: {
                width: 0.8,
                height: 1.8,
            }
        }
    }

    addLights(scene)
    scene.add(walipini.create(walipiniOptions))
}

module.exports = {
    create: create
}
