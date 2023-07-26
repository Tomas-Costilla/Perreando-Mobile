import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform  } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, HelperText, RadioButton, Switch, Text, TextInput } from "react-native-paper";
import { Colors } from "../tools/constant";
import { useSelector } from "react-redux";
import {server} from "../api/server"
import ErrorMessage from "../components/ErrorMessage";
import InputView from "../components/InputView";

export default function CreateHostScreen({navigation}){

    const user = useSelector(state=>state.user.user)
    const [typeAnimal,setTypeAnimal] = useState('Perros')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")
    const [validateMsg,setValidateMsg] = useState({
        description:"",
        capacity:"",
        price:"",
        location:"",
        weight:"",
        age:""
    })
    const [hostData,setHostData] = useState({
        hostOwnerId:user._id,
        hostDescription:"",
        hostLocation:"",
        hostOwnerCapacity:0,
        hostPrice:0,
        hostTypeAnimals:typeAnimal,
        hostAnimalWeightFrom:0,
        hostAnimalWeightTo:0,
        hostAnimalAgeFrom:0,
        hostAnimalAgeTo:0,
        hostGuests:[],
    })
 
   const handleHostData = (camp,value) => setHostData({...hostData,[camp]:value}) 


   const validateDataHost = () =>{
       const messages = {description:"",location:"",capacity:"",price:"",weight:"",age:""}
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

       if(hostData.hostAnimalWeightTo == 0 || hostData.hostAnimalWeightFrom == 0){
        messages.weight = "Debes ingresar el peso en KG que permites"
        isValid = false
       }

       if(hostData.hostAnimalAgeFrom == 0 || hostData.hostAnimalWeightTo == 0){
        messages.age = "Debes ingresar el rango de edades que permites"
       }

       if(!isValid){
            setValidateMsg({...validateMsg,
                capacity: messages.capacity,
                description: messages.description,
                price: messages.price,
                weight: messages.weight,
                age:messages.age
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
            navigation.navigate("ViewHostData")
        } catch (error) {
            setError(error.response.data)
        }
        setLoading(false)
    }

    return <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={myStyles.container}>
            <ScrollView>
                    <Text style={myStyles.title}>Completá los datos para crear el hospedaje</Text>

                    <InputView 
                        nameField="hostDescription"
                        label="Ingresá un nombre descriptivo"
                        editable={true}
                        handleData={handleHostData}
                        validateMessage={validateMsg.description}

                    />
                   {/*  {validateMsg.description && <HelperText type="error" visible>{validateMsg.description}</HelperText>} */}

                    <InputView 
                        nameField="hostOwnerCapacity"
                        label="Ingresá tu capacidad maxima de huespedes"
                        editable={true}
                        handleData={handleHostData}
                        typeInput="numeric"
                        inputStyles={myStyles.numberInput}
                        validateMessage={validateMsg.capacity}
                    />
                    {/* {validateMsg.capacity && <HelperText type="error" visible>{validateMsg.capacity}</HelperText>} */}

                    <InputView 
                        nameField="hostPrice"
                        label="Ingresá el costo total por la estadia"
                        editable={true}
                        handleData={handleHostData}
                        typeInput="numeric"
                        inputStyles={myStyles.numberInput}
                        icon="currency-usd"
                        validateMessage={validateMsg.price}
                    />
                     {/* {validateMsg.price && <HelperText type="error" visible>{validateMsg.price}</HelperText>} */}


                    <View style={myStyles.specification}>
                        <InputView 
                            nameField="hostAnimalWeightFrom"
                            label="Peso en KG desde"
                            editable={true}
                            handleData={handleHostData}
                            typeInput="numeric"
                        />
                        <InputView 
                            nameField="hostAnimalWeightTo"
                            label="Peso en KG hasta"
                            editable={true}
                            handleData={handleHostData}
                            typeInput="numeric"
                        />
                    </View>
                    {validateMsg.weight && <HelperText type="error" visible>{validateMsg.weight}</HelperText>}

                    <View style={myStyles.specification}>
                        <InputView 
                                nameField="hostAnimalAgeFrom"
                                label="Edad desde"
                                editable={true}
                                handleData={handleHostData}
                                typeInput="numeric"
                            />
                            <InputView 
                                nameField="hostAnimalAgeTo"
                                label="Edad hasta"
                                editable={true}
                                handleData={handleHostData}
                                typeInput="numeric"
                            />
                    </View>
                    {validateMsg.age && <HelperText type="error" visible>{validateMsg.age}</HelperText>}
                    
             
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
                        onPress={()=>createHost()}
                        loading={loading}
                    >
                        Crear Hospedaje
                    </Button>
                    <ErrorMessage errorMessage="Esto es un error" isError={error}/>
               
                    </ScrollView>        
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
    title:{
        textAlign:"center",
        marginTop:10,
        marginBottom:10
    },
    specification:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:10,
        marginTop:10,
        marginBottom:10
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
    numberInput:{
        width:150
    }
})