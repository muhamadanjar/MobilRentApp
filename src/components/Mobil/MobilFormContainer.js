import React from "react";
import { Button } from "react-native";
import { View,Footer } from "native-base";
import FormSearchBox from "./FormSearchBox";
import FormSearchResults from "./FormSearchResults";
import styles from './SearchButtonStyles';
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
    nearByDrivers
})=>{

    const { selectedPickUp, selectedDropOff } = selectedAddress || {};

    return(
		<View>
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