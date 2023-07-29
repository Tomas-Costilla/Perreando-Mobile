import {} from "react"
import { StyleSheet, View } from "react-native"
import { Button, HelperText, Text } from "react-native-paper"
import { Colors } from "../../tools/constant";
import InputView from "../../components/InputView";


export default function UbicationSelect({navigation,route}){

    const {profile,photo} = route.params

    /* console.log(route.params); */

    return <View style={myStyles.container}>
        <Text style={myStyles.title}>Selecciona a que zona perteneces</Text>
        <InputView 
            editable={false}
            label="Provincia"
            value="Buenos Aires"     
            disabled={true}       
        />
        <HelperText type="info">Por el momento solo estamos disponibles en "CABA"</HelperText>
        <InputView 
            editable={false}
            label="Selecciona tu localidad"
            placeholder="No has seleccionado ningun valor"
            value={typeof route.params.ubication !== 'undefined' ? route.params.ubication : ""}
        />
        <Button
            mode="contained"
            onPress={()=>navigation.navigate("UbicationSearch",{...route.params,screenBack: "UbicationSelect"})}
        >
            Ver localidades
        </Button>

        <Button
            mode="contained"
            onPress={()=>navigation.navigate("SignUp",{photo: photo,profile:profile,ubication: route.params.ubication})}
        >
            Continuar
        </Button>
    
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
    }
})

