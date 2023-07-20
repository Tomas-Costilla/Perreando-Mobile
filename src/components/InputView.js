import {} from "react"
import { StyleSheet, View } from "react-native"
import { Text, TextInput } from "react-native-paper"

export default function InputView({label,editable,value,placeholder}){
    return <View style={myStyles.container}>
        <Text>{label}</Text>
        <TextInput 
            mode="outlined"
            editable={editable}
            outlineStyle={myStyles.input}
            value={value}
            placeholder={placeholder}
        />
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        marginBottom:5,
        marginTop:5
    },
    input:{
        borderColor:"#BEBEBE"
    }
})