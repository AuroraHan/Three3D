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
    //创建物体
    const geometry = new THREE.SphereGeometry(1, 16, 16);
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material)

    //创建组
    const group = new THREE.Group()

    group.add(cube)

    for (let i = 0; i < 1; i += 0.05) {
        const sphereClone = cube.clone()
        sphereClone.position.x = Math.cos(2 * Math.PI * i)
        sphereClone.position.y = Math.sin(2 * Math.PI * i)
        //物体缩放
        sphereClone.scale.multiplyScalar(0.01 + i);
        group.add(sphereClone)
    }

    //物体缩放
    group.scale.multiplyScalar(2);

    //添加组
    scene.value?.add(group)

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