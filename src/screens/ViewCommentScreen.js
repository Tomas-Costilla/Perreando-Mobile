import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Divider, Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import Loading from "../components/Loading"
import MessageServer from "../components/MessageServer"
import { server } from "../api/server"
import Message from "../components/Message"
import { useIsFocused } from "@react-navigation/native"


export default function ViewCommentScreen({navigation,route}){

    const [loadingServer,setLoadingServer] = useState(false)
    const [messageServer,setMessageServer] = useState("")
    const [errorDelete,setErrorDelete] = useState("")
    const [comment,setComment] = useState({})
    const [loading,setLoading] = useState(false)
    const isFocused = useIsFocused()

    const getMyRatingInfo = async () =>{
        setLoadingServer(true)
        setMessageServer("")
        try {
            let {data} = await server.get(`/rating/${route.params.ratingId}`)
            setComment(data.result)
        } catch (error) {
            if(error.response.data?.isLogged===false){
                navigation.navigate("SessionOut")
                return
            }

            if(error.response.data?.message) setMessageServer(error.response.data?.message)
            else setMessageServer("Ocurrio un error en la peticion")
        }
        setLoadingServer(false)
    }

    const deleteMyRating = async () =>{
        setLoading(true)
        setErrorDelete("")
        try {
            await server.delete(`/rating/${route.params.ratingId}`)
            navigation.navigate("Account")
        } catch (error) {
            if(error.response.data?.isLogged===false){
                navigation.navigate("SessionOut")
                return
            }
            if(error.response.data?.message) setErrorDelete(error.response.data?.message)
            else setErrorDelete("Ocurrio un error al querer eliminar el comentario")
        }
        setLoading(false)
    }

    useEffect(()=>{
        getMyRatingInfo()
    },[isFocused])

    if(loadingServer) return <Loading />

    if(messageServer) return <MessageServer msg={messageServer}/>

    return <View style={myStyles.container}>
       <View style={myStyles.infoContainer}>
            <Text style={myStyles.title}>Tu comentario</Text>
            <Text style={myStyles.commentStyle}>{comment.hostGuestComment}</Text>
            <Text>{`Cantidad de estrellas: ${comment.hostGuestRating}`}</Text>
            {errorDelete && <Message msg={errorDelete} type="error"/>}
            <View style={myStyles.btnContainer}>
                <Button
                    mode="contained"
                    onPress={deleteMyRating}
                    loading={loading}
                    style={myStyles.btnDelete}
                    labelStyle={{color:"#FFFFFF"}}
                    icon="delete"
                >
                    Eliminar
                </Button>
                <Button
                    mode="outlined"
                    onPress={()=>navigation.navigate("UpdateComment",{comment: comment})}
                    style={myStyles.btnUpdateStyle}
                    labelStyle={{color:Colors.textColor}}
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
        backgroundColor:Colors.backgroundGrey,
        padding:10
    },
    infoContainer:{
        borderRadius:10,
        borderWidth:0.5,
        padding:10,
        borderColor:Colors.borderColor,
        backgroundColor:Colors.backgroundColor
    },
    btnUpdateStyle:{
        padding:3,
        marginTop:10
    },
    btnDelete:{
        padding:3,
        backgroundColor:Colors.errorColor,
        marginTop:10,
        borderColor:"#000000"
    },
    btnContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        marginTop:10
    },
    title:{
        textAlign:"center",
        fontSize:16,
        marginTop:10,
        marginBottom:20
    },
    commentStyle:{
     fontSize:14   
    }
})