import { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import {TextInput,Text, Button} from "react-native-paper"
import InputView from "../components/InputView"
import { Colors } from "../tools/constant"
import DeleteHost from "../components/DeleteHost"


export default function ViewHostScreen({navigation}){

    const [deleteModal,setDeleteModal] = useState(false)

    const handleDeleteModal = () => setDeleteModal(!deleteModal)

    return <ScrollView style={myStyles.container}>
       {/*  <ScrollView> */}
                <View style={myStyles.btnActionContainer}>
                    <Button icon="pencil" onPress={()=>navigation.navigate("UpdateHostData")} compact labelStyle={myStyles.btnActionEditStyles}/>
                    <Button icon="delete" onPress={()=>handleDeleteModal()} compact labelStyle={myStyles.btnActionDltStyles}/>
                </View>
                <Text style={myStyles.title}>Datos de tu alojamiento</Text>
               <InputView label="Nombre descriptivo de tu alojamiento" editable={false}/>
               <InputView label="La ubicacion es por defecto la de tus datos" editable={false}/>
               <InputView label="Capacidad maxima de huespedes" editable={false}/>
               <InputView label="Costo de estadia" editable={false}/>
               <InputView label="Total de huespedes" editable={false}/>
               
               <View style={myStyles.btnsViewGuest}>
                    <Button mode="contained" onPress={()=>navigation.navigate("ViewHostGuest")}>Ver Huespedes</Button>
                    <Button mode="contained" onPress={()=>navigation.navigate("ViewHostRating")}>Ver Calificaciones</Button>
               </View>

               <DeleteHost navigation={navigation} visible={deleteModal} hideModal={handleDeleteModal}/>
        {/* </ScrollView> */}
    </ScrollView>
}

const myStyles = StyleSheet.create({
    container:{
        backgroundColor:Colors.backgroundColor,
        flex:1,
        padding:10,
        /* display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start", */
        
    },
    btnActionContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end"
    },
    btnActionEditStyles:{
        textAlign:"center",
        fontSize:25
       /*  color:"" */
    },
    btnActionDltStyles:{
        textAlign:"center",
        color:"red",
        fontSize:25
    },
    title:{
        textAlign:"center",
        marginBottom:10
    },
    btnsViewGuest:{
       /*  padding:10, */
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:10
    }
})