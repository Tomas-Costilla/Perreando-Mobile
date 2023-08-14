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
        try {
            const response = await server.get(url)
            setHostData(response.data)
        } catch (error) {
            setErrorReq(error.response.data)
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