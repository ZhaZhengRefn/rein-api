# rein

[![NPM version](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/rein-api)
[![NPM downloads](https://img.shields.io/npm/dw/localeval.svg)](https://www.npmjs.com/package/rein-api)

基于 `fetch` 的 `http` 客户端请求工具，适用于浏览器。(Inspired by [axios](https://github.com/axios/axios) and [apiz](https://github.com/ta7sudan/apiz-ng))

---

## 用法

### 安装
```sh 
yarn add rein-api
```

### 例子

#### 初始化
```js
import Rein from 'rein-api';

// 举例，获取 token
function getCookie(name) {
  //...
}

const instance = new Rein({
  // 是否开启 debug 模式，默认值为 false
  debug: true,  
  // 基础域名，必须配置！
  baseUrl: 'http://www.forchangefe.com/',
  // 接口前缀，默认值为'/'。可用于配合后端微服务。
  defaultPrefix: '/v1',
  // 请求头，默认值为空对象。请遵循 string => string 的格式。按权重 *其他请求头* > *特定方法请求头* > *公用请求头* 覆盖
  headers: {
    // 公用请求头
    'common': {
      Authorization: `Bearer ${getCookie('token')}`
    },
    // 特定方法请求头
    'GET': {
      'Content-Type': 'application/json',
    },
    // 其他请求头...
  },
  // 发送接口前，变异请求数据的方法集合。一般使用默认即可
  transformRequest: [function(data, headers) {
    if (headers.common['X-Log-Data']) {
      console.log(data);
    }
    return data;
  }],
  // 变异请求成功后返回数据的方法集合，同理。
  transformResponse: [function(response) {
    if (!response.hasOwnProperty('errcode')) {
      response.errcode = 0;
    }
    return response;
  }],
})
```

#### 发送请求
```js
instance.request({
  // 方法名，默认为 'get'
  method: 'get',
  // url query 参数
  params: {
    foo: 1,
  },
  // body 参数。注意， rein 底层适配器基于 fetch ， `GET`, `OPTION`, `HEAD` 方法均不允许传入 body 参数
  data: {
    bar: 2
  },
  // 替换 url 上暂位符的参数
  resource: {
    id: 1
  },
  // 请求 url，必须配置。可以为绝对地址，也可以为相对地址。绝对地址则忽略所有拼接 url 的逻辑
  url: '/zoo/{id}',
  // 若 url 上需要拼接暂位符，则必须指定为 true。默认值为 false
  restful: true,
  // 该 api 的指定前缀。若未传入则使用默认前缀。可配合后端微服务使用
  prefix: '/v2',
  // api 元数据，用作标记 api。默认值为空对象
  meta: {
    noAuth: true,
  },
})
.then(res => {
  // 响应数据
  console.log(res);
})
.catch(e => {
  // 报错
  console.error(e);
})
```

## 问答

### 可以推荐点最佳实践吗？
`rein` 采用 `typescript` 来开发。强烈建议您使用 `typescript` ！我们还导出了相关的类型注解，文档不能覆盖的地方，类型注解都帮你解决了。
> 至于如何集成，后续我们会出一篇文章做介绍。

### 生产环境能不能用？
当然，`ForChange Python 小课`日均 200 * 700 订单的报名系统基于这款请求库.

### 为什么叫 `rein` ？

> "I've been called. I have to answer, always."

-- From [OverWatch](http://ow.blizzard.cn/heroes/reinhardt)

<img src="https://user-images.githubusercontent.com/16488686/50585448-f7bdfd80-0eaf-11e9-9585-2839837268d8.jpg" height="200" />

## License

[MIT](https://tldrlegal.com/license/mit-license)
