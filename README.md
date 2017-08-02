# Think-wechat

微信中间件，基于 [node-webot/wechat](https://github.com/node-webot/wechat)，支持 [thinkJS 3.0](https://thinkjs.org/doc/3.0/index.html)

## Getting start

```bash
$ npm install think-wechat
```

## 配置 middleware

* 编辑 config/middleware.js 

```js
const path = require('path');
const wechat = require('think-wechat')
const isDev = think.env === 'development';

module.exports = [
  [...]
  {
    handle: wechat,
    match: '/wechat',
    options: {
      token: <微信开发者token>,
      appid: <appID>,
      encodingAESKey: <消息对称加密串>,
      checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
    }
  },
  {
    handle: 'payload',
    options: {}
  },
  [...]
];
```

**注意**：think-wechat 必须要在 payload 中间件前面加载，它会代替 payload 处理微信发过来的 post 请求中的数据。 

* 根据 match 配置，增加对应的 controller 和 action

```js
const Base = require('./base.js');
const DEFULT_AUTO_REPLY = '功能正在开发中~';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //验证开发者服务器
    //这里只是演示，所以没做签名校验，实际上应该要根据微信要求进行签名校验
    const echostr = this.get('echostr');
    return this.end(echostr);
  }
  textAction(){
    //发送文本消息
    const {Content} = this.post();    
    this.success('你发送给我的是:' + Content.trim());
  }
  async musicAction(){
  	const {Content} = this.post();
  	const music = await myService.search(Content.trim());
  	
  	if(music){
  		const {title, description, url} = music;
  		this.success({
  			type: 'music',
        	content: {
	        title,
	        description,
	        musicUrl: url,
	        hqMusicUrl: url,
	        thumbMediaId: "thisThumbMediaId"
	      }			
  		});
  	}else{
  		this.fail('你所找的歌曲不存在');
  	}
  }
  eventAction(){
    const message = this.post();
    
    this.success(JSON.stringify(message));
  }
  __call(){
    this.success(DEFULT_AUTO_REPLY);
  }
}
```

* 登录你的微信服务号，将微信开发者的接口URL配置为：

```
http://your_hostname/wechat
```

this.success 支持返回所有 [node-webot/wechat](https://github.com/node-webot/wechat) 支持的格式。

## License

[MIT](LICENSE)
