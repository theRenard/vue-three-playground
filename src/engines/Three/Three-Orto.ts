import { OrthographicCamera } from 'three';
import Config from './Three-config';

export default new OrthographicCamera(-1 * Config.aspRatio, 1 * Config.aspRatio, 1, -1, 0.1, 100);
