import React from 'react';
import PropTypes from 'prop-types';
import {  View, Image } from 'react-native';
import { Text,Container,Content, Footer,FooterTab,Left,Body,Right,Card,CardItem,Button } from 'native-base';
import { connect } from 'react-redux';
import { getListMobil,getSelectedAddress } from "./MobilActions";
import styles from './SearchResultsStyles';
import Icon from "react-native-vector-icons/FontAwesome";
const cardImage = require("../../assets/img/rush.jpg");
class ListMobil extends React.Component{
	componentDidMount() {
		this.props.getListMobil();
		console.log(this.props.fare);
	}
	componentDidUpdate(prevProps, prevState) {
	}
	render(){
		const mobil = this.props.mobilavailable;
		return (
		<Container>
			<Content padder>
				<Card 
				  	dataArray={mobil}
				  	renderRow={(item)=>
					  	<View>
						  	<CardItem header bordered>
							  <Text>{item.no_plat}</Text>	
							  <Text>{item.merk} - {item.type}</Text>	
						  	</CardItem>
						  	<CardItem cardBody>
							  	<Image style={{
								  resizeMode:'cover',
								  width:null,
								  height:200,
								  flex:1
								  }}
								  source={cardImage}
							  	/>
						  	</CardItem>	
						  	<CardItem >
							  <Left style={styles.leftContainer}>
								  <Text style={styles.primaryText}>{item.harga}</Text>	
							  </Left>
							  <Body>
								  
								  
							  </Body>
							  <Right>
							  	<Button primary onPress={()=>{alert('pesan di klik',item.id)}}>
									  <Text>Pesan</Text>
								  </Button>
							  </Right>
						  	</CardItem>	
					  	</View>
				  	}
			  	/>
		  	</Content>
			<Footer>
				<FooterTab style={styles.footerContainer} >
					<Button>
						<Icon size={20} name={'filter'} color={"#FF5E3A"} />
						<Text style={{fontSize:12, color:"#FF5E3A"}}>Filter</Text>
					</Button>
					<Button>
						<Icon size={20} name={'sort'} color={"#FF5E3A"} />
						<Text style={{fontSize:12, color:"#FF5E3A"}}>Urutkan</Text>
					</Button>
				</FooterTab>
			</Footer>	
	  	</Container>
	  	);
	}
}
const mapStateToProps = (state) => ({
	
	mobilavailable:state.mobil.mobilavailable || {},

});

const mapActionCreators = {
	getListMobil,
	getSelectedAddress,
};

ListMobil.propTypes = {
  //navigation: PropTypes.object.isRequired,
};

ListMobil.navigationOptions = {
  title: 'Mobil Tersedia',
};

export default connect(mapStateToProps, mapActionCreators)(ListMobil);
