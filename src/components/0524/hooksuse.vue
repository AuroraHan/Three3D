<template>
    <div ref="container" class="gxh"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useThree from '@/hooks/useThree'

const { container, camera, scene } = useThree()

console.log(container)
console.log(scene)
console.log(camera)

</script>

<style scoped lang="scss"></style>