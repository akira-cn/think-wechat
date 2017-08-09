const Koa = require('koa')
const koaBody = require('koa-body')

const test = require('ava')
const request = require('supertest')
const serve = require('..')

function createServer (options, replyMessage, callback) {
  const app = new Koa();

  app.use(koaBody({multipart: true}))

  app.use(serve(options))

  app.use(function(ctx){
    ctx.body = {data: replyMessage}
  })

  return app.listen(function () {
    if (typeof callback === 'function') {
      callback(this);
    }
  });
}

test.cb('text message', t => {
  t.plan(1);

  const data = {
    ToUserName: 'gh_d3e07d51b513',
    FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    CreateTime: '1359125035',
    MsgType: 'text',
    Content: 'http',
    MsgId: '5837397576500011341',
  }

  request(createServer({ mock: true }, {type: 'text'}))
    .post('/wechat')
    .set('Content-Type', 'multipart/form-data')
    .field('raw', JSON.stringify(data))
    .expect(200, (err, res) => {
      if (err) {
        t.fail();
      }
      else {
        t.pass();
      }
      t.end();
    });
});

test.cb('image message', t => {
  t.plan(1);

  const data = {
    ToUserName: 'gh_d3e07d51b513',
    FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    CreateTime: '1359125035',
    MsgType: 'image',
    PicUrl: 'http://mmsns.qpic.cn/mmsns/bfc815ygvIWcaaZlEXJV7NzhmA3Y2fc4eBOxLjpPI60Q1Q6ibYicwg/0',
    MediaId: 'media_id',
    MsgId: '5837397576500011341',
  }

  request(createServer({ mock: true }, {type: 'image'}))
    .post('/wecaht')
    .set('Content-Type', 'multipart/form-data')
    .field('raw', JSON.stringify(data))
    .expect(200, (err, res) => {
      if (err) {
        t.fail();
      }
      else {
        t.pass();
      }
      t.end();
    });
});

test.cb('voice message', t => {
  t.plan(1);

  const data = {
    ToUserName: 'gh_d3e07d51b513',
    FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    CreateTime: '1359125035',
    MsgType: 'voice',
    Format: 'arm',
    MediaId: 'media_id',
    MsgId: '5837397576500011341',
  }

  request(createServer({ mock: true }, {type: 'voice'}))
    .post('/wecaht')
    .set('Content-Type', 'multipart/form-data')
    .field('raw', JSON.stringify(data))
    .expect(200, (err, res) => {
      if (err) {
        t.fail();
      }
      else {
        t.pass();
      }
      t.end();
    });
});

test.cb('video message', t => {
  t.plan(1);

  const data = {
    ToUserName: 'gh_d3e07d51b513',
    FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    CreateTime: '1359125035',
    MsgType: 'video',
    ThumbMediaId: 'media_id',
    MediaId: 'media_id',
    MsgId: '5837397576500011341',
  }

  request(createServer({ mock: true }, {type: 'video'}))
    .post('/wecaht')
    .set('Content-Type', 'multipart/form-data')
    .field('raw', JSON.stringify(data))
    .expect(200, (err, res) => {
      if (err) {
        t.fail();
      }
      else {
        t.pass();
      }
      t.end();
    });
});

test.cb('shortvideo message', t => {
  t.plan(1);

  const data = {
    ToUserName: 'gh_d3e07d51b513',
    FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    CreateTime: '1359125035',
    MsgType: 'shortvideo',
    ThumbMediaId: 'media_id',
    MediaId: 'media_id',
    MsgId: '5837397576500011341',
  }

  request(createServer({ mock: true }, {type: 'shortvideo'}))
    .post('/wecaht')
    .set('Content-Type', 'multipart/form-data')
    .field('raw', JSON.stringify(data))
    .expect(200, (err, res) => {
      if (err) {
        t.fail();
      }
      else {
        t.pass();
      }
      t.end();
    });
});

test.cb('location message', t => {
  t.plan(1);

  const data = {
    ToUserName: 'gh_d3e07d51b513',
    FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    CreateTime: '1359125035',
    MsgType: 'location',
    Location_X: '30.283950',
    Location_Y: '120.063139',
    Scale: '15',
    Label: {},
    MsgId: '5837397576500011341',
  }

  request(createServer({ mock: true }, {type: 'location'}))
    .post('/wecaht')
    .set('Content-Type', 'multipart/form-data')
    .field('raw', JSON.stringify(data))
    .expect(200, (err, res) => {
      if (err) {
        t.fail();
      }
      else {
        t.pass();
      }
      t.end();
    });
});

test.cb('link message', t => {
  t.plan(1);

  const data = {
    ToUserName: 'gh_d3e07d51b513',
    FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    CreateTime: '1359125035',
    MsgType: 'link',
    Title: '公众平台官网链接',
    Description: '公众平台官网链接',
    Url: 'http://1024.com/',
    MsgId: '5837397576500011341',
  }

  request(createServer({ mock: true }, {type: 'link'}))
    .post('/wecaht')
    .set('Content-Type', 'multipart/form-data')
    .field('raw', JSON.stringify(data))
    .expect(200, (err, res) => {
      if (err) {
        t.fail();
      }
      else {
        t.pass();
      }
      t.end();
    });
});

test.cb('event message', t => {
  t.plan(1);

  const data = {
    ToUserName: 'gh_d3e07d51b513',
    FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    CreateTime: '1359125035',
    MsgType: 'event',
    Event: 'LOCATION',
    Latitude: '23.137466',
    Longitude: '113.352425',
    Precision: '119.385040',
    MsgId: '5837397576500011341',
  }

  request(createServer({ mock: true }, {type: 'event'}))
    .post('/wecaht')
    .set('Content-Type', 'multipart/form-data')
    .field('raw', JSON.stringify(data))
    .expect(200, (err, res) => {
      if (err) {
        t.fail();
      }
      else {
        t.pass();
      }
      t.end();
    });
});

test.cb('device_text message', t => {
  t.plan(1);

  const data = {
    ToUserName: 'gh_d3e07d51b513',
    FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    CreateTime: '1359125035',
    MsgType: 'device_text',
    DeviceType: 'gh_d3e07d51b513',
    DeviceID: 'dev1234abcd',
    Content: 'd2hvc3lvdXJkYWRkeQ==',
    SessionID: '9394',
    MsgId: '5837397576500011341',
    OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  }

  request(createServer({ mock: true }, {type: 'device_text'}))
    .post('/wecaht')
    .set('Content-Type', 'multipart/form-data')
    .field('raw', JSON.stringify(data))
    .expect(200, (err, res) => {
      if (err) {
        t.fail();
      }
      else {
        t.pass();
      }
      t.end();
    });
});

test.cb('device_event message', t => {
  t.plan(1);

  const data = {
    ToUserName: 'gh_d3e07d51b513',
    FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    CreateTime: '1359125035',
    MsgType: 'device_event',
    Event: 'bind',
    DeviceType: 'gh_d3e07d51b513',
    DeviceID: 'dev1234abcd',
    OpType : 0, //Event为subscribe_status/unsubscribe_status时存在
    Content: 'd2hvc3lvdXJkYWRkeQ==', //Event不为subscribe_status/unsubscribe_status时存在
    SessionID: '9394',
    OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
  }

  request(createServer({ mock: true }, {type: 'device_event'}))
    .post('/wecaht')
    .set('Content-Type', 'multipart/form-data')
    .field('raw', JSON.stringify(data))
    .expect(200, (err, res) => {
      if (err) {
        t.fail();
      }
      else {
        t.pass();
      }
      t.end();
    });
});
