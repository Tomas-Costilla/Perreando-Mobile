import { memo } from "react"
import { StyleSheet, View } from "react-native"
import { List } from "react-native-paper"


const UbicationItem = ({name,handleData,navigation}) =>{

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

export default memo(UbicationItem)