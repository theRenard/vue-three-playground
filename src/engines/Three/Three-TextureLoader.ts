import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import { LoadingManager, TextureLoader } from 'three';

const manager = new LoadingManager();
manager.addHandler(/\.dds$/i, new DDSLoader());

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const objLoader = new OBJLoader(manager);
const textureLoader = new TextureLoader(manager);

export {
  manager,
  objLoader,
  gltfLoader,
  textureLoader,
};
