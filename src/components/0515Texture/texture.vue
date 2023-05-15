<!-- 纹理 -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//创建场景
const scene = new THREE.Scene()

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 20, 30)
scene.add(camera)

//添加纹理
const texture = new THREE.TextureLoader()
const loadTexture = texture.load('/public/crate.gif')
console.log(loadTexture)

//设置旋转中心点。
loadTexture.center.set(0.5, 0.5)
//旋转45
// loadTexture.rotation = Math.PI / 4

//设置重复
loadTexture.repeat.set(3, 3)

//纹理贴图在水平方向上将如何包裹
loadTexture.wrapS = THREE.MirroredRepeatWrapping

//纹理贴图在垂直方向上将如何包裹
loadTexture.wrapT = THREE.RepeatWrapping

// loadTexture.mapping = THREE.CubeRefractionMapping

//创建几何体
const geometry = new THREE.BoxGeometry(10, 10, 10)
const material = new THREE.MeshBasicMaterial({
    color: '#ff5599',
    map: loadTexture
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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