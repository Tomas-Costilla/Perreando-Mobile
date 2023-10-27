import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, HelperText, Modal, Portal, Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import { server } from "../api/server"


export default function CreateReserve({navigation,hostIdProp,guestIdProp}){
    
    const [loading,setLoading] = useState(false)
    const [visibleModal,setVisibleModal] = useState(false)
    const [isErrorServer,setIsErrorServer] = useState(false)
    const [ErrorMessage,setErrorMessage] = useState("")

    const handleModal = () => setVisibleModal(!visibleModal)

    const createReserveFunction = async () =>{
        setLoading(true)
        setIsErrorServer(false)
        try {
            const response = await server.get(`/host/guestReserve/${guestIdProp}`)
            if(response.data.existe) {
                setIsErrorServer(true)
                setErrorMessage("Ya tienes una reserva, cancela tu reserva para poder gestionar otra")
                setLoading(false)
                return
            }
            await server.post(`/host/guest`,{hostId: hostIdProp,guestId: guestIdProp})
            handleModal()
            navigation.navigate("Account",{message: "Ya tienes una reserva creada!"})
        } catch (error) {
            setIsErrorServer(true)
            setErrorMessage(error.response.data)
        }
        setLoading(false)
    }

    return <>
        <Portal>
            <Modal visible={visibleModal} onDismiss={handleModal} style={myStyles.modalContainer}>
                <View style={myStyles.container}>
                    <Text style={myStyles.title}>¿Desea confirmar la reserva?</Text>
                    <View style={myStyles.btnContainer}>
                        <Button
                            mode="contained"
                            onPress={createReserveFunction}
                            loading={loading}
                        >Confirmar</Button>

                        <Button
                            mode="contained-tonal"
                            onPress={handleModal}
                        >Cancelar</Button>
                    </View>
                    {isErrorServer && <HelperText type="error">{ErrorMessage}</HelperText>}
                </View>
            </Modal>
        </Portal>
    
        <Button
            mode="contained"
            onPress={handleModal}
        >
            Reservar
        </Button>

    </>
}

const myStyles = StyleSheet.create({
    modalContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    container:{
        backgroundColor:Colors.backgroundColor,
        padding:20,
        borderRadius:10,
        width:350,
        height:'auto'
        
    },
    title:{
        textAlign:"center",
        marginTop:10, 
        marginBottom:10
    },
    btnContainer:{
        display:"flex",
        justifyContent:"space-evenly",
        flexDirection:"row",
        marginTop:10,
        marginBottom:10
    }
})
