import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { onMounted, shallowRef, ref } from "vue";
import ThreeBase from "./core";

function useThree() {
  const container = ref<HTMLElement>();
  const scene = shallowRef<THREE.Scene>();
  const camera = shallowRef<THREE.Camera>();

  onMounted(() => {
    const el = container.value as HTMLElement;
    scene.value = ThreeBase.initScene();
    camera.value = ThreeBase.initCamera(el);
  });

  return {
    container,
    scene,
    camera,
  };
}

export default useThree;
