<template>
    <div ref="container" class="gxh"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as THREE from "three";
import useThree from '@/hooks/useThree'
const el = ref()

const { container, camera, scene } = useThree()

//创建物体
onMounted(() => {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial()
    const cube = new THREE.Mesh(geometry, material)
    scene.value?.add(cube)

})

console.log(container)
console.log(scene)
console.log(camera)

</script>

<style scoped>
.gxh {
    width: 1000px;
    height: 500px;
    /* background-color: red; */
}
</style>