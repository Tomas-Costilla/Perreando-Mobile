import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import AnfitrionImg from "../../../assets/anfitrion.png"
import MascotaImg from "../../../assets/mascota.png"
import ProfileOption from "../../components/ProfileOption"
import { Colors, PROFILE_TYPES } from "../../tools/constant"


export default function ProfileScreen({navigation}){
    /* const [profile,setProfile] = useState("") */

    const handleSelectProfile = (value) =>{
        navigation.navigate("Photo",{
            profile: value
        })
    }


    return <View style={myStyles.container}>
        <Text>Elige un perfil a utilizar</Text>
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
}

const myStyles = StyleSheet.create({
    container:{
        padding:10,
        flex:1,
       /*  display:"flex", */
        justifyContent:"space-evenly",
        flexDirection:"column",
        alignItems:"center",
        gap:0,
        backgroundColor:Colors.backgroundColor
    }
})