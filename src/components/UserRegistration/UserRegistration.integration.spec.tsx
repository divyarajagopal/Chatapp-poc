import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { IApplicationStoreState } from '../../__common__';
import UserRegistrationUI from './UserRegistrationUI';
import {
  IsLoadingActionCreator,
  IsLoadedActionCreator,
  WelcomeActionTypes,
  IsConnectingToServerActionCreator
} from '../../__common__/redux-modules/welcome';
import { ConnectedUserRegistration } from '../../__common__/containers/UserRegistration/UserRegistration';

describe('UserRegistration Component integration with redux tests', () => {
  configure({ adapter: new Adapter() });
  const mockStore = configureStore();
  let store: any, wrapper: ShallowWrapper;
  beforeEach(() => {
    const applicationState: IApplicationStoreState = {
      welcomeStoreState: {
        data: [],
        errorMessage: undefined,
        isLoaded: false
      }
    };
    store = mockStore(applicationState);
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

  test('should render the component as expected with store context', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should dispatch actions correctly on load', () => {
    const actions = store.getActions();
    expect(actions.length).toBe(2);
    expect(actions[0].type).toBe(WelcomeActionTypes.LOADING_WELCOME_SCREEN);
    expect(actions[1].type).toBe(WelcomeActionTypes.LOADED_WELCOME_SCREEN);
  });

  test('should dispatch server connection action correctly', () => {
    store.dispatch(IsConnectingToServerActionCreator());
    const action = store.getActions();
    expect(action[2].type).toBe(WelcomeActionTypes.CONNECTING_TO_SERVER);
  });
});
