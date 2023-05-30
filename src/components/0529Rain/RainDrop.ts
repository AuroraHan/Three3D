import * as THREE from "three";
export default class RainDrop {
	drops: number;
	geom: THREE.BufferGeometry<THREE.NormalBufferAttributes>;
	velocityY: number[];
	instance: THREE.Points<
		THREE.BufferGeometry<THREE.NormalBufferAttributes>,
		THREE.PointsMaterial
	>;
	constructor() {
		// const texture = new THREE.TextureLoader().load("/images/rain-drop.png");s
		const material = new THREE.PointsMaterial({
			//用图片初始化顶点材质
			size: 0.8,
			color: new THREE.Color(0xeeeeee),
			// map: texture,
			transparent: true
		});

		const positions = [];

		this.drops = 8000;
		this.geom = new THREE.BufferGeometry();
		this.velocityY = [];

		for (let i = 0; i < this.drops; i++) {
			positions.push(Math.random() * 400 - 200);
			positions.push(Math.random() * 500 - 250);
			positions.push(Math.random() * 400 - 200);
			this.velocityY.push(0.5 + Math.random() / 2); //初始化每个粒子的坐标和粒子在Y方向的速度
		}

		//确定各个顶点的位置坐标
		this.geom.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(positions, 3)
		);
		this.instance = new THREE.Points(this.geom, material); //初始化粒子系统
	}

	animate() {
		const positions = this.geom.attributes.position.array;

		for (let i = 0; i < this.drops * 3; i += 3) {
			//改变Y坐标，加速运动
			this.velocityY[i / 3] += Math.random() * 0.005;
			positions[i + 1] -= this.velocityY[i / 3];
			if (positions[i + 1] < -200) {
				positions[i + 1] = 200;
				this.velocityY[i / 3] = 0.5 + Math.random() / 2;
			}
		}
		this.instance.rotation.y += 0.002;
		this.geom.attributes.position.needsUpdate = true;
	}
}
