<!-- 粒子效果 -->
<template>
    <div ref="container" class="gxh"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as THREE from "three";
import useThree from '@/hooks/useThree'

const { container, scene, render } = useThree()

onMounted(() => {
    //1、根据基本物体创建物体
    // const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
    // const pointMaterial = new THREE.PointsMaterial({
    //     color: new THREE.Color(0xff0000),
    //     size: 0.02,
    //     sizeAttenuation: true,
    // })

    //2、自定义创建
    //总数
    const count = 10000
    const vertices = [];
    const colors = []

    for (let i = 0; i < count; i++) {

        //randFloatSpread 随机一个浮点数
        const x = THREE.MathUtils.randFloatSpread(100);
        const y = THREE.MathUtils.randFloatSpread(100);
        const z = THREE.MathUtils.randFloatSpread(100);

        vertices.push(x, y, z);

        //随机颜色
        const r = Math.random()
        const g = Math.random()
        const b = Math.random()
        colors.push(r, g, b)

    }

    const geometry = new THREE.BufferGeometry();
    //位置
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    //颜色
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const textureLoader = new THREE.TextureLoader()
    const particleTexture = textureLoader.load('https://gw.alicdn.com/imgextra/i3/O1CN01DO6Ed61QtcMKsVnK2_!!6000000002034-2-tps-56-56.png')


    const pointMaterial = new THREE.PointsMaterial({
        // color: new THREE.Color(0xff88cc),
        size: 0.8,
        sizeAttenuation: true,
        //添加贴图
        map: particleTexture,
        //设置透明 下面三个需要一起设置
        alphaMap: particleTexture,
        alphaTest: 0.001,
        transparent: true,
        depthWrite: false,
        //是否使用顶点着色
        vertexColors: true
    })

    pointMaterial.blending = THREE.AdditiveBlending

    //点材质
    const points = new THREE.Points(geometry, pointMaterial)

    scene.value?.add(points)

    const clock = new THREE.Clock()
    // const tick = () => {
    //     const elapsedTime = clock.getElapsedTime()
    //     for (let index = 1; index <= count; index++) {
    //         geometry.attributes.position.setY(index, Math.sin(elapsedTime))

    //     }
    //     render()
    //     geometry.attributes.position.needsUpdate = true
    //     requestAnimationFrame(tick)
    // }

    render()
    // tick()
})

</script>

<style scoped>
.gxh {
    width: 100vw;
    height: 100vh;
}
</style>