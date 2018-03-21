import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';


import MainScreen from '../components/MainScreen';
import Main from '../components/Main';
import Login from '../components/Login';
import PesanMobil from '../components/Mobil/PesanMobil';

import Mobil from '../components/Mobil/Mobil';
import Profil from '../components/Profil/Profil';
import ListMobil from '../components/Mobil/ListMobil';
import { addListener } from '../utils/redux';

export const AppNavigator = StackNavigator({
  Main: { screen: Main },
  Login: { screen: Login },
  Mobil: { screen:Mobil },
  PesanMobil: { screen: PesanMobil },
  ListMobil:{ screen: ListMobil},
  Profile: { screen: Profil },
},{
  initialRouteName: 'Login',
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
