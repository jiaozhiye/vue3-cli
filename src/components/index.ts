/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 20:52:34
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 20:55:53
 */
import type { App } from 'vue';

import QmTest from './Test';

const components = [QmTest];

const install = (app: App): void => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

const version = '0.1.0';

export { QmTest, version, install };

export default { version, install };
