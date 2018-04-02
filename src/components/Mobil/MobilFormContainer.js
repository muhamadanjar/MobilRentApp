import React from "react";
import { Button } from "react-native";
import { View,Footer } from "native-base";
import MapView from "react-native-maps";
import FormSearchBox from "./FormSearchBox";
import FormSearchResults from "./FormSearchResults";
import { StyleSheet } from "react-native";
const styles = {
	container:{
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	map:{
		...StyleSheet.absoluteFillObject
	}
}
export const MobilFormContainer = ({ 
    navigation,
    region,
    getInputData,
    toggleSearchResultModal,
    getAddressPredictions,
    resultTypes,
    predictions,
    getSelectedAddress,
    selectedAddress,
    carMarker,
	nearByDrivers,
})=>{

    const { selectedPickUp, selectedDropOff } = selectedAddress || {};
	const region2 = {
		latitude:5.5195655,
		longitude:95.3815473,
		latitudeDelta:0.0922,
		longitudeDelta:0.0421
	}
    return(
		<View style={styles.container}>
            <MapView
				provider={MapView.PROVIDER_GOOGLE}
				style={styles.map}
				region={region2}
				initialRegion={region2}
			>
				{ selectedPickUp &&
					<MapView.Marker
						coordinate={{latitude:selectedPickUp.latitude, longitude:selectedPickUp.longitude}}
						pinColor="green"
					/>	
				}
				{ selectedDropOff &&
					<MapView.Marker
						coordinate={{latitude:selectedDropOff.latitude, longitude:selectedDropOff.longitude}}
						pinColor="blue"
					/>	
				}
			</MapView>
			<FormSearchBox 
				getInputData={getInputData}
				toggleSearchResultModal={toggleSearchResultModal}
				getAddressPredictions={getAddressPredictions}
				selectedAddress={selectedAddress}
			/>
            { (resultTypes.pickUp || resultTypes.dropOff) &&
			<FormSearchResults predictions={predictions} getSelectedAddress={getSelectedAddress}/>
            }
            
		</View>
	)

}

export default MobilFormContainer;