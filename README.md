# React Google Analytics

React GA contains two parts. First one is an initialisation part (react component) which will load google analytics script on the client side. Second is mixin for RouterHandler, which will notify google when you will change your current url.

## Install

	$ npm install react-g-analytics

## Features

 * Automatically load google analytics scripts (React component)
 * Automatically send pageview when user will change current route of react-router (React Mixin)


## Usage

	//app.jsx
	//application part (load google analytics script to your webpage on the client side)

	var React = require('react');
	var ReactGAnalytics = require('react-g-analytics');
	var RouteHandler = require('react-router').RouteHandler;

	var App = module.exports = React.createClass({
		render: function() {
			return (
				<div id="application">
					<ReactGAnalytics id="UA-*******-**" />
					<RouteHandler />
				</div>
			);
		}
	});


	//index.jsx
	//add mixin to your Route Handlers
	//you need to add Router.State too because it will provide required method named getPath to ReactGAnalyticsMixin

	var React = require('react');
	var Router = require('react-router');
	var ReactGAnalyticsMixin = require('react-g-analytics').Mixin;
	
	var Index = module.exports = React.createClass({
		mixins: [Router.State, ReactGAnalyticsMixin],

	    render: function() {
	        return (
	            <h1>Content of the index</h1>
	        );
	    }
	});


	//routes.jsx

	var React = require('react');
	var Router = require('react-router');
	var Route = Router.Route;
	var DefaultRoute = Router.DefaultRoute;
	var Index = require('./index.jsx');

	var routes = module.exports = (
		<Route name="index">
			<DefaultRoute handler={Index} />
		</Route>
	);


	//client.js

	var React = require('react');
	var app = require('./app.jsx');
	var routes = require('./routes.jsx');

	var router = Router.create({
		routes: routes
	});

	router.run(function(Handler, state) {
		React.render(React.createElement(Handler, {}), node);
	});