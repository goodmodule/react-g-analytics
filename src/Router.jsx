import React, { Component, PropTypes } from 'react';
import { StaticRouter } from 'react-router';

export default class Router extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location,
      action: props.history.action,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    this.unlisten = history.listen(() => {
      this.setState({
        location: history.location,
        action: history.action,
      });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { location, action } = this.state;
    const { history, ...rest } = this.props;
    return (
      <StaticRouter
        action={action}
        location={location}
        onPush={history.push}
        onReplace={history.replace}
        blockTransitions={history.block}
        {...rest}
      />
    );
  }
}
