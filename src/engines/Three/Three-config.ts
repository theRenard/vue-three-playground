export default class Config {
  static width = window.innerWidth;
  static height = window.innerHeight;
  static get aspRatio(): number {
    return this.width / this.height;
  }
}
