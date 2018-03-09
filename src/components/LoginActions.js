import {LOGIN_URL,USER_URL} from '../config/config';
import {AsyncStorage} from 'react-native';

export function userFetch(auth) {
    return (dispatch) => {
        console.log('auth',auth)
        dispatch(userRequest(auth))
        return fetch(USER_URL,{
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
            if(json.hasOwnProperty('error'))
                dispatch(userFailure(auth,json.message))
            else 
                dispatch(userSuccess(auth,json))
        })
        .catch((error) => {
            console.log('ERROR',error)
            dispatch(userFailure(auth,error))
        })
    }
}
export function userRequest(auth) {
    return {
        type:'USER_REQUEST',
        payload: auth
    }
}
export function userSuccess(auth, response){
    return {
        type:'USER_SUCCESS',
        payload: { response }
    }
}
export function userFailure(auth, error){
    return {
        type:'USER_FAILURE',
        payload: { auth, error}
    }
}


export function loginFetch() {
    
    return (dispatch,store) => {
        console.log(store());
        let email = store().auth.inputData.username;
        let password = store().auth.inputData.password;
        dispatch(loginRequest(email,password))
        return fetch(LOGIN_URL,{
            method:'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                grant_type:'password',
                username:email,
                password:password,
                scope:''
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log('json',email,json)
            if(json.hasOwnProperty('error'))
                dispatch(loginFailure(email,json.message));
            else 
                //AsyncStorage.multiSet(['token',json.token],['user',json.user]);    
                //AsyncStorage.setItem('token',json.token)
                //AsyncStorage.setItem('user', JSON.stringify(json.user));
                dispatch(loginSuccess(email,json));

        })
        .catch((error) => {
            console.log('ERROR',error)
            dispatch(loginFailure(email,error))
        })
    }
}
export function loginRequest(email, password) {
    return {
        type:'LOGIN_REQUEST',
        payload: { email, password}
    }
}
export function loginSuccess(email, response) {
    return {
        type: 'LOGIN_SUCCESS',
        payload: { email, response }
    }
}
export function loginFailure(email, response) {
    return {
        type: 'LOGIN_FAILURE',
        payload: { email, response }
    }
}
export function logout(){
    
    return {
        type: 'Logout'
    }
}


export function getInputDataUsername(username){
	return{
		type:'GET_INPUT_USERNAME',
		payload:username
	}
}

export function getInputDataPassword(password){
	return{
		type:'GET_INPUT_PASSWORD',
		payload:password
	}
}

export function getInputData(payload){
	return{
		type:'GET_INPUT',
		payload
	}
}

