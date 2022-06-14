import * as React from 'react';
import { View, Text, TouchableHighlight, TextInput } from 'react-native';
import { chatStyles } from './ChatComponentStyles';
import { IChatComponentProps} from './ChatComponentProps';
import { IChatComponentState } from './ChatComponentState';


export class ChatInputComponent extends React.Component<IChatComponentProps, IChatComponentState> {

    public constructor(props: IChatComponentProps) {
        super(props);
        this.state = {
            message: '',
            isLoading: true,
            dataSource: [],
            ChatList:[]
        }
        //  this.props.onLoading();
    }
    public render() {

        // const userAvatar = this.props.name;

        return (

            <View style={chatStyles.container}>


                <View style={chatStyles.inputContainer}>
                    <View style={chatStyles.textContainer}>
                        <TextInput
                            style={chatStyles.input}
                            value={this.state.message}
                            multiline={true}
                            placeholder='Type your question here..'
                            onChangeText={(text) => this.setState({ message: text })}
                        // onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                        />
                    </View>
                    <View style={chatStyles.sendContainer}>
                        <TouchableHighlight
                            underlayColor={'#4e4273'}
                            onPress={() => this.onSendPress()}
                        >
                            <Text style={chatStyles.sendLabel}>SEND</Text>
                        </TouchableHighlight>
                    </View>

                </View>

            </View>

        );


    }


    onSendPress(): void {
        if (this.state.message !== '') {
            this.props.onSend(this.state.message);

        }
        this.setState({ message: '' })


    }

} 