import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import * as THREE from "three";

class ThreeBase {
	/**
	 * 初始化场景
	 * @returns scene
	 */
	static initScene() {
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0x000000);
		return scene;
	}

	/**
	 * 初始化相机
	 * @param element HTMLElement
	 * @returns camera
	 */
	static initCamera(element: HTMLElement) {
		const fov = 75;
		const near = 0.1;
		const far = 2000;
		const aspect = element.offsetWidth / element.offsetHeight;
		const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		camera.position.set(0, 3, 3);
		return camera;
	}

	/**
	 *
	 * @param element
	 * @returns
	 */
	static initCSSRender(element: HTMLElement) {
		const CSSRenderer = new CSS2DRenderer();
		CSSRenderer.setSize(element.offsetWidth, element.offsetHeight);
		CSSRenderer.domElement.style.position = "absolute";
		CSSRenderer.domElement.style.top = "0px";
		element.appendChild(CSSRenderer.domElement);
		return CSSRenderer;
	}

	/**
	 * 初始化渲染
	 * @param element HTMLElement
	 * @returns renderer
	 */
	static initRenderer(element: HTMLElement) {
		const renderer = new THREE.WebGLRenderer({
			//抗锯齿
			antialias: true,
			alpha: true
		});
		renderer.shadowMap.enabled = true;
		renderer.setSize(element.offsetWidth, element.offsetHeight);
		renderer.localClippingEnabled = true;
		element.appendChild(renderer.domElement);
		return renderer;
	}

	/**
	 * 初始化控制器
	 * @param camera
	 * @param domElement
	 * @returns
	 */
	static initControl(camera: THREE.Camera, domElement: HTMLElement) {
		const control = new OrbitControls(camera, domElement);
		control.update();
		return control;
	}
}

export default ThreeBase;
