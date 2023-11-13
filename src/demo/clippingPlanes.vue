<!-- 切割面 -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import * as THREE from "three";
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import BaseThree from "../utils/baseThree";

class ClippingPlanes extends BaseThree {

    objectMesh: THREE.Mesh | undefined;
    groundMesh: THREE.Mesh | undefined;
    controls: OrbitControls | undefined;
    startTime: number | undefined;
    currentTime: number | undefined;

    constructor() {
        super()
        this.initScene()
        this.addCamera()
        this.scene?.add(new THREE.AmbientLight(0xcccccc))
        this.addSpotLight()
        this.addPlant()
        this.addRenderer()
        this.initControls()
        this.animate()
        this.initHelper()
    }

    //添加相机
    addCamera() {
        this.camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.25, 16);
        this.camera.position.set(0, 1.3, 3);
    }

    //添加聚光灯
    addSpotLight() {
        const spotLight = new THREE.SpotLight(0xffffff, 60);
        spotLight.angle = Math.PI / 5;
        spotLight.penumbra = 0.2;
        spotLight.position.set(2, 3, 3);
        spotLight.castShadow = true;
        spotLight.shadow.camera.near = 3;
        spotLight.shadow.camera.far = 10;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        this.scene?.add(spotLight);

        const dirLight = new THREE.DirectionalLight(0x55505a, 3);
        dirLight.position.set(0, 3, 0);
        dirLight.castShadow = true;
        dirLight.shadow.camera.near = 1;
        dirLight.shadow.camera.far = 10;

        dirLight.shadow.camera.right = 1;
        dirLight.shadow.camera.left = - 1;
        dirLight.shadow.camera.top = 1;
        dirLight.shadow.camera.bottom = - 1;

        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        this.scene?.add(dirLight);
    }

    //添加切割面
    addPlant() {
        //无限延展的平面
        const localPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.8);
        //const globalPlane = new THREE.Plane(new THREE.Vector3(- 1, 0, 0), 0.1);
        const material = new THREE.MeshPhongMaterial({
            color: 0x802e10,
            shininess: 100,
            side: THREE.DoubleSide,
            // ***** Clipping setup (material): *****
            clippingPlanes: [localPlane],
            clipShadows: true

        });

        const geometry = new THREE.TorusKnotGeometry(0.4, 0.08, 95, 20);
        this.objectMesh = new THREE.Mesh(geometry, material);
        this.objectMesh.castShadow = true
        this.scene?.add(this.objectMesh)

        //地平面
        this.groundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(9, 9, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xa0adaf, shininess: 150 })
        );

        this.groundMesh.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
        this.groundMesh.receiveShadow = true;
        this.scene?.add(this.groundMesh);
    }

    //添加渲染器
    addRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.shadowMap.enabled = true;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // window.addEventListener('resize', this.onWindowResize);
        document.body.appendChild(this.renderer.domElement);
        this.renderer.localClippingEnabled = true;
    }

    //控制器
    initControls() {
        this.controls = new OrbitControls(this.camera!, this.renderer!.domElement);
        this.controls.target.set(0, 1, 0);
        this.controls.update();

    }

    //动画
    animate() {

        const time = Date.now() / 1000;

        requestAnimationFrame(this.animate.bind(this));

        this.objectMesh!.position.y = 0.8;
        this.objectMesh!.rotation.x = time * 0.5;
        this.objectMesh!.rotation.y = time * 0.2;
        this.objectMesh!.scale.setScalar(Math.cos(time) * 0.125 + 0.875);

        this.renderer?.render(this.scene!, this.camera!);


    }

    //自适应屏幕
    onWindowResize() {
        this.camera!.aspect = window.innerWidth / window.innerHeight;
        this.camera!.updateProjectionMatrix();
        this.renderer!.setSize(window.innerWidth, window.innerHeight);

    }
}

const clipping = new ClippingPlanes()

</script>
<style scoped lang='scss'></style>