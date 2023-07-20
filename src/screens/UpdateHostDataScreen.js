import {} from "react"
import { KeyboardAvoidingView, StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Button, Text } from "react-native-paper"
import { Colors } from "../tools/constant"
import InputView from "../components/InputView"


export default function UpdateHostDataScreen({}){
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={myStyles.container}>
         <ScrollView /* style={myStyles.container} */>
            {/* <View style={myStyles.container}> */}
                <Text style={myStyles.title}>Modificar datos de alojamiento</Text>
                <InputView 
                    editable={true}
                    label="Modificar nombre descriptivo"
                />
                <InputView 
                    editable={true}
                    label="Modificar capacidad maxima"
                />
                <InputView 
                    editable={true}
                    label="Modificar costo de estadia"
                />
                <View style={myStyles.btnContainer}>
                    <Button mode="contained" onPress={()=>console.log("modificar")}>Confirmar cambios</Button>
                </View>
          {/*   </View> */}
         </ScrollView>
    </KeyboardAvoidingView> 
    )

}

const myStyles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:Colors.backgroundColor,
        flex:1
    },
    title:{
        textAlign:"center",
        marginTop:10,
        marginBottom:10
    },
    btnContainer:{
        padding:10,
        display:"flex",
        justifyContent:"center",
        flexDirection:"row"
    }
})