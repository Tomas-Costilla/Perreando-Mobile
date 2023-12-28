import { useState, useEffect } from "react"
import { StyleSheet, View, KeyboardAvoidingView, ScrollView } from "react-native"
import { Colors } from "../tools/constant"
import InputView from "../components/InputView"
import { server } from "../api/server"
import { useSelector } from "react-redux"
import { ActivityIndicator, Button, Text } from "react-native-paper"
import Loading from "../components/Loading"
import Message from "../components/Message"



export default function UpdateAccountScreen({navigation}){

    const {user} = useSelector(state=>state.user)
    const [loadingRequest,setLoadingRequest] = useState(false)
    const [errorServer,setErrorServer] = useState("")
    const [errorRequest,setErrorRequest] = useState("")
    const [userData,setUserData] = useState({})
    const [loading,setLoading] = useState(false)

    const handleData = (camp,value) => {
        
        if(camp==="userAddressNumber" && !/^\d+$/.test(value)) return

        setUserData({...userData,[camp]:value})
    }

    const getUserInfobyID = async () =>{
        setLoadingRequest(true)
        try {
            const {data} = await server.get(`/user/${user._id}`)
            setUserData(data.result)
        } catch (error) {
            if(error.response.data?.isLogged===false) {
                navigation.navigate("SessionOut")
                return
            }

            setErrorRequest(error.response.data?.message)
        }
        setLoadingRequest(false)
    }

    const updateUserData = async () =>{
        setLoading(true)
        setErrorServer("")
        try {
            await server.put(`/user/${user._id}`,userData)
            navigation.navigate("Account")
        } catch (error) {
            if(!error.response.data?.isLogged){
                navigation.navigate("SessionOut")
                return
            }

            if(error.response.data?.message){
                setErrorServer(error.response.data?.message)
            }else setErrorServer("Ocurrio un error en la peticion")
    
        }
        setLoading(false)
    }


    useEffect(()=>{
        getUserInfobyID()
    },[])

    if(loadingRequest) return <Loading/>

    if(errorRequest) return <View style={myStyles.requestContainer}>
        <Text style={myStyles.requestMessage}>{errorRequest}</Text>
    </View>

    return <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={myStyles.container}> 
        <ScrollView>
            <Text style={myStyles.title}>Modificar datos</Text>
            <InputView 
                nameField="userFullName"
                label="Tu nombre completo"
                editable={true}
                handleData={handleData}
                value={userData.userFullName}
                icon="pencil"
            />
            <InputView 
                nameField="userEmail"
                label="Tu email"
                editable={true}
                handleData={handleData}
                value={userData.userEmail}
                icon="pencil"
            />
            <InputView 
                nameField="userPhone"
                label="Tu numero de telefono"
                editable={true}
                handleData={handleData}
                value={userData.userPhone}
                typeInput='numeric'
                icon="pencil"
            />
             <InputView 
                nameField="userAddress"
                label="Tu Direccion Completa"
                editable={true}
                handleData={handleData}
                value={userData.userAddress}
                icon="pencil"
            />
            <InputView 
                nameField="userAddressExtraInfo"
                label="Informacion extra"
                editable={true}
                handleData={handleData}
                value={userData.userAddressExtraInfo}
                icon="pencil"
            />

            {errorServer && <Message msg={errorServer} type="error"/>}

            <View style={myStyles.btnContainer}>
                <Button
                    mode="contained"
                    onPress={()=>updateUserData()}
                    loading={loading}
                    style={myStyles.btnConfirmUpdate}
                    icon="account-check"
                >
                    Confirmar Cambios
                </Button>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.backgroundColor,
        padding:10
    },
    requestContainer:{
        flex:1,
        backgroundColor:Colors.backgroundColor,
        justifyContent:"center",
        alignItems:"center",
        padding:10
    },
    requestMessage:{
        fontSize:20
    },
    title:{
        textAlign:"center",
        marginTop:10,
        marginBottom:10,
        fontSize:15
    },
    btnContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        marginTop:10,
        marginBottom:10
    },
    btnConfirmUpdate:{
        padding:3,
        backgroundColor:Colors.principalBtn,
        width:250
    }
})