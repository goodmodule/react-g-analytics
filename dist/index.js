"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;

var isInitialized = false;

function addScript(id) {
	if (!id) {
		throw new Error("Google analytics ID is undefined");
	}

	if (isInitialized) {
		throw new Error("Google analytics is already initialized");
	}

	isInitialized = true;

	(function (i, s, o, g, r, a, m) {
		i.GoogleAnalyticsObject = r;i[r] = i[r] || function () {
			(i[r].q = i[r].q || []).push(arguments);
		}, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
	})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");

	window.ga("create", id, "auto");
}

var GoogleAnalytics = (function (_Component) {
	function GoogleAnalytics(props, context) {
		_classCallCheck(this, GoogleAnalytics);

		_get(Object.getPrototypeOf(GoogleAnalytics.prototype), "constructor", this).call(this, props, context);

		this.state = {
			isClientReady: false
		};
	}

	_inherits(GoogleAnalytics, _Component);

	_createClass(GoogleAnalytics, {
		componentDidMount: {
			value: function componentDidMount() {
				GoogleAnalytics.init(this.props.id);

				this.setState({
					isClientReady: true
				});
			}
		},
		shouldComponentUpdate: {
			value: function shouldComponentUpdate(props, state) {
				if (state.isClientReady) {
					this.pageview();
				}
				return false;
			}
		},
		render: {
			value: function render() {
				return null;
			}
		},
		pageview: {
			value: function pageview() {
				if (!this.context.router) {
					throw new Error("Router is not presented in the component context.");
				}

				var path = this.context.router.getCurrentPath();
				if (this.latestUrl === path) {
					return;
				}

				this.latestUrl = path;

				GoogleAnalytics.sendPageview(path);
			}
		}
	}, {
		init: {
			value: function init(id) {
				if (!isInitialized) {
					addScript(id);
				}
			}
		},
		send: {
			value: function send(what, options) {
				if (!isInitialized) {
					throw new Error("Google analytics is not initialized");
				}

				window.ga("send", what, options);
			}
		},
		sendPageview: {
			value: function sendPageview(relativeUrl, title) {
				title = title || relativeUrl;

				return GoogleAnalytics.send("pageview", {
					page: relativeUrl,
					title: title
				});
			}
		}
	});

	return GoogleAnalytics;
})(Component);

module.exports = GoogleAnalytics;

GoogleAnalytics.propTypes = {
	id: React.PropTypes.string.isRequired,
	displayfeatures: React.PropTypes.bool,
	pageview: React.PropTypes.bool
};

GoogleAnalytics.defaultProps = {
	displayfeatures: false,
	pageview: false
};

GoogleAnalytics.contextTypes = {
	router: React.PropTypes.func.isRequired
};