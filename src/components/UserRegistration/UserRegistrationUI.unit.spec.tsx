/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import { IApplicationStoreState } from '../../__common__';
import {
  IsLoadingActionCreator,
  IsLoadedActionCreator
} from '../../__common__/redux-modules/welcome';
import { Button, AsyncStorage } from 'react-native';
import configureStore from 'redux-mock-store';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import UserRegistrationUI from './UserRegistrationUI';
import { ConnectedUserRegistration } from '../../__common__/containers/UserRegistration/UserRegistration';
import { IUserRegistrationRender } from '../../__common__/containers/UserRegistration/UserRegistrationRender';
import { IChatSession } from '../../models/ChatSession';
import { AsyncStorageKeys } from '../../constants/AsyncStorageKeys';
import TextInputUI from '../controls/TextInputUI';

describe('UserRegistrationUI Component unit tests', () => {
  configure({ adapter: new Adapter() });
  const mockStore = configureStore();
  let store: any, wrapper: any, rootWrapper: any;
  beforeEach(() => {
    const applicationState: IApplicationStoreState = {
      welcomeStoreState: {
        data: [],
        errorMessage: undefined,
        isLoaded: false
      }
    };
    store = mockStore(applicationState);
    rootWrapper = shallow(<UserRegistrationUI />, {
      context: { store }
    });
    wrapper = shallow(<UserRegistrationUI />, {
      context: { store }
    });
    store.dispatch(IsLoadingActionCreator());
    store.dispatch(IsLoadedActionCreator());

    const renderParams: any = {
      state: {
        enableStartChatBtn: false,
        email: '',
        userName: '',
        isValidEmail: false,
        isValidUserName: false
      },
      props: {
        navigation: null,
        onConnecting: () => {},
        onLoaded: () => {},
        onLoading: () => {}
      },
      onEmailChangedHandler: () => {},
      onStartChatPressed: () => {},
      onUsernameChangedHandler: () => {}
    };
    wrapper = wrapper.find(ConnectedUserRegistration).renderProp('render')(
      renderParams
    );
  });

  test('should save the username and email in the Async Storage', async () => {
    const renderParams: IUserRegistrationRender = {
      state: {
        userName: 'test',
        email: 'test@test.com',
        isValidEmail: true,
        isValidUserName: true,
        enableStartChatBtn: true
      },
      onEmailChangedHandler: jest.fn(),
      onStartChatPressed: jest.fn(),
      onUsernameChangedHandler: jest.fn()
    };
    AsyncStorage.setItem = jest.fn();
    await ((rootWrapper as ShallowWrapper).instance() as UserRegistrationUI).onStartChatPressed(
      renderParams
    );
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    const chatSessionObj: IChatSession = {
      username: renderParams.state.userName,
      email: renderParams.state.email
    };
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      AsyncStorageKeys.CHAT_SESSION,
      JSON.stringify(chatSessionObj)
    );
    expect(renderParams.onStartChatPressed).toHaveBeenCalledTimes(1);
  });

  test('should render the component as expected with store context', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should have two TextInput components', () => {
    expect(wrapper.find(TextInputUI)).toHaveLength(2);
  });

  test('should have one Button component', () => {
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  test('should have loaded with default Username and Email', () => {
    expect(
      wrapper.find('TextInputUI[placeholder="Username"]').get(0).props.value
    ).toBe('');
    expect(
      wrapper.find('TextInputUI[placeholder="Email"]').get(0).props.value
    ).toBe('');
  });

  test('should have loaded with disabled button with a title of `Start Chat`', () => {
    expect(
      wrapper.find('TextInputUI[placeholder="Username"]').get(0).props.value
    ).toBe('');
    const buttonProps = wrapper.find(Button).get(0).props;
    expect(buttonProps.disabled).toBeTruthy();
    expect(buttonProps.title).toBe('Start Chat');
  });
});
