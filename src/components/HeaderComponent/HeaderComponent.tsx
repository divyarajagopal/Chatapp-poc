import * as vectorIcons from '@expo/vector-icons';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { Header } from 'react-native-elements';
import { headerStyles } from './HeaderStyles';
import { IHeaderComponentProps } from './HeaderComponentProps';

export default class HeaderComponent extends React.Component<IHeaderComponentProps> {
  constructor(props: IHeaderComponentProps) {
    super(props);
  }
  public render() {
    return (<View>
      <Header style={headerStyles.header}
        leftComponent={<vectorIcons.Ionicons size={30} color='red'
          name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
        />}
        centerComponent={{ text: 'HOME', style: { color: 'red', fontSize: 20 } }}
        rightComponent={<vectorIcons.Ionicons size={30} color='red'
          name={Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'}
        />}
        containerStyle={{
          backgroundColor: '#fff',
          justifyContent: 'space-around',
          marginTop: 0,
        }}
      />
    </View>);
  }
}
