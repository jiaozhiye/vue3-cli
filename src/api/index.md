### API

| 参数   | 说明                                | 类型   | 默认值 |
| ------ | ----------------------------------- | ------ | ------ |
| config | 接口函数的配置项，[配置项](#config) | object | -      |

### config

| 参数          | 说明                      | 类型    | 默认值 |
| ------------- | ------------------------- | ------- | ------ |
| timeout       | 接口超时时长，单位是 毫秒 | number  | -      |
| cancelRequest | 取消上一次未完成的请求    | boolean | false  |

### 示例

```bash
# js
// GET 请求
export const getXXX = params => axios.get(`/api/sys/xxx/xxx`, { params, timeout: 60 * 1000, cancelRequest: true });
// POST 请求
export const getXXX = params => axios.post(`/api/sys/xxx/xxx`, params, { timeout: 60 * 1000, cancelRequest: true });
```
