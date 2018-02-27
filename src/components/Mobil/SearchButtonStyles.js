import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
const styles = {
    searchButtonWrapper:{
        width:width,
        height:40,
        padding:10,
        backgroundColor:"grey"
    },
    buttonInput:{
        backgroundColor: 'rgba(255, 255, 255, .10)',
        /*borderColor: 'rgba(255, 255, 255, .75)',
        borderWidth: 2,
        borderRadius: 50,
        paddingHorizontal: 40,
        paddingVertical: 10,*/
    },
}

export default styles;