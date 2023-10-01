import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Text, Button } from "react-native-paper"
import { Colors } from "../tools/constant"
import InputView from "../components/InputView"
import { server } from "../api/server"
import Message from "../components/Message"

export default function ValidateCodeScreen({navigation,route}){

    const {userEmail} = route.params
    const [code,setCode] = useState({
        userCode: 0
    })
    const [loading,setLoading] = useState(false)
    const [errorType,setErrorType] = useState("")
    const [errorServer,setErrorServer] = useState("")

    const handleCodeUser = (field,value) => setCode({...code,[field]:value})
    
    const validateCodeInput = () =>{
        setErrorType("")
        setErrorServer("")
        if(code.userCode === 0){
            setErrorType("warning")
            setErrorServer("El codigo de validacion esta vacio")
            return
        }

        validateCodeServer()
    }

    const validateCodeServer = async () =>{
        setLoading(true)
        setErrorServer("")
        setErrorType("")
        try {
            let response = await server.get(`/user/validatetokenpassword/${userEmail}/${code.userCode}`)
            navigation.navigate("ChangePassword",{userEmail: userEmail})
        } catch (error) {
            setErrorType("error")
            setErrorServer(error.response.data)
        }
        setLoading(false)
    }

    return <View style={myStyles.container}>
        <View style={myStyles.codeContainer}>
            <Text style={myStyles.title}>Te hemos enviado un codigo de recuperacion a tu correo, favor de ingresarlo y seguir las instrucciones. En caso de no haber llegado el correo, recordá revisar la casilla de spam.</Text>
            <InputView 
                editable={true}
                typeInput="numeric"
                label="Ingresa el codigo enviado aqui"
                placeholder="XXXXXX..."
                handleData={handleCodeUser}
                nameField="userCode"
            />
            {errorServer && <Message msg={errorServer} type={errorType}/>}
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,padding:5}}>
                <Button 
                    mode="contained"
                    style={myStyles.btnValidate}
                    onPress={validateCodeInput}
                    loading={loading}
                >
                    Validar
                </Button>
            </View>
        </View>
    </View>

}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        /* alignItems:"center", */
        backgroundColor:Colors.backgroundColor,
        padding:10
    },
    codeContainer:{
        padding:5,
        display:"flex",
        flexDirection:"column",
        gap:10
    },
    title:{
        textAlign:"center",
        fontSize:15,
        marginBottom:10
    },
    btnValidate:{
        borderRadius:10,
        width:200,
        padding:3,
        backgroundColor:Colors.principal
    }
})