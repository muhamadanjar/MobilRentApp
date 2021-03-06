import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Main from '../components/Main';
import Login from '../components/Login';
import Register from '../components/Register/Register';
import PesanMobil from '../components/Mobil/PesanMobil';

import Mobil from '../components/Mobil/Mobil';
import Profil from '../components/Profil/Profil';
import ListMobil from '../components/Mobil/ListMobil';
//import TrackDriver from '../components/TrackDriver/components/TrackDriver';
import TrackDriver from '../components/TrackDriver/TrackDriver';
import { addListener } from '../utils/redux';

export const AppNavigator = StackNavigator({
  Main: { screen: Main },
  Login: { screen: Login },
  Register:{ screen: Register},
  Mobil: { screen:Mobil },
  PesanMobil: { screen: PesanMobil },
  ListMobil:{ screen: ListMobil},
  Profile: { screen: Profil },
  TrackDriver: { screen: TrackDriver },
  
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
