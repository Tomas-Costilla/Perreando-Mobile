import {} from "react"
import { Linking, StyleSheet } from "react-native"
import { Button } from "react-native-paper"
import { Colors } from "../tools/constant"


export default function ContactBtn({phone,message,textBtn,styleBtn,styleLabel}){

    const handleContactBtn = () =>{
        Linking.openURL(`https://wa.me/${phone}?text=${message}`)
    }

    return <>
        <Button
            mode="contained"
            onPress={handleContactBtn}
            icon="message"
            labelStyle={styleLabel && styleLabel}
            style={styleBtn ? styleBtn : myStyles.btnContactStyle}
        >
            {!textBtn && "Contactar"}
        </Button>
    </>
}

const myStyles = StyleSheet.create({
    container:{

    },
    btnContactStyle:{
        width:150,
        /* marginBottom:, */
        backgroundColor:Colors.secondary,
        borderRadius:10,
        padding:3
    }
})