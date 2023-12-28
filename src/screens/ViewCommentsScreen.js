import { useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { server } from "../api/server"
import Loading from "../components/Loading"
import { Colors } from "../tools/constant"
import GuestRating from "../components/GuestRating"


export default function ViewCommentsScreen({navigation,route}){
    let {hostId} = route.params
    const [serverLoading,setServerLoading] = useState(false)
    const [comments,setComments] = useState([])

    const getAllComments = async () =>{
        setServerLoading(true)
        try {
            let response = await server.get(`/rating/all/${hostId}`)
            setComments(response.data)
        } catch (error) {
            if(error.response.data?.isLogged===false) navigation.navigate("SessionOut")
            console.log(error)
        }
        setServerLoading(false)
    }

    useEffect(()=>{
        getAllComments()
    },[])

    if(serverLoading) return <Loading />

    if(comments.length===0) return <View style={myStyles.messageContainer}>
        <Text>El anfitrion aun no recibio ningun comentario!</Text>
    </View>

    return <View style={myStyles.container}>
        <FlatList 
            data={comments}
            renderItem={({item})=> <GuestRating data={item}/>}
            keyExtractor={item=>item._id}
        />
    
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"flex-start",
        backgroundColor:Colors.backgroundColor,
        padding:10
    },
    messageContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Colors.backgroundColor,
        padding:10
    }
})