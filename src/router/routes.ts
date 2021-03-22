/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 20:05:52
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-03-22 17:24:31
 */
const files = (require as any).context('../modules', true, /\.route\.js$/);

let configRouters: Array<Record<string, any>> = [];

files.keys().forEach((key: string): void => {
  configRouters = configRouters.concat(files(key).default);
});

export default configRouters;
