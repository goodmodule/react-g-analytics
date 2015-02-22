# React Google Analytics

React GA contains two parts. First one is an initialisation part (react component) which will load google analytics script on the client side. Second is mixin for RouterHandler, which will notify google when you will change your current url.


## Motivation

I needed google analytics working in combination with react-router.


## Install

	$ npm install react-g-analytics

## Features

 * Automatically load google analytics scripts (React component)
 * Automatically send pageview when user will change current route of react-router (React Mixin)


## Usage

### app.jsx

Application part (load google analytics script to your webpage on the client side). ReactGAnalytics has parameter ID (use your own ID)

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


### index.jsx

Add mixin to your Route Handlers. You need to add Router.State too because it will provide required method named getPath to ReactGAnalyticsMixin

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


### routes.jsx

Define your routes here.

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


### client.js

Here is a simple client side 


	var React = require('react');
	var app = require('./app.jsx');
	var routes = require('./routes.jsx');

	var router = Router.create({
		routes: routes
	});

	router.run(function(Handler, state) {
		React.render(React.createElement(Handler, {}), node);
	});

		
## Credits

[Zlatko Fedor](http://github.com/seeden)

## License

The MIT License (MIT)

Copyright (c) 2015 Zlatko Fedor zlatkofedor@cherrysro.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.