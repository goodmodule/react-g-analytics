import GAInitComponent from './gainitcomponent';
import { Component } from 'react';

var latestUrl = null;

export default class GANotifyComponent extends Component {
	_notifyGA() {
		if(!this.context.router) {
			throw new Error('Router is not presented in the component context.');
		}

		var path = this.context.router.getPath();
		if(latestUrl === path) {
			return;
		}

		latestUrl = path;

		GAInitComponent.sendPageview(path);
	}

	componentDidMount() {
		this._notifyGA();
	}

	componentWillUnmount() {
		this._notifyGA();
	}
};