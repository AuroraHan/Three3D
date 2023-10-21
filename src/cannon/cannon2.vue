<!-- cannone 滚动掉落效果 -->
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
camera.position.set(3, 3, 6)

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

//创建物理世界的平面
const plantShape = new CANNON.Box(new CANNON.Vec3(5, 0.1, 5))
const plantBody = new CANNON.Body({
	shape: plantShape,
	//位置
	position: new CANNON.Vec3(0, 0, 0),
	type: CANNON.Body.STATIC
})
plantBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), 0.1)
world.addBody(plantBody)
//------------------------------

//创建Three物体
const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const moterial = new THREE.MeshBasicMaterial({
	color: new THREE.Color(0xffddac),
});
const cube = new THREE.Mesh(geometry, moterial);
scene.add(cube);

//创建Three平面
const plantGeo = new THREE.BoxGeometry(10, 0.2, 10)
const plantMot = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const plantMesh = new THREE.Mesh(plantGeo, plantMot)
plantMesh.rotation.x = 0.1
scene.add(plantMesh);

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

let clock = new THREE.Clock()
animate();
function animate() {
	let delta = clock.getDelta()
	world.step(1 / 60, delta)
	//更新球体位置和旋转
	cube.position.copy(sphereBody.position as unknown as THREE.Vector3)
	cube.quaternion.copy(sphereBody.quaternion as unknown as THREE.Quaternion)

	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}
</script>
<style scoped lang='scss'></style>