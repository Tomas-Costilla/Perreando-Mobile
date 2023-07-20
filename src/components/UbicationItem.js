import {} from "react"
import { StyleSheet, View } from "react-native"
import { List } from "react-native-paper"


export default function UbicationItem({name,handleData,navigation}){

    return <View>
        <List.Item 
            title={name}
           /*  description="descirption item" */
            left={()=><List.Icon icon="map-marker-outline"/>}
            onPress={()=>handleData(name)}
        />
    </View>
}

const myStyles = StyleSheet.create({
    container:{

    }
})