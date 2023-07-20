import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Modal, Portal, TextInput, Text } from "react-native-paper"
import InputView from "./InputView"
import { PROFILE_TYPES } from "../tools/constant"


export default function UbicationInput({userUbication,navigation,userProfile}){
    const [visible,setVisible] = useState(false)

    const handleModalInfo = () => setVisible(!visible)

    return <>
        <Portal>
            <Modal visible={visible} onDismiss={handleModalInfo} style={{padding: 10}}>
                <View style={myStyle.modalContent}>
                    <Text>Por el momento solo se encuentra disponible en CABA</Text>
                </View>
            </Modal>
        </Portal>

       
        <View style={myStyle.container}>
            <TextInput 
                label="Provincia"
                mode="outlined"
                disabled
                value={userUbication}
                style={myStyle.inputStyle}
                />
            <Button 
                mode="text"
                icon="information-outline"
                onPress={handleModalInfo}
                compact
                />
        </View>    
                {userProfile === PROFILE_TYPES.ANFITRION
                     && <>
                         <InputView 
                             editable={false}
                             label="Selecciona una localidad"
                             placeholder="Aun no has seleccionado ningun valor..."
                         />
         
                         <View style={myStyle.btnUbications}>
                                 <Button
                                     mode="outlined"
                                     onPress={()=>navigation.navigate("UbicationSearch")}
                                     icon="map-marker-outline"
                                 >
                                     Ver Localidades
                                 </Button>
                             </View>
                         </>
                }
        
    </>
}

const myStyle = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        alignContent:"center",
        gap:20
    },
    modalContent:{
        backgroundColor:"#FFFFFF",
        height:100,
        borderRadius:10,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    inputStyle:{
        width:200
    },
    btnUbications:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
    },
})