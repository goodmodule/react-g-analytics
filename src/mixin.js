'use strict';

var ReactGAnalytics = require('./reactga');
var latestUrl = null;

var Mixin = module.exports = {
	_notifyGA: function() {
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
		this._notifyGA();
	},
	componentWillUnmount: function() {
		this._notifyGA();
	}
};