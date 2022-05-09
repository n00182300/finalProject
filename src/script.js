import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Raycaster } from 'three'
import {gsap} from 'gsap'

//Loaders
const loadingBarElement = document.querySelector('.loading-bar');
console.log(loadingBarElement);

const loadingManager = new THREE.LoadingManager(
    () =>
    {
        //console.log('loaded')
        window.setTimeout(() =>{

            gsap.to(overlayMaterial.uniforms.uAlpha,{ duration: 3, value:0})
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform= ''

        }, 500)


    },
    (itemUrl, itemsLoaded, itemsTotal) =>
    {

        const progressRatio = (itemsLoaded / itemsTotal)
        loadingBarElement.style.transform= `scaleX(${progressRatio})`
        //console.log('progressRatio')
    }
)




/**
 * Base
 */
// Debug
const gui = new dat.GUI();


// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// const bgcolor = {
//     color: '#1275b0'
// }

// scene.background = new THREE.Color(bgcolor.color)




//LOADING MODELS

//instantiating glTF Loader
const gltfLoader = new GLTFLoader(loadingManager);


gltfLoader.load(
    '/models/man/transMan.gltf',
    (gltf) =>
    {
        
        gltf.scene.scale.set(0.999999999, 0.999999999, 0.99999999900025);
        gltf.scene.position.set(0,0,0);
        scene.add(gltf.scene);
        console.log(gltf);
        

    }
);

//Overlay

// const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
// const overlayMaterial = new THREE.ShaderMaterial({
//     wireframe: true,
//     transparent: true,
//     uniforms:
//     {
//         uAlpha: { value: 1 }
//     },
//     vertexShader: `
//         void main()
//         {
//             gl_Position = vec4(position, 1.0);
//         }
//     `,
//     fragmentShader: `
//         uniform float uAlpha;

//         void main()
//         {
//             gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
//         }
//     `
// })
// const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
// scene.add(overlay)

gltfLoader.load(
    '/models/brain/brain.gltf',
    (gltf) =>
    {
        //Correcting Brain size
        gltf.scene.scale.set(0.04, 0.04, 0.04);

        //Hardcoded positioning
        gltf.scene.position.set(0.027,1.625,-0.055);

        //GUI folder to find correct coordinates
        const Brain = gui.addFolder('Brain Coordinates');
        Brain.add(gltf.scene.position, 'x').min(- 5).max(5).step(0.005).name('x');
        Brain.add(gltf.scene.position, 'y').min(- 5).max(5).step(0.005).name('y');
        Brain.add(gltf.scene.position, 'z').min(- 5).max(5).step(0.005).name('z');

        //Adding to the scene
        scene.add(gltf.scene);


    }
);

gltfLoader.load(
    '/models/lungs/scene.gltf',
    (gltf) =>
    {
        //Correcting Lungs scale
        gltf.scene.scale.set(0.79, 0.79, 0.79);

        //Hardcoded positioning
        gltf.scene.position.set(0.01,1.26,-0.06);

        //GUI folder to find correct coordinates
        const Lungs = gui.addFolder('Lungs Coordinates');
        Lungs.add(gltf.scene.position, 'x').min(- 5).max(5).step(0.005).name('x');
        Lungs.add(gltf.scene.position, 'y').min(- 5).max(5).step(0.005).name('y');
        Lungs.add(gltf.scene.position, 'z').min(- 5).max(5).step(0.005).name('z');


        scene.add(gltf.scene);


    }
);


gltfLoader.load(
    '/models/dO/digestiveSystem.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(0.15, 0.15, 0.15);

        gltf.scene.position.set(0.01,1.029,-0.01);

        const dO = gui.addFolder('Digestive Coordinates');
        dO.add(gltf.scene.position, 'x').min(- 5).max(5).step(0.005).name('x');
        dO.add(gltf.scene.position, 'y').min(- 5).max(5).step(0.005).name('y');
        dO.add(gltf.scene.position, 'z').min(- 5).max(5).step(0.005).name('z');

        scene.add(gltf.scene);


    }
)

//Raycaster
const raycaster = new Raycaster();


//Points of Interest - position in 3D
const points = [
    {
        position: new THREE.Vector3(0.15, 1.7, 0),
        element: document.querySelector('.point-0')
    },
    {
        position: new THREE.Vector3(-0.204,1.3,0),
        element: document.querySelector('.point-1')
    },
    {
        position: new THREE.Vector3(0.15,1.035,0),
        element: document.querySelector('.point-2')
    }
    
]

const P1 = gui.addFolder('Point1');
P1.add(points[0].position,'x',-9,9,0.001);
P1.add(points[0].position,'y',-9,9,0.001);
P1.add(points[0].position,'z',-9,9,0.001);

const P2 = gui.addFolder('Point1');
P2.add(points[1].position,'x',-9,9,0.001);
P2.add(points[1].position,'y',-9,9,0.001);
P2.add(points[1].position,'z',-9,9,0.001);

const P3 = gui.addFolder('Point1');
P3.add(points[2].position,'x',-9,9,0.001);
P3.add(points[2].position,'y',-9,9,0.001);
P3.add(points[2].position,'z',-9,9,0.001);





/**
 * Floor
 */
// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(10, 10),
//     new THREE.MeshStandardMaterial({
//         color: '#444444',
//         metalness: 0,
//         roughness: 0.5,
//         opacity: 0.9
//     })
// )
// floor.receiveShadow = true
// floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.castShadow = true;
// //directionalLight.shadow.mapSize.set(1024, 1024)
// //directionalLight.shadow.camera.far = 15
// //directionalLight.shadow.camera.left = - 7
// //directionalLight.shadow.camera.top = 7
// //directionalLight.shadow.camera.right = 7
// //directionalLight.shadow.camera.bottom = - 7
// directionalLight.position.set(- 5, 5, 0)

//Adding lights to GUI
const Lights2 = gui.addFolder('Lights Coordinates');
Lights2.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity');
Lights2.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001).name('lightX');
Lights2.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001).name('lightY');
Lights2.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001).name('lightZ');

scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 1.7, 1.7);
scene.add(camera);

// gui.add(camera.position,'y').min(-5).max(10)

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enableDamping = true;
controls.enableZoom = false;
//controls.enabled = false
//controls.maxDistance = 5

const Zoom = gui.addFolder('Enable Zooming');
Zoom.add(controls,'enableZoom');


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setCol;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//renderer.physicallyCorrectLights = true
//renderer.setScissorTest = true



//Scrolling
let scrollY = window.scrollY;

window.addEventListener('scroll', () =>
{
    
    scrollY = window.scrollY
    //console.log(scrollY)
});


//Loop function: to happen on every frame

const loop = () =>
{

    controls.update();

    // //Move camera
    // camera.position.y = scrollY
    camera.updateMatrixWorld();

    //Go through each point
    for (const point of points)
    {
        //Clone the screen position to keep original position unnaffected
        const screenPosition = point.position.clone();


        //Project 3D coordinate to 2D from the camera position(normalized device coordinates)
        screenPosition.project(camera);


        //Cast ray to the point's screenPosition from the camera
        raycaster.setFromCamera(screenPosition, camera);


        //Check intersection with all objects of the scene, providing true to recursively check *all* children
        const intersects = raycaster.intersectObjects(scene.children,true);


        //translating screenPosition to coordinates
        const translateX = screenPosition.x * sizes.width * 0.5;
        const translateY = - screenPosition.y * sizes.height * 0.5;


        //moving the point element - mixing JS+CSS
        point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;


        //If the ray has intersected an object. Change classes
        if(intersects.length === 0 )
        {
            point.element.classList.add('visible');
        }
        else
        {
            
            //Getting distance of first element of array returned from intersectObjects
            const intersectionDistance = intersects[0].distance;

            //Getting the distance of two Vector3s (point + camera)
            const pointDistance = point.position.distanceTo(camera.position);

            
            if(intersectionDistance < pointDistance)
            {
                //There is an obj closer than the point
                point.element.classList.remove('visible');
            }
            else
            {
                //Point is closer
                point.element.classList.add('visible');
            }
        }
        //console.log(translateX)
    }

    

    // Render
    renderer.render(scene, camera);

    // Call loop again on the next frame
    window.requestAnimationFrame(loop);
}

loop();