<template>
    <div></div>
</template>

<script setup lang='ts'>
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
/**
 * three 组成
 * 
 * controls 鼠标控制
 * 
 */
const w = window.innerWidth;
const h = window.innerHeight;

//房间
const scene = new THREE.Scene()

// 东西
//设置辅助线
const axse = new THREE.AxesHelper(2)
scene.add(axse)

//物体 ：geometry 骨架  + moterial 材质
//创建立方体
const geometry = new THREE.BoxGeometry(1, 1, 1)
const moterial = new THREE.MeshNormalMaterial()
const cube = new THREE.Mesh(geometry, moterial)
scene.add(cube)

// 光线
const light = new THREE.AmbientLight()
scene.add(light)


// 相机
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
//设置相机位置
camera.position.set(0, 0, 7)
//相机的朝向
camera.lookAt(0, 0, 0)

//渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)

// 控制物体运动
const clock = new THREE.Clock()
tick()
function tick() {
    const time = clock.getElapsedTime()

    cube.position.x = Math.sin(time) * 2
    cube.position.y = Math.cos(time) * 2

    requestAnimationFrame(tick)
    renderer.render(scene, camera)
    controls.update()
}

</script>
<style scoped lang='scss'></style>