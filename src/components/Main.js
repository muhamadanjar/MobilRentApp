import React from "react";
import {View, AsyncStorage } from "react-native";
import {Container,Content,Button,Text,Card,CardItem,Body} from 'native-base';
import {connect} from 'react-redux';
import HeaderComponent from './HeaderComponent';
import PesanButton from './Mobil/PesanButton';
import LoginStatusMessage from './LoginStatusMessage';
import { Col, Row, Grid } from "react-native-easy-grid";
import {loadingRequest} from './LoginActions';
const taxiLogo = require("../assets/img/taxi_logo.png");
class Main extends React.Component{
	
    componentDidMount() {
		this.props.loadingRequest(false);
	}
	componentDidUpdate(prevProps, prevState) {
        
	}
    render(){
		return(
            <Container>
                <HeaderComponent logo={taxiLogo}/>
                <Content padder>
                    <Grid>
                        <Row>
                            <Col><LoginStatusMessage /></Col>
                        </Row>
                        <Row>
                            <Col><PesanButton title={'Mobil'} icon={'car'} /></Col>
                            <Col><PesanButton title={'Taxi'} icon={'taxi'} /></Col>
                        </Row>
                    </Grid>
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
    booking:state.mobil.booking || {},
});

const mapActionCreators = {
	loadingRequest
};

export default connect(mapStateToProps, mapActionCreators)(Main);