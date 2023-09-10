import {} from "react"
import { StyleSheet } from "react-native"
import { Button } from "react-native-paper"


export default function BackButton({navigation,screen}){
    return <Button labelStyle={myStyles.buttonStyle} icon="arrow-left" mode="text" onPress={()=>navigation.popToTop()}></Button>
}

const myStyles = StyleSheet.create({
    buttonStyle:{
        color:"#000000",
        fontSize:30
    }
})