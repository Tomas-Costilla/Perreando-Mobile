import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, HelperText, Text } from "react-native-paper"
import { Colors } from "../../tools/constant";
import InputView from "../../components/InputView";
import ErrorMessage from "../../components/ErrorMessage";


export default function UbicationSelect({navigation,route}){

    const {profile,photo} = route.params
    const [isError,setIsError] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")

    /* console.log(route.params); */

    const validateUbication = () =>{
        setIsError(false)
        setErrorMessage("")
        if(!route.params?.ubication){
            setIsError(true)
            setErrorMessage("Debes seleccionar la zona a donde perteneces")
            return
        }

        navigation.navigate("SignUp",{photo: photo,profile:profile,ubication: route.params.ubication})
    
    }

    return <View style={myStyles.container}>
        <Text style={myStyles.title}>Selecciona a que zona perteneces</Text>
        <InputView 
            editable={false}
            label="Zona"
            value="AMBA"     
            disabled={true}       
        />
        <HelperText type="info">Por el momento solo estamos disponibles en el "AMBA"</HelperText>
        <InputView 
            editable={false}
            label="Selecciona tu localidad"
            placeholder="No has seleccionado ningun valor"
            value={typeof route.params.ubication !== 'undefined' ? route.params.ubication : ""}
        />
         {isError && <HelperText type="error">{errorMessage}</HelperText>}
       <View style={myStyles.btnContainer}>
       <Button
            mode="contained"
            onPress={()=>navigation.navigate("UbicationSearch",{...route.params,screenBack: "UbicationSelect"})}
            style={myStyles.btnUbication}
            icon="map-marker"
        >
            Ver localidades
        </Button>

        <Button
            mode="contained"
            /* onPress={()=>navigation.navigate("SignUp",{photo: photo,profile:profile,ubication: route.params.ubication})} */
            onPress={validateUbication}
            style={myStyles.btnNext}
        >
            Continuar
        </Button>
       </View>


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
        marginBottom:10
    },
    btnContainer:{
        display:"flex",
        justifyContent:"center",
        flexDirection:"column",
        alignItems:"center",
        gap:10,
        padding:10,
        marginTop:10
    },
    btnUbication:{
        borderRadius:10,
        backgroundColor:Colors.principal,
        padding:3,
        width:200
    },
    btnNext:{
        borderRadius:10,
        backgroundColor:Colors.principal,
        padding:3,
        width:250
    }
})

