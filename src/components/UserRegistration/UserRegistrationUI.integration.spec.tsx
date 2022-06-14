/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import { IApplicationStoreState } from '../../__common__';
import configureStore from 'redux-mock-store';
import { mount, configure, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import UserRegistrationUI from './UserRegistrationUI';
import { Provider } from 'react-redux';
import { UserRegistration } from '../../__common__/containers/UserRegistration/UserRegistration';
import { View } from 'react-native';
import '';

describe('UserRegistrationUI Component integration with child component tests', () => {
  configure({ adapter: new Adapter() });
  const mockStore = configureStore();
  let store: any;
  let wrapper: ReactWrapper;
  let userRegistration: UserRegistration;
  let userRegistrationWrapper: any;
  const originalConsoleError = console.error;

  afterAll(() => {
    console.error = originalConsoleError;
  });

  beforeAll(() => {
    console.error = (message: any) => {
      if (message.startsWith('Warning:')) {
        return;
      }

      originalConsoleError(message);
    };
  });

  beforeEach(() => {
    const applicationState: IApplicationStoreState = {
      welcomeStoreState: {
        data: [],
        errorMessage: undefined,
        isLoaded: false
      }
    };
    store = mockStore(applicationState);
    wrapper = mount(
      <Provider store={store}>
        <UserRegistrationUI />
      </Provider>
    );

    userRegistrationWrapper = wrapper.find(UserRegistration);

    userRegistration = userRegistrationWrapper.instance() as UserRegistration;
  });

  test('should render the component as expected with store context', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should validate UserName', () => {
    userRegistration.onUsernameChangedHandler('test');
    expect(userRegistrationWrapper.state('isValidUserName')).toBeTruthy();

    userRegistration.onUsernameChangedHandler(
      '1234567890123456789012345678901'
    );
    expect(userRegistrationWrapper.state('isValidUserName')).toBeFalsy();
  });

  test('should validate Email', () => {
    userRegistration.onEmailChangedHandler('test@test.com');
    expect(userRegistrationWrapper.state('isValidEmail')).toBeTruthy();

    userRegistration.onEmailChangedHandler('invalid email');
    expect(userRegistrationWrapper.state('isValidEmail')).toBeFalsy();
  });

  test('should set the data on pressing start chat button', () => {
    const expectedUserName = 'test';
    expect(userRegistration.props.isLoaded).toBeFalsy();

    userRegistration.componentDidMount();

    userRegistration.onUsernameChangedHandler(expectedUserName);
    userRegistration.onEmailChangedHandler('test@test.com');
    expect(userRegistrationWrapper.state('enableStartChatBtn')).toBeTruthy();

    userRegistration.onStartChatPressed();
    expect(userRegistration.props.isLoaded).toBeFalsy();

    // From here
    const renderVal = () => <View />;
    wrapper.setProps({
      children: (
        <UserRegistration
          data={{ movies: [{ title: 'star wars' }] }}
          onLoaded={jest.fn()}
          onLoading={jest.fn()}
          onConnecting={jest.fn()}
          navigation={{ navigate: jest.fn() }}
          render={renderVal}
        />
      )
    });

    userRegistration = wrapper
      .find('UserRegistration')
      .instance() as UserRegistration;

    userRegistration.componentDidUpdate();
    expect(userRegistration.props.data.movies[0].title).toBe('star wars');
    expect(userRegistration.props.navigation.navigate).toHaveBeenCalledTimes(1);
  });

  test('should set the error message on pressing start chat button', () => {
    // From here
    const renderVal = () => <View />;
    wrapper.setProps({
      children: (
        <UserRegistration
          data={{ errorMessage: 'Error Occured' }}
          onLoaded={jest.fn()}
          onLoading={jest.fn()}
          onConnecting={jest.fn()}
          navigation={{ navigate: jest.fn() }}
          render={renderVal}
        />
      )
    });

    userRegistration = wrapper
      .find('UserRegistration')
      .instance() as UserRegistration;

    userRegistration.componentDidUpdate();
    expect(userRegistration.props.data.errorMessage).toBe('Error Occured');
  });
});
