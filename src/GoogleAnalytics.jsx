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

  static command(what, options, ...args) {
    if (!window.ga) {
      throw new Error('Google analytics is not initialized');
    }

    if (typeof options === 'string') {
      return window.ga(what, options, ...args);
    }

    return window.ga(what, options);
  }

  static set(...options) {
    return GoogleAnalytics.command('set', ...options);
  }

  static send(...options) {
    return GoogleAnalytics.command('send', ...options);
  }

  componentDidMount() {
    initGoogleAnalytics(this.props.id, this.props.set);

    const { history } = this.context;
    this.unlisten = history.listen(this.onLocationChange);

    // send current pageview
    this.pageview(history.location);
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

  pageview(location) {
    const path = location.pathname + location.search;
    if (this.latestUrl === path) {
      return;
    }

    this.latestUrl = path;

    GoogleAnalytics.set('page', {
      page: path,
      title: document.title,
      location: document.location,
    });

    GoogleAnalytics.send({
      hitType: 'pageview',
    });
  }

  render() {
    return this.props.children;
  }
}
