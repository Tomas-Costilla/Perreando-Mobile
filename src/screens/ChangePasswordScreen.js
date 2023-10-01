import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Checkbox, Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import InputView from "../components/InputView"
import Message from "../components/Message"
import { server } from "../api/server"

export default function ChangePasswordScreen({navigation,route}){

    const {userEmail} = route.params
    const [typeError,setTypeError] = useState("")
    const [error,setError] = useState("")
    const [isPrivatePassword,setIsPrivatePassword] = useState(true)
    const [isChecked,setIsChecked] = useState(false)
    const [loading,setLoading] = useState(false)
    const [password,setPassword] = useState({
        newPassword:"",
        repeatPassword:""
    })

    const handleInputData = (field,value) => setPassword({...password,[field]:value})

    const validateUserData = () =>{
        setError("")
        setTypeError("")
        if(password.newPassword === "" || password.repeatPassword === ""){
            setTypeError("warning")
            setError("Debes completar los campos para cambiar la contraseña")
            return
        }

        if(password.newPassword !== password.repeatPassword){
            setTypeError("warning")
            setError("Las contraseñas no coinciden")
            return
        }

        changeUserPassword()
    }

    const changeUserPassword = async () =>{
        setTypeError("")
        setError("")
        setLoading(true)
        try {
            await server.put(`/user/changeuserpassword`,{
                userEmail: userEmail,
                userNewPassword: password.newPassword
            })
            navigation.popToTop()
        } catch (error) {
            setTypeError("error")
            setError(error.response.data)
        }
        setLoading(false)
    }

    return <View style={myStyles.container}>
        <View style={myStyles.inputContainer}>
            <Text style={{textAlign:"center",marginBottom:10,fontSize:15}}>Ingresa tu nueva contraseña</Text>
            <InputView 
                label="Tu nueva contraseña"
                nameField="newPassword"
                editable={true}
                placeholder="..."
                handleData={handleInputData}
                isPrivate={isPrivatePassword}
            />
            <InputView 
                label="Repite la contraseña"
                nameField="repeatPassword"
                editable={true}
                placeholder="..."
                handleData={handleInputData}
                isPrivate={isPrivatePassword}
            />
            
            <Checkbox.Item label="Visualizar contraseñas" status={isChecked ? "checked" : "unchecked"} onPress={()=> {
                setIsChecked(!isChecked)
                setIsPrivatePassword(!isPrivatePassword)
            }} />

            {error && <Message msg={error} type={typeError}/>}

            <View style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
                <Button
                    mode="contained"
                    loading={loading}
                    style={myStyles.btnConfirmChanges}
                    onPress={validateUserData}
                >
                    Cambiar contraseña
                </Button>
                <Button
                    mode="text"
                    labelStyle={{textAlign:"center",fontSize:15,color:Colors.principal}}
                    style={{marginTop:10}}
                    onPress={()=>navigation.popToTop()}
                >
                    Volver al inicio
                </Button>
            </View>
        </View>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
       /*  alignItems:"center", */
        padding:10,
        backgroundColor:Colors.backgroundColor
    },
    inputContainer:{
        display:"flex",
        justifyContent:"center",
        padding:10,
        gap:10
    },
    btnConfirmChanges:{
        borderRadius:10,
        backgroundColor:Colors.principal,
        padding:5
    }
})