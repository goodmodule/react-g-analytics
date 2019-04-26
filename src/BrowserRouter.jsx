import { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, BrowserRouter } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import GoogleAnalytics from './GoogleAnalytics';

export default class GABrowserRouter extends Component {
  static propTypes = {
    ...BrowserRouter.propTypes,
    history: PropTypes.object,
    children: PropTypes.node,
    id: PropTypes.string.isRequired,
    set: PropTypes.object,
  };

  static childContextTypes = {
    history: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      history: this.history,
    };
  }

  componentWillMount() {
    const {
      history,
      basename,
      forceRefresh,
      getUserConfirmation,
      keyLength,
    } = this.props;

    this.history = history || createBrowserHistory(
      basename,
      forceRefresh,
      getUserConfirmation,
      keyLength,
    );
  }

  render() {
    const {
      id,
      set,
      children,
    } = this.props;

    return (
      <Router history={this.history}>
        <GoogleAnalytics id={id} set={set}>
          {children}
        </GoogleAnalytics>
      </Router>
    );
  }
}
