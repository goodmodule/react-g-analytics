"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Component = require("react").Component;

var currentID = null;
var latestUrl = null;

function addScript(id) {
	if (!id) {
		throw new Error("Google analytics ID is undefined");
	}

	(function (i, s, o, g, r, a, m) {
		i.GoogleAnalyticsObject = r;i[r] = i[r] || function () {
			(i[r].q = i[r].q || []).push(arguments);
		}, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
	})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");

	window.ga("create", id, "auto");
}

var GoogleAnalyticsComponent = (function (_Component) {
	function GoogleAnalyticsComponent() {
		_classCallCheck(this, GoogleAnalyticsComponent);

		if (_Component != null) {
			_Component.apply(this, arguments);
		}
	}

	_inherits(GoogleAnalyticsComponent, _Component);

	_createClass(GoogleAnalyticsComponent, {
		getDefaultProps: {
			value: function getDefaultProps() {
				return {
					displayfeatures: false,
					pageview: false
				};
			}
		},
		componentDidMount: {
			value: function componentDidMount() {
				if (!GoogleAnalyticsComponent.isInitialized()) {
					GoogleAnalyticsComponent.init(this.props.id);
				}
			}
		},
		shouldComponentUpdate: {
			value: function shouldComponentUpdate() {
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

				var path = this.context.router.getPath();
				if (latestUrl === path) {
					return;
				}

				latestUrl = path;

				GoogleAnalyticsComponent.sendPageview(path);
			}
		}
	}, {
		init: {
			value: function init(id) {
				if (!id) {
					throw new Error("Google analytics ID is undefined");
				}

				if (GoogleAnalyticsComponent.isInitialized()) {
					throw new Error("Google analytics is already initialized");
				}

				currentID = id;
				addScript(currentID);
			}
		},
		isInitialized: {
			value: function isInitialized() {
				return !!GoogleAnalyticsComponent.getID();
			}
		},
		getID: {
			value: function getID() {
				return currentID;
			}
		},
		send: {
			value: function send(what, options) {
				if (!GoogleAnalyticsComponent.isInitialized()) {
					throw new Error("Google analytics is not initialized");
				}

				window.ga("send", what, options);
			}
		},
		sendPageview: {
			value: function sendPageview(relativeUrl, title) {
				title = title || relativeUrl;

				return GoogleAnalyticsComponent.send("pageview", {
					page: relativeUrl,
					title: title
				});
			}
		}
	});

	return GoogleAnalyticsComponent;
})(Component);

module.exports = GoogleAnalyticsComponent;

GoogleAnalyticsComponent.propTypes = {
	id: React.PropTypes.string.isRequired,
	displayfeatures: React.PropTypes.bool,
	pageview: React.PropTypes.bool
};