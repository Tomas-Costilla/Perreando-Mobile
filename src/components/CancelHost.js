import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, HelperText, Modal, Portal, Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import { server } from "../api/server"

export default function CancelHost({navigation,bookingId}){

    const [visibleModal,setVisibleModal] = useState(false)
    const [loadingServer,setLoadingServer] = useState(false)
    const [errorServer,setErrorServer] = useState("")

    const handleModal = () =>setVisibleModal(!visibleModal)


    const cancelReserve = async () =>{
        setErrorServer("")
        setLoadingServer(true)
        try {
            await server.put(`/booking/guest/cancel/${bookingId}`)
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
                    <View style={myStyles.btnCloseModalStyle}>
                        <Button mode="text" icon="close" labelStyle={myStyles.iconStyle} onPress={handleModal} />
                    </View>
                    <Text>¿Estas seguro de que deseas cancelar la reserva?</Text>
                    <View style={myStyles.btnContainer}>
                        <Button
                            mode="contained"
                            loading={loadingServer}
                            onPress={cancelReserve}
                            style={myStyles.btnCancelConfirmStyle}
                            icon="check-bold"
                        >
                            Aceptar
                        </Button>
                       {/*  <Button
                            mode="contained-tonal"
                            onPress={handleModal}
                        >
                            Volver
                        </Button> */}
                    </View>
                        {errorServer && <HelperText type="error">{errorServer}</HelperText>}
                </View>
            </Modal>
        </Portal>
    
        <Button
            mode="contained"
            onPress={handleModal}
            style={myStyles.btnCancelStyle}
            icon="cancel"
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
    btnCloseModalStyle:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"flex-end"
    },
    container:{
        backgroundColor:Colors.backgroundColor,
        padding:15,
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
    },
    btnCancelStyle:{
        marginTop:10,
        marginBottom:10,
        width:300,
        borderRadius:10,
        backgroundColor:Colors.principal,
        padding:5
    },
    btnCancelConfirmStyle:{
        marginTop:10,
        marginBottom:10,
        width:200,
        borderRadius:10,
        backgroundColor:Colors.principal,
        padding:5
    },
    iconStyle:{
        fontSize:25,
        color:"#CACACA"
    }
})