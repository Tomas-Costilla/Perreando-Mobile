import react from "react"
import { StyleSheet } from "react-native"
import { TextInput,Text } from "react-native-paper"


const InputText = ({mode}) =>{

    return (
        <>
            <TextInput 
                mode={mode}
            />
            <Text></Text>
        </>
    )
}

const myStyles = StyleSheet.create({

})

export default InputText;