import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { onMounted, shallowRef, ref } from "vue";
import ThreeBase from "./core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function useThree() {
	const container = ref<HTMLElement>();
	const scene = shallowRef<THREE.Scene>();
	const camera = shallowRef<THREE.PerspectiveCamera>();
	const renderer = shallowRef<THREE.WebGLRenderer>();
	const control = shallowRef<OrbitControls>();
	onMounted(() => {
		const el = container.value as HTMLElement;
		scene.value = ThreeBase.initScene();
		camera.value = ThreeBase.initCamera(el);
		renderer.value = ThreeBase.initRenderer(el);
		control.value = ThreeBase.initControl(
			camera.value,
			renderer.value.domElement
		);
	});

	/**
	 * 进行渲染
	 */
	const render = () => {
		renderer.value?.render(scene.value!, camera.value!);
		control.value?.update();
		requestAnimationFrame(() => render());
	};

	//监听窗口变化
	window.addEventListener("resize", () => {
		onWindowResize();
	});

	/**
	 * 监听窗口大小
	 */
	const onWindowResize = () => {
		camera.value!.aspect =
			container.value!.offsetWidth / container.value!.offsetHeight;
		camera.value?.updateProjectionMatrix();
		renderer.value?.setSize(
			container.value!.offsetWidth,
			container.value!.offsetHeight
		);
	};

	return {
		container,
		scene,
		camera,
		renderer,
		control,
		render
	};
}

export default useThree;
