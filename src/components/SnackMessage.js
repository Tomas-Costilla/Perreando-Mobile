import { useState } from "react"
import { StyleSheet } from "react-native"
import { Snackbar, Text } from "react-native-paper"

export default function SnackMessage({message}){
    const [visible,setVisible] = useState(true)

    const handleSnackBar = () => setVisible(!visible)

    if(message) return <>
        <Snackbar visible={visible} onDismiss={handleSnackBar} duration={7000} action={{
          label: 'Cerrar',
          onPress: () => {
            handleSnackBar()
          }}}>
            <Text>{message}</Text>
        </Snackbar>
    </>
}

const myStyles = StyleSheet.create({
    container:{

    }
})