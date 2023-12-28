import {} from "react"
import { StyleSheet, View } from "react-native"
import { HelperText, Text, TextInput } from "react-native-paper"
import { Colors } from "../tools/constant"

export default function InputView({modeInput,label,editable,value,placeholder,disabled,typeInput,inputStyles,icon,nameField,handleData,validateMessage,isPrivate,iconFunction,multiline,helperMessage,maxCharacters}){
    return <View style={myStyles.container}>
        <Text>{label}</Text>
        <TextInput 
            mode={modeInput ? modeInput : "outlined"}
            editable={editable}
            outlineStyle={myStyles.input}
            value={typeInput === 'numeric' && value ? value.toString() : value}
            placeholder={placeholder}
            inputMode={typeInput !== "" ? typeInput : 'text'}
            disabled={disabled}
            style={inputStyles ? inputStyles: myStyles.defaultInputStyle}
            right={icon !== "" ? <TextInput.Icon icon={icon} onPress={iconFunction}/> : <></>}
            onChangeText={val=>handleData(nameField,val)}
            secureTextEntry={isPrivate}
            multiline={multiline ? multiline : false}
            autoCapitalize="none"
            maxLength={maxCharacters}
        />

        {helperMessage && <HelperText type="info">{helperMessage}</HelperText>}
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
    },
    defaultInputStyle:{
        backgroundColor:Colors.backgroundColor
    }
})