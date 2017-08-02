const wechat = require('wechat');
const connect = require('http-connect');

const defaultOptions = {
  
};

module.exports = (options = {}, app) => {
  // 合并传递进来的配置
  options = Object.assign({}, defaultOptions, options);
  return (ctx, next) => {
    const _app = new connect({req: ctx.req, res: ctx.res, pathname: ctx.path});

    return new Promise((resolve, reject) => {

      function forward(path, message){
        ctx.path += '/' + path;
        ctx.request.body = {post: message};
        resolve();
      }

      _app.use(function(req, res, next){
        const _responsed = res.end;
        
        res.end = function(...args){
          if(app.think.env === 'development'){
            const logger = app.think.logger;
            logger.info('REPLY', ...args);
          }
          return _responsed.apply(res, args);
        };
        
        next();
      })

      _app.use(wechat(options).text(function (message, req, res, next) {
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
    })
    .then(() => next())
    .then(() => {
      const body = ctx.body;
      if (body) {
        ctx.respond = false;
        ctx.res.reply(body.errmsg || body.data);
      }
    });
  }
}
