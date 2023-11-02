import { useState, useEffect } from "react"
import { StyleSheet, View, KeyboardAvoidingView, ScrollView } from "react-native"
import { Colors } from "../tools/constant"
import InputView from "../components/InputView"
import { server } from "../api/server"
import { useSelector } from "react-redux"
import { ActivityIndicator, Button, Text } from "react-native-paper"



export default function UpdateAccountScreen({navigation}){

    const {user} = useSelector(state=>state.user)
    const [loadingRequest,setLoadingRequest] = useState(false)
    const [errorRequest,setErrorRequest] = useState("")
    const [userData,setUserData] = useState({})
    const [loading,setLoading] = useState(false)

    const handleData = (camp,value) => {

        if(camp==="userAddressNumber" && isNaN(value)) return

        setUserData({...userData,[camp]:value})
    }

    const getUserInfobyID = async () =>{
        setLoadingRequest(true)
        try {
            const {data} = await server.get(`/user/${user._id}`)
            setUserData(data)
        } catch (error) {
            setErrorRequest(error.response.data)
        }
        setLoadingRequest(false)
    }

    const updateUserData = async () =>{
        setLoading(true)
        try {
            await server.put(`/user/${user._id}`,userData)
            navigation.navigate("Account")
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }


    useEffect(()=>{
        getUserInfobyID()
    },[])

    if(loadingRequest) return <View style={myStyles.requestContainer}>
        <ActivityIndicator animating size={45}/>
    </View>

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
                nameField="userAddressStreet"
                label="Tu Direccion"
                editable={true}
                handleData={handleData}
                value={userData.userAddressStreet}
                icon="pencil"
            />
            <InputView 
                nameField="userAddressNumber"
                label="Altura"
                editable={true}
                handleData={handleData}
                value={userData.userAddressNumber}
                icon="pencil"
                typeInput='numeric'
            />
            <InputView 
                nameField="userAddressBetwStreet"
                label="Entre Calles"
                editable={true}
                handleData={handleData}
                value={userData.userAddressBetwStreet}
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
        backgroundColor:Colors.principal,
        borderRadius:10,
        width:250
    }
})