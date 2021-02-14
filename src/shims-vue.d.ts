/* eslint-disable */
declare module '*.vue' {
  import { App, defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void;
  };
  export default component;
}

declare module '*.tsx' {
  import { App, defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void;
  };
  export default component;
}

declare module '*.scss' {
  const resource: Record<string, string>;
  export default resource;
}

declare namespace Api {
  interface IResponse<T = any> {
    code: number;
    data: T;
    msg: string;
  }
}
