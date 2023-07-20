import {useState} from "react"
import { FlatList, ScrollView, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import UbicationItem from "../components/UbicationItem"

const loalidades = [
    {
        id:1,
        name:"Banfield"
    },
    {
        id:2,
        name:"Lomas de Zamora"
    },
    {
        id:3,
        name:"La matanza"
    },
    {
        id:4,
        name:"Lanus"
    }
]

export default function UbicationsScreen({navigation}){

    const handleUbicationPreference = (value) => {
        navigation.navigate("SearchHost",{ubi: value})
    }

    return <View style={myStyles.container}>
        <Text style={myStyles.title}>Selecciona una localidad</Text>
        <FlatList 
            data={loalidades}
            renderItem={({item})=> <UbicationItem name={item.name} handleData={handleUbicationPreference} navigation={navigation}/>}
            keyExtractor={item=>item.id}
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
    }
})