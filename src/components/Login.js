import React from "react";
import {View, Text, AsyncStorage } from "react-native";
import {Container} from 'native-base';
import { connect } from 'react-redux';
import {
	loginFetch, logout, userFetch, getInputData,
	getUserToken,loadingRequest,registerPageRequest
} from "./LoginActions";
import LoginScreen from './LoginScreen';
import Logo from './Logo';
import Loading from './Loading';
class Login extends React.Component{
	
    componentDidMount() {
		
		this.props.loadingRequest(false);
		try {
			AsyncStorage.getItem('@token', (err, result) => {
				console.log('token = ',result);
				//return result;
			});
		  } catch (error) {
			// Error retrieving data
		}
		//this.props.getUserToken();
	}
	componentDidUpdate(prevProps, prevState) {
        
	}
    render(){
		return(
		<Container>
			<View style={{flex: 1}}>
				<Loading loader={this.props.loader}/>
				<LoginScreen getInputData={this.props.getInputData}
					loginFetch={this.props.loginFetch}
					navigation={this.props.navigation}
					loader={this.props.loader}
					registerPageRequest={this.props.registerPageRequest}
				/>
				
			</View>
		</Container>
		);
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
	loadingRequest,
	registerPageRequest
};

export default connect(mapStateToProps, mapActionCreators)(Login);