/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:42:57
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 19:51:07
 */
import { createStore } from 'vuex';

import app from './modules/application';

type IAppStore = {
  app: typeof app.state;
};

export default createStore<IAppStore>({
  modules: {
    app,
  },
});
