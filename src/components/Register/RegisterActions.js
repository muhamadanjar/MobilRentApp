import {REGISTER_URL} from '../../config/config';
import {AsyncStorage} from 'react-native';
export function getInputData(payload){
	return{
		type:'GET_INPUT',
		payload
	}
}
export function registerPageRequest(){
    return {
        type: 'Register',
    }
}
export function registerFetch() {
    
    return (dispatch,store) => {
        let username = store().register.inputData.username;
        let name = store().register.inputData.namalengkap;
        let email = store().register.inputData.email;
        let password = store().register.inputData.password;
        let repassword = store().register.inputData.repassword;
        dispatch(registerRequest(email,password));
        let body_ = JSON.stringify({
            email:email,
            name:name,
            username:username,
            password:password,
            password_confirmation:repassword,
            scope:''
        });
        console.log(body_);
        //dispatch(loadingRequest(true));
        return fetch(REGISTER_URL,{
            method:'POST',
            headers: {
				'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: body_
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if(json.hasOwnProperty('error'))
                dispatch(registerFailure(email,json.message));
            else 
                dispatch(registerSuccess(email,json));
                

        })
        .catch((error) => {
            console.log('ERROR',error)
            dispatch(registerFailure(email,error))
        })
    }
}
export function registerRequest(email, password) {
    return {
        type:'REGISTER_REQUEST',
        payload: { email, password}
    }
}
export function registerSuccess(email, response) {
    return {
        type: 'REGISTER_SUCCESS',
        payload: { email, response }
    }
}
export function registerFailure(email, response) {
    return {
        type: 'REGISTER_FAILURE',
        payload: { email, response }
    }
}
