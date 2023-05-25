<template>
    <div ref="container" class="gxh"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as THREE from "three";
import useThree from '@/hooks/useThree'

const { container, scene, render } = useThree()

//创建物体
onMounted(() => {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshNormalMaterial()
    const cube = new THREE.Mesh(geometry, material)
    scene.value?.add(cube)

    // 光线
    const light = new THREE.AmbientLight()
    scene.value?.add(light)

    //添加辅助线
    const axesHelper = new THREE.AxesHelper(4);
    scene.value?.add(axesHelper)

    render()
})


</script>

<style scoped>
.gxh {
    width: 100vw;
    height: 100vh;
}
</style>