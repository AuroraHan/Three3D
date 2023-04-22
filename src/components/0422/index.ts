import * as THREE from "three";
//创建一个函数，用于生成随机颜色的材质
export const createMaterial = () => {
  const material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
  });
  const hue = Math.random();
  const saturation = 1;
  const luminance = 0.5;
  material.color.setHSL(hue, saturation, luminance);

  return material;
};
