import { Dimensions } from "react-native";
import RNGooglePlaces from "react-native-google-places";
import calculateFare from "../../utils/fareCalculator.js";
import request from "../../utils/request";
import update from "react-addons-update";
import {MOBIL_URL} from '../../config/config';
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA
//--------------------
//Actions
//--------------------

export function getCurrentLocation(){
	return(dispatch)=>{
		navigator.geolocation.getCurrentPosition(
			(position)=>{
				dispatch({
					type:'GET_CURRENT_LOCATION',
					payload:position
				});
			},
			(error)=> console.log(error.message),
			{enableHighAccuracy: true, timeout: 20000, maximumAge:1000}
		);
	}
}

//GET USER INPUT

export function getInputData(payload){
	return{
		type:'GET_INPUT',
		payload
	}
}

//toggle search result modal
export function toggleSearchResultModal(payload){
	return{
		type:'TOGGLE_SEARCH_RESULT',
		payload
	}
}

//GET ADRESSES FROM GOOGLE PLACE

export function getAddressPredictions(){
	return(dispatch, store)=>{
		let userInput = store().mobil.resultTypes.pickUp ? store().mobil.inputData.pickUp : store().mobil.inputData.dropOff;
		RNGooglePlaces.getAutocompletePredictions(userInput,
			{
				country:"ID"
			}
		)
		.then((results)=>
			dispatch({
				type:'GET_ADDRESS_PREDICTIONS',
				payload:results
			})
		)
		.catch((error)=> console.log(error.message));
	};
}

//get selected address

export function getSelectedAddress(payload){
	const dummyNumbers ={
		baseFare:0.4,
		timeRate:0.14,
		distanceRate:0.97,
		surge:1
	}
	return(dispatch, store)=>{
		RNGooglePlaces.lookUpPlaceByID(payload)
		.then((results)=>{
			dispatch({
				type:'GET_SELECTED_ADDRESS',
				payload:results
			})
		})
		.then(()=>{
			//Get the distance and time
			if(store().mobil.selectedAddress.selectedPickUp && store().mobil.selectedAddress.selectedDropOff){
				request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
				.query({
					origins:store().mobil.selectedAddress.selectedPickUp.latitude + "," + store().mobil.selectedAddress.selectedPickUp.longitude,
					destinations:store().mobil.selectedAddress.selectedDropOff.latitude + "," + store().mobil.selectedAddress.selectedDropOff.longitude,
					mode:"driving",
					key:"AIzaSyDUYbTR-3PDWPhgxjENs4yf35g2eHc641s"
					//key:"AIzaSyD-0l6eDHRcYavjDzAzih7QhWdlEKIA7eI"
				})
				.finish((error, res)=>{
					dispatch({
						type:'GET_DISTANCE_MATRIX',
						payload:res.body
					});
				})
			}
			setTimeout(function(){
				console.log(store().mobil);
				if(store().mobil.selectedAddress.selectedPickUp && store().mobil.selectedAddress.selectedDropOff){
					const fare = calculateFare(
						dummyNumbers.baseFare,
						dummyNumbers.timeRate,
						store().mobil.distanceMatrix.rows[0].elements[0].duration.value,
						dummyNumbers.distanceRate,
						store().mobil.distanceMatrix.rows[0].elements[0].distance.value,
						dummyNumbers.surge,
					);
					dispatch({
						type:'GET_FARE',
						payload:fare
					})
				}

			},2000)

		})
		.catch((error)=> console.log(error.message));
	}
}

export function getListMobil(){
	return(dispatch, store)=>{
		let userInput = store().mobil.resultTypes.pickUp ? store().mobil.inputData.pickUp : store().mobil.inputData.dropOff;
		fetch(MOBIL_URL,{
            method:'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' :'application/json',
                //'Authorization' : 'Bearer '+auth.access_token
            }
        }).then(response => response.json())
        .then(json => {
            console.log('JSON',json)
			dispatch({
				type:'GET_MOBIL_AVAILABLE',
				payload:json
			})
        })
        .catch((error) => {
            console.log('ERROR',error)
            
        })
	};
}


function handleGetCurrentLocation(state, action){
	return update(state, {
		region:{
			latitude:{
				$set:action.payload.coords.latitude
			},
			longitude:{
				$set:action.payload.coords.longitude
			},
			latitudeDelta:{
				$set:LATITUDE_DELTA
			},
			longitudeDelta:{
				$set:LONGITUDE_DELTA
			}
		}
	})
}