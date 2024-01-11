<!-- interactive_buffergeometry -->
<template>
    <div></div>
</template>

<script setup lang='ts'>
import * as THREE from "three";
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import BaseThree from "../utils/baseThree";

class InteractiveBuffergeometry extends BaseThree {
    geometry = new THREE.BufferGeometry();
    mesh: THREE.Mesh | undefined;
    line: THREE.Line | undefined;
    constructor() {
        super()
        this.initRenderer()
        this._initBase()
        this.createTriangles()
        this.animate()
        this._initRender()
        console.log(this.geometry)
        console.log(this.camera);
        console.log(this.scene);


    }

    //初始化场景等
    _initBase() {
        this.initScene()
        this.scene!.background = new THREE.Color(0x050505)
        this.scene!.fog = new THREE.Fog(0x050505, 2000, 3500);
        this.scene!.add(new THREE.AmbientLight(0x444444, 3));

        //设置相机属性
        this.initPerspectiveCamera()
        // this.camera!.position.z = 150
        this.camera!.position.set(100, 10, 10)
        this.camera!.near = 1
        this.camera!.fov = 3500

        // //添加光线
        const light1 = new THREE.DirectionalLight(0xffffff, 1.5)
        light1.position.set(1, 1, 1);
        this.scene!.add(light1);

        const light2 = new THREE.DirectionalLight(0xffffff, 4.5);
        light2.position.set(0, - 1, 0);
        this.scene!.add(light2);

        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const cube = new THREE.Mesh(geometry, material);
        // this.scene!.add(cube);

        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    _initRender() {
        const time = Date.now() * 0.001;
        this.mesh!.rotation.x = time * 0.15;
        this.mesh!.rotation.y = time * 0.25;
        this.renderer?.render(this.scene!, this.camera!);
    }

    //动画
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this._initRender()

    }

    //生成三角形
    createTriangles() {
        const triangles = 5000;

        const positions = new Float32Array(triangles * 3 * 3);
        const normals = new Float32Array(triangles * 3 * 3);
        const colors = new Float32Array(triangles * 3 * 3);

        const color = new THREE.Color();

        const n = 800, n2 = n / 2;	// triangles spread in the cube三角形在立方体中展开
        const d = 120, d2 = d / 2;	// individual triangle size 单个三角形尺寸

        const pA = new THREE.Vector3();
        const pB = new THREE.Vector3();
        const pC = new THREE.Vector3();

        const cb = new THREE.Vector3();
        const ab = new THREE.Vector3();

        for (let i = 0; i < positions.length; i += 9) {

            // positions

            const x = Math.random() * n - n2;
            const y = Math.random() * n - n2;
            const z = Math.random() * n - n2;

            const ax = x + Math.random() * d - d2;
            const ay = y + Math.random() * d - d2;
            const az = z + Math.random() * d - d2;

            const bx = x + Math.random() * d - d2;
            const by = y + Math.random() * d - d2;
            const bz = z + Math.random() * d - d2;

            const cx = x + Math.random() * d - d2;
            const cy = y + Math.random() * d - d2;
            const cz = z + Math.random() * d - d2;

            positions[i] = ax;
            positions[i + 1] = ay;
            positions[i + 2] = az;

            positions[i + 3] = bx;
            positions[i + 4] = by;
            positions[i + 5] = bz;

            positions[i + 6] = cx;
            positions[i + 7] = cy;
            positions[i + 8] = cz;

            // flat face normals

            pA.set(ax, ay, az);
            pB.set(bx, by, bz);
            pC.set(cx, cy, cz);

            cb.subVectors(pC, pB);
            ab.subVectors(pA, pB);
            cb.cross(ab);

            cb.normalize();

            const nx = cb.x;
            const ny = cb.y;
            const nz = cb.z;

            normals[i] = nx;
            normals[i + 1] = ny;
            normals[i + 2] = nz;

            normals[i + 3] = nx;
            normals[i + 4] = ny;
            normals[i + 5] = nz;

            normals[i + 6] = nx;
            normals[i + 7] = ny;
            normals[i + 8] = nz;

            // colors

            const vx = (x / n) + 0.5;
            const vy = (y / n) + 0.5;
            const vz = (z / n) + 0.5;

            color.setRGB(vx, vy, vz);

            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;

            colors[i + 3] = color.r;
            colors[i + 4] = color.g;
            colors[i + 5] = color.b;

            colors[i + 6] = color.r;
            colors[i + 7] = color.g;
            colors[i + 8] = color.b;

        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        this.geometry.computeBoundingSphere();

        let material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
            side: THREE.DoubleSide, vertexColors: true
        });

        this.mesh = new THREE.Mesh(this.geometry, material);
        this.scene?.add(this.mesh);

        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(4 * 3), 3));

        let materialLine = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true });

        this.line = new THREE.Line(this.geometry, materialLine);
        this.scene?.add(this.line);
    }

}

const demo = new InteractiveBuffergeometry()
</script>
<style scoped lang='scss'></style>