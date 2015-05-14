import React, { Component } from 'react';

var isInitialized = false;

function addScript(id) {
	if(!id) {
		throw new Error('Google analytics ID is undefined');
	}

	if(isInitialized) {
		throw new Error('Google analytics is already initialized');
	}

	isInitialized = true;

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	window.ga('create', id, 'auto');
}

export default class GoogleAnalytics extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			isClientReady: false
		};
	}

	componentDidMount() {
		GoogleAnalytics.init(this.props.id);

		this.setState({
			isClientReady: true
		});
	}

	shouldComponentUpdate(props, state) {
		if(state.isClientReady) {
			this.pageview();
		}
		return false;
	}

	render() {	
		return null;
	}

	pageview() {
		if(!this.context.router) {
			throw new Error('Router is not presented in the component context.');
		}

		const path = this.context.router.getCurrentPath();
		if(this.latestUrl === path) {
			return;
		}

		this.latestUrl = path;

		GoogleAnalytics.sendPageview(path);
	}

	static init(id) {
		if(!isInitialized) {
			addScript(id);
		}
	}

	static send(what, options) {
		if(!isInitialized) {
			throw new Error('Google analytics is not initialized');
		}

		window.ga('send', what, options);
	}

	static sendPageview(relativeUrl, title) {
		title = title || relativeUrl;

		return GoogleAnalytics.send('pageview', {
			'page': relativeUrl,
			'title': title
		});
	}
};

GoogleAnalytics.propTypes = {
	id              : React.PropTypes.string.isRequired,
	displayfeatures : React.PropTypes.bool,
	pageview        : React.PropTypes.bool
};

GoogleAnalytics.defaultProps = {
	displayfeatures: false,
	pageview: false
};

GoogleAnalytics.contextTypes = {
	router: React.PropTypes.func.isRequired
};
