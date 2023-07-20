import { useState } from "react"
import {StyleSheet, View} from "react-native"
import {Text,Button, TextInput, IconButton} from "react-native-paper"
import { server } from "../api/server"
import {useDispatch} from "react-redux"
import {signIn} from "../store/slices/userSlice"
import axios from "axios"

const SignInScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState({
        isErrorEmail:false,
        isErrorPass:false,
        typeErrorEmail:"",
        typeErrorPass:""
    })
    const [errorServer,setErrorServer] = useState({isError:false,errorMessage:""})
    const [inputValue,setInputValue] = useState({
        userEmail:"",
        userPassword:""
    })
    const [viewPassword,setViewPassword] = useState(false)

    const handleInputData = (value,camp) => setInputValue({...inputValue,[camp]:value})

    const validateInputData = (type) =>{
        if(type==='email'){
            setError({...error,isErrorEmail:false,typeErrorEmail:""})
            let mailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if(inputValue.userEmail==="") {
                setError({...error,isErrorEmail:true,typeErrorEmail:"El email esta vacio"})
                return
            }
            else if(!inputValue.userEmail.match(mailFormat)) {
                setError({...error,isErrorEmail:true,typeErrorEmail:"El formato del email es incorrecto"})
                return
            }    
        }
        if(type==='password'){
            setError({...error,isErrorPass:false,typeErrorPass:""})
            if(inputValue.userPassword==="") {
                setError({...error,isErrorPass:true,typeErrorPass:"La contraseña esta vacia"})
                return
            }
        }

        /* signIn() */
    }


    const signInUser = async () =>{

        setLoading(true)
        setErrorServer({...errorServer,isError: false,errorMessage:""})
        try {
            let response = await server.post("/user/signin",inputValue)
            dispatch(signIn(response.data))
        } catch (error) {
            /* console.log(error.response); */
            setErrorServer({...errorServer,isError:true,errorMessage:error.response.data})
        }
        setLoading(false)
    }

    return <>
        <View style={myStyles.loginContainer}>
            <Text style={myStyles.title} variant="headlineMedium">Iniciar con mi cuenta</Text>
            <TextInput 
                label="email"
                mode="outlined"
                onChangeText={value => handleInputData(value,"userEmail")}
                onBlur={e=>validateInputData('email')}
                error={error.isErrorEmail}
            />
            {error.isErrorEmail && <Text style={myStyles.errorStyle}>{error.typeErrorEmail}</Text>}
            <TextInput 
                label="contraseña"
                mode="outlined"
                onChangeText={value => handleInputData(value,"userPassword")}
                error={error.isErrorPass}
                secureTextEntry={!viewPassword && true}
                right={<TextInput.Icon icon={viewPassword ? "eye" : "eye-off"} onPress={()=>setViewPassword(!viewPassword)}/>}
                onBlur={e=>validateInputData('password')}
            />
            {error.isErrorPass && <Text style={myStyles.errorStyle}>{error.typeErrorPass}</Text>}
            {errorServer.isError && <Text style={myStyles.errorStyle}>{errorServer.errorMessage}</Text>}
            <View style={myStyles.btnContainer}>
                <Button 
                    style={myStyles.btnLogin} 
                    mode="contained" 
                    onPress={()=>signInUser()}
                    disabled={error.isErrorEmail || error.isErrorPass ? true : false}
                    loading={loading}
                    labelStyle={{textAlign:"center",color:"#FFFFFF"}}               
                >{!loading && "Iniciar sesion"}</Button>
            </View>
            <Button mode="text" onPress={()=>navigation.navigate("Profile")}>¿No tienes una cuenta? Presiona aqui para registrarte</Button>
        </View>
    </>
}

const myStyles = StyleSheet.create({
    loginContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        padding:10,
        gap:10
    },
    title:{
        textAlign:"center",
        fontSize:20
    },
    btnContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    },
    btnLogin:{
       width:300,
       justifyContent:"flex-end"
    },
    errorStyle:{
        color:"#FF0000"
    }
})

export default SignInScreen;