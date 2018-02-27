import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Login from '../components/Login';
import MainScreen from '../components/MainScreen';
import PesanMobil from '../components/Mobil/PesanMobil';

import Mobil from '../components/Mobil/Mobil';
import ProfileScreen from '../components/ProfileScreen';
import ListMobil from '../components/Mobil/ListMobil';
import { addListener } from '../utils/redux';

export const AppNavigator = StackNavigator({
  Login: { screen: Login },
  Main: { screen: MainScreen },
  Mobil: { screen:Mobil },
  PesanMobil: { screen: PesanMobil },
  ListMobil:{ screen: ListMobil},
  Profile: { screen: ProfileScreen },
});

class AppWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
