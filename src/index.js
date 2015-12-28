import React, { Component, PropTypes } from 'react';
import keys from 'lodash/object/keys';

function initGoogleAnalytics(id, set = {}) {
  if (window.ga || !id) {
    return;
  }

  window.ga = window.ga || function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date; // eslint-disable-line

  (function loadScript() {
    const gads = document.createElement('script');
    gads.async = true;
    gads.type = 'text/javascript';
    gads.src = '//www.google-analytics.com/analytics.js';

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(gads);
  })();

  window.ga('create', id, 'auto');

  keys(set).forEach((key) => {
    const value = set[key];

    window.ga('set', key, value);
  });
}

export default class GoogleAnalytics extends Component {
  static propTypes = {
    id: PropTypes.string,
    set: PropTypes.object,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  componentDidMount() {
    initGoogleAnalytics(this.props.id, this.props.set);

    this.historyListener = this.context.history.listen((err, renderProps) => {
      if (err || !renderProps) {
        return;
      }

      this.pageview(renderProps.location);
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    if (!this.historyListener) {
      return;
    }

    this.historyListener();
    this.historyListener = null;
  }

  pageview(location = {}) {
    const path = location.pathname + location.search;
    if (this.latestUrl === path) {
      return;
    }

    this.latestUrl = path;

    // wait for correct title
    setTimeout(() => {
      GoogleAnalytics.sendPageview(path, document.title);
    }, 0);
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

  render() {
    return null;
  }
}
