<!-- 加载3D模型 -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//创建场景
const scene = new THREE.Scene()
scene.background = new THREE.Color("#7a7374")

//添加辅助线
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

//创建相机
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 5, 10)
scene.add(camera)

//创建灯光
const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);

//添加模型
const gltfLoader = new GLTFLoader()
gltfLoader.load('/public/gltf/0520/scene.gltf', (gltf) => {
    const model = gltf.scene;
    model.rotateY(Math.PI / 2)
    scene.add(model);
})


//渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement);

//监听窗口变化
window.addEventListener('resize', onWindowResize);

//控制相机对象
const controls = new OrbitControls(camera, renderer.domElement);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    //更新相机投影矩阵,当相机视口变化时就需要
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate()

</script>
<style scoped lang='scss'></style>