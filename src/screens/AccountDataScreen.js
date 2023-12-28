import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Text,Button, ActivityIndicator } from "react-native-paper"
import {useSelector} from "react-redux"
import Icon from "react-native-vector-icons/FontAwesome"
import { Colors, PROFILE_TYPES } from "../tools/constant"
import DataView from "../components/DataView"
import InputView from "../components/InputView"
import {server} from "../api/server"
import Message from "../components/Message"
import Loading from "../components/Loading"


const AccountDataScreen = ({navigation}) =>{

    const {user} = useSelector(state=>state.user)
    const [loading,setLoading] = useState(false)
    const [userData,SetUserData] = useState({})
    const [errorServer,setErrorServer] = useState("")

    const getUserInfobyID = async () =>{
        setLoading(true)
        try {
            const response = await server.get(`/user/${user._id}`)
            SetUserData(response.data.result)
        } catch (error) {
            if(error.response.data?.isLogged===false) navigation.navigate("SessionOut")
            if(error.response.data?.message) setErrorServer(error.response.data?.message)
            else setErrorServer("Ocurrio un error en la peticion")          
        }
        setLoading(false)
    }

    useEffect(()=>{
        getUserInfobyID()
    },[])

  
    if(loading) return <Loading />

    return <ScrollView style={myStyles.container}>
        {errorServer ? <Message msg={errorServer} type="error"/>
        : Object.keys(userData).length>0 && <>
            <Text style={myStyles.title}>Tus datos</Text>
            <InputView editable={false} label="Tu nombre completo" value={userData.userFullName} icon="account" />
            <InputView editable={false} label="Tu Email" value={userData.userEmail} icon="email" />
            <InputView editable={false} label="Telefono" value={userData.userPhone} typeInput='numeric' icon="phone-outline"/>
            <InputView editable={false} label="Tu direccion" value={userData.userAddress} icon="map-marker-outline"/>
            <InputView editable={false} label="Informacion extra..." value={userData.userAddressExtraInfo} icon="information-outline"/>
            <InputView editable={false} label="Tipo de perfil" value={userData.userProfile} icon="account-box" />
            

            <View style={myStyles.btnContainer}>
                    <Button
                        mode="outlined"
                        onPress={()=>navigation.navigate("UpdateAccount")}
                        labelStyle={myStyles.btnUpdateData}
                        icon="account"
                    >
                        Modificar Datos
                    </Button>
            </View>
        </>}

    </ScrollView>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.backgroundColor,
        padding:15,
    },
    loadingContainer:{
        flex:1,
        backgroundColor: Colors.backgroundColor,
        padding:10,
        justifyContent:"center"
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
        gap:10
    },
    inputStyleHost:{
        width:100,
    },
    btnContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10,
        padding:10
    },
    btnUpdateData:{
        padding:3,
        backgroundColor:Colors.backgroundColor,
        color:Colors.textColor,
        width:250
    }
})

export default AccountDataScreen;

/* <View style={myStyles.container}>
        <View style={myStyles.userContainer}>
            <View style={myStyles.userImage}>
                
            </View>
            <View style={myStyles.userInfo}>
                <Text>{user.userFullName}</Text>
                <Text>{user.userAddress}</Text>
                <Text>{user.userEmail}</Text>
                <Text>{user.userPhone}</Text>
            </View>
        </View>
        <View style={myStyles.btnEditContainer}>
            <Button
                mode="outlined"
                icon={() => <Icon name="edit" size={16} style={myStyles.btnIconEdit}/>}
                style={myStyles.btnEdit}
            >Editar Perfil</Button>
        </View>
    </View> */