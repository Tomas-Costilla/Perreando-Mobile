import {useState,useEffect, useRef} from "react"
import {Dimensions, FlatList, StyleSheet,View} from "react-native"
import {} from "react-native-paper"
import {Image} from "expo-image"
import ImageItemSlide from "./ImageItemSlide"
import { Colors } from "../tools/constant"
import Pagination from "./Pagination"

export default function ImageCarrousel({images}){

    const [indexDot,setIndexDot] = useState(0)

    const handleItemChange = useRef(({viewableItems})=>{
        setIndexDot(viewableItems[0].index)
    }).current;

    return <View style={myStyles.imageContainer}>
        <FlatList 
             data={images}
             renderItem={({item}) => <ImageItemSlide image={item.ImageUri}/>}
             horizontal
             pagingEnabled
             snapToAlignment="center"
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={myStyles.container}
             onViewableItemsChanged={handleItemChange}
           /*   onScroll={} */
        />
        {images && <Pagination data={images} indexDot={indexDot}/>}
    </View>
}

const myStyles = StyleSheet.create({
    imageContainer:{
       marginTop:10
    },
    container:{
       gap:10
    }
})
