import React from "react";
import {View, Text, AsyncStorage } from "react-native";

import { connect } from 'react-redux';
import {
	loginFetch, logout, userFetch, getInputData,
	getUserToken
	//getUserToken, getUserData
} from "./LoginActions";
import LoginScreen from './LoginScreen';
import Logo from './Logo';
class Login extends React.Component{
	
    componentDidMount() {
		//console.log(this.props.getUserToken());
		//alert(this.props.token);
		try {
			AsyncStorage.getItem('@token', (err, result) => {
				console.log('token = ',result);
				//return result;
			});
		  } catch (error) {
			// Error retrieving data
		}
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
    	return await AsyncStorage.getItem("@user");
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
	token:state.auth.token,
	user:state.auth.user || {},
});

const mapActionCreators = {
	getInputData,
	loginFetch,
	getUserToken
};

export default connect(mapStateToProps, mapActionCreators)(Login);