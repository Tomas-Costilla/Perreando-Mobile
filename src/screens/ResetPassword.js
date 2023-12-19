import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import InputView from "../components/InputView"
import Message from "../components/Message"
import { server } from "../api/server"


export default function ResetPassword({navigation}){

    const [errorServer,setErrorServer] = useState("")
    const [errorMessage,setErrorMessage] = useState({
        errorInput:"",
        errorServer:"",
        errorType:""
    })
    const [loading,setLoading] = useState(false)
    const [userData,setUserData] = useState({
        userEmail:""
    })

    const handleUserEmail = (field,value) => setUserData({...userData,[field]:value})

    const validateUserEmail = () =>{
        setErrorMessage({...errorMessage,errorInput:""})

        if(userData.userEmail === ""){
            setErrorMessage({...errorMessage,errorInput:"Debes ingresar un email para continuar"})
            return
        }

        let mailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if(!userData.userEmail.match(mailFormat)){
            setErrorMessage({...errorMessage,errorInput:"El formato del email es incorrecto"})
            return
        }

        sendEmailToServer()
    }

    const sendEmailToServer = async () =>{
        setLoading(true)
        setErrorServer("")
        try {
            await server.post("/user/resetpassword",{userEmail: userData.userEmail})
            navigation.navigate("ValidateCode",{userEmail: userData.userEmail})
        } catch (error) {
            console.log(error.response)
            if(error.response.data?.message) setErrorServer(error.response.data?.message)
            else setErrorServer("Ocurrio un error en realizar la operacion")
        }
        setLoading(false)
    }

    return <View style={myStyles.container}>
        <View style={myStyles.inputContainer}>
            <Text style={{fontSize:15,marginBottom:10,textAlign:"center"}}>Ingresa tu email con el cual estas registrado</Text>
            <InputView 
                nameField="userEmail"
                editable={true}
                placeholder="aqui..."
                handleData={handleUserEmail}
                label="Tu Email"
                validateMessage={errorMessage.errorInput}
            />
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                <Button
                    mode="contained"
                    style={myStyles.btnValidate}
                    onPress={validateUserEmail}
                    loading={loading}
                    >
                    Validar
                </Button>
            </View>
            {errorServer && <Message msg={errorServer} type="error"/>}
        </View>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        backgroundColor:Colors.backgroundColor,
        padding:10
    },
    btnValidate:{
        width:250,
        backgroundColor:Colors.principalBtn,
        padding:3,
        marginTop:10
    },
    inputContainer:{
        display:"flex",
        justifyContent:"center",
        padding:10,
        gap:10
    }
})