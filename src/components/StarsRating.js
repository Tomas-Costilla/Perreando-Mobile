import { useEffect, useState } from "react"
import {StyleSheet,View} from "react-native"
import {} from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"


export default function StarsRating({numberofStars,sizeStar}){

    const [stars,setStars] = useState([])

    const setNumberofStars = () =>{
        if(numberofStars === 1) setStars([1])
        if(numberofStars === 2) setStars([1,2])
        if(numberofStars === 3) setStars([1,2,3])
        if(numberofStars === 4) setStars([1,2,3,4,5])
        if(numberofStars === 5) setStars([1,2,3,4,5])
    }

    useEffect(()=>{
        setNumberofStars()
    },[numberofStars])

    return <View style={myStyles.container}>
        {stars.map((val,index)=><Icon key={index} name="star" size={sizeStar} style={{color:"#FFCD00"}}/>)}
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        display:"flex",
        justifyContent:"flex-start",
        flexDirection:"row"
    }
})


/* 

: numberofStars === 3 ? [1,2,3].map((val,index)=> <Icon key={index} name="stars" size={sizeStar}/>)
        :numberofStars === 4 ? [1,2,3,4].map((val,index)=> <Icon key={index} name="stars" size={sizeStar}/>
        : numberofStars === 5 ? [1,2,3,4,5].map((val,index)=> <Icon key={index} name="stars" size={sizeStar}/>
*/