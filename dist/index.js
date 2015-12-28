'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodashObjectKeys = require('lodash/object/keys');

var _lodashObjectKeys2 = _interopRequireDefault(_lodashObjectKeys);

function initGoogleAnalytics(id) {
  var set = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (window.ga || !id) {
    return;
  }

  window.ga = window.ga || function () {
    (ga.q = ga.q || []).push(arguments);
  };ga.l = +new Date(); // eslint-disable-line

  (function loadScript() {
    var gads = document.createElement('script');
    gads.async = true;
    gads.type = 'text/javascript';
    gads.src = '//www.google-analytics.com/analytics.js';

    var head = document.getElementsByTagName('head')[0];
    head.appendChild(gads);
  })();

  window.ga('create', id, 'auto');

  (0, _lodashObjectKeys2['default'])(set).forEach(function (key) {
    var value = set[key];

    window.ga('set', key, value);
  });
}

var GoogleAnalytics = (function (_Component) {
  _inherits(GoogleAnalytics, _Component);

  function GoogleAnalytics() {
    _classCallCheck(this, GoogleAnalytics);

    _get(Object.getPrototypeOf(GoogleAnalytics.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(GoogleAnalytics, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      initGoogleAnalytics(this.props.id, this.props.set);

      this.historyListener = this.context.history.listen(function (err, renderProps) {
        if (err || !renderProps) {
          return;
        }

        _this.pageview(renderProps.location);
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.historyListener) {
        return;
      }

      this.historyListener();
      this.historyListener = null;
    }
  }, {
    key: 'pageview',
    value: function pageview() {
      var location = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var path = location.pathname + location.search;
      if (this.latestUrl === path) {
        return;
      }

      this.latestUrl = path;

      // wait for correct title
      setTimeout(function () {
        GoogleAnalytics.sendPageview(path, document.title);
      }, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'command',
    value: function command() {
      if (!window.ga) {
        throw new Error('Google analytics is not initialized');
      }

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return window.ga.apply(window.ga, args);
    }
  }, {
    key: 'send',
    value: function send(what, options) {
      return GoogleAnalytics.command('send', what, options);
    }
  }, {
    key: 'sendPageview',
    value: function sendPageview(page) {
      var title = arguments.length <= 1 || arguments[1] === undefined ? page : arguments[1];
      return (function () {
        return GoogleAnalytics.send('pageview', { page: page, title: title });
      })();
    }
  }, {
    key: 'propTypes',
    value: {
      id: _react.PropTypes.string,
      set: _react.PropTypes.object
    },
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {
      history: _react.PropTypes.object.isRequired
    },
    enumerable: true
  }]);

  return GoogleAnalytics;
})(_react.Component);

exports['default'] = GoogleAnalytics;
module.exports = exports['default'];