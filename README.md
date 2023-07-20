# monitordk

传统方式下一个前端项目发到正式环境后，所有报错信息只能通过用户使用时截图、口头描述发送到开发者，然后开发者来根据用户所描述的场景去模拟这个错误的产生，这效率肯定超级低，所以很多开源或收费的前端监控平台就应运而生，我司用的一款webfunny，代码加密，没法二次扩展，而且只能接入web vue版本


### 开发使用

#### 微信小程序

下载sdk 导入至微信小程序端

#### 找到app.js

~~~
import { wxMonitor } from './mpExtend.js'
wxMonitor.init({
  app: '微信',
  baseUrl: 'http://localhost:9001'
})
~~~

#### 设置userId

方便统计错误数以及后续pv uv等

~~~
wxMonitor.setUserId(userId)
~~~

#### 支付宝小程序

下载sdk 导入至支付宝小程序端

#### 找到app.js

~~~
import { aliMonitor } from './mpExtend.js'
aliMonitor.init({
  app: '微信',
  baseUrl: 'http://localhost:9001'
})
~~~

#### 设置userId

方便统计错误数以及后续pv uv等

~~~
aliMonitor.setUserId(userId)
~~~

#### 接入web版本

~~~
import { webMonitor } from './mpExtend.js'
webMonitor.init({
  app: '微信',
  baseUrl: 'http://localhost:9001'
})
~~~

#### 设置userId

方便统计错误数以及后续pv uv等

~~~
aliMonitor.setUserId(userId)
~~~

#### react

如果是react 框架，要铺抓框架的错误，则需要载入错误

~~~
import { webMonitor } from './mpExtend.js'
webMonitor.init({
  app: '微信',
  baseUrl: 'http://localhost:9001'
})
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 将错误日志上报给服务器
    webMonitor.errorBoundaryReport(error)
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
~~~

#### vue 接入

~~~
import { webMonitor } from './mpExtend.js'
webMonitor.init({
  app: '微信',
  baseUrl: 'http://localhost:9001'
})
~~~

#### Vue2 形式

~~~
import { webMonitor } from './mpExtend.js'
import Vue from 'vue'
Vue.use(webMonitor.MitoVue)
webMonitor.init({
  app: '微信',
  baseUrl: 'http://localhost:9001'
})
~~~

#### Vue3 形式

~~~
import App from './App.vue';
import {createApp} from 'vue';
import { webMonitor } from './mpExtend.js'
const app = createApp(App);
app.use(webMonitor.MitoVue)
webMonitor.init({
  app: '微信',
  baseUrl: 'http://localhost:9001'
})
app.mount('#app');
~~~

### 服务端

- [server](https://github.com/fonitor/web-servers-monitor)
- [web](https://github.com/fonitor/web-monitor-admin)


### web 性能

~~~
const timingInfo = window.performance.timing;

// DNS解析，DNS查询耗时
timingInfo.domainLookupEnd - timingInfo.domainLookupStart;

// TCP连接耗时
timingInfo.connectEnd - timingInfo.connectStart;

// 获得首字节耗费时间，也叫TTFB
timingInfo.responseStart - timingInfo.navigationStart;

// *: domReady时间(与DomContentLoad事件对应)
timingInfo.domContentLoadedEventStart - timingInfo.navigationStart;

// DOM资源下载
timingInfo.responseEnd - timingInfo.responseStart;

// 准备新页面时间耗时
timingInfo.fetchStart - timingInfo.navigationStart;

// 重定向耗时
timingInfo.redirectEnd - timingInfo.redirectStart;

// Appcache 耗时
timingInfo.domainLookupStart - timingInfo.fetchStart;

// unload 前文档耗时
timingInfo.unloadEventEnd - timingInfo.unloadEventStart;

// request请求耗时
timingInfo.responseEnd - timingInfo.requestStart;

// 请求完毕至DOM加载
timingInfo.domInteractive - timingInfo.responseEnd;

// 解释dom树耗时
timingInfo.domComplete - timingInfo.domInteractive;

// *：从开始至load总耗时
timingInfo.loadEventEnd - timingInfo.navigationStart;

// *: 白屏时间
timingInfo.responseStart - timingInfo.fetchStart;

// *: 首屏时间
timingInfo.domComplete - timingInfo.fetchStart;
~~~
