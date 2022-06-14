import * as React from 'react';
import { KeyboardAvoidingView, FlatList, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import { chatStyles } from './ChatComponentStyles';
import * as jData from '../../db/question.json';
import { IChatComponentProps } from './ChatComponentProps';
import { IChatComponentState } from './ChatComponentState';
import { ChatInputComponent } from './ChatInputComponent';


export default class ChatComponent extends React.Component<IChatComponentProps, IChatComponentState> {

    messages: string[] = [];
    public constructor(props: IChatComponentProps) {
        super(props);
        this.state = {
            message: '',
            isLoading: true,
            dataSource: [],
            ChatList: [],
        }
        //  this.props.onLoading();
    }
    componentDidMount() {
        this.setState({
            isLoading: false,
            dataSource: jData.query,
        })
        //  this.props.onLoaded();   


    }
    public render() {
        /**  let loader = <View />;
         if (!this.props.isLoaded) {
             loader = (
                 <View style={chatStyles.loader}>
                     <ActivityIndicator size='large' />
                 </View>
             );
         } */
        // const ChatList:IchatItemList[]=this.props.ChatList;
        const userAvatar = this.props.name;
        if (this.state.isLoading) {
            return (<View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator />
            </View>)
        }

        // Need to be revisited after real server response is in place
        const chatMessages =
            this.state.ChatList.map((_item, i) => {
                if (this.state.ChatList[i].type === 'question') {

                    return (
                        <View key={i}>
                            <ListItem
                                key={i}
                                containerStyle={{ marginTop: 10, alignSelf: 'flex-end', backgroundColor: '#fff', borderRightWidth: 5, borderColor: 'grey' }}
                                rightAvatar={{ title: userAvatar ? userAvatar.charAt(0) : '' }}
                                title={<View>
                                    <FlatList
                                        data={[{ key: this.state.ChatList[i].message }]}
                                        // tslint:disable-next-line:no-shadowed-variable
                                        renderItem={({ item }) =>
                                            <View>
                                                <Text>{item.key}</Text>

                                            </View>
                                        }
                                    />
                                </View>}
                            />
                        </View>
                    )
                } else if (this.state.ChatList[i].type === 'answer') {

                    if (this.state.ChatList[i].messages.length > 1) {

                        return (
                            <View key={i} style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'column' }}>
                                <ListItem
                                    key={i}
                                    containerStyle={{ borderLeftWidth: 5, borderColor: 'red', alignSelf: 'flex-end', backgroundColor: '#fff' }}
                                    leftAvatar={{ title: 'A' }}
                                    title={<View>
                                        <Text key={i}>I found {this.state.ChatList[i].messages.length} results for you</Text>

                                    </View>}
                                />
                                <View>
                                    <ListItem
                                        key={i}
                                        containerStyle={{ borderLeftWidth: 5, borderColor: 'red', alignSelf: 'flex-start', backgroundColor: '#fff' }}
                                        title={
                                            <View>
                                                {
                                                    // tslint:disable-next-line:no-shadowed-variable
                                                    this.state.ChatList[i].messages.map((item, j) => (
                                                        <ListItem
                                                            key={i}
                                                            containerStyle={{ borderTopWidth: 0.4, borderBottomWidth: 0.4, borderColor: '#D3D3D3', alignSelf: 'flex-start', backgroundColor: '#fff' }}
                                                            title={
                                                                <Text key={j}> {item} </Text>
                                                            }
                                                        />

                                                    ))}
                                            </View>


                                        }
                                    />

                                </View>
                            </View>

                        )
                    } else {

                        return (

                            <View key={i} style={{ marginTop: 10, backgroundColor: '#fff', flexDirection: 'column' }}>

                                <ListItem
                                    key={i}
                                    containerStyle={{ borderLeftWidth: 5, borderColor: 'red', alignSelf: 'flex-end', backgroundColor: '#fff' }}
                                    leftAvatar={{ title: 'A' }}
                                    title={
                                        <View>
                                            <FlatList
                                                data={[{ key: this.state.ChatList[i].message }]}
                                                // tslint:disable-next-line:no-shadowed-variable
                                                renderItem={({ item }) =>

                                                    <View>
                                                        <Text>{item.key}</Text>

                                                    </View>
                                                }
                                            />
                                        </View>}
                                />
                            </View>
                        )

                    }
                }

            }
            )

        return (
            <KeyboardAvoidingView
                style={chatStyles.container}
                behavior='padding'
            >
                <View style={chatStyles.container}>

                    <View style={chatStyles.chatContainer}>

                        <ScrollView>

                            <View >
                                <ListItem
                                    containerStyle={{ marginTop: 10, borderLeftWidth: 5, borderColor: 'red', backgroundColor: '#fff' }}
                                    leftAvatar={{ title: 'A' }}
                                    title={<View >
                                        <Text >Hi,{userAvatar}! I'm your Virtual Assistant, how can I help you?</Text>
                                    </View>
                                    }

                                />
                                {chatMessages}
                            </View>
                        </ScrollView>
                    </View>
                    <ChatInputComponent name={userAvatar} onSend={(msg: any) => this.sendHandler(msg)} />

                </View>
            </KeyboardAvoidingView>
        );

    }
    sendHandler = (message: string) => {

        let chatUserInput = this.state.ChatList;
        chatUserInput = chatUserInput.concat({ message: message, type: 'question', date: new Date, messages: [] });
        this.setState({ message: message, ChatList: chatUserInput }, () => {
            this.getResponseMessage();
        });


    }
    // Need to re-visit after real server connection is avaialable
    getResponseMessage(): void {

        const data = this.state.dataSource.find((query: any) => query.question.toUpperCase().indexOf((this.state.message).toUpperCase()) > -1)

        if (data) {
            const tempmessages: string[] = [];

            data.answer.map((_item: any, j: string | number) => {
                if (data.answer.length > 1) {

                    tempmessages.push(data.answer[j].text);
                    let chatAnswerMultiple = this.state.ChatList;
                    chatAnswerMultiple = chatAnswerMultiple.concat({ message: '', type: 'answer', date: new Date, messages: tempmessages });
                    this.setState({ ChatList: chatAnswerMultiple })
                } else {
                    let chatAnswerSingle = this.state.ChatList;
                    chatAnswerSingle = chatAnswerSingle.concat({ message: data.answer[j].text, type: 'answer', date: new Date, messages: [] });
                    this.setState({ ChatList: chatAnswerSingle })
                }
            })

        } else {
            let chatAnswerError = this.state.ChatList;
            chatAnswerError = chatAnswerError.concat({ message: 'Sorry! Could not find the answer', type: 'answer', date: new Date, messages: [] });
            this.setState({ ChatList: chatAnswerError }, () => {

            });

        }
    }





}