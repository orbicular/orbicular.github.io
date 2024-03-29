// 'use strict';

import * as THREE from './threejsmaster/build/three.module.js';
import { AsciiEffect } from './threejsmaster/examples/jsm/effects/AsciiEffect.js';
import { OrbitControls } from './threejsmaster/examples/jsm/controls/OrbitControls.js';

/* global THREE */

function main() {

    const camera = new THREE.PerspectiveCamera(75, 1280 / 586, 0.1, 1000);
    camera.position.z = 5;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');

    // Axes helper
    // const axes = new THREE.AxesHelper(30);
    // scene.add(axes);

    // Ambient Lighting
    // const light = new THREE.AmbientLight(0x500000, 3);
    // light.castShadows = true
    // scene.add(light);

    // directional light
    const green = "rgb(10,200,10)";
    const blue = 0x0000ff;
    const intensity = 2.5;
    const light2 = new THREE.DirectionalLight(blue, intensity);
    light2.position.set(5, 10, 2);
    light2.target.position.set(-5, 0, 0);
    scene.add(light2);
    scene.add(light2.target);
    //spotlight
    const spotlight = new THREE.SpotLight(0xff0000, 2);
    spotlight.position.set(10, 10, 10);
    scene.add(spotlight);

    //video
    const video = document.getElementById("video");
    const texture = new THREE.VideoTexture(video);
    // video.play();
    // video.pause();



    // plane
    const geometry = new THREE.PlaneGeometry(3.52, 6.40);
    const parameters = { color: 0xffffff, map: texture };
    const material = new THREE.MeshBasicMaterial(parameters);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    //plane2
    const geometry2 = new THREE.PlaneGeometry(0.5, 0.2);
    const material2 = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const plane2 = new THREE.Mesh(geometry2, material2);
    plane2.position.y = -3;
    plane2.position.x = -8;
    plane2.position.z = -5;
    camera.add(plane2);
    scene.add(camera);


    let renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(1280,586);
    //renderer.setPixelRatio(1280/586);
    renderer.setClearColor(0x000000, 1);

    let effect = new AsciiEffect(renderer, ' duality', { invert: true, color: false });
    //let effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true, color: false });
    effect.setSize(1280,586);
    effect.domElement.style.color = 'white';
    effect.domElement.style.backgroundColor = 'black';

    document.body.appendChild(effect.domElement);
    // window.addEventListener('resize', onWindowResize, false);

    const controls = new OrbitControls(camera, effect.domElement);
    controls.maxDistance = 100;
    controls.minDistance = 1;

    // function onWindowResize() {
    //     // const canvas = renderer.domElement;
    //     // const width = canvas.clientWidth;
    //     // const height = canvas.clientHeight;
    //     // const needResize = canvas.width !== width || canvas.height !== height;
    //     // if (needResize) {
    //     //     renderer.setSize(width, height, false);
    //     // }
    //     // return needResize;
    //     // camera.aspect = window.innerWidth / window.innerHeight;
    //     // camera.updateProjectionMatrix();
    //     renderer.setSize(window.innerWidth, window.innerHeight);
    //     effect.setSize(window.innerWidth, window.innerHeight);
    // }

    // const raycaster = new THREE.Raycaster();
    // const mouse = new THREE.Vector2();
    document.body.addEventListener('click', onDocumentMouseClick, false);
    function onDocumentMouseClick(event) {
        //event.preventDefault();
        // mouse.x = (event.clientX / 1280) * 2 - 1;
        // mouse.y = - (event.clientY / 586) * 2 + 1;
        // raycaster.setFromCamera(mouse, camera);
        // const intersects = raycaster.intersectObjects(scene.children);
        // if (intersects.length > 0 && intersects[0].object == plane) {
             video.play();
        //     render();
        // }
    }

    function render() {
        // if (resizeRendererToDisplaySize(renderer)) {
        //     const canvas = renderer.domElement;
        //     camera.aspect = canvas.clientWidth / canvas.clientHeight;
        //     camera.updateProjectionMatrix();
        // }
        controls.autoRotate = false;
        controls.update();
        // renderer.outputEncoding = THREE.sRGBEncoding;
        effect.render(scene, camera);
        requestAnimationFrame(render);
    }


    requestAnimationFrame(render);
}

main();
