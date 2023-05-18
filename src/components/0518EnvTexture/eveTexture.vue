<!-- 环境贴图 -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'


//创建场景
const scene = new THREE.Scene()

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 10, 10)
scene.add(camera)

//创建灯光
const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);

//点光
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 1, 0);

//加载环境图
// 也可以使用CubeTextureLoader  加载图片
const rgbeLoader = new RGBELoader()
rgbeLoader.loadAsync('/public/hdr/room.hdr').then((texure) => {
    //图像将如何应用到物体（对象）上
    texure.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texure
    scene.environment = texure
})

//创建物体
const geometry = new THREE.SphereGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial({
    //材质与金属的相似度
    metalness: 1,
    //材质的粗糙程度
    roughness: 0.1
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