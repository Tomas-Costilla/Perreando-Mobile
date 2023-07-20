import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { RadioButton, TextInput, Text, HelperText } from "react-native-paper"
import { Colors } from "../tools/constant"
import InputSignUp from "./InputSignUp"


export default function HostInputs({handleHostData,validMessage}){
    const [checked,setChecked] = useState('dogs')

    const handleRadioBtnValue = (value) =>{
        setChecked(value)
        handleHostData("userHostType",value)
    }

    return <>

        <RadioButton.Group onValueChange={newValue => handleRadioBtnValue(newValue)} value={checked}>
            <Text style={myStyles.titleRadio}>Selecciona el tipo de alojamiento</Text>
            <View style={myStyles.radioStyle}>
                <RadioButton value="dogs" status={checked === 'dogs' ? 'checked' : 'unchecked'}/>
                <Text>Perros</Text>
            </View>
            <View style={myStyles.radioStyle}>
                <RadioButton value="cats" status={checked === 'cats' ? 'checked' : 'unchecked'} disabled/>
                <Text>Gatos</Text>
            </View>
            <View style={myStyles.radioStyle}>
                <RadioButton value="duo" status={checked === 'duo' ? 'checked' : 'unchecked'} disabled/>
                <Text>Ambos</Text>
            </View>
            {/* <Text style={myStyles.warningTitle}>Solo la opcion de "Perros" esta disponible por el momento</Text> */}
            <HelperText type="info" visible>Solo la opcion de "Perros" esta disponible por el momento</HelperText>
        </RadioButton.Group>

        <View>
            <Text>Introduce en "KG" hasta cuanto alojas</Text>
            <View style={myStyles.weightContainer}>
                <TextInput 
                    label="Desde"
                    mode="outlined"
                    style={myStyles.weightInput}
                    inputMode="numeric"
                    onChangeText={e=>handleHostData("userHostAnimalWeightFrom",e)}
                />
                <TextInput 
                    label="Hasta"
                    mode="outlined"
                    style={myStyles.weightInput}
                    inputMode="numeric"
                    onChangeText={e=>handleHostData("userHostAnimalWeightTo",e)}
                />
            </View>
            {validMessage.hostanimalweight !== "" && <HelperText type="error" visible >{validMessage.hostanimalweight}</HelperText>}
        </View>

        <View>
            <Text>Introduce el rango de edades el cual alojas</Text>
            <View style={myStyles.ageContainer}>
                <TextInput 
                    label="Desde"
                    mode="outlined"
                    style={myStyles.ageInput}
                    inputMode="numeric"
                    onChangeText={e=>handleHostData("userHostAnimalAgeFrom",e)}
                />
                <TextInput 
                    label="Hasta"
                    mode="outlined"
                    style={myStyles.ageInput}
                    inputMode="numeric"
                    onChangeText={e=>handleHostData("userHostAnimalAgeTo",e)}
                />
            </View>
            {validMessage.hostanimalage !== "" && <HelperText type="error" visible >{validMessage.hostanimalage}</HelperText>}
        </View>

    </>
}

const myStyles = StyleSheet.create({
    container:{

    },
    titleRadio:{
        
    },
    radioStyle:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        alignContent:"center"
    },
    warningTitle:{
        color:Colors.warningMessage
    },
    weightContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        gap:10
    },
    weightInput:{
        width:100
    },
    ageContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        gap:10
    },
    ageInput:{
        width:100
    }
})