var Stream = require('stream')
var inherits = require('util').inherits

module.exports = SoundbankTrigger

function SoundbankTrigger(soundbank){
  if (!(this instanceof SoundbankTrigger)){
    return new SoundbankTrigger(soundbank)
  }
  Stream.call(this)

  this.writable = true
  this.readable = true

  this.soundbank = soundbank
  this._pendingRead = false
}

inherits(SoundbankTrigger, Stream)


SoundbankTrigger.prototype.push = function(data){
  this.emit('data', data)
}

SoundbankTrigger.prototype.write = function(data){
  if (data.event === 'start'){
    this.soundbank.triggerOn(data.id, data.time)
  } else if (data.event === 'stop'){
    this.soundbank.triggerOff(data.id, data.time)
  }

  // pass thru data
  this.push(data)
  return true
}