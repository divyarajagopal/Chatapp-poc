import * as React from 'react';
import { View } from 'react-native';
import UserRegistrationUI from '../components/UserRegistration/UserRegistrationUI';

export class WelcomeScreen extends React.Component {
  constructor(public props: any) {
    super(props);
  }
  public render() {
    return (
      <View style={{ flex: 1 }}>
        <UserRegistrationUI navigation={this.props.navigation} />
      </View>
    );
  }
}

export default WelcomeScreen;
