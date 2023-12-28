import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper"
import { Colors } from "../../tools/constant";
import InputView from "../../components/InputView";
import { server } from "../../api/server";
import { useNavigation } from "@react-navigation/native";
import Message from "../../components/Message";


export default function EditPetScreen({route}){

    let {petData} = route.params
    const [updatePet,setUpdatePet] = useState({...petData})
    const [loading,setLoading] = useState(false)
    const [errorServer,setErrorServer] = useState("")
    const navigation = useNavigation()
    const [validateMessage,setValidateMessage] = useState({
        petname:"",
        petage:"",
        petweight:""
    })

    const handlePetData = (camp,value) => setUpdatePet({...updatePet,[camp]:value})

    const handleValidateFiels = () =>{
        setValidateMessage({...validateMessage,petage:"",petname:"",petweight:""})
        let messages = {name:"",age:"",weight:""}
        let isValid = true

        if(updatePet.petName === ""){
            messages.name = "Debes ingresar un nombre"
            isValid = false
        }

        if(updatePet.petAge === 0 || updatePet.petAge === "") {
            messages.age = "Debes ingresar una edad"
            isValid = false
        }

        if(updatePet.petWeight === 0 || updatePet.petWeight === "") {
            messages.weight = "Debes ingresar el peso de tu mascota"
            isValid = false
        }

        if(!isValid){
            setValidateMessage({...validateMessage,
                petage: messages.age,
                petname: messages.name,
                petweight: messages.weight
            })
            return
        }

        updatePetData()

    }


    const updatePetData = async () =>{
        setLoading(true)
        setErrorServer("")
        try {
            await server.put(`/pet/${updatePet._id}`,{
                petName: updatePet.petName,
                petAge: updatePet.petAge,
                petWeight: updatePet.petWeight
            })
            navigation.goBack()
        } catch (error) {
            if(error.response.data?.isLogged === false){
                navigation.navigate("SessionOut")
                return
            }

            if(error.response.data?.message) setErrorServer(error.response.data?.message)
            else setErrorServer("Ocurrio un error en la peticion")
        }
        setLoading(false)
    }

    


    return <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={myStyles.container}>
        <View style={myStyles.editContainer}>
            <Text style={myStyles.title}>Actualizar datos de tu mascota</Text>
              <InputView 
                nameField="petName"
                label="Nombre de tu mascota"
                editable={true}
                icon="pencil"
                handleData={handlePetData}
                value={updatePet.petName}
                validateMessage={validateMessage.petname}
              />  
              <InputView 
                nameField="petAge"
                label="Edad de tu mascota"
                icon="pencil"
                typeInput='numeric'
                editable={true}
                handleData={handlePetData}
                value={updatePet.petAge}
                validateMessage={validateMessage.petage}
              />  
              <InputView 
                nameField="petWeight"
                label="Peso en KG de tu mascota"
                icon="pencil"
                editable={true}
                typeInput='numeric'
                handleData={handlePetData}
                value={updatePet.petWeight}
                validateMessage={validateMessage.petweight}
              />  
              <InputView 
                nameField="petType"
                label="Tipo de animal"
                icon="pencil"
                disabled={true}
                handleData={handlePetData}
                value={updatePet.petType}
              /> 
              {errorServer && <Message msg={errorServer} type="error"/>}
              <View style={myStyles.btnContainer}>
                    <Button
                        mode="contained"
                        style={myStyles.btnConfirmChanges}
                        loading={loading}
                        onPress={handleValidateFiels}
                    >
                        Confirmar Cambios
                    </Button>
              </View>
        </View>
    </KeyboardAvoidingView>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.backgroundGrey,
        padding:10
    },
    editContainer:{
        padding:5,
        backgroundColor:Colors.backgroundColor,
        borderWidth:1,
        borderRadius:10,
        borderColor:Colors.borderColor
    },
    title:{
        textAlign:"center",
        fontSize:15,
        marginBottom:10,
        marginTop:10
    },
    btnContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        marginTop:10,
        marginBottom:20
    },
    btnConfirmChanges:{
        backgroundColor:Colors.principalBtn,
        width:250,
        padding:3
    }
})