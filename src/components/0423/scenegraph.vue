<!-- 场景图 -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import * as THREE from "three";
// 创建一个太阳系

//添加场景
const scene = new THREE.Scene()

// 要更新旋转角度的对象数组
const objects: any[] = [];

// 一球多用
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
);

//添加空的太阳场景图节点
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

//添加空的地球场景图节点
const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 20;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

//添加空的月球场景图节点
const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add(moonOrbit);

//太阳
const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5); // 扩大太阳的大小
// scene.add(sunMesh);
solarSystem.add(sunMesh)
objects.push(sunMesh);

//地球
const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244,
});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);

earthOrbit.add(earthMesh)
objects.push(earthMesh);

//月球
const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(.5, .5, .5);
moonOrbit.add(moonMesh);
objects.push(moonMesh);

//设置点光源
const color = 0xffffff;
const intensity = 3;
const light = new THREE.PointLight(color, intensity);
scene.add(light);


//添加相机
const w = window.innerWidth;
const h = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
//设置相机位置
camera.position.set(0, 50, 0)
camera.up.set(0, 0, 1)
camera.lookAt(0, 0, 0)

//渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera)


const clock = new THREE.Clock()
tick()
function tick() {
    const time = clock.getElapsedTime()
    objects.forEach((obj) => {
        obj.rotation.y = time;
    });

    requestAnimationFrame(tick)
    renderer.render(scene, camera)
}

</script>
<style scoped lang='scss'></style>