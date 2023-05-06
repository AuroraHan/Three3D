<!--  -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import * as THREE from "three";

let camera: THREE.PerspectiveCamera,
    scens: THREE.Scene,
    renderer: THREE.WebGLRenderer,
    mesh: THREE.Mesh;

function init() {
    //创建一个场景
    scens = new THREE.Scene();

    //创建一个相机
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.z = 600

    //创建贴图
    const texture = new THREE.TextureLoader().load('../../../public/crate.gif')
    // texture

    //创建物体
    const geometry = new THREE.BoxGeometry(200, 200, 200)
    const material = new THREE.MeshBasicMaterial({ map: texture })

    mesh = new THREE.Mesh(geometry, material)

    scens.add(mesh)

    //渲染
    renderer = new THREE.WebGLRenderer({ antialias: true })
    //设置设备像素比
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

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

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;

    renderer.render(scens, camera);

}

init()
animate()

</script>
<style scoped lang='scss'></style>