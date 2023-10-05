import { useEffect, useState } from "react"
import {View,StyleSheet, FlatList} from "react-native"
import { Text } from "react-native-paper"
import { server } from "../api/server"
import { Colors } from "../tools/constant"
import Loading from "../components/Loading"
import Message from "../components/Message"
import ItemSearch from "../components/ItemSearch"

const FeedScreen = ({navigation}) =>{

    const [loading,setLoading] = useState(false)
    const [errorServer,setErrorServer] = useState("")
    const [errorType,setErrorType] = useState("")
    const [data,setData] = useState([])


    const loadHostResult = async () =>{
        setLoading(true)
        setErrorServer("")
        setErrorType("")
        try {
            let response = await server.get("/host/search") 
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(()=>{
        loadHostResult()
    },[])

    if(loading) return <Loading />

    /* if(errorServer) return <Message msg={errorServer} type="error"/> */

    return <View style={myStyles.container}>
        {/* <Text>Pantalla del feed</Text> */}
        <FlatList 
            data={data}
            renderItem={({item}) => <ItemSearch data={item} navigation={navigation}/>}
            keyExtractor={item=>item._id}
        />
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"flex-start",
       /*  alignItems:"flex-start", */
        backgroundColor:Colors.backgroundColor,
        padding:10
    }
})

export default FeedScreen;