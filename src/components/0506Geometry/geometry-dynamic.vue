<!-- 几何动态 -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import * as THREE from "three";

//第一视角控制器你可以像第一视角射击游戏那样控制摄像机。鼠标用于控制视角，键盘用于控制移动角色
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

let camera: THREE.PerspectiveCamera,
    controls: FirstPersonControls,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer;

let mesh: THREE.Mesh,
    geometry: THREE.PlaneGeometry,
    material,
    clock: THREE.Clock;

const worldWidth = 128, worldDepth = 128;
init();
animate();
function init() {

    //创建一个场景
    scene = new THREE.Scene();
    //给场景创建背景颜色
    scene.background = new THREE.Color(0xaaccff)
    //定义场景中的雾
    scene.fog = new THREE.FogExp2(0xaaccff, 0.0007);

    //创建一个相机
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.y = 200

    //创建一个时钟
    clock = new THREE.Clock();

    //创建几何
    geometry = new THREE.PlaneGeometry(20000, 20000, worldWidth - 1, worldDepth - 1);
    //在 X 轴上旋转几何体
    geometry.rotateX(- Math.PI / 2);

    const position = geometry.attributes.position;
    position.usage = THREE.DynamicDrawUsage;

    for (let i = 0; i < position.count; i++) {
        const y = 35 * Math.sin(i / 2);
        position.setY(i, y);
    }

    //纹理
    const texture: THREE.Texture = new THREE.TextureLoader().load('../../../public/water.jpg');
    // wrapS定义了纹理贴图在水平方向上将如何包裹
    //wrapT定义了纹理贴图在垂直方向上将如何包裹
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    //决定纹理在表面的重复次数，两个方向分别表示U和V
    texture.repeat.set(5, 5);
    texture.colorSpace = THREE.SRGBColorSpace;

    // 物体
    material = new THREE.MeshBasicMaterial({ color: 0x0044ff, map: texture });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 渲染
    renderer = new THREE.WebGLRenderer({ antialias: true });
    //设置设备像素比。通常用于避免HiDPI设备上绘图模糊
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //第一人称控制
    controls = new FirstPersonControls(camera, renderer.domElement);
    controls.movementSpeed = 500;
    controls.lookSpeed = 0.1;

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.handleResize();

}

function animate() {
    requestAnimationFrame(animate);
    render();

}

function render() {

    const delta = clock.getDelta();
    const time = clock.getElapsedTime() * 10;

    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {

        const y = 35 * Math.sin(i / 5 + (time + i) / 7);
        position.setY(i, y);

    }

    position.needsUpdate = true;
    controls.update(delta);
    renderer.render(scene, camera);

}
</script>
<style scoped lang='scss'></style>