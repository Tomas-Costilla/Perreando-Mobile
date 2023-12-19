import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import AnfitrionImg from "../../../assets/anfitrion.png"
import MascotaImg from "../../../assets/mascota.png"
import ProfileOption from "../../components/ProfileOption"
import { Colors, PROFILE_TYPES } from "../../tools/constant"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"


export default function ProfileScreen({navigation,route}){
    /* const [profile,setProfile] = useState("") */
    const {countryId} = route.params

    console.log(route.params)
    const handleSelectProfile = (value) =>{
        navigation.navigate("Photo",{
            countryId,
            profile: value
        })
    }


    return <View style={myStyles.principalContainer}>
        <Text style={myStyles.title}>Elige un perfil a utilizar</Text>
            <View style={myStyles.container}>
                <ProfileOption 
                    type={PROFILE_TYPES.ANFITRION}
                    image={AnfitrionImg}
                    title="Quiero ser anfitrion"
                    handleProfile={handleSelectProfile}
                />
                <ProfileOption 
                    type={PROFILE_TYPES.HUESPED}
                    image={MascotaImg}
                    title="Quiero ser huesped"
                    handleProfile={handleSelectProfile}
                />
        </View>
        <View style={myStyles.infoContainer}>
            <Icon name="information-outline" size={35} color="#2d3f4e"/>
            <Text style={myStyles.textInfo}>Si eliges el tipo "Anfitrion" podras utilizar nuestras funciones para ofrecer tus servicios. Si elijes el tipo "Huesped" podras utilizar los servicios que habiliten los usuarios del tipo Anfitrion.</Text>
        </View>
    </View>
}

const myStyles = StyleSheet.create({
    principalContainer:{
        backgroundColor:Colors.backgroundColor,
        flex:1,
        alignItems:"center",
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        padding:10
    },
    container:{
        padding:10,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        gap:16,
        alignContent:"center",
        marginTop:20,
        marginBottom:20
       
    },
    title:{
        fontSize:16,
        color: Colors.textColor,
        padding:10,
        marginBottom:20
    },
    infoContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:6,
        padding:10,
        borderRadius:10,
        backgroundColor:"#ddecf0"
    },
    textInfo:{
        textAlign:"justify",
        flexShrink:1,
        color:"#2d3f4e"
    }
})