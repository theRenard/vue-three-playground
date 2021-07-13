import Entity from '@/engines/Three/Three-Entity';
import { Texture } from 'three';
import { gsap } from 'gsap';

export default class Sea extends Entity {
  airplane: any;
  airplaneAnimation: gsap.core.Tween;

  jetColorTexture: Texture;
  jetNormalTexture: Texture;

  init(): void {

    this.jetColorTexture = this.getSketch().getLoaders().textureLoader.load('./textures/airplane/diffuse.jpg');
    this.jetNormalTexture = this.getSketch().getLoaders().textureLoader.load('./textures/airplane/normal.png');

    this.getSketch().getLoaders().jetObjLoader.load(
      './models/airplane/airplane.obj',
      (airplane) => {

        this.airplane = airplane;

        this.airplane.scale.set(0.0035, 0.0035, 0.0035);
        this.airplane.traverse((c: any) => {
          const child = c as any;
          if (child.isMesh) {
            child.material.map = this.jetColorTexture;
            child.material.normalMap = this.jetNormalTexture;
          }
        });

        this.getSketch().getScene().add(this.airplane);

        this.airplaneAnimation = gsap.to([this.airplane.position, this.airplane.rotation], {
          duration: 'random(3, 5)',
          x: 'random(-0.1, 0.1)',
          y: 'random(-0.1, 0.2)',
          z: 'random(-0.05, 0.05)',
          ease: 'power1.inOut',
          repeatRefresh: true,
          repeat: -1,
        });

      },
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.log('An error happened');
      },
    );

  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  update(): void {
  }

  destroy(): void {
    this.getSketch().getScene().remove(this.airplane);
    this.jetColorTexture.dispose();
    this.jetNormalTexture.dispose();
    this.airplaneAnimation.kill();
  }
}
