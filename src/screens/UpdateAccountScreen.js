import { useState, useEffect } from "react"
import { StyleSheet, View, KeyboardAvoidingView, ScrollView } from "react-native"
import { Colors } from "../tools/constant"
import InputView from "../components/InputView"
import { server } from "../api/server"
import { useSelector } from "react-redux"
import { ActivityIndicator, Text } from "react-native-paper"



export default function UpdateAccountScreen({navigation}){

    const {user} = useSelector(state=>state.user)
    const [loadingRequest,setLoadingRequest] = useState(false)
    const [errorRequest,setErrorRequest] = useState("")
    const [userData,setUserData] = useState({})

    const handleData = (camp,value) => setUserData({...userData,[camp]:value})

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
            <InputView 
                nameField="userFullName"
                label="Tu nombre completo"
                editable={true}
                handleData={handleData}
                value={userData.userFullName}
            />
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
    }
})