<!-- 星河  粒子 -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import * as THREE from "three";

import BaseThree from "@/utils/baseThree";

class StarRive extends BaseThree {

    xh: THREE.Points;

    constructor() {
        super()
        this.initScene()
        this.initPerspectiveCamera()
        this.initRenderer()

        this.xh = this.createPoints('xh')

        this.animate()
    }

    createPoints(textureUrl: string, size = 0.5, color = '0xffffff'): THREE.Points {
        //创建几何
        const particleGeometry = new THREE.BufferGeometry()
        const count = 5000

        //设置缓冲区数组
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 100
            colors[i] = Math.random()
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        //设置点材质
        const ponintMeterial = new THREE.PointsMaterial()

        ponintMeterial.size = size
        ponintMeterial.color.set(color)

        //载入纹理
        const textureLoader = new THREE.TextureLoader()
        const texture = textureLoader.load(`/public/texture/${textureUrl}.png`)

        //设置点的材质
        ponintMeterial.map = texture
        ponintMeterial.alphaMap = texture
        ponintMeterial.transparent = true
        //否对深度缓冲区有任何影响
        ponintMeterial.depthWrite = false
        //示对象时要使用何种混合
        ponintMeterial.blending = THREE.AdditiveBlending
        //使用顶点着色
        ponintMeterial.vertexColors = true

        const point = new THREE.Points(particleGeometry, ponintMeterial)
        this.scene?.add(point)

        return point
    }

    animate() {
        const clock = new THREE.Clock()
        let time = clock.getElapsedTime()
        this.xh.rotation.x += time * 0.03
        this.xh.rotation.y += time * 0.01
        // this.xh.rotateX(time * 0.3)
        // this.xh.rotateY(time * 0.2)
        // console.log(this.xh.rotation)
        this.renderer?.render(this.scene!, this.camera!)

        requestAnimationFrame(this.animate.bind(this));
    }
}

const text = new StarRive()

</script>
<style scoped lang='scss'></style>