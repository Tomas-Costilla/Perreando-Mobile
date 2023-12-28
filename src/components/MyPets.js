import {useEffect,useState} from "react"
import { StyleSheet, TouchableHighlight, View } from "react-native"
import {Button, Text, Divider, IconButton} from "react-native-paper"
import { Colors } from "../tools/constant"
import IconProperty from "./IconProperty"
import { server } from "../api/server"
import Loading from "./Loading"
import Message from "./Message"
import { Image } from "expo-image"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import SinMascota from "../../assets/sinMascota.gif"



const MyPetsList = ({mypets}) =>{
    return <View style={myStyles.petsContainer}>
        {mypets.map((item,index)=>(<View key={index} style={myStyles.petsItemContainer}>
                <Image source={{uri: item.petImageUrl}}  style={myStyles.petImage}/>
                <Text style={myStyles.petNameStyle}>{item.petName}</Text>
            </View>))} 
    </View>
}

export default function MyPets({storeUser}){
    
    const [errorServer,setErrorServer] = useState("")
    const [loading,setLoading] = useState(false)
    const [mypets,setMyPets] = useState([])
    const isFocused = useIsFocused()
    const navigation = useNavigation()

    const getMyPets = async () =>{
        setLoading(true)
        try {
            let response = await server.get(`/pet/owner/${storeUser._id}`)
            setMyPets(response.data.newPetsDataWithImageUrl)
        } catch (error) {
            if(error.response.data?.isLogged===false) navigation.navigate("SessionOut")
            if(error.response.data?.message) setErrorServer(error.response.data?.message)
            else setErrorServer("Ocurrio un error en la peticion")
        }
        setLoading(false)
    }

    useEffect(()=>{
        getMyPets()
    },[isFocused])

    return <View style={myStyles.mypetsContainer}>
        <View style={myStyles.titleContainer}>
            <IconProperty iconName="paw" iconSize={30} text="Mis mascotas"/>
            <IconButton 
                icon="pencil"
                size={25}
                onPress={()=>navigation.navigate("MyPets")}
            />
        </View>
        {errorServer ? <Message msg={errorServer} type="error"/>
        : loading ? <View style={{padding:10}}><Loading/></View>
        : mypets.length ? <MyPetsList mypets={mypets}/> : <View style={myStyles.notPetsContainer}> 
            <Image source={SinMascota} style={myStyles.notPetStyle}/>
            <Text style={myStyles.notPetsTitle}>Aun no tienes mascotas ingresadas</Text>   
        </View>}

            <View style={myStyles.addPetContainer}>
                <Button
                    mode="outlined"
                    labelStyle={{color:Colors.textColor}}
                    icon="paw"
                    style={myStyles.btnAddPet}
                    onPress={()=>navigation.navigate("AddPet")}
                >Agregar mascota</Button> 
            </View>
    </View>
}

const myStyles = StyleSheet.create({
    mypetsContainer:{
        backgroundColor:Colors.backgroundColor,
        borderRadius:10,
        borderWidth:1,
        borderColor:Colors.borderColor,
        padding:10,
        marginBottom:20
    },
    titleContainer:{
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center",
        marginTop:10,
        marginBottom:10
    },
    btnAllPets:{
        width:120
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
    petsContainer:{
        display:"flex",
        justifyContent:"flex-start",
        flexDirection:"row",
        flexWrap:"wrap",
        gap:5
    },
    petsItemContainer:{
        marginTop:10,
        marginBottom:10,
        display:"flex",
        justifyContent:"center",
        flexDirection:"column",
        alignItems:"center",
        padding:10,
        borderWidth:1,
        borderColor:"#E2E2E2",
        borderRadius:10,
        gap:5
    },
    petImage:{
        width:60,
        height:60,
        borderRadius:10
    },
    petNameStyle:{
        fontSize:15
    },
    addPetContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    },
    btnAddPet:{
        marginTop:10,
        marginBottom:10,
        width:250
    },
    notPetStyle:{
        width:100,
        height:100
    }
})