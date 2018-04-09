import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
const styles = StyleSheet.create({
	button:{
    alignSelf:'stretch',
    //backgroundColor:'#ccc',
    borderColor:'#000',
    //color:'#000',
    flex: 1,
    
	},
	
});
const PesanButton = ({ pesanMobil,title,icon }) => (
  <Button block light iconLeft
    title={'Pesan'}
    onPress={pesanMobil}
    style={styles.button}
  ><Icon name={icon} /><Text> {title} </Text></Button>
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
