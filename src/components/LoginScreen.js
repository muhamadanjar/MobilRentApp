import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, View,TextInput,Image } from 'react-native';
import AuthButton from './AuthButton';
import {loginFetch, logout, userFetch,getInputDataUsername,getInputDataPassword} from './LoginActions';
import { NavigationActions } from 'react-navigation';
import { reduxForm, Field } from 'redux-form';
import TInput from './TInput'
const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },

  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#000000',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
});

const LoginScreen = ({ navigation,loginFetch,getInputData }) => {
  function handleInput(key, val){
		getInputData({
			key,
			value:val
		});
	}

  return(<View style={styles.container}>
    <View>
      <Text style={styles.welcome}>
        Login
      </Text>
    </View>
    <View>
      <TextInput
        placeholder='Username' 
        autoFocus={true}
        keyboardType="email-address"
        style={styles.inputBox}
        name={'email'}
        onChangeText={handleInput.bind(this, "username")}
        selectTextOnFocus={true}
       // onSubmitEditing={(event) => this.refs.password.focus()}
        returnKeyType={'next'}
       
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.inputBox}
        onChangeText={handleInput.bind(this, "password")}
        onSubmitEditing={loginFetch}
        
      />
      
      <Button
        onPress ={loginFetch}
        title="Log in"
      />
      
    </View>
  </View>);
};


//LoginScreen.propTypes = {
  //navigation: PropTypes.object.isRequired,
  //onLogin: PropTypes.func.isRequired,
  //onLogout: PropTypes.func.isRequired,
  //onUser: PropTypes.func.isRequired,
//};



export default LoginScreen;
