import {useEffect, useState} from "react"
import { FlatList, ScrollView, StyleSheet, View } from "react-native"
import { ActivityIndicator, Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import UbicationItem from "../components/UbicationItem"
import { server } from "../api/server"


export default function UbicationsScreen({navigation,route}){

    const [towns,setTowns] = useState([])
    const [loading, setLoading] = useState(false)

    const handleUbicationPreference = (value) => {
        navigation.navigate(route.params.screenBack,{...route.params,ubication: value})
    }

    const getAllTowns = async () =>{
        setLoading(true)
        try {
            const response = await server.get("/user/ubications")
            setTowns(response.data.resultado)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(()=>{
        getAllTowns()
    },[])

    if(loading) return <View style={myStyles.loadingContainer}>
        <ActivityIndicator animating={true} size={50}/>
    </View>

    return <View style={myStyles.container}>
        <Text style={myStyles.title}>Selecciona una localidad</Text>
        <FlatList 
            data={towns}
            renderItem={({item})=> <UbicationItem name={item.nombre} handleData={handleUbicationPreference} navigation={navigation}/>}
            keyExtractor={item=>item.id}
            initialNumToRender={10}
        />
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:Colors.backgroundColor
    },
    title:{
        textAlign:"center",
        marginTop:10,
        marginBottom:10
    },
    loadingContainer:{
        flex:1,
        backgroundColor:Colors.backgroundColor,
        justifyContent:"center",
        padding:10
    }
})