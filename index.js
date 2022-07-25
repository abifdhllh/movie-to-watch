/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const _XHR = global.originalXMLHttpRequest
  ? global.originalXMLHttpRequest
  : global.XMLHttpRequest;

XMLHttpRequest = _XHR;

AppRegistry.registerComponent(appName, () => App);
