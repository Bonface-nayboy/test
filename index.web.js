import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that if you open the app in a web browser, it will run the correct component
registerRootComponent(App);
