import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Divider, Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import Loading from "../components/Loading"
import MessageServer from "../components/MessageServer"
import { server } from "../api/server"


export default function ViewCommentScreen({navigation,route}){

    const [loadingServer,setLoadingServer] = useState(false)
    const [messageServer,setMessageServer] = useState("")
    const [comment,setComment] = useState({})
    const [loading,setLoading] = useState(false)

    const getMyRatingInfo = async () =>{
        setLoadingServer(true)
        setMessageServer("")
        try {
            let response = await server.get(`/rating/${route.params.ratingId}`)
            setComment(response.data.result)
        } catch (error) {
            setMessageServer(error.response.data)
        }
        setLoadingServer(false)
    }

    const deleteMyRating = async () =>{
        setLoading(true)
        try {
            await server.delete(`/rating/${route.params.ratingId}`)
            navigation.navigate("Account")
        } catch (error) {
            console.log(error.message)
        }
        setLoading(false)
    }

    useEffect(()=>{
        getMyRatingInfo()
    },[])

    if(loadingServer) return <Loading />

    if(messageServer) return <MessageServer msg={messageServer}/>

    return <View style={myStyles.container}>
       <View style={myStyles.infoContainer}>
            <Text>Tu comentario</Text>
            <Text>{comment.hostGuestComment}</Text>
            <Text>{`Cantidad de estrellas: ${comment.hostGuestRating}`}</Text>
            <View style={myStyles.btnContainer}>
                <Button
                    mode="outlined"
                    onPress={deleteMyRating}
                    loading={loading}
                    style={myStyles.btnDelete}
                    labelStyle={{color:"#000000"}}
                    icon="delete"
                >
                    Eliminar
                </Button>
                <Button
                    mode="contained"
                    onPress={()=>navigation.navigate("UpdateComment",{comment: comment})}
                    style={myStyles.btnUpdateStyle}
                    icon="pencil"
                >
                    Actualizar
                </Button>
            </View>
       </View>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"flex-start",
        backgroundColor:Colors.backgroundColor,
        padding:10
    },
    infoContainer:{
        borderRadius:10,
        borderWidth:0.5,
        padding:10,
        borderColor:"#CACACA"
    },
    btnUpdateStyle:{
        borderRadius:10,
        padding:3,
        backgroundColor:Colors.principal,
        marginTop:10
    },
    btnDelete:{
        borderRadius:10,
        padding:3,
        backgroundColor:Colors.backgroundColor,
        marginTop:10,
        borderColor:"#000000"
    },
    btnContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        marginTop:10
    }
})