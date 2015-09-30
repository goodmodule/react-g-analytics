import React, { Component } from 'react';

let ga = null;

function initGoogleAnalytics(id) {
  if (ga) {
    return;
  }

  if (!id) {
    throw new Error('Google analytics ID is undefined');
  }

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga = window.ga;

  ga('create', id, 'auto');
}

export default class GoogleAnalytics extends Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  };

  componentDidMount() {
    initGoogleAnalytics(this.props.id);

    this.setState({
      isReady: true
    });
  }

  shouldComponentUpdate(props, state) {
    if (state.isReady) {
      this.pageview();
    }

    return false;
  }

  pageview() {
    if (!this.context.router) {
      throw new Error('Router is not presented in the component context.');
    }

    const path = this.context.router.getCurrentPath();
    if (this.latestUrl === path) {
      return;
    }

    this.latestUrl = path;

    GoogleAnalytics.sendPageview(path);
  }

  render() {
    return null;
  }

  static command(...args) {
    if (!ga) {
      throw new Error('Google analytics is not initialized');
    }

    return ga.apply(ga, args);
  }

  static send(what, options) {
    return GoogleAnalytics.command('send', what, options);
  }

  static sendPageview(relativeUrl, title = relativeUrl) {
    return GoogleAnalytics.send('pageview', {
      page: relativeUrl,
      title: title
    });
  }
}
