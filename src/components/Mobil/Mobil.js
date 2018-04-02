import { Container,Footer,FooterTab,Button }  from "native-base";
import React from "react";
import {View, Text} from "react-native";
import { connect } from 'react-redux';
import MobilFormContainer from "./MobilFormContainer";
import ListMobil from "./ListMobil";

import {
	getCurrentLocation,
	getInputData,
	toggleSearchResultModal,
	getAddressPredictions,
	getSelectedAddress,
	bookCar,
	getNearByDrivers,
	getListMobil
} from "./MobilActions";
const carMarker = require("../../assets/img/carMarker.png");
class Mobil extends React.Component{

	componentDidMount() {
		var rx = this;
		this.props.getCurrentLocation();
		//this.props.getListMobil();
		//console.log(this.props.navigation);
		setTimeout(function(){
			//rx.props.getNearByDrivers();

		}, 1000);
	}
	componentDidUpdate(prevProps, prevState) {
        /*if (this.props.booking.status === "confirmed" ){
            Actions.trackDriver({type: "reset"});
        }*/
        //this.props.getCurrentLocation();
	}
	render(){
		const region = {
			latitude:-6.3252738,
			longitude:106.0764884,
			latitudeDelta:0.0922,
			longitudeDelta:0.0421
		}
		const { status } = this.props.booking;
		return(
			<Container>
				<View style={{flex:1}}>
					{this.props.region.latitude &&
						<MobilFormContainer region={this.props.region} 
							getInputData={this.props.getInputData}
							toggleSearchResultModal={this.props.toggleSearchResultModal}
							getAddressPredictions={this.props.getAddressPredictions}
							resultTypes={this.props.resultTypes}
							predictions={this.props.predictions}
							getSelectedAddress={this.props.getSelectedAddress}
							selectedAddress={this.props.selectedAddress}
							navigation={this.props.navigation}
							carMarker={carMarker}
							getCurrentLocation={this.props.getCurrentLocation}
							//nearByDrivers={this.props.nearByDrivers}
						/>
					}
				</View>
					
				<View >
					<Footer>
						<FooterTab style={{position:'relative',bottom:0}}>
							<Button 
								onPress={() => this.props.navigation.dispatch({ type: 'GET_PROCESS_ROUTE_MOBIL' })} 
								style={{backgroundColor:'#FF5E3A',marginBottom:10,marginLeft:15,marginRight:10,borderRadius:7}}>
								<Text style={{fontSize:16,fontWeight:'bold'}}>Cari</Text>
							</Button>
						</FooterTab>
					</Footer>	
				</View>
				
			</Container>
		);

	}
}
Mobil.navigationOptions = {
	title: 'Cari Mobil',
	headerMode: 'none',
};

const mapStateToProps = (state) => ({
	region: state.mobil.region,
	inputData:state.mobil.inputData || {},
	resultTypes:state.mobil.resultTypes || {},
	predictions:state.mobil.predictions ||  [],
	selectedAddress:state.mobil.selectedAddress || {},
	fare:state.mobil.fare,
	booking:state.mobil.booking || {},
	//nearByDrivers:state.mobil.nearByDrivers || []
	mobilavailable:state.mobil.mobilavailable || {},
	

});

const mapActionCreators = {
	getCurrentLocation,
	getInputData,
	toggleSearchResultModal,
	getAddressPredictions,
	getSelectedAddress,
	bookCar,
	//getNearByDrivers,
	getListMobil,
};
export default connect(mapStateToProps, mapActionCreators)(Mobil);