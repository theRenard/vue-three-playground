import {
  PlaneGeometry, MeshStandardMaterial, Mesh, Float32BufferAttribute,
} from 'three';

const clouds = new Mesh(
  new PlaneGeometry(20, 20),
  new MeshStandardMaterial({
    color: 'blue',
  }),
);

// uv2 attribute
const uv2attribute = new Float32BufferAttribute(clouds.geometry.attributes.uv.array, 2);
clouds.geometry.setAttribute('uv2', uv2attribute);

clouds.rotation.x = -Math.PI * 0.5;
clouds.position.y = 0;
clouds.receiveShadow = true;

export default clouds;
