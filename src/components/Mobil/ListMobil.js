import React from 'react';
import PropTypes from 'prop-types';
import {  View, Image,AsyncStorage } from 'react-native';
import { Text,Container,Content, Footer,FooterTab,Left,Body,Right,Card,CardItem,Button,List } from 'native-base';
import { connect } from 'react-redux';

import styles from './SearchResultsStyles';
import Icon from "react-native-vector-icons/FontAwesome";
import {calculateFareInKM} from "../../utils/fareCalculator";
import { Spinner } from 'react-native-spinkit';
import FindDriver from './FindDriver';
import HeaderComponent from '../HeaderComponent';

import NavigationActions from 'react-navigation';
import { 
	getListMobil,getSelectedAddress,bookCar,getNearByDrivers,
	changeStatusCar,checkStatusPesanan,cancelPesanan,confirmPesanan } from "./MobilActions";
import { getUserToken,getUserData } from "../LoginActions";
const taxiLogo = require("../../assets/img/taxi_logo.png");
//import socketIOClient from "socket.io-client";
class ListMobil extends React.Component{
	componentDidMount() {
		this.props.getListMobil();
		//const socket = socketIOClient('http://127.0.0.1:9999');
    	//socket.on("FromAPI", data => console.log(data));
	}
	componentWillUnmount(){

	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.booking.status === "confirmed" ){
			//Actions.trackDriver({type: "reset"});
			const resetAction = NavigationActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'TrackDriver' })],
			});
			this.props.nav.dispatch(resetAction);
        }
	}
	render(){
		const mobil = this.props.mobilavailable;
		const fare = this.props.fare;
		const { status } = this.props.booking;
		return (
		<Container>
			{ (status !== "pending") &&
			<View style={{flex:1}}>
				<HeaderComponent logo={taxiLogo}/>
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
									resizemode="contain"
									source={{uri:item.foto}}
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
						<Button onPress={()=>{ console.log(this.props.nav) }}>
							<Icon size={20} name={'arrow-left'} color={"#FF5E3A"} />
							<Text style={{fontSize:12, color:"#FF5E3A"}}>Kembali</Text>
						</Button>
					</FooterTab>
				</Footer>
			</View>
			|| 
				<FindDriver 
					checkStatusPesanan={this.props.checkStatusPesanan} 
					selectedAddress={this.props.selectedAddress}
					selectedCar={this.props.selectedCar}
					cancelPesanan={this.props.cancelPesanan}
				/>
			}
	  	</Container>
	  	);
	}
	numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

}
const mapStateToProps = (state) => ({
	nav:state.nav,
	fare:state.mobil.fare,
	mobilavailable:state.mobil.mobilavailable || {},
	booking:state.mobil.booking || {},
	selectedAddress:state.mobil.selectedAddress || {},
	selectedCar:state.mobil.selectedCar || {},
	nearByDrivers:state.mobil.nearByDrivers || [],
});

const mapActionCreators = {
	getListMobil,
	getSelectedAddress,
	getUserToken,
	getUserData,
	bookCar,
	getNearByDrivers,
	changeStatusCar,
	checkStatusPesanan,
	cancelPesanan,
	confirmPesanan
};

ListMobil.propTypes = {
  //navigation: PropTypes.object.isRequired,
};

ListMobil.navigationOptions = {
	title: 'Mobil Tersedia',
	headerMode: 'none',
	header:null
};

export default connect(mapStateToProps, mapActionCreators)(ListMobil);
