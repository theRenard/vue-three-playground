import { PerspectiveCamera } from 'three';
import Config from './Three-config';

export default new PerspectiveCamera(75, Config.width / Config.height, 0.1, 100);
