module.exports = function(conf){
  return function(http){
    var self = this;

    if(typeof conf === 'string'){
      if(typeof think !== 'undefined' &&
        typeof think.config === 'function'){
        conf = think.config(conf);
      }else if(typeof C !== 'undefined'){
        conf = C(conf);
      }else{
        console.error('no wechat config');
        return;
      }
    }

    if(!conf.wechat){
      conf.wechat = {
        token: conf.token || '',
        appid: conf.appid || '',
        encodingAESKey: conf.encodingAESKey || ''
      }
    }

    var route = '/' + (conf.pathname || 'wechat');

    return new Promise(function(resolve, reject){
      var connect = require('http-connect');
      var app = new connect(http);
      var wechat = require('wechat');

      app.use(route, function(req, res, next){
        if(http.getPayload){
          http.getPayload().then(function(payload){
            req.rawBody = payload;
            next();
          });
        }else{
          req.rawBody = http.payload;
          next();
        }
      });

      function forward(path, message){
        if(typeof http.post === 'function'){
          http._post = message;
        }else{
          http.post = message;
        }
        if(conf.route){
          http.pathname = conf.route[path];
        }else{
          http.pathname += '/' + path;
        }
        resolve();
      }

      app.use(route, wechat(conf.wechat)
        .text(function (message, req, res, next) {
          // message为文本内容
          // { ToUserName: 'gh_d3e07d51b513',
          // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
          // CreateTime: '1359125035',
          // MsgType: 'text',
          // Content: 'http',
          // MsgId: '5837397576500011341' }
          forward('text', message);
        }).image(function (message, req, res, next) {
          // message为图片内容
          // { ToUserName: 'gh_d3e07d51b513',
          // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
          // CreateTime: '1359124971',
          // MsgType: 'image',
          // PicUrl: 'http://mmsns.qpic.cn/mmsns/bfc815ygvIWcaaZlEXJV7NzhmA3Y2fc4eBOxLjpPI60Q1Q6ibYicwg/0',
          // MediaId: 'media_id',
          // MsgId: '5837397301622104395' }
          forward('image', message);
        }).voice(function (message, req, res, next) {
          // message为音频内容
          // { ToUserName: 'gh_d3e07d51b513',
          // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
          // CreateTime: '1359125022',
          // MsgType: 'voice',
          // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
          // Format: 'amr',
          // MsgId: '5837397520665436492' }
          forward('voice', message);
        }).video(function (message, req, res, next) {
          // message为视频内容
          // { ToUserName: 'gh_d3e07d51b513',
          // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
          // CreateTime: '1359125022',
          // MsgType: 'video',
          // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
          // ThumbMediaId: 'media_id',
          // MsgId: '5837397520665436492' }
          forward('video', message);
        }).shortvideo(function (message, req, res, next) {
          // message为短视频内容
          // { ToUserName: 'gh_d3e07d51b513',
          // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
          // CreateTime: '1359125022',
          // MsgType: 'shortvideo',
          // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
          // ThumbMediaId: 'media_id',
          // MsgId: '5837397520665436492' }
          forward('shortvideo', message);
        }).location(function (message, req, res, next) {
          // message为位置内容
          // { ToUserName: 'gh_d3e07d51b513',
          // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
          // CreateTime: '1359125311',
          // MsgType: 'location',
          // Location_X: '30.283950',
          // Location_Y: '120.063139',
          // Scale: '15',
          // Label: {},
          // MsgId: '5837398761910985062' }
          forward('location', message);
        }).link(function (message, req, res, next) {
          // message为链接内容
          // { ToUserName: 'gh_d3e07d51b513',
          // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
          // CreateTime: '1359125022',
          // MsgType: 'link',
          // Title: '公众平台官网链接',
          // Description: '公众平台官网链接',
          // Url: 'http://1024.com/',
          // MsgId: '5837397520665436492' }
          forward('link', message);
        }).event(function (message, req, res, next) {
          // message为事件内容
          // { ToUserName: 'gh_d3e07d51b513',
          // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
          // CreateTime: '1359125022',
          // MsgType: 'event',
          // Event: 'LOCATION',
          // Latitude: '23.137466',
          // Longitude: '113.352425',
          // Precision: '119.385040',
          // MsgId: '5837397520665436492' }
          forward('event', message);
        }).device_text(function (message, req, res, next) {
          // message为设备文本消息内容
          // { ToUserName: 'gh_d3e07d51b513',
          // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
          // CreateTime: '1359125022',
          // MsgType: 'device_text',
          // DeviceType: 'gh_d3e07d51b513'
          // DeviceID: 'dev1234abcd',
          // Content: 'd2hvc3lvdXJkYWRkeQ==',
          // SessionID: '9394',
          // MsgId: '5837397520665436492',
          // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }
          forward('deviceText', message);
        }).device_event(function (message, req, res, next) {
          // message为设备事件内容
          // { ToUserName: 'gh_d3e07d51b513',
          // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
          // CreateTime: '1359125022',
          // MsgType: 'device_event',
          // Event: 'bind'
          // DeviceType: 'gh_d3e07d51b513'
          // DeviceID: 'dev1234abcd',
          // OpType : 0, //Event为subscribe_status/unsubscribe_status时存在
          // Content: 'd2hvc3lvdXJkYWRkeQ==', //Event不为subscribe_status/unsubscribe_status时存在
          // SessionID: '9394',
          // MsgId: '5837397520665436492',
          // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }
          forward('deviceEvent', message);
        })
        .middlewarify());

        app.use(function(){
          console.log(route + '<>' + http.pathname);
          resolve();
        });     
    });
  }
}