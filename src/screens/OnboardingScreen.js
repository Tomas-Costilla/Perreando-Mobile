import { useState } from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"
import {Text,Button, Checkbox} from "react-native-paper"
import { Colors } from "../tools/constant"
import { useDispatch, useSelector } from "react-redux"
import Onboarding from "react-native-onboarding-swiper"
import {Image} from "expo-image"
import Logo from "../../assets/logo-sin-fondo.png"
import TermAndConditions from "../components/OnboardingComponents/TermAndConditions"
import { server } from "../api/server"
import { updateTermsUser } from "../store/slices/userSlice"



export default function OnboardingScreen(){

    const user = useSelector(state=>state.user.user)
    const dispatch = useDispatch()

    const handleDone = async () =>{
        try {
            await server.put(`/user/terms/${user._id}`)
            dispatch(updateTermsUser())
        } catch (error) {
            
        }
    }

    return <Onboarding
    bottomBarColor="#FFFFFF"
    nextLabel="Siguiente"
    showSkip={false}
    onDone={handleDone}
         pages={[
             {
                 backgroundColor:"#FFFFFF",
                 title:`¡Bienvenido ${user.userFullName} al Onboarding de Perreando!`,
                 subtitle:`Para continuar, debes leer con atencion nuestros terminos y condiciones ademas de aceptarlos para poder utilizar los servicios que ofrecemos`,
                 image: <Image source={Logo} style={{width:200,height:200}} />
             },
            /*  {
                 backgroundColor:"#FFFFFF",
                 title:`¡Bienvenido ${user.userFullName} al Onboarding de Perreando!`,
                 subtitle:``,
                 image: <Image source={Logo} style={{width:200,height:200}} />
             }, */
             {
                 backgroundColor:"#FFFFFF",
                 title:"",
                 subtitle:<TermAndConditions doneFunction={handleDone}/>,
                 image: <></>
             }
         ]}
    
    />
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:Colors.backgroundColor,
        justifyContent:"flex-start"
    },
    titleTermsCond:{
        fontSize:20,marginBottom:10
    }
})