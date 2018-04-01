import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet,Image,TouchableOpacity } from 'react-native';

import { NavigationActions } from 'react-navigation';

import { Button } from "native-base";
import { View, InputGroup, Input,Text } from "native-base";
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

const RegisterScreen = ({ navigation,getInputData,loader,registerFetch }) => {
  function handleInput(key, val){
		getInputData({
			key,
			value:val
		});
	}

  return(
    <View>
        <View>
            <InputGroup>
                <Input 
                    placeholder="Nama"
                    autoFocus={true}
                    keyboardType="email-address"
                    style={styles.inputBox}
                    onChangeText={handleInput.bind(this, "namalengkap")}
                    selectTextOnFocus={true}
                />
            </InputGroup>
        </View>
        <View>
            <InputGroup>
                <Input 
                    placeholder="Email"
                    autoFocus={true}
                    keyboardType="email-address"
                    style={styles.inputBox}
                    onChangeText={handleInput.bind(this, "email")}
                    selectTextOnFocus={true}
                />
            </InputGroup>
        </View>
        <View>
            <InputGroup>
                <Input 
                    placeholder="Username"
                    autoFocus={true}
                    keyboardType="email-address"
                    style={styles.inputBox}
                    onChangeText={handleInput.bind(this, "username")}
                    selectTextOnFocus={true}
                />
            </InputGroup>
        </View>
        <View>
            <InputGroup>
                <Input 
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.inputBox}
                    onChangeText={handleInput.bind(this, "password")}
                />
            </InputGroup>
        </View>
        <View>
            <InputGroup>
                <Input 
                    placeholder="Ketik ulang Password"
                    secureTextEntry={true}
                    style={styles.inputBox}
                    onChangeText={handleInput.bind(this, "repassword")}
                />
            </InputGroup>
        </View>
      <View>
        <Button block
            title="Register"
            onPress={registerFetch}
            style={{backgroundColor:'#FF5E3A',marginBottom:10,marginLeft:15,marginRight:10,borderRadius:7}}
        >
            <Text style={{fontSize:16,fontWeight:'bold'}}>Daftar</Text>
        </Button>
      </View>
      
    </View>
  );
};

export default RegisterScreen;
