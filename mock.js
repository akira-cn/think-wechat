function Wechat(){
  this.handlers = {}
}

Wechat.prototype = {
  middlewarify: function(){
    const that = this
    return function(req, res, next){
      const message = JSON.parse(req.rawBody.fields.raw)
      that.handlers[message.MsgType](message, req, res, next)
    }
  },
  text: function(fn){
    this.handlers.text = fn
    return this
  },
  image: function(fn){
    this.handlers.image = fn
    return this
  },
  voice: function(fn){
    this.handlers.voice = fn
    return this
  },
  video: function(fn){
    this.handlers.video = fn
    return this
  },
  shortvideo: function(fn){
    this.handlers.shortvideo = fn
    return this
  },
  location: function(fn){
    this.handlers.location = fn
    return this
  },
  link: function(fn){
    this.handlers.link = fn
    return this
  },
  event: function(fn){
    this.handlers.event = fn
    return this
  },
  device_text: function(fn){
    this.handlers.device_text = fn
    return this
  },
  device_event: function(fn){
    this.handlers.device_event = fn
    return this
  },
}

module.exports = function(){
  return new Wechat()
}
