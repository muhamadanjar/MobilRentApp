import React from 'react';
import PropTypes from 'prop-types';
import {  View,AsyncStorage } from 'react-native';
import { Text,Container,Content, Footer,FooterTab,Left,Body,Right,Card,CardItem,Button,List } from 'native-base';
import { connect } from 'react-redux';
import ProfileScreen from './ProfileScreen';
import {getUserData,getUserToken,logout} from '../LoginActions';

class Profil extends React.Component{
	componentDidMount() {
		try {
			AsyncStorage.getItem('@token', (err, result) => {
				console.log(result);
				//return result;
			});
		  } catch (error) {
			// Error retrieving data
		}
	}
	componentDidUpdate(prevProps, prevState) {
	}
	render(){
		
		return (
		<Container>
			<Content padder>
				<ProfileScreen 
				logout={this.props.logout} 
				profil={this.props.user}
				token={this.props.token}
				/>
		  	</Content>
			<Footer>
				<Button dark block
					onPress={() =>logout()}
					><Text>Logout</Text>
				</Button>
			</Footer>	
	  	</Container>
	  	);
	}
	

}
const mapStateToProps = (state) => ({
	user: state.auth.user || {},
	token: state.auth.token || {}
});

const mapActionCreators = {
	getUserToken,
	getUserData,
	logout
};

Profil.propTypes = {
  navigation: PropTypes.object.isRequired,
};

Profil.navigationOptions = {
  title: 'Profil',
};

export default connect(mapStateToProps, mapActionCreators)(Profil);
