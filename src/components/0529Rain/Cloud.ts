import * as THREE from "three";

const texture = new THREE.TextureLoader().load("/public/cloud.png");
//云层几何
const cloudGeo = new THREE.PlaneGeometry(564, 300);
//云层材质
const cloudMat = new THREE.MeshLambertMaterial({
	map: texture,
	alphaMap: texture,
	transparent: true
});

//云层
export default class Cloud {
	instance: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshLambertMaterial>;
	constructor() {
		//生成云朵物体
		const cloud = new THREE.Mesh(cloudGeo, cloudMat);
		//透明度
		cloud.material.opacity = 0.6;
		this.instance = cloud;
	}

	//设置位置
	setPosition(x: number, y: number, z: number) {
		this.instance.position.set(x, y, z);
	}

	//旋转
	setRotation(x: number, y: number, z: number) {
		this.instance.rotation.x = x;
		this.instance.rotation.y = y;
		this.instance.rotation.z = z;
	}

	//动画
	animate() {
		this.instance.rotation.z -= 0.003;
	}
}
