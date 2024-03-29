<!-- 交互光线投射点 -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import * as THREE from "three";
import { generatePointCloudGeometry } from '@/utils/geometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import BaseThree from "../utils/baseThree";

class InteractiveRaycastingPoints extends BaseThree {
    //点大小
    pointSize = 0.05;
    width = 80;
    length = 160;
    pointclouds = [] as any[]
    threshold = 0.1;
    intersection = null as any;
    toggle = 0;
    spheresIndex = 0;

    spheres = [] as THREE.Mesh[];

    //鼠标移动的点
    pointer = new THREE.Vector2();

    //根据Y轴旋转设置
    rotateY = new THREE.Matrix4().makeRotationY(0.005);

    clock: THREE.Clock
    controls: OrbitControls | undefined;
    raycaster: THREE.Raycaster | undefined

    constructor() {
        super()
        //初始化场景和相机
        this.initScene()
        this.initPerspectiveCamera()
        this.initHelper()


        const cameraPosition = new THREE.Vector3(2, 5, 6);
        this.camera?.position.copy(cameraPosition);


        //时钟
        this.clock = new THREE.Clock()

        this.initRenderer()
        this.pointsInit()
        this.animate()
        this.myRenderer()
        this.initControls()
    }

    //控制器
    initControls() {
        this.controls = new OrbitControls(this.camera!, this.renderer!.domElement);
        this.controls.target.set(0, 1, 0);
        this.controls.update();

    }

    pointsInit() {

        //
        const pcBuffer = this.generatePointcloud(new THREE.Color(1, 0, 0), this.width, this.length);
        pcBuffer.scale.set(5, 10, 10);
        pcBuffer.position.set(- 5, 0, 0);
        this.scene?.add(pcBuffer);

        //
        const pcIndexed = this.generateIndexedPointcloud(new THREE.Color(0, 1, 0), this.width, this.length);
        pcIndexed.scale.set(5, 10, 10);
        pcIndexed.position.set(0, 0, 0);
        this.scene?.add(pcIndexed);

        // //
        const pcIndexedOffset = this.generateIndexedWithOffsetPointcloud(new THREE.Color(0, 1, 1), this.width, this.length);
        pcIndexedOffset.scale.set(5, 10, 10);
        pcIndexedOffset.position.set(5, 0, 0);
        this.scene?.add(pcIndexedOffset);

        this.pointclouds = [pcBuffer, pcIndexed, pcIndexedOffset]

        //
        const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        for (let i = 0; i < 40; i++) {

            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            this.scene?.add(sphere);
            this.spheres.push(sphere);

        }

        //
        this.raycaster = new THREE.Raycaster();
        this.raycaster.params.Points!.threshold = this.threshold;

        document.addEventListener('pointermove', this.onPointerMove.bind(this));
    }

    myRenderer() {
        this.camera?.applyMatrix4(this.rotateY)
        this.camera?.updateMatrixWorld()

        this.raycaster?.setFromCamera(this.pointer, this.camera!);

        const intersections = this.raycaster?.intersectObjects(this.pointclouds, false);
        this.intersection = (intersections!.length) > 0 ? intersections![0] : null;

        if (this.toggle > 0.02 && this.intersection !== null) {

            this.spheres[this.spheresIndex].position.copy(this.intersection.point);
            this.spheres[this.spheresIndex].scale.set(1, 1, 1);
            this.spheresIndex = (this.spheresIndex + 1) % this.spheres.length;

            this.toggle = 0;
        }
        for (let i = 0; i < this.spheres.length; i++) {

            const sphere = this.spheres[i];
            sphere.scale.multiplyScalar(0.98);
            sphere.scale.clampScalar(0.01, 1);

        }

        this.toggle += this.clock.getDelta();

        this.renderer?.render(this.scene!, this.camera!);
    }

    //动画
    animate() {

        requestAnimationFrame(this.animate.bind(this));

        // this.renderer?.render(this.scene!, this.camera!);
        this.myRenderer()

    }

    //鼠标移动生成的点
    onPointerMove(event: { clientX: number; clientY: number; }) {

        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    }

    //生成点状云
    generatePointcloud(color: THREE.Color, width: number, length: number) {

        const geometry = generatePointCloudGeometry(color, width, length);
        const material = new THREE.PointsMaterial({ size: this.pointSize, vertexColors: true });

        return new THREE.Points(geometry, material);
    }

    //生成一定数量的点状
    generateIndexedPointcloud(color: THREE.Color, width: number, length: number) {

        const geometry = generatePointCloudGeometry(color, width, length);
        const numPoints = width * length;
        const indices = new Uint16Array(numPoints);

        let k = 0;

        for (let i = 0; i < width; i++) {

            for (let j = 0; j < length; j++) {

                indices[k] = k;
                k++;
            }
        }

        geometry.setIndex(new THREE.BufferAttribute(indices, 1));

        const material = new THREE.PointsMaterial({ size: this.pointSize, vertexColors: true });

        return new THREE.Points(geometry, material);

    }

    //
    generateIndexedWithOffsetPointcloud(color: THREE.Color, width: number, length: number) {

        const geometry = generatePointCloudGeometry(color, width, length);
        const numPoints = width * length;
        const indices = new Uint16Array(numPoints);

        let k = 0;

        for (let i = 0; i < width; i++) {

            for (let j = 0; j < length; j++) {

                indices[k] = k;
                k++;

            }

        }

        geometry.setIndex(new THREE.BufferAttribute(indices, 1));
        geometry.addGroup(0, indices.length);

        const material = new THREE.PointsMaterial({ size: this.pointSize, vertexColors: true });

        return new THREE.Points(geometry, material);

    }
}

const rayPoints = new InteractiveRaycastingPoints()

</script>
<style scoped lang='scss'></style>