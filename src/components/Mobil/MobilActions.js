import { Dimensions } from "react-native";
import RNGooglePlaces from "react-native-google-places";
import {calculateFare,calculateFareInKM} from "../../utils/fareCalculator.js";
import request from "../../utils/request";
import update from "react-addons-update";
import {MOBIL_URL,BOOKING_URL} from '../../config/config';
import firebase from "../../config/firebase";
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
				//console.log(store().mobil);
				if(store().mobil.selectedAddress.selectedPickUp && store().mobil.selectedAddress.selectedDropOff){
					const fare = calculateFare(
						dummyNumbers.baseFare,
						dummyNumbers.timeRate,
						store().mobil.distanceMatrix.rows[0].elements[0].duration.value,
						dummyNumbers.distanceRate,
						store().mobil.distanceMatrix.rows[0].elements[0].distance.value,
						dummyNumbers.surge,
					);

					const fare2 = calculateFareInKM(
						dummyNumbers.baseFare,
						store().mobil.distanceMatrix.rows[0].elements[0].distance.value,
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
			console.log('JSON',json,store().mobil);
			const distanceInKM = (store().mobil.distanceMatrix.rows[0].elements[0].distance.value * 0.001);
			for(i=0;i<json.length;i++){
				json[i].harga = Math.round(distanceInKM * json[i].harga);
			}
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

export function bookCar(item){
	console.log(item);
	return (dispatch, store)=>{
		//const nearByDrivers = store().mobil.nearByDrivers;
		//const nearByDriver = nearByDrivers[Math.floor(Math.random() * nearByDrivers.length)];
		const data = {
				origin_address: store().mobil.selectedAddress.selectedPickUp.address,
				origin: store().mobil.selectedAddress.selectedPickUp.name,
				origin_latitude: store().mobil.selectedAddress.selectedPickUp.latitude,
				origin_longitude: store().mobil.selectedAddress.selectedPickUp.longitude,

				destination_address: store().mobil.selectedAddress.selectedDropOff.address,
				destination: store().mobil.selectedAddress.selectedDropOff.name,
				destination_latitude: store().mobil.selectedAddress.selectedDropOff.latitude,
				destination_longitude: store().mobil.selectedAddress.selectedDropOff.longitude,
				customer_id:store().auth.user.id,
				fare: store().mobil.fare,
				status: "pending",
				mobil_id: item.id,
				total_bayar: item.harga,
				/*nearByDriver:{
					socketId:nearByDriver.socketId,
					driverId:nearByDriver.driverId,
					latitude:nearByDriver.coordinate.coordinates[1],
					longitude:nearByDriver.coordinate.coordinates[0]
				}*/
		};
		const order = firebase.database().ref('bookings').push();
		data.keyuuid = order.key;
		order.set(data);
		const payload = JSON.stringify(data);
		console.log(payload);
		fetch(BOOKING_URL,{
            method:'POST',
            headers: {
				'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body:payload
        }).then(response => response.json())
		.then(json => {
			console.log('Mobil ID',json);
			dispatch({
				type:'GET_SELECTED_CAR',
				payload:json.mobil
			});
            dispatch({
				type:'BOOK_CAR',
				payload:json
			});			
			dispatch(changeStatusCar(json.mobil_id));
        })
        .catch((error) => {
            console.log('ERROR',error)
        });
		
	}
}
//get nearby drivers

export function getNearByDrivers(){
	return(dispatch, store)=>{
		
		request.get("http://localhost:3000/api/driverLocation")
		.query({
			latitude:-6.3252738,
			longitude:106.0764884	
		})
		.finish((error, res)=>{
			if(res){
				dispatch({
					type:'GET_NEARBY_DRIVERS',
					payload:res.body
				});
			}
			console.log(error);

		});
	};
}
export function changeStatusCar(mobilid){
	return(dispatch, store)=>{
		fetch(MOBIL_URL+'/'+mobilid+'/status',{
            headers: {
				'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
        }).then(response => response.json())
		.then(json => {
			dispatch({
				type:'CHANGE_MOBIL_STATUS',
				payload:json.status
			});
		});

	};
}
export function checkStatusPesanan(){
	var interval;
	return(dispatch, store)=>{
		let URL = BOOKING_URL+'/'+store().mobil.selectedCar.id+'/checkstatus';
		console.log(URL);
		let status = store().mobil.booking.status;
		interval = setInterval(function(){
			fetch(URL,{
				method:'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type' : 'application/json'
				},
			}).then(response => response.json())
			.then(json => {
				dispatch({
					type:'CHECK_STATUS_BOOK',
					payload:json
				});
			}).catch((error) => {
				console.log('ERROR',error)
			});
		},10000);

		if(status == 'confirmed'){
			clearInterval(interval);
		}
		
	};
}
export function changeStatusPesanan(st){
	return(dispatch, store)=>{
		let URL = BOOKING_URL+'/'+store().mobil.selectedCar+'/changestatus';
		console.log(URL);
		const data = JSON.stringify({
			sewa_id:store().mobil.booking.id,
			status:st,
		});
		
			fetch(URL,{
				method:'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type' : 'application/json'
				},
				body:data
			}).then(response => response.json())
			.then(json => {
				dispatch({
					type:'CHANGE_STATUS_BOOK',
					payload:json
				});
			}).catch((error) => {
				console.log('ERROR',error)
			});
		
	};
}
export function cancelPesanan(){
	return(dispatch,store) =>{
		let URL = BOOKING_URL+'/'+store().mobil.booking.id+'/cancelled';
		console.log(URL)
		fetch(URL,{
            method:'GET',
            headers: {
				'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            //body:payload
        }).then(response => response.json())
		.then(json => {
			dispatch(changeStatusCar(store().mobil.booking.mobil_id));
			dispatch({
				type:'BOOKING_CANCELED',
				payload:'cancelled'
			});
			dispatch({
				type:'MAIN_PAGES',
			});
			
			
        })
        .catch((error) => {
            console.log('ERROR',error)
        });
		
	}
}
export function confirmPesanan(){
	return(dispatch,store) =>{
		dispatch({
			type:'BOOKING_CONFIRMED',
			payload:'confirmed'
		});
	}
}
export function getPesananNotComplete(customerId){
	return(dispatch,store) =>{
		fetch(BOOKING_URL+'/'+customerId+'/notcomplete',{
            method:'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' :'application/json',
                'Authorization' : 'Bearer '+auth.access_token
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log('JSON',json)
            
        })
        .catch((error) => {
            console.log('ERROR',error)
            dispatch(userFailure(auth,error))
        })
	}
}