<!-- 光纤投射器 -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import * as THREE from "three";

import BaseThree from '../../utils/baseThree';

class Raycaster extends BaseThree {

    raycaster = new THREE.Raycaster();
    pointer: THREE.Vector2;
    static _this: any;


    constructor() {
        super()
        this.pointer = new THREE.Vector2(0, 0);
        this.initScene()
        this.initPerspectiveCamera()
        this.initRenderer()
        this.animate()
        Raycaster._this = this
        window.addEventListener('pointermove', this.onPointerMove);
    }


    myRender() {

        //使用相机和指针位置更新拾取光线 -通过摄像机和鼠标位置更新射线
        this.raycaster.setFromCamera(this.pointer, this.camera!)

        //计算与拾取射线相交的对象 -  计算物体和射线的焦点
        const intersects = this.raycaster.intersectObjects(this.scene!.children, true);

        console.log(intersects);
        debugger

        for (let i = 0; i < intersects.length; i++) {

            intersects[i].object.material.color.set(0xff0000);

        }

        this.renderer?.render(this.scene!, this.camera!);

    }

    //动画
    animate() {

        requestAnimationFrame(this.animate.bind(this));
        this.myRender()
    }

    //
    onPointerMove(event: PointerEvent) {


        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components

        // console.log((event.clientX / window.innerWidth) * 2 - 1)
        // console.log(Raycaster._this)
        // console.log(this.raycaster);

        // this.pointer.setX((event.clientX / window.innerWidth) * 2 - 1);
        // this.pointer.setY(- (event.clientY / window.innerHeight) * 2 + 1);
        Raycaster._this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
        console.log(Raycaster._this.pointer.x);

        // Raycaster._this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1
    }

}

const raycaster = new Raycaster()

</script>
<style scoped lang='scss'></style>