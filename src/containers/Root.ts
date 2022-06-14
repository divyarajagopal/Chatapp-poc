import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import { ChatScreen } from '../screens/ChatScreen';

const AppNavigator = createStackNavigator({
    Welcome: {
     screen: WelcomeScreen,
     navigationOptions: {
       header: null,
     }
   },
   Chat: {
     screen: ChatScreen,
     navigationOptions: {
     header: null,
    }
   },
  });
  
  export const Root = createAppContainer(AppNavigator);