<!-- 基于GLSL语言 -->
<template>
    <div></div>
</template>

<script lang="ts" setup>
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import BaseThree from "@/utils/baseThree";

//顶点着色器
import vertexShader from '../../shader/water/vertex.glsl?raw';
import fragmantShader from '../../shader/water/fragment.glsl?raw';

class MyPhysics extends BaseThree {

    sphere: THREE.Mesh | undefined
    box: THREE.Mesh | undefined
    controls: OrbitControls | undefined
    clock!: THREE.Clock;
    floor: THREE.Mesh | undefined;

    constructor() {
        super()
        this.init();
        this.common()
        this.createMesh()
        this.createTime()
        this.addControls()
        this.initHelper()
        this.animate()
    }

    common() {
        //设置相机位置
        this.camera?.position.set(0, 2, 7)
        //设置场景颜色
        this.scene!.background = new THREE.Color(0xd3d3d3)
    }

    //创建时钟
    createTime() {
        this.clock = new THREE.Clock();
    }


    //创建物体
    createMesh() {

        //平面
        // 创建原始着色器材质
        const rawShaderMaterial = new THREE.RawShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmantShader
        })
        this.floor = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1, 64, 64),
            rawShaderMaterial
        )

        this.floor.rotation.x = -Math.PI / 2
        this.scene?.add(this.floor)

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