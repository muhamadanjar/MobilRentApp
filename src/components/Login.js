import React from "react";
import {View, Text, AsyncStorage } from "react-native";
import {Container} from 'native-base';
import { connect } from 'react-redux';
import {
	loginFetch, logout, userFetch, getInputData,
	getUserToken,loadingRequest
	//getUserToken, getUserData
} from "./LoginActions";
import LoginScreen from './LoginScreen';
import Logo from './Logo';
import Loading from './Loading';
class Login extends React.Component{
	
    componentDidMount() {
		//console.log(this.props.getUserToken());
		//alert(this.props.token);
		this.props.loadingRequest(false);
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
		<View style={{flex: 1,alignItems: 'center',}}>
			<Loading loader={this.props.loader}/>
			<LoginScreen getInputData={this.props.getInputData}
				loginFetch={this.props.loginFetch}
				navigation={this.props.navigation}
				loader={this.props.loader}
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
	loader:state.loading.loader || false,
});

const mapActionCreators = {
	getInputData,
	loginFetch,
	getUserToken,
	loadingRequest
};

export default connect(mapStateToProps, mapActionCreators)(Login);