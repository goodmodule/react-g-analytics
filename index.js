var React = require('react');
var Router = require('react-router');

var currentID = null;

function addScript(id) {
	if(!id) {
		throw new Error('Google analytics ID is undefined');
	}

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	window.ga('create', id, 'auto');
}

var ReactGAnalytics = module.exports = React.createClass({
	mixins: [Router.State],

	statics: {
		init: function(id) {
			if(!id) {
				throw new Error('Google analytics ID is undefined');
			}

			if(ReactGAnalytics.isInitialized()) {
				throw new Error('Google analytics is already initialized');
			}

			currentID = id;
			addScript(currentID);
		},
		isInitialized: function() {
			return !!ReactGAnalytics.getID();
		},
		getID: function() {
			return currentID;
		},
		send: function(what, options) {
			if(!ReactGAnalytics.isInitialized()) {
				throw new Error('Google analytics is not initialized');
			}

			window.ga('send', what, options);
		},
		sendPageview: function(relativeUrl, title) {
			title = title || relativeUrl;

			return ReactGAnalytics.send('pageview', {
				'page': relativeUrl,
		        'title': title
			});
		}
	},

	propTypes: {
		id: React.PropTypes.string.isRequired,
		displayfeatures: React.PropTypes.bool,
		pageview: React.PropTypes.bool
	},

	getDefaultProps: function() {
    	return {
    		displayfeatures: false,
			pageview: false
		};
	},

	componentDidMount: function() {
		if(!ReactGAnalytics.isInitialized()) {
			ReactGAnalytics.init(this.props.id);
		}
	},

	shouldComponentUpdate: function() {
		return false;
	},

	render: function() {
		return null;
	}
});

var latestUrl = null;

var Mixin = ReactGAnalytics.Mixin = {
	notify: function() {
		if(!this.getPath) {
			throw new Error('Add mixin Router.State from module react-router or define method getPath.');
		}

		var path = this.getPath();
		if(latestUrl === path) {
			return;
		}

		latestUrl = path;

		ReactGAnalytics.sendPageview(path);
	},

	componentDidMount: function() {
		this.notify();
	},

	componentWillUnmount: function() {
		this.notify();
	}
};
