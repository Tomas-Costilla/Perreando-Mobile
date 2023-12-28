import { useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { List, Searchbar, Text } from "react-native-paper"
import { Colors } from "../../tools/constant"
import Message from "../../components/Message"
import Loading from "../../components/Loading"
import { server } from "../../api/server"


export default function SelectTown({navigation,route}){
    const [loading,setLoading] = useState(false)
    const [errorServer,setErrorServer] = useState("")
    const [townData,setTownData] = useState([])
    const [prevTownData,setPrevTownData] = useState([])

    /* console.log(route.params) */

    const handleTownData = (town) => {
        navigation.navigate(route.params.screenBack, {
          ...route.params,
          town:town
        });
      };

    const handleSearchData = value => {
        if(!value) setTownData(prevTownData)
        else{
            let regex = new RegExp(value,'i')
            let newTownData = townData.filter(item=> regex.test(item.nombre))
            setTownData(newTownData)
        }
    }

    const getAllTowns = async () =>{
        setLoading(true)
        setErrorServer("")
        try {
            let response = await server.get(`/user/ubications/${route.params.state}`)
            setTownData(response.data.resultado)
            setPrevTownData(response.data.resultado)
        } catch (error) {
            /* if(error.response.data?.isLogged===false) navigation.navigate("SessionOut") */
            if(error.response.data?.message) setErrorServer(error.response.data?.message)
            else setErrorServer("Ocurrio un error en la peticion")
        }
        setLoading(false)
    }

    useEffect(()=>{
        getAllTowns()
    },[])

    return <View style={myStyles.container}>
        <Text style={myStyles.title}>Selecciona la localidad a la que perteneces</Text>
        <Searchbar 
            placeholder="Buscar localidad..."
            onChangeText={value=>handleSearchData(value)}
            style={{marginTop:10,marginBottom:10,backgroundColor:Colors.subColor}}
        />
        {errorServer ? <Message msg={errorServer} type="error"/>
        : loading ? <Loading />
        : townData.length>0 && <FlatList 
            data={townData}
            renderItem={({ item }) => (
                <List.Item
                  title={item.nombre}
                  onPress={() => handleTownData(item.nombre)}
                  left={props => <List.Icon {...props} icon="map-marker-outline"/>}
                />
              )}
              keyExtractor={(item) => item.id}
            />}
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.backgroundColor,
        padding:10
    },
    title:{
        textAlign:"center",
        marginTop:10,
        marginBottom:10,
        fontSize:15
    }
})