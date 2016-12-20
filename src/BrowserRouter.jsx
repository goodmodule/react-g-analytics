import React, { PropTypes, Component } from 'react';
import { BrowserRouter } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import GoogleAnalytics from './GoogleAnalytics';
import Router from './Router';

export default class GABrowserRouter extends Component {
  static propTypes = {
    ...BrowserRouter.propTypes,
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
      basename,
      forceRefresh,
      getUserConfirmation,
      keyLength,
    } = this.props;

    this.history = createBrowserHistory(
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
      basename,
      forceRefresh,
      getUserConfirmation,
      keyLength,
      children,
      ...rest,
    } = this.props;

    return (
      <Router
        history={this.history}
        {...rest}
      >
        <GoogleAnalytics id={id} set={set}>
          {children}
        </GoogleAnalytics>
      </Router>
    );
  }
}
