import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, HelperText, Modal, Portal, Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import { server } from "../api/server"

export default function CancelHost({navigation,hostId,userEmail}){

    const [visibleModal,setVisibleModal] = useState(false)
    const [loadingServer,setLoadingServer] = useState(false)
    const [errorServer,setErrorServer] = useState("")

    const handleModal = () =>setVisibleModal(!visibleModal)


    const cancelReserve = async () =>{
        setErrorServer("")
        setLoadingServer(true)
        try {
            await server.delete(`/host/guest/${hostId}/${userEmail}`)
            handleModal()
            navigation.navigate("Account")
        } catch (error) {
            setErrorServer(error.response.data)
        }
        setLoadingServer(false)
    }


    return <>
        <Portal>
            <Modal visible={visibleModal} onDismiss={handleModal} style={myStyles.modalContainer}>
                <View style={myStyles.container}>
                    <Text>Estas seguro de que deseas cancelar la reserva?</Text>
                    <View style={myStyles.btnContainer}>
                        <Button
                            mode="contained"
                            loading={loadingServer}
                            onPress={cancelReserve}
                        >
                            Aceptar
                        </Button>
                        <Button
                            mode="contained-tonal"
                            onPress={handleModal}
                        >
                            Volver
                        </Button>
                    </View>
                        {errorServer && <HelperText type="error">{errorServer}</HelperText>}
                </View>
            </Modal>
        </Portal>
    
        <Button
            mode="contained-tonal"
            onPress={handleModal}
        >
            Cancelar Reserva
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
        padding:10,
        borderRadius:10,
        height:200,
        display:"flex",
        justifyContent:"center",
        gap:10
    },
    btnContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        marginTop:10,
        marginBottom:10
    }
})