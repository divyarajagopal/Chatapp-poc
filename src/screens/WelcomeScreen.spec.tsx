import * as React from 'react';
import configureStore from 'redux-mock-store';
import { IApplicationStoreState } from '../__common__';
import { WelcomeActionTypes } from '../__common__/redux-modules/welcome';
import { shallow, configure } from 'enzyme';
import { WelcomeScreen } from './WelcomeScreen';
import toJson from 'enzyme-to-json';
import * as Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';

describe('WelcomeScreen Component', () => {
  configure({ adapter: new Adapter() });
  const mockStore = configureStore();
  let store: any, tree: any;
  beforeEach(() => {
    const applicationState: IApplicationStoreState = {
      welcomeStoreState: {
        data: [],
        errorMessage: undefined,
        isLoaded: false
      }
    };
    store = mockStore(applicationState);
  });

  test(`should render the component as expected`, () => {
    tree = shallow(<WelcomeScreen />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  test('should render the component as expected with store context', () => {
    const wrapper = shallow(<WelcomeScreen />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });

  test('should dispatch actions correctly on load', () => {
    tree = renderer
      .create(
        <Provider store={store}>
          <WelcomeScreen />
        </Provider>
      )
      .toJSON();

    const actions = store.getActions();
    expect(actions.length).toBe(2);
    expect(actions[0].type).toBe(WelcomeActionTypes.LOADING_WELCOME_SCREEN);
    expect(actions[1].type).toBe(WelcomeActionTypes.LOADED_WELCOME_SCREEN);
  });
});
