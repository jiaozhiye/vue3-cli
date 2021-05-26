/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 13:42:57
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-05-26 15:41:58
 */
import { createStore, Store } from 'vuex';

import app from './modules/application';

type IAppStore = {
  app: typeof app.state;
};

const store = createStore<IAppStore>({
  modules: {
    app,
  },
});

export const useStore = (): Store<IAppStore> => store;

export default store;
