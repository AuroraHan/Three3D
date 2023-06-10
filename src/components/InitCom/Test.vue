<!--  -->
<template>
  <div></div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import * as THREE from "three";
import ThreeJs from "./index";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import BaseThree from "@/utils/baseThree";

class MyPhysics extends BaseThree {

  sphere: THREE.Mesh | undefined
  box: THREE.Mesh | undefined
  controls: OrbitControls | undefined
  clock!: THREE.Clock;

  constructor() {
    super()
    this.init();
    this.common()
    this.createMesh()
    this.addLight()
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
    // 球
    const sphereGeom = new THREE.SphereGeometry(1, 32, 32);
    const sphereMater = new THREE.MeshNormalMaterial();
    this.sphere = new THREE.Mesh(sphereGeom, sphereMater)

    //正方体
    const boxGeom = new THREE.BoxGeometry()
    const boxMater = new THREE.MeshNormalMaterial()
    this.box = new THREE.Mesh(boxGeom, boxMater)

    this.scene?.add(this.box)
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
    // 获取经过的时间
    let deltaTime = this.clock.getDelta();
    /**第一种旋转 */
    // this.box!.rotation.x += deltaTime
    // this.box!.rotation.y += deltaTime

    /**第二种旋转 */
    this.box?.rotateX(deltaTime)
    this.box?.rotateY(deltaTime)
    requestAnimationFrame(this.animate.bind(this));
  }
}

const my = new MyPhysics()


</script>
<style scoped></style>
