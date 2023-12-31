import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Modal, Portal , Text} from "react-native-paper"
import { Colors } from "../tools/constant"
import { server } from "../api/server"


export default function DeleteHost({navigation,visible,hideModal,hostOwnerId}){

    const [loading,setLoading] = useState(false)

    const deleteHostData = async () =>{
        setLoading(true)        
        try {
            await server.delete(`/host/${hostOwnerId}`)
            hideModal()
            navigation.navigate("Account")
        } catch (error) {
            console.log(error.response.data)
        }
        setLoading(false)
    }

    return(
        <>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} style={{padding:10,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                   <View style={myStyles.container}>
                    <View style={{display:"flex",justifyContent:"flex-end",flexDirection:"row",alignItems:"center"}}>
                        <Button 
                            mode="text"
                            icon="close"
                            labelStyle={{fontSize:20,color:"#CACACA"}}
                            onPress={hideModal}
                        />
                    </View>
                        <Text style={myStyles.title}>¿Estas seguro que deseas eliminar tu alojamiento?</Text>
                        <Text style={myStyles.description}>Se eliminaran todos los huespedes y comentarios acerca de este alojamiento. Puedes volver a crear otro desde el menu principal</Text>
                        <View style={myStyles.btnActionContainer}>
                            <Button
                                mode="contained"
                                onPress={()=>deleteHostData()}
                                style={myStyles.btnCancel}
                                loading={loading}
                            >
                                Aceptar
                            </Button>
                        </View>
                   </View>
                </Modal>
            </Portal>
        </>
    )

}

const myStyles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        backgroundColor:Colors.backgroundColor,
        borderRadius:5,
        padding:20,
        gap:10
    },
    title:{
        textAlign:"justify"
    },
    description:{
        textAlign:"justify"
    },
    btnActionContainer:{
        padding:10,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center"
    },
    btnCancel:{
        borderRadius:10,
        backgroundColor:Colors.principal,
        padding:3
    }
})