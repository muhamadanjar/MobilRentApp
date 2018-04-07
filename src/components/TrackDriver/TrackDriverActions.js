import update from "react-addons-update";

import { Dimensions } from "react-native"
import RNGooglePlaces from "react-native-google-places";

import request from "../../utils/request";

import calculateFare from "../../utils/fareCalculator.js";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;
import {MOBIL_URL} from '../../config/config';

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

//Get driver's info

export function getDriverInfo(){
	return (dispatch, store)=>{
		let id = store().mobil.selectedCar.id;
		console.log('getDriverInfo',id)
		let URL = MOBIL_URL+'/'+id+'/driverinfo';
			console.log(URL);
				fetch(URL,{
					method:'GET',
					headers: {
						'Accept': 'application/json',
						'Content-Type' : 'application/json'
					},
				}).then(response => response.json())
				.then(data => {
					dispatch({
						type:'GET_DRIVER_INFORMATION',
						payload:data
					});
				}).catch((error) => {
					console.log('ERROR',error)
				});
			
		/*request.get("http://localhost:3000/api/driver/" + id)
		.finish((erroe, res)=>{
			dispatch({
				type:'GET_DRIVER_INFORMATION',
				payload:res.body
			});
		});*/
	}
}


//Get initial driver location
export function getDriverLocation(){
	return (dispatch, store)=>{
		let id = store().mobil.booking.mobil.user_id;
		console.log(id);
		/*request.get("http://localhost:3000/api/driverLocation/" + id)
		.finish((erroe, res)=>{
			dispatch({
				type:'GET_DRIVER_LOCATION',
				payload:res.body
			});
		});*/
	}
}

//get distance from driver
export function getDistanceFromDriver(){
	return (dispatch, store)=>{
		if(store().trackDriver.driverLocation){
			request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
			.query({
				origins:store().mobil.selectedAddress.selectedPickUp.latitude + 
				"," + store().mobil.selectedAddress.selectedPickUp.longitude,
				destinations:store().trackDriver.driverLocation.coordinate.coordinates[1] + 
				"," + store().trackDriver.driverLocation.coordinate.coordinates[0],
				mode:"driving",
				key:"AIzaSyDUYbTR-3PDWPhgxjENs4yf35g2eHc641s"
			})
			.finish((error, res)=>{
				dispatch({
					type:'GET_DISTANCE_FROM_DRIVER',
					payload:res.body
				})
			});

		}					
	}
}