define(function (require, exports) {
  var $ = require('jquery'),
      behaviors = {};

  exports.on = function (id) {
    if (id && !behaviors[id]) behaviors[id] = (function () {
      callbacks = $.Callbacks();
      var behavior = {
        add: callbacks.add,
        emit: callbacks.fire
      };
      return behavior;
    })();

    return behaviors[id];  //  return actions
  };

});
