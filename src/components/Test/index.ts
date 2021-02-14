/*
 * @Author: 焦质晔
 * @Date: 2021-02-09 08:54:33
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-14 12:53:37
 */
import { App } from 'vue';
import { SFCWithInstall } from '../_utils/types';
import Test from './src/test.tsx';

Test.install = (app: App): void => {
  app.component(Test.name, Test);
};

const _Test: SFCWithInstall<typeof Test> = Test;

export default _Test;
