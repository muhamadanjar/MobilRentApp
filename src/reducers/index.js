import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import update from "react-addons-update";
import { Dimensions, Keyboard } from "react-native";
import { AppNavigator } from '../navigators/AppNavigator';
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';
import { REHYDRATE } from 'redux-persist';
// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Mobil');
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState,
);

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['mobil']
}

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: ['mobil']
}

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'MAIN_PAGES':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Main' }),
        state
      );
      break;
    case 'LOGIN_SUCCESS':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Main' }),
        state
      );
      break;
    case 'REGISTER_SUCCESS':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    case 'LOGOUT_REQUEST':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    case 'Mobil':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Mobil' }),
        state
      );
      break;
    case 'GET_PROCESS_ROUTE_MOBIL':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ListMobil' }),
        state
      );
      break;
    case 'PesanMobil':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'PesanMobil' }),
        state
      );
      break;
    case 'ListMobil':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ListMobil' }),
        state
      );
      break;
    case 'Register':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Register' }),
        state
      );
      break;
    case 'CHECK_STATUS_BOOK':
      /*if(action.payload === "confirmed"){
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'TrackDriver' }),
          state
        );
      }else if(action.payload === "cancelled"){
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'Main' }),
          state
        );
      }*/
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialAuthState = { 

  isLoggedIn: false,
  isAuthentication:false,
  user:{},token:null,
  email:null,password:null,
  inputData:{},
  
};

function auth(state = initialAuthState, action) {
  switch (action.type) {

    /*case REHYDRATE:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload.user
      };*/
    case 'LOGIN_SUCCESS':
      AsyncStorage.setItem('@token', JSON.stringify(action.payload.response.data.token));
      AsyncStorage.setItem('@user', JSON.stringify(action.payload.response.data.user));
      return { ...state, isLoggedIn: true,token:action.payload.response.data.token,user:action.payload.response.data.user};
    case 'LOGIN_REQUEST':
      return { ...state, email:action.payload.email,password:action.payload.password};
    case 'LOGIN_FAILURE':
      return { ...state, isLoggedIn:false,token:null,user:null}
    case 'LOGOUT_REQUEST':
      AsyncStorage.removeItem('@token');
      AsyncStorage.removeItem('@user');
      return { ...state, isLoggedIn: false,user:{},token:false};
    case 'GET_INPUT_USERNAME':
      return { ...state, email:action.payload};
    case 'GET_INPUT_PASSWORD':
      return { ...state, password:action.payload};
    case 'GET_INPUT':
      const { key, value } = action.payload;
      return update(state, {
        inputData:{
          [key]:{
            $set:value
          }
        }
      });
    default:
      return state;
  }
}

const initialRegisterState = { 
  email:null,password:null,name:null,username:null,
  inputData:{},
  dataRegister:null,
  error:null
  
};

function register(state = initialRegisterState, action) {
  switch (action.type) {
    case 'GET_INPUT':
      const { key, value } = action.payload;
      return update(state, {
        inputData:{
          [key]:{
            $set:value
          }
        }
      });
    default:
      return state;
  }
    
}

const initialMobilState = {region:{}, inputData:{},resultTypes:{},selectedAddress:{},mobilavailable:{}};
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA

function mobil(state = initialMobilState, action) {
  switch (action.type) {
    case 'GET_INPUT':
      //return { ...state, inputData:action.payload};
      const { key, value } = action.payload;
      return update(state, {
        inputData:{
          [key]:{
            $set:value
          }
        }
      });
    case 'GET_CURRENT_LOCATION':
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
    case 'TOGGLE_SEARCH_RESULT':
      if(action.payload === "pickUp"){
        return update(state, {
          resultTypes:{
            pickUp:{
              $set:true,
            },
            dropOff:{
              $set:false
            }
          },
          predictions:{
            $set:{}
          }
    
        });
      }
      if(action.payload === "dropOff"){
        return update(state, {
          resultTypes:{
            pickUp:{
              $set:false,
            },
            dropOff:{
              $set:true
            }
          },
          predictions:{
            $set:{}
          }
    
        });
      }
    case 'GET_ADDRESS_PREDICTIONS':
      return update(state, {
        predictions:{
          $set:action.payload
        }
      })
    case 'GET_SELECTED_ADDRESS':
      let selectedTitle = state.resultTypes.pickUp ? "selectedPickUp" : "selectedDropOff"
      return update(state, {
        selectedAddress:{
          [selectedTitle]:{
            $set:action.payload
          }		
        },
        resultTypes:{
          pickUp:{
            $set:false
          },
          dropOff:{
            $set:false
          }
        }
      })
    case 'GET_DISTANCE_MATRIX':
      return update(state, {
        distanceMatrix:{
          $set:action.payload
        }
      })
    case 'GET_FARE':
      return update(state, {
        fare:{
          $set:action.payload
        }
      })
    case 'GET_FARE2':
      return update(state, {
        fare2:{
          $set:action.payload
        }
      })
    case 'GET_MOBIL_AVAILABLE':
      return update(state, {
        mobilavailable:{
          $set:action.payload
        }
      })
    case 'GET_SELECTED_CAR':
      return update(state, {
        selectedCar:{
          $set:action.payload
        },
        currentSewa:{
          $set:action.payload.id
        }
      })
    case 'BOOK_CAR':
      return update(state, {
        booking:{
          $set:action.payload
        }
      })
    case 'BOOKING_CANCELED':
      return update(state, {
        booking:{
          status:{
            $set:action.payload
          }
        }
      })
    case 'BOOKING_CONFIRMED':
      return update(state, {
        booking:{
          status:{
            $set:action.payload
          }
        }
      })
    case 'GET_INTERVAL_BOOK':
      return update(state, {
        intervalbook:{
          $set:action.payload
        }
      })
    case 'GET_NEARBY_DRIVERS':
      return update(state, {
        nearByDrivers:{
          $set:action.payload
        }
      });
    
      
    default:
      return state;
  }
}
const initialTrackDriverState = {
	region:{},
	showDriverFound:true
};
function trackdriver(state = initialTrackDriverState, action) {
  switch (action.type) {
    case 'GET_CURRENT_LOCATION':
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
    case 'GET_DRIVER_INFORMATION':
      return update(state, {
        driverInfo:{
          $set:action.payload
        }
      });
    case 'UPDATE_DRIVER_LOCATION':
      return update(state, {
        driverLocation:{
          $set:action.payload
        }
      });
    case 'GET_DRIVER_LOCATION':
      return update(state, {
        driverLocation:{
          $set:action.payload
        },
        showDriverFound:{
          $set:false
        },
        showCarMaker:{
          $set:true
        }
    
      });
    case 'GET_DISTANCE_FROM_DRIVER':
      return update(state, {
        distanceFromDriver:{
          $set:action.payload
        }
      });
    default:
      return state;
  }
}
const initialLoading = {loader:false};
function loading(state = initialLoading, action) {
  switch (action.type) {
    case 'LOADING_REQUEST':
      return update(state, {
        loader:{
          $set:action.payload
        }
      })
    default:
      return state;
  }
}
const AppReducer = combineReducers({
  nav:nav,
  loading:loading,
  register:register,
  //auth:persistReducer(authPersistConfig,auth),
  auth:auth,
  mobil:mobil,
  trackdriver:trackdriver
});

export default AppReducer;
//export default persistReducer(rootPersistConfig, AppReducer)
