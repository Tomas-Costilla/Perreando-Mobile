import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper"
import { Colors } from "../../tools/constant"
import InputView from "../../components/InputView"


export default function SelectUbication({navigation,route}){
    let {images} = route.params

    return <View style={myStyles.container}>
        <Text style={myStyles.title}>Selecciona tu ubicacion</Text>
        <InputView 
            editable={false}
            label="Provincia"
            nameField="state"
            value={route.params?.state}
        />
         <View style={{display:"flex",justifyContent:"center",flexDirection:"row",padding:10,marginBottom:10}}>
            <Button
                mode="outlined"
                labelStyle={{color:Colors.outlinedBtn}}
                onPress={()=>navigation.navigate("SelectState",{...route.params,screenBack:"SelectUbication"})}
                style={{width:250}}
            >
                Ver Provincias
            </Button>
        </View>

        <InputView 
            editable={false}
            label="Localidad"
            value={route.params?.town}
        />
       <View style={{display:"flex",justifyContent:"center",flexDirection:"row",padding:10,marginBottom:10}}>
       <Button
            mode="outlined"
            labelStyle={{color:Colors.outlinedBtn}}
            onPress={()=>navigation.navigate("SelectTown",{...route.params,screenBack:"SelectUbication"})}
            disabled={route.params?.state ? false : true}
            style={{width:250}}
        >
            Ver Localidades
        </Button>
       </View>

        <Button
            mode="contained"
            style={myStyles.btnContinue}
            disabled={route.params?.town ? false : true}
            onPress={()=> navigation.navigate("CreateHost",{...route.params})}
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
    btnContinue:{
        backgroundColor:Colors.principalBtn
    },
    title:{
        textAlign:"center",
        marginBottom:10,
        fontSize:17
    }
})