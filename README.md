# React Google Analytics 反应Google Analytics
反应谷歌分析的反应路由器。 如果需要Google Analytics（分析）之类的功能，就可以使用。

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/react-g-analytics.svg?style=flat-square
[npm-url]: https://www.npmjs.com/react-g-analytics
[github-url]: https://github.com/seeden/react-g-analytics

## Motivation 动机

Google analytics works with react router

## Install 安装

```
npm install react-g-analytics
```

## Features

 * load google analytics scripts (optional - needs an id parameter)
 * send pageview when user will change route of script

# Support us

Star this project on [GitHub][github-url].

## Notice

Use version 0.3.x of the react-g-analytics if you want to use it with react-router 4.x
Use version 0.2.x of the react-g-analytics if you want to use it with react-router 2.x or 3.x
It should be good owtherwise

## Usage 该代码的用法

### Example react-router 4.x

User uses BrowserRouter from react-g-analytics instead...

```js
import { BrowserRouter } from 'react-g-analytics';

export default function MyComponent() {
  return (
    <BrowserRouter id="UA-*******-**">
      ... your application
    <BrowserRouter>
  );
}

>
```

### Example react-router 3.x and bellow

#### App.jsx

Application part (load google analytics script at your webpage on the client side).
this code has parameter ID (use your own ID)

```js
var React = require('react');


var GoogleAnalytics = require('react-g-analytics');



var App = module.exports = React.createClass({
  render: function() {
    return (
      <div id="application">
        <GoogleAnalytics id="UA-*******-**" />
        <RouteHandler />
      </div>
    );
  }
});
```

### routes.jsx 路线

Define your routes here.

```js
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Index = require('./Index.jsx');
var App = require('./App.jsx');

var routes = module.exports = (
  <Route handler={App} name="index" path="/">
    <DefaultRoute handler={Index} />
  </Route>
);
```

### client.js 客户

Here is a simple client side

```js
var React = require('react');
var app = require('./App.jsx');
var routes = require('./routes.jsx');

var router = Router.create({
  routes: routes
});

router.run(function(Handler, state) {
  React.render(React.createElement(Handler, {}), node);
});
```

## Set 组

If you want to set google analytics parameters after load you can use property named set. Here is small example:

```js
var React = require('react');
var GoogleAnalytics = require('react-g-analytics');
var RouteHandler = require('react-router').RouteHandler;

var set = {
  anonymizeIp: true
};

var App = module.exports = React.createClass({
  render: function() {
    return (
      <div id="application">
        <GoogleAnalytics id="UA-*******-**" set={set} />
        <RouteHandler />
      </div>
    );
  }
});
```

## Skip loading google analytics scripts 跳过加载谷歌分析脚本

If you are loading the GA in different way. You can skip autoload of the GA script simply:
Do not enter your google analytics ID as parameter.

## Try our other React components 尝试其他反应成分

 - Translate your great project [react-translate-maker](https://github.com/CherrySoftware/react-translate-maker)
 - Forms [react-form-controlled](https://github.com/seeden/react-form-controlled)
 - Google AdSense via Google Publisher Tag [react-google-publisher-tag](https://github.com/seeden/react-google-publisher-tag)

# Support us

Star this project on [GitHub][github-url].

## Credits

[Zlatko Fedor](http://github.com/seeden)

## License

the code is licensed at The MIT License (MIT)

Copyright (c) 2016 Zlatko Fedor zlatkofedor@cherryprojects.com
