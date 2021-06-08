import {
  BufferAttribute, BufferGeometry, Mesh, MeshBasicMaterial, PlaneBufferGeometry,
} from 'three';

export default class CreateTerrain {
  private landGeometry: BufferGeometry;
  private landMaterial: MeshBasicMaterial;
  private landMesh: Mesh;
  constructor() {
    const planeGeometry = new PlaneBufferGeometry(10, 10, 20, 20);
    this.landGeometry = new BufferGeometry();
    this.landMaterial = new MeshBasicMaterial({
      color: 'blue',
      wireframe: true,
    });

    // Modify vertices
    const { count } = this.landGeometry.attributes.position;
    // const count = 300;

    const newPosition = new Float32Array(count * 3 * 3);

    for (let i = 0; i < count; i += 1) {
      // if (i % 3 === 0) newPosition[i] = Math.random() * 5;
      // else {
      // }
      newPosition[i] = (Math.random() - 0.5) * 4;
      newPosition[i] = planeGeometry.attributes.position.array[i];

    }

    this.landGeometry.setAttribute('position', new BufferAttribute(newPosition, 3));
    this.landGeometry.attributes.position.needsUpdate = true;

    this.landMesh = new Mesh(this.landGeometry, this.landMaterial);
  }

  public get land(): Mesh {
    return this.landMesh;
  }

}
