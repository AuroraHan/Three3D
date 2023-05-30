import * as THREE from "three";
import BaseThree from "@/utils/baseThree";
import Cloud from "./Cloud";
import RainDrop from "./RainDrop";
export default class Director extends BaseThree {
	clouds!: Cloud[];
	lightning: THREE.PointLight | undefined;
	rainDrop: RainDrop | undefined;
	constructor() {
		super();
		//初始化 场景、相机、渲染器
		this.init();

		this.camera!.rotation.x = 1.16;
		this.camera!.rotation.y = -0.12;
		this.camera!.rotation.z = 0.27;

		//添加物体
		this.addCloud(); //添加云层和雨滴
		this.addRainDrop();

		//添加光线
		this.initLight(); //添加光照，用PointLight模拟闪电
		this.addLightning();

		//添加雾
		//this.addFog(); //添加雾，在相机附近视野清晰，距离相机越远，雾的浓度越高

		//实现动画
		this.animate(); //requestAnimationFrame实现动画
	}

	addCloud() {
		this.clouds = []; //注意
		for (let i = 0; i < 30; i++) {
			const cloud = new Cloud();
			cloud.setPosition(
				Math.random() * 1000 - 460,
				600,
				Math.random() * 500 - 400
			);
			cloud.setRotation(1.16, -0.12, Math.random() * 360);
			this.clouds.push(cloud);
			this.scene?.add(cloud.instance);
		}
	}

	initLight() {
		//环境光
		const ambientLight = new THREE.AmbientLight(0x555555);
		this.scene?.add(ambientLight);

		//平行光
		const directionLight = new THREE.DirectionalLight(0xffeedd);
		directionLight.position.set(0, 0, 1);
		this.scene?.add(directionLight);
	}

	addLightning() {
		const lightning = new THREE.PointLight(0x062d89, 30, 500, 1.7);
		lightning.position.set(200, 300, 100);
		this.scene?.add(lightning);
		this.lightning = lightning;
	}

	addRainDrop() {
		this.rainDrop = new RainDrop();
		this.scene?.add(this.rainDrop.instance);
	}

	animate() {
		this.clouds.forEach((cloud) => {
			cloud.animate();
		});

		//lightning
		if (Math.random() > 0.93 || this.lightning!.power > 100) {
			if (this.lightning!.power < 100) {
				this.lightning!.position.set(
					Math.random() * 400,
					300 + Math.random() * 200,
					100
				);
			}
			this.lightning!.power = 50 + Math.random() * 500;
		}
		this.rainDrop!.animate();

		this.renderer?.render(this.scene!, this.camera!);
		requestAnimationFrame(this.animate.bind(this));
	}
}
