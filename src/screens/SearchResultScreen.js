import { useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { Colors } from "../tools/constant"
import { ActivityIndicator, HelperText, Text } from "react-native-paper"
import {server} from "../api/server"
import ItemSearch from "../components/ItemSearch"


const host = [
    {
        hostDescription:"alojamiento de sofi",
        hostLocation:"Banfield",
        hostOwnerCapacity:10,
        hostPrice:2500
    }
]


export default function SearchResultScreen({navigation,route}){

    const {ubication} = route.params
    const [loadingReq,setLoadingReq] = useState(false)
    const [errorReq,setErrorReq] = useState("")
    const [hostData,setHostData] = useState([])


    const getAllHostbyUbication = async () =>{
        setLoadingReq(true)
        setErrorReq("")
        let url = ""
        if(ubication==="all") url = `/host/search`
        else url = `/host/search?ubiName=${ubication}`
        console.log(ubication)
        try {
            const response = await server.get(url)
            setHostData(response.data)
        } catch (error) {
            if(error.response.data?.isLogged===false) navigation.navigate("SessionOut")
            /* setErrorReq(error.response.data) */
            console.log(error.response)
        }
        setLoadingReq(false)
    }

    useEffect(()=>{
        getAllHostbyUbication()
    },[ubication])


    if(loadingReq) return <View style={myStyles.loadingReq}>
        <ActivityIndicator animating size={45}/>
    </View>

    if(errorReq) return <View style={myStyles.loadingReq}>
        <HelperText type="error">{errorReq}</HelperText>
    </View>

    if(hostData.length === 0) return <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:Colors.backgroundColor}}>
        <Text style={{fontSize:15}}>No existen hospedajes para la localidad seleccionada</Text>
    </View>

    return <View style={myStyles.container}>
        {/* <Text>Resultado de la busqueda</Text> */}
        <FlatList 
            data={hostData}
            renderItem={({item}) => <ItemSearch data={item} navigation={navigation}/>}
            keyExtractor={item=>item._id}
        />
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:Colors.backgroundColor
    },
    loadingReq:{
        flex:1,
        padding:10,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Colors.backgroundColor
    }
})