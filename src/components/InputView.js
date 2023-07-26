import {} from "react"
import { StyleSheet, View } from "react-native"
import { HelperText, Text, TextInput } from "react-native-paper"

export default function InputView({label,editable,value,placeholder,disabled,typeInput,inputStyles,icon,nameField,handleData,validateMessage}){
    return <View style={myStyles.container}>
        <Text>{label}</Text>
        <TextInput 
            mode="outlined"
            editable={editable}
            outlineStyle={myStyles.input}
            value={typeInput === 'numeric' && value ? value.toString() : value}
            placeholder={placeholder}
            inputMode={typeInput !== "" ? typeInput : 'text'}
            disabled={disabled}
            style={inputStyles !== "" && inputStyles}
            right={icon !== "" ? <TextInput.Icon icon={icon}/> : <></>}
            onChangeText={val=>handleData(nameField,val)}
        />
        {validateMessage && <HelperText type="error" visible>{validateMessage}</HelperText>}
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