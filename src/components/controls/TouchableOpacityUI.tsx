import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    margin: 10,
    borderColor: 'grey',
    borderWidth: 3,
    borderRadius: 5
  }
});

const TouchableOpacityUI = (props: any) => (
  <TouchableOpacity {...props} style={[styles.button, props.style]}>
    {props.children}
  </TouchableOpacity>
);

export default TouchableOpacityUI;
