<!-- cannone 基本使用 -->
<template>
	<div></div>
</template>

<script setup lang='ts'>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from 'cannon-es'

//初始化物理世界
const world = new CANNON.World()
//设置重力
world.gravity.set(0, -9.82, 0)

//创建场景
const scene = new THREE.Scene();

//设置相机
const w = window.innerWidth;
const h = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(1, 1, 2)

//创建物理世界球体
const sphereShape = new CANNON.Sphere(1)
//创建一个刚体
const sphereBody = new CANNON.Body({
	//质量
	mass: 1,
	shape: sphereShape,
	//位置
	position: new CANNON.Vec3(0, 5, 0)
})

world.addBody(sphereBody)

//------------------------------

//创建Three物体
const geometry = new THREE.SphereGeometry(1, 32, 32);
const moterial = new THREE.MeshBasicMaterial({
	color: new THREE.Color(0xffddac),
});
const cube = new THREE.Mesh(geometry, moterial);
scene.add(cube);

//渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

//控制相机对象
const controls = new OrbitControls(camera, renderer.domElement);

//添加辅助线
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper)

animate();
function animate() {
	world.step(1 / 60)
	//更新球体位置和旋转
	cube.position.copy(sphereBody.position as unknown as THREE.Vector3)
	cube.quaternion.copy(sphereBody.quaternion as unknown as THREE.Quaternion)
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}
</script>
<style scoped lang='scss'></style>