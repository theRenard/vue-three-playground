import { LoadingManager, Scene, TextureLoader } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
import { gsap } from 'gsap';

const manager = new LoadingManager();
manager.addHandler(/\.dds$/i, new DDSLoader());
const jetObjLoader = new OBJLoader(manager);
const textureLoader = new TextureLoader(manager);

const jetColorTexture = textureLoader.load('./textures/airplane/diffuse.jpg');
const jetNormalTexture = textureLoader.load('./textures/airplane/normal.png');
export default (scene: Scene): void => {
  jetObjLoader.load(
    './models/airplane/airplane.obj',
    (object) => {
      object.scale.set(0.0035, 0.0035, 0.0035);
      object.traverse((c) => {
        const child = c as any;
        if (child.isMesh) {
          child.material.map = jetColorTexture;
          child.material.normalMap = jetNormalTexture;
        }
      });

      scene.add(object);

      const anim = () => {
        gsap.to([object.position, object.rotation], {
          duration: Math.floor(Math.random() * 3) + 2,
          x: (Math.random() - 0.5) * 0.05,
          y: (Math.random() - 0.5) * 0.05,
          z: (Math.random() - 0.5) * 0.05,
          // z: 2,
          // yoyo: true,
          ease: 'power1.inOut',
          onComplete: () => {
            anim();
          },
        });
      };

      anim();
    },
    (xhr) => {
      console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
      console.log('An error happened');
    },
  );
};
