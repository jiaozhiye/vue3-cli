import { App } from 'vue';

export const WithInstall = <T>(comp: T): T => {
  const c = comp as any;
  c.install = function (app: App): void {
    app.component(c.displayName || c.name, comp);
  };
  return comp as T;
};
