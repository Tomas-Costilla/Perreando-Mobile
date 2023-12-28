import {} from "react"
import { Linking, StyleSheet } from "react-native"
import { Button } from "react-native-paper"
import { Colors } from "../tools/constant"


export default function ContactBtn({phone,message,textBtn,styleBtn,styleLabel,icon}){

    const handleContactBtn = () =>{
        Linking.openURL(`https://wa.me/+54${phone}?text=${message}`)
    }

    return <>
        <Button
            mode="outlined"
            onPress={handleContactBtn}
            icon={icon ? icon : "account-box-outline"}
            labelStyle={{color:Colors.textColor}}
            style={styleBtn ? styleBtn : myStyles.btnContactStyle}
        >
            {textBtn}
        </Button>
    </>
}

const myStyles = StyleSheet.create({
    container:{

    },
    btnContactStyle:{
        width:150,
        /* marginBottom:, */
        /* backgroundColor:Colors.secondary, */
        padding:3
    }
})