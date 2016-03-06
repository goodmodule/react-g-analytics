'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _forOwn = require('lodash/forOwn');

var _forOwn2 = _interopRequireDefault(_forOwn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

  (0, _forOwn2.default)(set, function (value, key) {
    window.ga('set', key, value);
  });
}

var GoogleAnalytics = function (_Component) {
  _inherits(GoogleAnalytics, _Component);

  function GoogleAnalytics() {
    _classCallCheck(this, GoogleAnalytics);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GoogleAnalytics).apply(this, arguments));
  }

  _createClass(GoogleAnalytics, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      initGoogleAnalytics(this.props.id, this.props.set);

      this.historyListener = this.context.router.listen(function (location) {
        if (!location) {
          return;
        }

        _this2.pageview(location);
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

      return GoogleAnalytics.send('pageview', { page: page, title: title });
    }
  }]);

  return GoogleAnalytics;
}(_react.Component);

GoogleAnalytics.propTypes = {
  id: _react.PropTypes.string,
  set: _react.PropTypes.object
};
GoogleAnalytics.contextTypes = {
  router: _react.PropTypes.object.isRequired
};
exports.default = GoogleAnalytics;
module.exports = exports['default'];