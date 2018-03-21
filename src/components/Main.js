import React from "react";
import {View, AsyncStorage } from "react-native";
import {Container,Content,Button,Text} from 'native-base';
import {connect} from 'react-redux';

import PesanButton from './Mobil/PesanButton';
import LoginStatusMessage from './LoginStatusMessage';
import {loadingRequest} from './LoginActions';
class Main extends React.Component{
	
    componentDidMount() {
		this.props.loadingRequest(false);
	}
	componentDidUpdate(prevProps, prevState) {
        
	}
    render(){
		return(
            <Container>
                <Content>
                    <LoginStatusMessage />
                    <PesanButton title={'Mobil'} />
                    <PesanButton title={'Bus'} />
                </Content>
            </Container>
        );
    }
	
}

Main.navigationOptions = {
	title: 'Halaman Utama',
	headerMode: 'none',
	header:null
};

const mapStateToProps = (state) => ({
	loader:state.loading.loader || false,
});

const mapActionCreators = {
	loadingRequest
};

export default connect(mapStateToProps, mapActionCreators)(Main);