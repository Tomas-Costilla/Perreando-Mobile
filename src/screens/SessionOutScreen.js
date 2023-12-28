import {} from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import LottieView from 'lottie-react-native';
import { useDispatch } from "react-redux";
import { signUp } from "../store/slices/userSlice";



export default function SessionOutScreen(){

    const dispatch = useDispatch()
    const handleLogoutSession = () => dispatch(signUp())

    return <View style={myStyles.container}>
        <Text style={myStyles.title}>Tu sesion se ha caido!</Text>
        <LottieView source={require("../../assets/animations/logoutAnimation.json")} autoPlay loop/>
        <Button
            mode="contained"
            style={myStyles.btnSignIn}
            icon="login"
            onPress={handleLogoutSession}
        >
            Ingresar de nuevo
        </Button>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.backgroundColor,
        padding:10,
        flexDirection:"column",
        justifyContent:"space-around",
        alignItems:"center"
    },
    title:{
        fontSize:20
    },
    btnSignIn:{
        backgroundColor:Colors.principalBtn,
        width:300,
        padding:3
    }
})