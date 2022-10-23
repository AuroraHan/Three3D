<!--  -->
<template>
  <div></div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import ThreeJs from "./index";

onMounted(() => {
  new ThreeJs();
});
</script>
<style scoped></style>
