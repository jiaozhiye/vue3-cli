/*
 * @Author: 焦质晔
 * @Date: 2021-02-09 08:54:33
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 20:52:45
 */
import { App } from 'vue';
import { WithInstall } from '../_utils/types';
import Test from './src/test';

Test.install = (app: App): void => {
  app.component(Test.name, Test);
};

const _Test = WithInstall(Test);

export default _Test;
