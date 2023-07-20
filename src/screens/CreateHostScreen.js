import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform  } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, HelperText, RadioButton, Switch, Text, TextInput } from "react-native-paper";
import { Colors } from "../tools/constant";
import { useSelector } from "react-redux";
import {server} from "../api/server"
import ErrorMessage from "../components/ErrorMessage";

export default function CreateHostScreen({navigation}){

    const user = useSelector(state=>state.user.user)
    const [typeAnimal,setTypeAnimal] = useState('Perros')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")
    const [validateMsg,setValidateMsg] = useState({
        description:"",
        capacity:"",
        price:"",
        location:""
    })
    const [hostData,setHostData] = useState({
        hostOwnerId:user._id,
        hostDescription:"",
        hostLocation:"",
        hostOwnerCapacity:0,
        hostPrice:0,
        hostTypeAnimals:typeAnimal,
        hostGuests:[],
    })
 
   const handleHostData = (camp,value) => setHostData({...hostData,[camp]:value}) 


   const validateDataHost = () =>{
       const messages = {description:"",location:"",capacity:"",price:""}
       let isValid = true
       
       if(hostData.hostDescription === ""){
            messages.description = "Debes ingresar una descripcion"
            isValid = false
       }

       /* if(hostData.hostLocation === ""){
        messages.location = "D"
       } */

       if(hostData.hostOwnerCapacity === 0){
            messages.capacity = "Debes ingresar tu capacidad maxima de alojamiento"
            isValid = false
       }
       
       if(hostData.hostPrice === 0){
            messages.price = "Debes ingresar el costo de estadia"
            isValid = false
       }

       if(!isValid){
            setValidateMsg({...validateMsg,
                capacity: messages.capacity,
                description: messages.description,
                price: messages.price
            })
       }
       return isValid;
   }


    const createHost = async () =>{
        setLoading(true)
        setError("")
        let validateData = validateDataHost()
        if(!validateData){
            setLoading(false)
            return
        }
        else setValidateMsg({...validateMsg,description:"",capacity:"",price:""})
        try {
            await server.post("/host",hostData)
        } catch (error) {
            setError(error.response.data)
        }
        setLoading(false)
    }

    return <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={myStyles.container}>
                    <Text>Crear Hospedaje</Text>
                   
                    <TextInput 
                        label="Ingresa un nombre descriptivo"
                        mode="outlined"
                        inputMode="numeric"
                        onChangeText={val=>handleHostData("hostDescription",val)}
                    />
                    {validateMsg.description && <HelperText type="error" visible>{validateMsg.description}</HelperText>}

                    <TextInput 
                        label="Localidad de tu cuenta"
                        mode="outlined"
                        onChangeText={val=>handleHostData("hostLocation",val)}
                    />


                    {/* <HelperText type="info">Ingresa un limite de capacidad</HelperText> */}
                    <TextInput 
                        label="Ingresa una capacidad a hospedar"
                        mode="outlined"
                        inputMode="numeric"
                        onChangeText={val=>handleHostData("hostOwnerCapacity",val)}
                    />
                    {validateMsg.capacity && <HelperText type="error" visible>{validateMsg.capacity}</HelperText>}

                    {/* <HelperText type="info">Ingresa el costo de estadia</HelperText> */}
                    <TextInput 
                        label="Precio de estadia..."
                        mode="outlined"
                        inputMode="numeric"
                        style={myStyles.inputPrice}
                        onChangeText={val=>handleHostData("hostPrice",val)}
                    />
                     {validateMsg.price && <HelperText type="error" visible>{validateMsg.price}</HelperText>}

                    
             
                    <Text>Selecciona el tipo de animal a hospedar</Text>
                    <RadioButton.Group onValueChange={newValue => setTypeAnimal(newValue)} value={typeAnimal}>
                        <View style={myStyles.radioContainer}>
                            <Text>Perros</Text>
                            <RadioButton value="Perros"/>
                        </View>
                        <View style={myStyles.radioContainer}>
                            <Text>Gatos</Text>
                            <RadioButton value="Gatos" disabled/>
                        </View>
                        <View style={myStyles.radioContainer}>
                            <Text>Ambos</Text>
                            <RadioButton value="Ambos" disabled/>
                        </View>
                    </RadioButton.Group>
                    <HelperText type="info">Por el momento solo esta disponible el tipo "Perros"</HelperText>
                   


                    <Button
                        mode="contained"
                        style={myStyles.btnStyles}
                        onPress={()=>navigation.navigate("ViewHostData")}
                        loading={loading}
                    >
                        Crear Hospedaje
                    </Button>
                    <ErrorMessage errorMessage="Esto es un error" isError={error}/>
               

    </KeyboardAvoidingView>
}

const myStyles = StyleSheet.create({
    container:{
        backgroundColor:Colors.backgroundColor,
        padding:10,
        flex:1,
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        gap:10
    },
    switchContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    radioContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignContent:"center",
        alignItems:"center"
    },
    btnStyles:{
        
    },
    inputPrice:{
        width:150
    }
})