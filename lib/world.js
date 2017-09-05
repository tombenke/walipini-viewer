const THREE = require('three')
const walipini = require('walipini-model-3d')

/*
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
*/

var addLights = function(scene) {
    // Set the ambient light
    var ambientLight = new THREE.AmbientLight(0x777777);
    scene.add(ambientLight);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(30, 30, 20);
    spotLight.shadow.camera.near = 2;
    spotLight.shadow.camera.far = 50;
    spotLight.castShadow = true;
    
    spotLight.shadow.mapSize.width = 8000;  // default
    spotLight.shadow.mapSize.height = 8000; // default

    scene.add(spotLight);

    var spotLight2 = new THREE.SpotLight(0xffffff);
    spotLight2.position.set(-30, 30, 10);
    spotLight2.shadow.camera.near = 2;
    spotLight2.shadow.camera.far = 50;
    spotLight2.castShadow = true;

//    scene.add(spotLight2);

    //Create a DirectionalLight and turn on shadows for the light
    var light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
    light.position.set( 20, 30, 10 );   //default; light shining from top
    light.castShadow = true;            // default false
//    scene.add( light );

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 5012;  // default
    light.shadow.mapSize.height = 5012; // default
    light.shadow.camera.near = 0.5;     // default
    light.shadow.camera.far = 500       // default
};

/*
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
*/

const create = function(scene) {
    const walipiniOptions = walipini.config.defaults
    console.log('ranges: ', walipini.config.ranges)
    addLights(scene)
    scene.add(walipini.create(walipiniOptions))

    // Print reports
    console.log(walipini.reports(walipiniOptions))
}

module.exports = {
    create: create
}
