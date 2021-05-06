### API

| 参数   | 说明                                | 类型   | 默认值 |
| ------ | ----------------------------------- | ------ | ------ |
| config | 接口函数的配置项，[配置项](#config) | object | -      |

### config

| 参数       | 说明                                                         | 类型    | 默认值 |
| ---------- | ------------------------------------------------------------ | ------- | ------ |
| timeout    | 接口超时时长，单位是 毫秒                                    | number  | -      |
| cancelable | 如果前一个请求没有完成，后一个请求又发起，则会取消前一个请求 | boolean | false  |
| lockable   | 重复提交请求，如果前一个没有完成，后一个请求不能发起         | boolean | false  |

### 示例

```bash
# js
// GET 请求
export const getXXX = params => axios.get(`/api/sys/xxx/xxx`, { params, timeout: 60 * 1000, cancelable: true });
// POST 请求
export const getXXX = params => axios.post(`/api/sys/xxx/xxx`, params, { timeout: 60 * 1000, lockable: true });
```
