# Think-wechat

微信中间件，同时支持 think.js 1.x 和 2.x，基于 [https://github.com/node-webot/wechat]

## Getting start

```bash
$ npm install think-wechat
```

## 在 think.js 2.x 中使用

* 编辑 config/hook.js 增加一个 hook

```js
export default {
  payload_parse: ['prepend', 'parse_wechat'], //在前面追加解析 xml
}
```

* 编辑 bootstrap/hook.js 加载 hook

```js
var wechatMiddleware = require('think-wechat');

think.middleware('parse_wechat', wechatMiddleware({
        wechat:{
            token: '微信公众号token',
            appid: '微信公众号ID',
            encodingAESKey: '消息安全加密串'
        },
    }));
```

* 增加对应的controller和action，默认为wechat

```js
'use strict';

import Base from './base.js';

const DEFULT_AUTO_REPLY = '功能正在开发中~';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    let echostr = this.get('echostr');
    return this.end(echostr);
  }
  reply(message){
    this.http.res.reply(message);
  }
  textAction(){
    var message = this.post();
    var msg = message.Content.trim();
    this.reply('测试成功:'+msg);
  }
  eventAction(){
    var message = this.post();
    this.reply(JSON.stringify(message));
  }
  __call(){
    this.reply(DEFULT_AUTO_REPLY);
  }
}
```

* 登录你的微信服务号，将微信开发者的接口ULR配置为：

```
http://your_hostname/wechat
```

## 高级配置

```js
var wechatMiddleware = require('think-wechat');

think.middleware('parse_wechat', wechatMiddleware({
        pathname: 'wechat',    //默认，可配置为其他路径，与公众号对应的服务器URL设置一致
        route: {
          text: 'wechat/text', //文字转发
          image: 'wechat/image', //图片转发
          voice: 'wechat/voice', //语音转发
          video: 'wechat/video', //视频转发
          shortvideo: 'wechat/shortvideo', //小视频转发
          location: 'wechat/location', //地理位置转发
          link: 'wechat/link', //链接转发
          event: 'wechat/event', //推送事件转发
        },
        wechat:{
            token: '微信公众号token',
            appid: '微信公众号ID',
            encodingAESKey: '消息安全加密串'
        },
    }));
```

## 在 think.js 1.x 中使用

* 配置支持用户tag，在 App/Conf/config.js 中设置 app_tag_on: true

```js
module.exports = {
  //配置项: 配置值
  port: 8360, //监听的端口
  app_tag_on: true
};
```

* 编辑 App/Conf/tag.js 文件内容

```js
/**
 * 解析提交的json数据
 * @param  {[type]} http [description]
 * @return {[type]}      [description]
 */
var wechatMiddleware = require('think-wechat'); 

module.exports = {
  form_parse: [false, wechatMiddleware({
        wechat:{
            token: '微信公众号token',
            appid: '微信公众号ID',
            encodingAESKey: '消息安全加密串'
        },
    })],
};
```

* 增加对应的Controller和Action，默认为WechatController

```js
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){
      var echostr = this.get('echostr');
      return this.end(echostr);
    },
    textAction: function(){
      var message = this.post();
      this.http.res.reply('消息接收成功！');
    },
    __call: function(action){
      var message = this.post();
      this.http.res.reply(JSON.stringify(message));
    }
  };
});
```

## License

[MIT](LICENSE)
