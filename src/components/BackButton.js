import {} from "react"
import { StyleSheet } from "react-native"
import { Button } from "react-native-paper"


export default function BackButton({navigation,screen}){
    return <Button style={myStyles.buttonStyle} icon="arrow-left" mode="text" onPress={()=>navigation.navigate(screen)}></Button>
}

const myStyles = StyleSheet.create({
    buttonStyle:{
        color:"#000000"
    }
})