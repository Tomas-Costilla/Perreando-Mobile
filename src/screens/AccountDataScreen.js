import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Text,Button, ActivityIndicator } from "react-native-paper"
import {useSelector} from "react-redux"
import Icon from "react-native-vector-icons/FontAwesome"
import { Colors, PROFILE_TYPES } from "../tools/constant"
import DataView from "../components/DataView"
import InputView from "../components/InputView"
import {server} from "../api/server"


const AccountDataScreen = ({navigation}) =>{

    const {user} = useSelector(state=>state.user)
    const [loading,setLoading] = useState(false)
    const [userData,SetUserData] = useState({})

    /* console.log(user); */

    const getUserInfobyID = async () =>{
        setLoading(true)
        try {
            const response = await server.get(`/user/${user._id}`)
            SetUserData(response.data)
        } catch (error) {
            console.log(error);            
        }
        setLoading(false)
    }

    useEffect(()=>{
        getUserInfobyID()
    },[])

  
    if(loading) return <View style={myStyles.loadingContainer}>
        <ActivityIndicator animating={true} size={40}/>
    </View>

    return <ScrollView style={myStyles.container}>
        <Text style={myStyles.title}>Tus datos</Text>
        <InputView editable={false} label="Tu nombre completo" value={userData.userFullName} icon="account" />
        <InputView editable={false} label="Tu Email" value={userData.userEmail} icon="email" />
        <InputView editable={false} label="Telefono" value={userData.userPhone} typeInput='numeric' icon="phone-outline"/>
        <InputView editable={false} label="Localidad" value={userData.userUbication} icon="map-marker-outline"/>
        <InputView editable={false} label="Tu direccion" value={userData.userAddressStreet} icon="map-marker-outline"/>
        <InputView editable={false} label="Altura" value={userData.userAddressNumber} typeInput="numeric" icon="map-marker-outline"/>
        <InputView editable={false} label="Entre Calles" value={userData.userAddressBetwStreet} icon="map-marker-outline"/>
        <InputView editable={false} label="Informacion extra..." value={userData.userAddressExtraInfo} icon="information-outline"/>
        <InputView editable={false} label="Tipo de perfil" value={userData.userProfile} icon="account-box" />
        {/* <InputView editable={false} label="Tu nombre completo" value={userData.userGuestAnimalName} /> */}
       {/*  {userData.userProfile === PROFILE_TYPES.ANFITRION
            && <>
                <Text>Pesos en "kg" que admites</Text>
                <View style={myStyles.specification}>
                    <InputView editable={false} label="Desde" value={userData.userHostAnimalWeightFrom} typeInput="numeric" inputStyles={myStyles.inputStyleHost}/>
                    <InputView editable={false} label="Hasta" value={userData.userHostAnimalWeightTo} typeInput="numeric" inputStyles={myStyles.inputStyleHost}/>
                </View>
                <Text>Edad de animales que admites</Text>
                <View style={myStyles.specification}>
                    <InputView editable={false} label="Desde" value={userData.userHostAnimalAgeFrom} typeInput="numeric" inputStyles={myStyles.inputStyleHost}/>
                    <InputView editable={false} label="Hasta" value={userData.userHostAnimalAgeTo} typeInput="numeric" inputStyles={myStyles.inputStyleHost}/>
                </View>
                <InputView editable={false} label="Tipo de alojamiento para..." value={userData.userHostType} icon="paw"/>
        </>} */}

        <View style={myStyles.btnContainer}>
                <Button
                    mode="contained"
                    onPress={()=>navigation.navigate("UpdateAccount")}
                >
                    Modificar Datos
                </Button>
        </View>

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