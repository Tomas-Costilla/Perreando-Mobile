import {useState} from "react"
import {StyleSheet,View} from "react-native"
import { IconButton , Text} from "react-native-paper"

export default function SetRating({handleStar,defaultStar}){

    const [stars,setStars] = useState([1,2,3,4,5])


    return <View style={myStyles.container}>
        {stars.map((value,index)=><>
            <IconButton key={index} 
                icon={value <= defaultStar ? "star" : "star-outline"} 
                mode="" 
                iconColor="#FFCD00"
                onPress={()=>handleStar(value)}/>
        </>)}
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start"
    }
})