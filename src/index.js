import React, { Component } from 'react';

function initGoogleAnalytics(id) {
  if (window.ga) {
    return;
  }

  if (!id) {
    throw new Error('Google analytics ID is undefined');
  }

  window.ga = window.ga || function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

  (function() {
    const gads = document.createElement('script');
    gads.async = true;
    gads.type = 'text/javascript';
    gads.src = '//www.google-analytics.com/analytics.js';

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(gads);
  })();

  window.ga('create', id, 'auto');
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

    GoogleAnalytics.sendPageview(path, document.title);
  }

  render() {
    return null;
  }

  static command(...args) {
    if (!window.ga) {
      throw new Error('Google analytics is not initialized');
    }

    return window.ga.apply(window.ga, args);
  }

  static send(what, options) {
    return GoogleAnalytics.command('send', what, options);
  }

  static sendPageview(page, title = page) {
    return GoogleAnalytics.send('pageview', { page, title });
  }
}
