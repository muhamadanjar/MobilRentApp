import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View,TextInput,Image } from 'react-native';
import AuthButton from './AuthButton';
import {loginFetch, logout, userFetch,getInputDataUsername,getInputDataPassword} from './LoginActions';
import { NavigationActions } from 'react-navigation';
import { reduxForm, Field } from 'redux-form';
import TInput from './TInput';
import { Button } from "native-base";
const styles = StyleSheet.create({
  

  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
    flex: 1,
  },

  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
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
    textAlign:'center'
  }
});

const LoginScreen = ({ navigation,loginFetch,getInputData,loader }) => {
  function handleInput(key, val){
		getInputData({
			key,
			value:val
		});
	}

  return(<View>
    <View>
      <Text>
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
        style={styles.inputBox}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.inputBox}
        onChangeText={handleInput.bind(this, "password")}
        onSubmitEditing={loginFetch}
        
      />
      <View style={{flex:1}}>
        <Button block
          onPress={loginFetch}
          title="Log in"
          style={{backgroundColor:'#FF5E3A',marginBottom:10,marginLeft:15,marginRight:10,borderRadius:7}}
        >
          <Text style={{fontSize:16,fontWeight:'bold'}}>Login</Text>
        </Button>
        
        
      </View>
      
      
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
