<!--  -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createMaterial } from './index';


//创建场景
const scene = new THREE.Scene()

//设置辅助线
const axse = new THREE.AxesHelper(2)
scene.add(axse)

//设置几何体
const geometry = new THREE.ConeGeometry(2, 4, 20)
// const moterial = new THREE.MeshNormalMaterial();
const moterial = createMaterial()
const cubw = new THREE.Mesh(geometry, moterial)
cubw.position.y = 1
scene.add(cubw)

//添加光线
const light = new THREE.AmbientLight()
scene.add(light)

//添加相机
const w = window.innerWidth;
const h = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
//设置相机位置
camera.position.set(0, 5, 7)
//相机的朝向
// camera.lookAt(10, 10, 10)

//渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera)

//鼠标控制
const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

//添加组
const group = new THREE.Group()
group.add(cubw)
scene.add(group)

animate()
function animate() {

    requestAnimationFrame(animate);
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    //自身旋转
    group.rotateY(0.01);
    renderer.render(scene, camera);

}
</script>
<style scoped lang='scss'></style>