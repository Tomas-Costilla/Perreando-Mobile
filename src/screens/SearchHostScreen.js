import { useState } from "react"
import { KeyboardAvoidingView, StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import InputView from "../components/InputView"

export default function SearchHostScreen({navigation,route}){

    return <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={myStyles.container}>
            <Text style={myStyles.title}>Realizar busqueda de alojamiento</Text>
            <InputView 
                editable={false}
                label="Zona por defecto"
                value="CABA"
            />
            <InputView 
                editable={false}
                label="Selecciona una localidad"
                value={typeof route.params !== 'undefined' ? route.params.ubi : ""}
                placeholder="Aun no has seleccionado ningun valor..."
            />
            <View style={myStyles.btnUbications}>
                <Button
                    mode="outlined"
                    onPress={()=>navigation.navigate("UbicationSearch")}
                    icon="map-marker-outline"
                >
                    Ver Localidades
                </Button>
            </View>

            <View style={myStyles.btnSearchContainer}>
                   <Button
                        mode="contained"
                        onPress={()=>navigation.navigate("SearchResult")}
                        style={myStyles.btnSearch}
                        icon="magnify"
                   >
                        Realizar busqueda
                    </Button> 
            </View>
     
    </KeyboardAvoidingView>
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
        marginBottom:10
    },
    btnUbications:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
    },
    btnSearchContainer:{
        display:"flex",
        justifyContent:"center",
        flexDirection:"row",
        marginTop:10,
        marginBottom:10
    },
    btnSearch:{
        width:250
    }
})