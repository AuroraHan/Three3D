<!-- 灯光阴影 -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//创建场景
const scene = new THREE.Scene()

//添加辅助线
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 8, 8)
scene.add(camera)

//创建灯光
const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);

//直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
//1|设置光照投射阴影
directionalLight.castShadow = true;
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

//创建物体
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial()
const sphereMesh = new THREE.Mesh(sphereGeometry, material)
// 3|投射阴影
sphereMesh.castShadow = true
scene.add(sphereMesh)

// 创建平面
const planeGeom = new THREE.PlaneGeometry(10, 10)
const plan = new THREE.Mesh(planeGeom, material)
// 4|接受阴影
plan.receiveShadow = true
plan.position.set(0, -1, 0)
plan.rotation.x = -Math.PI / 2
scene.add(plan)

//渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
// 2|设置渲染器开启阴影计算
renderer.shadowMap.enabled = true
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