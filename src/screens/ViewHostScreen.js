import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import {TextInput,Text, Button, ActivityIndicator} from "react-native-paper"
import InputView from "../components/InputView"
import { Colors } from "../tools/constant"
import DeleteHost from "../components/DeleteHost"
import { useSelector } from "react-redux"
import { server } from "../api/server"


export default function ViewHostScreen({navigation}){

    const {user} = useSelector(state=>state.user)
    const [deleteModal,setDeleteModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [hostData,setHostData] = useState({})


    const handleDeleteModal = () => setDeleteModal(!deleteModal)

    const getOwnerHostbyID = async () =>{
        setLoading(true)
        try {
            const response = await server.get(`/host/owner/${user._id}`)
            if(response.data) setHostData(response.data)            
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(()=>{
        getOwnerHostbyID()
    },[])

    if(loading) return <View style={myStyles.loadingContainer}>
        <ActivityIndicator animating={true} size={40}/>
    </View>

    if(Object.keys(hostData).length === 0) return <View style={myStyles.emptyContainer}>
        <Text style={myStyles.notHostTitle}>Aun no tienes creado un hospedaje!</Text>
    </View>

console.log(hostData);
    return <ScrollView style={myStyles.container}>
       {/*  <ScrollView> */}
                <View style={myStyles.btnActionContainer}>
                    <Button icon="pencil" onPress={()=>navigation.navigate("UpdateHostData")} compact labelStyle={myStyles.btnActionEditStyles}/>
                    <Button icon="delete" onPress={()=>handleDeleteModal()} compact labelStyle={myStyles.btnActionDltStyles}/>
                </View>
               <Text style={myStyles.title}>Datos de tu alojamiento</Text>
               <InputView 
                    label="Nombre descriptivo de tu alojamiento" 
                    editable={false}
                    value={hostData.hostDescription}
                />

               <InputView 
                    label="La ubicacion es por defecto la de tus datos" 
                    editable={false}
                    value={hostData.hostLocation}
                />

               <InputView 
                    label="Capacidad maxima de huespedes" 
                    editable={false}
                    value={hostData.hostOwnerCapacity}
                    typeInput="numeric"
                    inputStyles={myStyles.inputNumberStyle}
                />

               <InputView 
                    label="Costo de estadia" 
                    editable={false}
                    value={hostData.hostPrice}
                    typeInput="numeric"
                    icon="currency-usd"
                    inputStyles={myStyles.inputNumberStyle}
                />

               
               
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
    loadingContainer:{
        flex:1,
        justifyContent:"center",
        backgroundColor:Colors.backgroundColor,
        padding:10
    },
    emptyContainer:{
        flex:1,
        justifyContent:"flex-start",
        backgroundColor:Colors.backgroundColor,
        padding:10
    },
    notHostTitle:{
        textAlign:"center",
        marginTop:10,
        marginBottom:10
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
    },
    inputNumberStyle:{
        width:150
    }
})