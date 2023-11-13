<!-- 交互光线投射点 -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import * as THREE from "three";
import BaseThree from "../utils/baseThree";

class InteractiveRaycastingPoints extends BaseThree {

    clock: THREE.Clock

    constructor() {
        super()
        //初始化场景和相机
        this.initScene()
        this.initPerspectiveCamera()

        //时钟
        this.clock = new THREE.Clock()
    }

    //
}

const rayPoints = new InteractiveRaycastingPoints()

</script>
<style scoped lang='scss'></style>