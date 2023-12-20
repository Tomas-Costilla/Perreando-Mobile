import {useEffect,useState} from "react"
import { StyleSheet, View } from "react-native"
import {Button, Text, Divider, IconButton} from "react-native-paper"
import { Colors } from "../tools/constant"
import IconProperty from "./IconProperty"
import { server } from "../api/server"
import Loading from "./Loading"
import Message from "./Message"
import { Image } from "expo-image"



const MyPetsList = ({mypets}) =>{
    return mypets.map((item,index)=>(<View key={index} style={myStyles.petsItemContainer}>
        <View style={{display:"flex",justifyContent:"flex-start",alignItems:"center",gap:10,flexDirection:"row"}}>
            <Image source={{uri: item.petImageUrl}}  style={myStyles.petImage}/>
            <Text style={myStyles.petNameStyle}>{item.petName}</Text>
        </View>
        <IconButton icon="chevron-right" size={30}/>
    </View>))
}

export default function MyPets({storeUser}){
    
    const [errorServer,setErrorServer] = useState("")
    const [loading,setLoading] = useState(false)
    const [mypets,setMyPets] = useState([])

    const getMyPets = async () =>{
        setLoading(true)
        try {
            let response = await server.get(`/pet/owner/${storeUser._id}`)
            setMyPets(response.data.newPetsDataWithImageUrl)
        } catch (error) {
            if(error.response.data?.message) setErrorServer(error.response.data?.message)
            else setErrorServer("Ocurrio un error en la peticion")
        }
        setLoading(false)
    }

    useEffect(()=>{
        getMyPets()
    },[])

    return <View style={{marginTop:10}}>
        <View style={myStyles.titleContainer}>
            <IconProperty iconName="paw" iconSize={30} text="Mis mascotas"/>
            <Button
                mode="contained"
                onPress={()=>console.log("Ver todas las mascotas")}
                style={myStyles.btnAllPets}
            >Ver todas</Button>
        </View>
        <Divider />
        {errorServer ? <Message msg={errorServer} type="error"/>
        : loading ? <View style={{padding:10}}><Loading/></View>
        : mypets.length ? <MyPetsList mypets={mypets}/> : <View style={myStyles.notPetsContainer}> 
            <Text style={myStyles.notPetsTitle}>Aun no tienes mascotas ingresadas</Text>
            <Button
                mode="outlined"
                labelStyle={{color:Colors.textColor}}
                icon="paw"
            >Agregar mascota</Button>    
        </View>}

    </View>
}

const myStyles = StyleSheet.create({
    titleContainer:{
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center",
        marginTop:10,
        marginBottom:10
    },
    btnAllPets:{
        backgroundColor:Colors.principalBtn
    },
    notPetsContainer:{
        padding:10,
        gap:10,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    notPetsTitle:{
        fontSize:13,
        color:"#959595"
    },
    petsItemContainer:{
        marginTop:10,
        marginBottom:10,
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center",
        padding:10,
        borderWidth:1,
        borderColor:"#E2E2E2",
        borderRadius:10
    },
    petImage:{
        width:60,
        height:60,
        borderRadius:50
    },
    petNameStyle:{
        fontSize:15
    }
})