import { AppRegistry } from 'react-native';
import { App } from './src/main/App';

// Export the root component
export default App;

// Register the main entry point of the application, App component
AppRegistry.registerComponent('Standalone Virtual Agent', () => App)