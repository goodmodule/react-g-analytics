import { Component } from 'react';

var currentID = null;
var latestUrl = null;

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

export default class GoogleAnalyticsComponent extends Component {
	getDefaultProps() {
		return {
			displayfeatures: false,
			pageview: false
		};
	}

	componentDidMount() {
		if(!GoogleAnalyticsComponent.isInitialized()) {
			GoogleAnalyticsComponent.init(this.props.id);
		}
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return null;
	}

	pageview() {
		if(!this.context.router) {
			throw new Error('Router is not presented in the component context.');
		}

		var path = this.context.router.getPath();
		if(latestUrl === path) {
			return;
		}

		latestUrl = path;

		GoogleAnalyticsComponent.sendPageview(path);
	}

	static init(id) {
		if(!id) {
			throw new Error('Google analytics ID is undefined');
		}

		if(GoogleAnalyticsComponent.isInitialized()) {
			throw new Error('Google analytics is already initialized');
		}

		currentID = id;
		addScript(currentID);
	}

	static isInitialized() {
		return !!GoogleAnalyticsComponent.getID();
	}

	static getID() {
		return currentID;
	}

	static send(what, options) {
		if(!GoogleAnalyticsComponent.isInitialized()) {
			throw new Error('Google analytics is not initialized');
		}

		window.ga('send', what, options);
	}

	static sendPageview(relativeUrl, title) {
		title = title || relativeUrl;

		return GoogleAnalyticsComponent.send('pageview', {
			'page': relativeUrl,
			'title': title
		});
	}
};

GoogleAnalyticsComponent.propTypes = {
	id              : React.PropTypes.string.isRequired,
	displayfeatures : React.PropTypes.bool,
	pageview        : React.PropTypes.bool
};