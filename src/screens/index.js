import React from 'react';
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator,
} from 'react-navigation-redux-helpers';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import { connect } from 'react-redux';

import StartupScreen from './StartupScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import BookDetailScreen from './BookDetailScreen';

import { CameraModal } from '../containers';
import { SideDrawer, BottomTabBar } from '../components';

const BookStackNavigator = createStackNavigator(
  { Home: HomeScreen, BookDetail: BookDetailScreen },
  {
    initialRootName: 'Home',
    headerMode: 'none',
  }
);
const MainTabNavigator = createBottomTabNavigator(
  {
    Home: BookStackNavigator,
    // Barcode は通常の tab navigation ではなく、modal 表示の stack にしたい
    // => MainNavigator
  },
  {
    initialRootName: 'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarComponent: props => <BottomTabBar {...props} />,
  }
);

const MainDrawerNavigator = createDrawerNavigator(
  {
    Main: MainTabNavigator,
  },
  {
    initialRouteName: 'Main',
    contentComponent: SideDrawer,
  }
);

const MainNavigator = createStackNavigator(
  {
    Tab: MainDrawerNavigator,
    CameraModal: CameraModal,
  },
  {
    initialRouteName: 'Tab',
    mode: 'modal',
    headerMode: 'none',
  }
);

const RootNavigator = createSwitchNavigator(
  { Startup: StartupScreen, Login: LoginScreen, Main: MainNavigator },
  { initialRouteName: 'Startup' }
);

// 下記の reduxifyNavigator の実行前に生成するという要件があるため
// redux の middleware をここで生成している
const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation
);

// エラーメッセージが「createReactNavigationReduxMiddleware を先に実行せよ」だったので
// 真に受けて順番をうたがって散々苦労したら、引数 'root' を渡し忘れていただけだった。。。
const ReduxifedNavigator = reduxifyNavigator(RootNavigator, 'root');

// 以下はサンプル通り、必須
// state.navigation は combineReducer で設定しているキーと合わせる
const mapStateToProps = state => ({
  state: state.navigation,
});

// 1. "reduxify" して 2. redux に connect する
const AppNavigator = connect(mapStateToProps)(ReduxifedNavigator);

// navigationMiddleware は createStore で使用する
export { AppNavigator, RootNavigator, navigationMiddleware };
