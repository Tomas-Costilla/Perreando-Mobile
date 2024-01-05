import {useState,useEffect, useRef} from "react"
import {Dimensions, FlatList, StyleSheet,View} from "react-native"
import {} from "react-native-paper"
import {Image} from "expo-image"
import ImageItemSlide from "./ImageItemSlide"
import { Colors } from "../tools/constant"
import Pagination from "./Pagination"
import { Carousel } from "react-native-ui-lib"
import Loading from "./Loading"

export default function ImageCarrousel({images}){


    return <>
        {images && images.length > 0 ? <Carousel
        key={7}
        animated
        showCounter
        >
            {images.map((item,index)=> <View style={{display:"flex",justifyContent:"center",flexDirection:"row",alignItems:"center",padding:10}}> 
                <Image key={index} source={item.ImageUri} style={{width:300,height:300}}/>
            </View>)}
        </Carousel> : <Loading />}
    </>
}

const myStyles = StyleSheet.create({
    imageContainer:{
       marginTop:10
    },
    container:{
       gap:10
    }
})


/* 

<View style={myStyles.imageContainer}>
        <FlatList 
             data={images}
             renderItem={({item}) => <ImageItemSlide image={item.ImageUri}/>}
             horizontal
             pagingEnabled
             snapToAlignment="center"
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={myStyles.container}
             onViewableItemsChanged={handleItemChange}
           
        />
        {images && <Pagination data={images} indexDot={indexDot}/>}
    </View>
 */