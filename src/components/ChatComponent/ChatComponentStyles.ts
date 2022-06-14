import { StyleSheet, Dimensions } from 'react-native';

export const chatStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#f5f5f5'
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#6E5BAA',
        paddingTop: 20
    },
    chatContainer: {
        flex: 11,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#eee',
        minHeight: 25
    },
    input: {
        width: Dimensions.get('window').width - 90,
        color: '#555555',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 20,
        flex: 2,
        borderColor: '#6E5BAA',
        alignSelf: 'center'

    },
    sendContainer: {
        justifyContent: 'flex-end',
        paddingRight: 10

    },
    sendLabel: {
        color: '#000',
        fontSize: 15
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center'
  }
});