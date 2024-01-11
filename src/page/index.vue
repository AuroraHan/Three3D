<template>
    <div class="container">
        <div class="box" v-for="(index) in 36">{{ index }}</div>
    </div>
</template>
 
<script setup lang="ts">

</script>
 
<style scoped>
.container {
    margin-top: 20px;
    margin-bottom: 20px;
    display: grid;
    /*  声明列的宽度  */
    grid-template-columns: repeat(6, 200px);
    /*  声明行间距和列间距  */
    grid-gap: 20px;
    /*  声明行的高度  */
    grid-template-rows: repeat(6, 200px);
    justify-content: center;
}

.box {
    background-color: aquamarine;
    /* justify-self: center; */
}
</style>
 