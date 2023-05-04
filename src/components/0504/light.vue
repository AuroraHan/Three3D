<!-- 光线 -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//创建场景
const scene = new THREE.Scene()

//创建物体
const cubeSize = 4;
const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
const meshBox = new THREE.Mesh(cubeGeo, cubeMat);
meshBox.position.set(cubeSize + 1, cubeSize / 2, 0);
scene.add(meshBox);

const sphereRadius = 3;
const sphereWidthDivisions = 32;
const sphereHeightDivisions = 16;
const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
const meshSphere = new THREE.Mesh(sphereGeo, sphereMat);
meshSphere.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
scene.add(meshSphere);

//设置相机
const fov = 45;
const aspect = 2;  // canvas 的默认宽高 300:150
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 10, 40);


//添加光源
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);


// 添加地板纹理
const planeSize = 40;
const loader = new THREE.TextureLoader();
const texture = loader.load('../../../public/checker.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
const repeats = planeSize / 2;
texture.repeat.set(repeats, repeats);

//创建一个平面几何体
const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = Math.PI * -.5;
scene.add(mesh);

//渲染器
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera)

//控制相机对象
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();

animate()
function animate() {

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

}

</script>
<style scoped lang='scss'></style>