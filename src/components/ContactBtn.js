import {} from "react"
import { Linking, StyleSheet } from "react-native"
import { Button } from "react-native-paper"


export default function ContactBtn({phone,message}){

    const handleContactBtn = () =>{
        Linking.openURL(`https://wa.me/${phone}?text=${message}`)
    }

    return <>
        <Button
            mode="outlined"
            onPress={handleContactBtn}
            icon="message"
        >
            Contactar
        </Button>
    </>
}

const myStyles = StyleSheet.create({
    container:{

    }
})