import React from "react";
import {View, Text, AsyncStorage } from "react-native";

import { connect } from 'react-redux';
import {
	loginFetch, logout, userFetch, getInputData
} from "./LoginActions";
import LoginScreen from './LoginScreen';
class Login extends React.Component{
	
    componentDidMount() {
		console.log(this.props.userFetch);
		alert(this.props.user);
		console.log(this.getData());
	}
	componentDidUpdate(prevProps, prevState) {
        
	}
    render(){
		return(
		<View>
			<LoginScreen getInputData={this.props.getInputData}
				loginFetch={this.props.loginFetch}
				navigation={this.props.navigation}
			/>
			
		</View>);
    }
	async getData(){
    	return await AsyncStorage.getItem("@App:user");
	}
}

Login.navigationOptions = {
	title: 'Log In',
	headerMode: 'none',
	header:null
};

const mapStateToProps = (state) => ({
	inputData:state.auth.inputData || {},
	isLoggedIn:state.auth.isLoggedIn,
	token:state.auth.token
});

const mapActionCreators = {
	getInputData,
	loginFetch
};

export default connect(mapStateToProps, mapActionCreators)(Login);