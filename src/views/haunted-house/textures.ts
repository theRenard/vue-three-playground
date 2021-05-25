import * as THREE from 'three';

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('./textures/haunted-house/door/color.jpg');
const doorAlphaTexture = textureLoader.load('./textures/haunted-house/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('./textures/haunted-house/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('./textures/haunted-house/door/height.jpg');
const doorNormalTexture = textureLoader.load('./textures/haunted-house/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('./textures/haunted-house/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('./textures/haunted-house/door/roughness.jpg');

// Walls

const bricksColorTexture = textureLoader.load('./textures/haunted-house/bricks/color.jpg');
const bricksAmbientOcclusionTexture = textureLoader.load('./textures/haunted-house/bricks/ambientOcclusion.jpg');
const bricksNormalTexture = textureLoader.load('./textures/haunted-house/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load('./textures/haunted-house/bricks/roughness.jpg');

// floor

const grassColorTexture = textureLoader.load('./textures/haunted-house/grass/color.jpg');
const grassAmbientOcclusionTexture = textureLoader.load('./textures/haunted-house/grass/ambientOcclusion.jpg');
const grassNormalTexture = textureLoader.load('./textures/haunted-house/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load('./textures/haunted-house/grass/roughness.jpg');

export {
  doorColorTexture,
  doorAlphaTexture,
  doorAmbientOcclusionTexture,
  doorHeightTexture,
  doorNormalTexture,
  doorMetalnessTexture,
  doorRoughnessTexture,
  bricksColorTexture,
  bricksAmbientOcclusionTexture,
  bricksNormalTexture,
  bricksRoughnessTexture,
  grassColorTexture,
  grassAmbientOcclusionTexture,
  grassNormalTexture,
  grassRoughnessTexture,
};
