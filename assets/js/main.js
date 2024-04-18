(function ($) {
    var $document = $(document);
    $.elasticMouseMove = function (_options) {
      var _setting = {
        el: ".js-elasitc",
        distance:0
      };
      var _opts = $.extend({}, _setting, _options);
      var _getOffsetCenter = function (_el, _eventX, _eventY) {
        var _halfSize = parseInt(_el.width() / 2, 10),
          _offset = _el.offset();
        var _result = {
          x: _offset.left + _halfSize,
          y: _offset.top + _halfSize
        };
        return _result;
      };
       var init = function () {
        var $el = typeof _opts.el == "string" ? $(_opts.el) : _opts.el;
        $document.on("mousemove.elastic", function (e) {
          var _event = {
            x: e.pageX,
            y: e.pageY
          };
          var _length = $el.length;
          for (var i = 0; i < _length; i++) {
            var _el = $el.eq(i),
              _dataDistance = _el.data("elastic-distance"),
              _optsDistance = _dataDistance ? _dataDistance : _opts.distance;
            var _center = _getOffsetCenter(_el, _event),
              _distance = {
                x: _center.x - _event.x,
                y: _center.y - _event.y
              };
            var _dist = Math.sqrt(
              _distance.x * _distance.x + _distance.y * _distance.y
            );
            if (_dist < _optsDistance) {
              TweenMax.to(_el, 1, {
                x: -Math.round(_distance.x),
                y: -Math.round(_distance.y)
              });
            } else {
              TweenMax.to(_el, 1, {
                x: 0,
                y: 0
              });
            }
          }
        });
      };
  
      init();
  
      return {
        init: init
      };
    };
  })(window.jQuery);
  

  
  $(function () {
    $.elasticMouseMove({
      el: ".ballon",
      distance: 50
    });
  });
  