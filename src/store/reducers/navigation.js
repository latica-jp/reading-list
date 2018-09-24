import * as actionTypes from '../actions/actionTypes';
// reduxify した RootNavigator ではなく、RootNavigator なので注意
import { RootNavigator } from '../../screens/index';
import { NavigationActions } from 'react-navigation';

const initialState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams('Startup')
);

export const navigation = (state = initialState, action) => {
  // この1行が必要な理由は、これがないと router で直接 navigate した場合に state が同期しなくなるから？
  let nextState = RootNavigator.router.getStateForAction(action, state);
  switch (action.type) {
    case actionTypes.RESTORE_SESSION_SUCCESS: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Main' }, state)
      );
      break;
    }
    case actionTypes.RESTORE_SESSION_FAILED:
    case actionTypes.SIGNOUT_SUCCESS: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }, state)
      );
      break;
    }
    case actionTypes.SIGNUP_SUCCESS:
    case actionTypes.SIGNIN_SUCCESS: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Main' }, state)
      );
      break;
    }
    case actionTypes.SIGNUP_FAILED:
    case actionTypes.SIGNIN_FAILED: {
      break;
    }
    case actionTypes.SHOW_CAMERA_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Camera' }, state)
      );
      break;
    }
  }
  return nextState || state;
};
