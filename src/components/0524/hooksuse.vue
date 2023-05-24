<template>
    <div ref="container" class="gxh"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as THREE from "three";
import useThree from '@/hooks/useThree'

const { container, camera, scene, renderer, control } = useThree()

//创建物体
onMounted(() => {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial()
    const cube = new THREE.Mesh(geometry, material)
    scene.value?.add(cube)

    // 光线
    const light = new THREE.AmbientLight()
    scene.value?.add(light)

    renderer.value?.render(scene.value!, camera.value!)
    console.log(renderer.value)
})


</script>

<style scoped>
.gxh {
    width: 1000px;
    height: 500px;
    /* background-color: red; */
}
</style>