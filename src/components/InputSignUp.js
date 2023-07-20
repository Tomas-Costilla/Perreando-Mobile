import {} from "react"
import {} from "react-native"
import { HelperText, TextInput } from "react-native-paper"

export default function InputSignUp({textLabel,type,name,handleData,validMessage,secure,typeInput,sty}){

    return<>
        {typeInput === "password"
        ? <TextInput 
            mode="outlined"
            label={textLabel}
            inputMode={type}
            onChangeText={e=>handleData(e)}
            secureTextEntry={secure}
        /> : <TextInput 
                mode="outlined"
                label={textLabel}
                inputMode={type}
                onChangeText={e=>handleData(name,e)}
                secureTextEntry={secure}
            />}
        { typeof validMessage !== 'undefined' && validMessage !== "" && <HelperText type="error" visible>{validMessage}</HelperText>}
    </>
}