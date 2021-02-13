/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.scss' {
  const resource: { [key: string]: string };
  export default resource;
}

declare namespace Api {
  interface IResponse<T = any> {
    code: number;
    data: T;
    msg: string;
  }
}
