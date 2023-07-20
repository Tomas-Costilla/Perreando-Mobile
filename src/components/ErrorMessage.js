import {} from "react"
import { StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import { Colors } from "../tools/constant"


const ErrorMessage = ({isError,errorMessage}) =>{

    return <>
        {isError && <Text style={myStyles.errorStyle}>{errorMessage}</Text>}
    </> 
        
    
}

const myStyles = StyleSheet.create({
    errorStyle:{
        color: Colors.errorColor
    }
})

export default ErrorMessage;