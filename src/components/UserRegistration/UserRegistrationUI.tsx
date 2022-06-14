import * as React from 'react';
import { Component } from 'react';
import { View, Button, ActivityIndicator, AsyncStorage } from 'react-native';
import { UserRegistrationStyles as styles } from './UserRegistrationUIStyles';
import { IUserRegistrationRender } from '../../__common__/containers/UserRegistration/UserRegistrationRender';
import { IChatSession } from '../../models/ChatSession';
import { AsyncStorageKeys } from '../../constants/AsyncStorageKeys';
import { ConnectedUserRegistration } from '../../__common__/containers/UserRegistration/UserRegistration';
import TextInputUI from '../controls/TextInputUI';
import TouchableOpacityUI from '../controls/TouchableOpacityUI';

class UserRegistrationUI extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public onStartChatPressed = async (renderObject: IUserRegistrationRender) => {
    renderObject.onStartChatPressed();

    const chatSessionObj: IChatSession = {
      username: renderObject.state.userName,
      email: renderObject.state.email
    };
    await AsyncStorage.setItem(
      AsyncStorageKeys.CHAT_SESSION,
      JSON.stringify(chatSessionObj)
    );
  };

  public render = () => {
    const renderLoader = (isLoaded?: boolean) => {
      let loader = <View />;
      if (!isLoaded) {
        loader = (
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        );
      }
      return loader;
    };

    return (
      <View style={{ flex: 1 }}>
        <ConnectedUserRegistration
          navigation={this.props.navigation}
          render={(renderObj: IUserRegistrationRender) => (
            <View style={styles.container}>
              {renderLoader(renderObj.props && renderObj.props.isLoaded)}
              <View style={styles.inputContainer}>
                <TextInputUI
                  error={
                    renderObj.state.userName && !renderObj.state.isValidUserName
                  }
                  value={renderObj.state.userName}
                  placeholder="Username"
                  onChangeText={renderObj.onUsernameChangedHandler}
                />
                <TextInputUI
                  error={renderObj.state.email && !renderObj.state.isValidEmail}
                  value={renderObj.state.email}
                  placeholder="Email"
                  onChangeText={renderObj.onEmailChangedHandler}
                />
                <TouchableOpacityUI>
                  <Button
                    disabled={!renderObj.state.enableStartChatBtn}
                    title="Start Chat"
                    onPress={async () =>
                      await this.onStartChatPressed(renderObj)
                    }
                  />
                </TouchableOpacityUI>
              </View>
            </View>
          )}
        />
      </View>
    );
  };
}

export default UserRegistrationUI;
