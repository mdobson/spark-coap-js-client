var Shim = require('./core_shim');

var Spark = module.exports = function(core) {
  this._core = new Shim(core);
  this.id = this.core.coreID;
};

Spark.prototype.ping = function(cb) {
  var self = this;
  this._core.sendMessage('Ping', null, null, function(err, event, results){
    cb(err);
  });
};

Spark.prototype.describe = function(cb) {
  var self = this;
  this._core.sendMessage('Describe', null, null, function(err, event, results) {
    console.log(arguments);
    var obj = {functions: results.state.f, variables: results.state.v};
    cb(err, obj);
  });
};

Spark.prototype.callFunction = function(name, args, cb) {
  var self = this;
  this._core.sendMessage('CallFn', name, args, function(err, event, results) {
    cb(err, results.result);
  });
};
