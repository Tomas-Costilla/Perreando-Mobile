import {} from "react"
import { StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"
import Icon from "react-native-vector-icons/FontAwesome"


export default function CameraOptions({navigation,handleCamera,flipCamera,takePicture}){

    const handleCameraStart = () =>{
        handleCamera()
        navigation.setParams({displayHeader: true})
    }

    return<View style={myStyles.container}>
        <View style={myStyles.btnContainer}>
            <Button 
                mode="text" 
                onPress={handleCameraStart}
                icon="close-circle"
                labelStyle={myStyles.btnStyle}
                compact
            />
            <Button 
                mode="text"
                icon="camera"
                labelStyle={myStyles.btnStyle}
                onPress={takePicture}
                compact
            />
            <Button 
                mode="text"
                icon="camera-flip"
                labelStyle={myStyles.btnStyle}
                onPress={()=>flipCamera()}
                compact
            />
        </View>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        display:"flex",
        justifyContent:"flex-end",
        flexDirection:"column",
        padding:10,
        gap:10
    },
    btnContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        gap:10,
        padding:10
    },
    closeStyle:{
        fontSize:29
    },
    btnStyle:{
        color:"#FFFFFF",
        fontSize:35,
        textAlign:"center"
    }
})