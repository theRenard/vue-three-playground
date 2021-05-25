import {
  RepeatWrapping, PlaneGeometry, MeshStandardMaterial, Mesh, Float32BufferAttribute,
} from 'three';
import {
  grassColorTexture,
  grassAmbientOcclusionTexture,
  grassNormalTexture,
  grassRoughnessTexture,
} from './textures';

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = RepeatWrapping;
grassNormalTexture.wrapS = RepeatWrapping;
grassRoughnessTexture.wrapS = RepeatWrapping;

grassColorTexture.wrapT = RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = RepeatWrapping;
grassNormalTexture.wrapT = RepeatWrapping;
grassRoughnessTexture.wrapT = RepeatWrapping;

// Floor
const floor = new Mesh(
  new PlaneGeometry(20, 20),
  new MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture, // needs uv2 attribute
    displacementScale: 0.1,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  }),
);

// uv2 attribute
const uv2attribute = new Float32BufferAttribute(floor.geometry.attributes.uv.array, 2);
floor.geometry.setAttribute('uv2', uv2attribute);

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
floor.receiveShadow = true;

export default floor;
