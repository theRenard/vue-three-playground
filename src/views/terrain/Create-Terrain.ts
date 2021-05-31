import {
  BufferAttribute, Mesh, MeshBasicMaterial, PlaneBufferGeometry,
} from 'three';

export default class CreateTerrain {
  private landGeometry: PlaneBufferGeometry;
  private landMaterial: MeshBasicMaterial;
  private landMesh: Mesh;
  constructor() {
    this.landGeometry = new PlaneBufferGeometry(10, 10, 20, 20);
    this.landMaterial = new MeshBasicMaterial({
      color: 'blue',
      wireframe: true,
    });

    // Modify vertices
    const { count } = this.landGeometry.attributes.position;

    const displacement = new Float32Array(this.landGeometry.attributes.position.count);
    const newPosition = new Float32Array(this.landGeometry.attributes.position.count);

    for (let i = 0; i < displacement.length; i += 1) {
      // if (i % 3 === 0) newPosition[i] = Math.random() * 5;
      // else
      newPosition[i] = this.landGeometry.attributes.position.array[i];
    }

    this.landGeometry.setAttribute('position', new BufferAttribute(newPosition, 3));
    this.landGeometry.attributes.position.needsUpdate = true;

    this.landMesh = new Mesh(this.landGeometry, this.landMaterial);
  }

  public get land(): Mesh {
    return this.landMesh;
  }

}
