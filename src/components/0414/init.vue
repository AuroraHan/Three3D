<!-- threejs -->
<template>
    <div ref="el" class="gxh"></div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as THREE from "three";

const el = ref<HTMLElement>()
/**
 * three 组成
 * 1、场景 scene
 *      1.1 物体 geometry + moterial 
 *        1.1.1 点 point  线 line  面 mesh
 *      1.2 光线  light
 * 2、相机  camera
 * 3、渲染器 renderer
 */
// const w = window.innerWidth;
// const h = window.innerHeight;

onMounted(() => {
    const w = el.value?.offsetWidth!;
    const h = el.value?.offsetHeight!;
    //房间
    const scene = new THREE.Scene()

    // 东西
    //物体 ：geometry 骨架  + moterial 材质
    //创建立方体
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const moterial = new THREE.MeshBasicMaterial()
    const cube = new THREE.Mesh(geometry, moterial)
    scene.add(cube)

    // 光线
    const light = new THREE.AmbientLight()
    scene.add(light)


    // 相机
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
    //设置相机位置
    camera.position.set(0, 0, 5)
    //相机的朝向
    camera.lookAt(0, 0, 0)

    //渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(w, h)
    renderer.render(scene, camera)
    el.value?.appendChild(renderer.domElement);
    console.log(renderer, 'pppp')
})


</script>
<style scoped >
.gxh {
    width: 1000px;
    height: 500px;
}
</style>