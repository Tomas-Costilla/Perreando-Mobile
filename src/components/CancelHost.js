import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Modal, Portal, Text } from "react-native-paper"
import { Colors } from "../tools/constant"

export default function CancelHost({navigation}){

    const [visibleModal,setVisibleModal] = useState(false)

    const handleModal = () =>setVisibleModal(!visibleModal)

    return <>
        <Portal>
            <Modal visible={visibleModal} onDismiss={handleModal} style={myStyles.modalContainer}>
                <View style={myStyles.container}>
                    <Text>Estas seguro de que deseas cancelar la reserva?</Text>
                    <View style={myStyles.btnContainer}>
                        <Button
                            mode="contained"
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