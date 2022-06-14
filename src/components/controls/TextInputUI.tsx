import * as React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textInputUnderline: {
    color: 'transparent'
  },
  textInput: {
    width: '100%',
    margin: 10,
    padding: 10,
    borderColor: 'grey',
    borderWidth: 3,
    borderRadius: 5
  },
  placeholderText: {
    color: 'grey'
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 3
  }
});

const TextInputUI = (props: any) => (
  <TextInput
    underlineColorAndroid={styles.textInputUnderline.color}
    placeholderTextColor={styles.placeholderText.color}
    {...props}
    style={[styles.textInput, props.error ? styles.inputError : null]}
  />
);

export default TextInputUI;
