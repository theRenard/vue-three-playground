import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
import { LoadingManager, TextureLoader } from 'three';

const manager = new LoadingManager();
manager.addHandler(/\.dds$/i, new DDSLoader());

const jetObjLoader = new OBJLoader(manager);
const textureLoader = new TextureLoader(manager);

export {
  manager,
  jetObjLoader,
  textureLoader,
};
