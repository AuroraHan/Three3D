<!-- 物理效果 -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import BaseThree from "@/utils/baseThree";

class MyPhysics extends BaseThree {

    sphere: THREE.Mesh | undefined
    controls: OrbitControls | undefined

    constructor() {
        super()
        this.init();
        this.common()
        this.createMesh()
        this.addLight()
        this.animate()
        this.addControls()
        this.initHelper()
    }

    common() {
        //设置相机位置
        this.camera?.position.set(0, 2, 7)
        //设置场景颜色
        this.scene!.background = new THREE.Color(0xd3d3d3)
    }


    createMesh() {

        const sphereGeom = new THREE.SphereGeometry(1, 32, 32);
        const sphereMater = new THREE.MeshNormalMaterial();
        this.sphere = new THREE.Mesh(sphereGeom, sphereMater)

        this.scene?.add(this.sphere)
    }

    addLight() {
        const light = new THREE.AmbientLight(0x404040); // 柔和的白光
        this.scene?.add(light);
    }

    //控制器
    addControls() {
        this.controls = new OrbitControls(this.camera!, this.renderer?.domElement);
    }

    animate() {
        this.renderer?.render(this.scene!, this.camera!)
        this.controls?.update()
        requestAnimationFrame(this.animate.bind(this));
    }
}

const my = new MyPhysics()
</script>
<style scoped lang='scss'></style>