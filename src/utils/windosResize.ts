import * as THREE from "three";

const windowsResize = (
	camera: THREE.PerspectiveCamera,
	renderer: THREE.WebGLRenderer
) => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
};
