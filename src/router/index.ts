import { createRouter, createWebHashHistory } from "vue-router";

import main from "@/page/index.vue";
import Test from "@/components/InitCom/Test.vue";
import day01 from "@/components/0414/init.vue";
import day02 from "@/components/0415/transfrom.vue";
import day03 from "@/components/0415/controls.vue";
import day04 from "@/components/0422/geometry.vue";
import day05 from "@/components/0423/scenegraph.vue";
import day06 from "@/components/0504/light.vue";
import day07 from "@/components/0505Geometry/geometrycube.vue";
import day08 from "@/components/0506Geometry/geometry-dynamic.vue";
import day09 from "@/components/0514LookRoom/look-room.vue";
import day10 from "@/components/0515Texture/texture.vue";
import day11 from "@/components/0518EnvTexture/eveTexture.vue";
import day12 from "@/components/0520Shadow/lightShadow.vue";
import day13 from "@/components/0520Example/bear.vue";
import day14 from "@/components/0524/hooksuse.vue";
import day15 from "@/components/0525Group/group.vue";
import day16 from "@/components/0526Particles/particles.vue";
import day17 from "@/components/0529Rain/rain.vue";
import day18 from "@/components/0530Camera/camera.vue";
import day19 from "@/components/0603Point/StarPoint.vue";
import day20 from "@/components/0605physics/physics.vue";
import day21 from "@/components/0610Shader/shader.vue";
import day22 from "@/components/0725Shader/waterShader.vue";
import day23 from "@/cannon/cannon1.vue";
import day24 from "@/cannon/cannon2.vue";
import day25 from "@/demo/clippingPlanes.vue";
import day26 from "@/demo/interactiveRaycastingPoints.vue";
import day27 from "@/components/1114Raycaster/raycaster.vue";
import day28 from "@/demo/interactive_buffergeometry.vue";

const routes = [
	{ path: "/", component: main },
	{ path: "/test", component: Test }
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export { router };
