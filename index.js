var Transform = require('stream').Transform
var inherits = require('util').inherits

module.exports = SoundbankTrigger

function SoundbankTrigger(soundbank){
  if (!(this instanceof SoundbankTrigger)){
    return new SoundbankTrigger(soundbank)
  }
  Transform.call(this, {objectMode: true})

  this.soundbank = soundbank
  this._pendingRead = false
}

inherits(SoundbankTrigger, Transform)

SoundbankTrigger.prototype._write = function(data, enc, cb){
  if (data.event === 'start'){
    this.soundbank.triggerOn(data.id, data.time)
  } else if (data.event === 'stop'){
    this.soundbank.triggerOff(data.id, data.time)
  }

  // pass thru data
  if (this._pendingRead){
    this.push(data)
  }

  cb()
}

SoundbankTrigger.prototype._read = function(){
  this._pendingRead = true
}

