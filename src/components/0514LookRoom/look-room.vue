<!-- 3D看房模拟 -->
<template>
    <div id="container" ref="container"></div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

const container = ref()

let camera: THREE.PerspectiveCamera,
    scens: THREE.Scene,
    renderer: THREE.WebGLRenderer,
    mesh: THREE.Mesh;

const init = () => {
    //创建场景
    scens = new THREE.Scene()

    //创建相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 1

    //创建物体
    // const geometry = new THREE.BoxGeometry(200, 200, 200)
    // const material = new THREE.MeshBasicMaterial({ color: '#ff0000' })
    // mesh = new THREE.Mesh(geometry, material)
    // scens.add(mesh)
    const geometry = new THREE.SphereGeometry(5, 32, 32)
    const load = new RGBELoader()
    load.load('/public/hdr/room.hdr', (texture) => {
        const material = new THREE.MeshBasicMaterial({ map: texture })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.geometry.scale(1, 1, -1)
        scens.add(mesh)
    })


    //进行渲染
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.value.appendChild(renderer.domElement)

    //控制相机对象
    const controls = new OrbitControls(camera, container.value);
    controls.enableDamping = true

    //监听窗口大小变换
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    //更新相机投影矩阵,当相机视口变化时就需要
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scens, camera);
}
onMounted(() => {
    init()
    animate()
})


</script>
<style scoped>
body html {
    padding: 0;
    margin: 0;
}

#container {
    width: 100vw;
    height: 100vh;
}
</style>