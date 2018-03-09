import React from 'react';
import PropTypes from 'prop-types';
import {  View, Image } from 'react-native';
import { Text,Container,Content, Footer,FooterTab,Left,Body,Right,Card,CardItem,Button,List } from 'native-base';
import { connect } from 'react-redux';
import { getListMobil,getSelectedAddress } from "./MobilActions";
import styles from './SearchResultsStyles';
import Icon from "react-native-vector-icons/FontAwesome";
import {calculateFareInKM} from "../../utils/fareCalculator";
const cardImage = require("../../assets/img/rush.jpg");

class ListMobil extends React.Component{
	componentDidMount() {
		this.props.getListMobil();
	}
	componentDidUpdate(prevProps, prevState) {
	}
	render(){
		const mobil = this.props.mobilavailable;
		const fare = this.props.fare;
		return (
		<Container>
			<Content padder>
				<List 
				  	dataArray={mobil}
				  	renderRow={(item)=> 
						
					  	<Card>
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
								  <Text style={styles.primaryText}>Rp.{this.numberWithCommas(item.harga)}</Text>	
							  </Left>
							  <Body>
								  
							  </Body>
							  <Right>
							  	<Button primary onPress={()=>{alert('pesan di klik',item.id)}}>
									<Text>Pesan</Text>
								</Button>
							  </Right>
						  	</CardItem>	
					  	</Card>
					  	
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
	numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
}
const mapStateToProps = (state) => ({
	fare:state.mobil.fare,
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
