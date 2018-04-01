import React from "react";
import {View, Text, AsyncStorage } from "react-native";
import {Container} from 'native-base';
import { connect } from 'react-redux';
import RegisterScreen from './RegisterScreen';
import {
	getInputData,registerFetch
} from "./RegisterActions";
import Loading from '../Loading';
class Register extends React.Component{
	
    componentDidMount() {
	}
	componentDidUpdate(prevProps, prevState) {
        
	}
    render(){
		return(
		<Container>
			<View style={{flex: 1}}>
                <RegisterScreen 
					getInputData={this.props.getInputData}
					registerFetch={this.props.registerFetch}
                />
			</View>
		</Container>
		);
    }
}

Register.navigationOptions = {
	title: 'Daftar',
	
};

const mapStateToProps = (state) => ({
	inputData:state.register.inputData || {},
});

const mapActionCreators = {
    getInputData,
    registerFetch
};

export default connect(mapStateToProps, mapActionCreators)(Register);