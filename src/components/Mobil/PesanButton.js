import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button,StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
const styles = StyleSheet.create({
	button:{
    alignSelf:'stretch',
    backgroundColor:'#ccc',
    borderColor:'#000',
    color:'#000',
    flex: 1,
    
	},
	
});
const PesanButton = ({ pesanMobil }) => (
  <Button
    title={'Pesan'}
    onPress={pesanMobil}
    style={styles.button}
  />
);

PesanButton.propTypes = {
  pesanMobil: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  pesanMobil: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Mobil' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(PesanButton);
