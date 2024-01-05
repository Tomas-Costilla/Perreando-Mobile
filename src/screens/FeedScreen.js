import { useEffect, useState } from "react"
import {View,StyleSheet, FlatList, RefreshControl} from "react-native"
import { Divider, Text } from "react-native-paper"
import { server } from "../api/server"
import { Colors } from "../tools/constant"
import Loading from "../components/Loading"
import Message from "../components/Message"
import ItemSearch from "../components/ItemSearch"
import LottieView from "lottie-react-native"
import { useIsFocused } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const FeedScreen = ({navigation}) =>{

    const [loading,setLoading] = useState(false)
    const [errorServer,setErrorServer] = useState("")
    const [errorType,setErrorType] = useState("")
    const [data,setData] = useState([])
    const [refresh,setRefresh] = useState(false)
    const isFocused = useIsFocused()

    const onRefreshControl = () =>{
        setRefresh(true)
        loadHostResult()
        setRefresh(false)
    }

    const loadHostResult = async () =>{
        setLoading(true)
        setErrorServer("")
        try {
            let {data} = await server.get("/host/search") 
            setData(data.result)
        } catch (error) {
            if(!error.response.data?.isLogged){
                navigation.navigate("SessionOut")
                return
            }
            if(error.response.data?.message) setErrorServer(error.response.data?.message)
            else setErrorServer("Ocurrio un error en la peticion")
        }
        setLoading(false)
    }

    useEffect(()=>{
        loadHostResult()
    },[isFocused])

    if(loading) return <Loading />

    

    return <View style={myStyles.container}>
        <Text style={{textAlign:"center",fontSize:20,marginBottom:14}}>Hospedajes</Text>
        {errorServer ? <Message msg={errorServer} type="error"/>
        : data.length>0? <FlatList 
        data={data}
        renderItem={({item}) => <ItemSearch data={item} navigation={navigation}/>}
        keyExtractor={item=>item._id}
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefreshControl}/>}
    /> : <View style={myStyles.notData}>
            <Text>¡Aun no hay hospedajes!</Text>
            <LottieView source={require("../../assets/animations/notDataAnimation.json")} autoPlay loop style={{width:300,height:300}}/>
        </View> }
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        /* justifyContent:"flex-start", */
       /*  alignItems:"flex-start", */
        backgroundColor:Colors.backgroundGrey,
        padding:10
    },
    notData:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    ratingContainer:{
        borderColor:Colors.borderColor,
        borderWidth:1,
        borderRadius:10,
        padding:5,
        backgroundColor:Colors.subColor,
        marginTop:10
    }
})

export default FeedScreen;