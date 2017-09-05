var THREE = require('three')
var OrbitControls = require('three-orbit-controls')(THREE)
const world = require('./world')

var scene
var camera
var renderer

/**
 * Function handles the resize event. 
 * This make sure the camera and the renderer are updated at the correct moment.
 */
function handleResize() {
    // console.log('handle window resize')
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Initializes the scene, camera and objects.
 * Called when the window is loaded by using window.onload
 */
function init() {
 
    // create a scene, that will hold all our elements
    // such as objects, cameras and lights.
    scene = new THREE.Scene();
 
    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;
 
    // position and point the camera to the center of the scene
    camera.position.x = 20;
    camera.position.y = 10;
    camera.position.z = 15;
    camera.lookAt(scene.position);

    // add controls
    var cameraControl = new OrbitControls(camera);

    // create a renderer, sets the background color and the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xf0f0f0, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = false;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    // add the output of the renderer to the html element
    document.body.appendChild(renderer.domElement);
 
    // Create the world
    world.create(scene)

    // call the render function, after the first render, interval is determined
    // by requestAnimationFrame
    render(cameraControl);

    // calls the handleResize function when the window is resized
    window.addEventListener('resize', handleResize, false);

}
 
/**
 * Called when the scene needs to be rendered.
 * Delegates to requestAnimationFrame for future renders
 *
 * @param {Object} cameraControl
 */
function render(cameraControl) {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

const main = () => {
    init()
}

module.exports = {
    main: main
}
