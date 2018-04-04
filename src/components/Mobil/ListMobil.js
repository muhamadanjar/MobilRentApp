import React from 'react';
import PropTypes from 'prop-types';
import {  View, Image,AsyncStorage } from 'react-native';
import { Text,Container,Content, Footer,FooterTab,Left,Body,Right,Card,CardItem,Button,List } from 'native-base';
import { connect } from 'react-redux';
import { getListMobil,getSelectedAddress,bookCar,changeStatusCar } from "./MobilActions";
import { getUserToken,getUserData } from "../LoginActions";
import styles from './SearchResultsStyles';
import Icon from "react-native-vector-icons/FontAwesome";
import {calculateFareInKM} from "../../utils/fareCalculator";
import { Spinner } from 'react-native-spinkit';
const cardImage = require("../../assets/img/rush.jpg");
class ListMobil extends React.Component{
	componentDidMount() {
		//console.log(this.props.getUserToken());
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
							  <Text style={styles.primaryText}>{item.name}</Text>	
						  	</CardItem>
						  	<CardItem cardBody>
							  	<Image style={{
								  resizeMode:'cover',
								  width:null,
								  height:200,
								  flex:1
								  }}
								  source={{uri:"{item.foto}"}}
							  	/>
						  	</CardItem>
							  <CardItem >
								<Icon active size={20} name={'car'} color={"#FF5E3A"} />
								<Text>{item.merk}</Text>
						  	</CardItem>
							<CardItem >
								<Icon active size={20} name={'calendar'} color={"#FF5E3A"} />
								<Text>{item.no_plat}</Text>
						  	</CardItem>
							<CardItem >
								<Icon active size={20} name={'calendar'} color={"#FF5E3A"} />
								<Text>{item.tahun}</Text>
						  	</CardItem>		
							<CardItem >
								<Icon active size={20} name={'money'} color={"#FF5E3A"} />
								<Text style={styles.primaryText}>Rp.{this.numberWithCommas(item.harga)}</Text>
						  	</CardItem>	
						  	
							<CardItem >
								<Body>
									<Button block primary onPress={() => {this.props.bookCar(item)}} style={{backgroundColor:'#FF5E3A'}}>
										<Text>Pesan</Text>
									</Button>
								</Body>
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
	getUserToken,
	getUserData,
	bookCar,
	changeStatusCar
};

ListMobil.propTypes = {
  //navigation: PropTypes.object.isRequired,
};

ListMobil.navigationOptions = {
  title: 'Mobil Tersedia',
};

export default connect(mapStateToProps, mapActionCreators)(ListMobil);
