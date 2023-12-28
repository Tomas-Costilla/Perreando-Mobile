import { useState } from "react"
import { KeyboardAvoidingView, StyleSheet, View } from "react-native"
import { Button, HelperText } from "react-native-paper"
import { Colors } from "../tools/constant"
import InputView from "../components/InputView"
import { server } from "../api/server"
import { useSelector } from "react-redux"


export default function ConfirmUpdatePawScreen({navigation,route}){

    const user = useSelector(state=>state.user.user)
    const [updatePawData,setUpdatePawData] = useState(route.params.pawData)
    const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState("")


    const handlePawData = (field,value) =>{
        setUpdatePawData({...updatePawData,[field]:value})
    }

    const updatePawDataServer = async () =>{
        setLoading(true)
        setMessage("")
        try {
            await server.put(`/user/paw/${user._id}`,{
                userGuestAnimalName: updatePawData.userGuestAnimalName,
                userGuestAnimalAge: updatePawData.userGuestAnimalAge,
                userGuestAnimalWeight: updatePawData.userGuestAnimalWeight
            })
            navigation.popToTop()
        } catch (error) {
            if(error.response.data?.isLogged===false) navigation.navigate("SessionOut")
            setMessage(error.response.data)
        }
        setLoading(false)
    }

    return <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={myStyles.container}>
         <InputView 
            label="Nombre de tu mascota"
            editable={true}
            value={updatePawData.userGuestAnimalName}
            nameField="userGuestAnimalName"
            handleData={handlePawData}
            /* inputStyles={myStyles.inputNameStyle} */
            icon="pencil"
        />
        <InputView 
            label="Edad de tu mascota"
            editable={true}
            value={updatePawData.userGuestAnimalAge}
            nameField="userGuestAnimalAge"
            typeInput='numeric'
            handleData={handlePawData}
            /* inputStyles={myStyles.inputNumberStyle} */
            icon="pencil"
        />
        <InputView 
            label="Peso en KG de tu mascota"
            editable={true}
            value={updatePawData.userGuestAnimalWeight}
            nameField="userGuestAnimalWeight"
            typeInput='numeric'
            handleData={handlePawData}
/*             inputStyles={myStyles.inputNumberStyle}
 */            icon="pencil"
        />
        {message && <HelperText type="error">{message}</HelperText>}
        <View style={myStyles.btnContainer}>
            <Button
                mode="contained"
                style={myStyles.btnConfirmUpdate}
                loading={loading}
                onPress={updatePawDataServer}
                icon="pencil"
            >
                Confirmar cambios
            </Button>
        </View>
    
    </KeyboardAvoidingView>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"flex-start",
        padding:10,
        backgroundColor:Colors.backgroundColor
    },
    btnContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:10
    },
    btnConfirmUpdate:{
        backgroundColor:Colors.principal,
        borderRadius:10,
        width:250,
        padding:3
    }
})