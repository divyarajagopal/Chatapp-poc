import * as React from 'react';
import { View } from 'react-native';
import HeaderComponent from '../components/HeaderComponent/HeaderComponent';
import ChatComponent from '../components/ChatComponent/ChatComponent';


export class ChatScreen extends React.Component {

  constructor(public props: any) {
    super(props);
  }

  public render() {
    const Userparam = this.props.navigation.state.params.typedUsername;
   // const Sendparam=this.props.onSend;
    return (
      <View style={{ flex: 1 }}>
        <HeaderComponent title='HOME' />

        <ChatComponent name={Userparam} onSend={this.props.onSend}/>

      </View>);
  }
}