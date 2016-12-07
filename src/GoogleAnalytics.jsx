import React, { Component, PropTypes } from 'react';

function loadScript() {
  const gads = document.createElement('script');
  gads.async = true;
  gads.type = 'text/javascript';
  gads.src = '//www.google-analytics.com/analytics.js';

  const head = document.getElementsByTagName('head')[0];
  head.appendChild(gads);
}

function initGoogleAnalytics(id, set) {
  if (window.ga || !id) {
    return;
  }

  window.ga = window.ga || function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date; // eslint-disable-line

  loadScript();

  window.ga('create', id, 'auto');

  if (set) {
    Object.keys(set).forEach((key) => {
      window.ga('set', key, set[key]);
    });
  }
}

export default class GoogleAnalytics extends Component {
  static propTypes = {
    id: PropTypes.string,
    set: PropTypes.object,
    children: PropTypes.node,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

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

  componentDidMount() {
    initGoogleAnalytics(this.props.id, this.props.set);

    this.unlisten = this.context.history.listen(this.onLocationChange);
  }

  onLocationChange = (location, action) => {
    this.pageview(location);
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
      this.unlisten = null;
    }
  }

  pageview(location = {}) {
    const path = location.pathname + location.search;
    if (this.latestUrl === path) {
      return;
    }

    this.latestUrl = path;

    GoogleAnalytics.sendPageview(path, document.title);
  }

  render() {
    const { children } = this.props;

    return children;
  }
}
