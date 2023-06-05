import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	Vector3,
	AxesHelper
} from "three";

export default class BaseThree {
	el: HTMLElement;
	scene: Scene | undefined;
	camera: PerspectiveCamera | undefined;
	renderer: WebGLRenderer | undefined;
	axesHelper: AxesHelper | undefined;

	w: number;
	h: number;

	constructor() {
		this.el = document.body;
		this.w = window.innerWidth;
		this.h = window.innerHeight;
	}

	//初始化场景
	initScene() {
		this.scene = new Scene();
	}

	//初始化相机
	initPerspectiveCamera() {
		const camera = new PerspectiveCamera(75, this.w / this.h, 0.01, 1000);
		//相机位置
		const cameraPosition = new Vector3(0, 1, 3);
		camera.position.copy(cameraPosition);

		//
		const cameraLook = new Vector3(0, 0, 0);
		camera.lookAt(cameraLook);

		this.camera = camera;
		this.scene?.add(camera);
	}

	//初始化渲染器 https://juejin.cn/post/6940542710709223432#heading-7
	initRenderer() {
		const renderer = new WebGLRenderer();
		renderer.setSize(this.w, this.h);
		this.el.appendChild(renderer.domElement);
		this.renderer = renderer;
	}

	//添加辅助线
	initHelper(long = 5) {
		this.axesHelper = new AxesHelper(long);
		this.scene?.add(this.axesHelper);
	}

	//初始化
	init() {
		this.initScene();
		this.initPerspectiveCamera();
		this.initRenderer();
	}
}
