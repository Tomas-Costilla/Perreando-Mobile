import {} from "react"
import { FlatList, Linking, StyleSheet, TouchableHighlight, View } from "react-native"
import { Avatar, Button, Card, Divider, IconButton, Text } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Colors } from "../tools/constant"
import ContactBtn from "./ContactBtn"
import ImageItemSlide from "./ImageItemSlide"
import ImageCarrousel from "./ImageCarrousel"
import NoPhoto from "../../assets/nophoto.png"
import {Image} from "expo-image"
import IconProperty from "./IconProperty"

const PropertyCard = ({text,icon}) => {
    return <View style={myStyles.propertyContainer}>
        <Icon name={icon} size={25} style={{color: Colors.principal}}/>
        <Text>{text}</Text>
    </View>
}


export default function ItemSearch({data,navigation}){

    const handleContactBtn = () =>{
        Linking.openURL(`https://wa.me/${data.hostOwnerId.userPhone}?text=Hola!, estoy interesando en tu publicacion`)
    }

    return <TouchableHighlight onPress={()=>navigation.navigate("ViewHost",{hostId: data._id})}  activeOpacity={0.8}
    underlayColor="#DDDDDD"
    style={{borderRadius:10,height:250,marginBottom:10}}>
        <View style={myStyles.cardContainer}>
            <View style={myStyles.imageContainer}>
                <Image source={{uri: data.hostImages[0].ImageUri}} style={myStyles.hostImageStyle}/>
            </View>

            <View style={myStyles.infoContainer}>
                <View style={myStyles.avatarContainer}>
                    <Avatar.Image size={35} source={{uri: data.imageUri}}/>
                    <Text style={{color: "#000000",fontWeight:"bold",fontSize:11}}>{data.hostDescription}</Text>
                </View>
                <View style={myStyles.ratingContainer}>
                    <Icon name="star" size={20} color="#FFFFFF"/>
                    <Text>0</Text>
                </View>
                <IconProperty iconName="map-marker-outline" iconSize={20} text={`${data.hostState} - ${data.hostCity}`} color="#8C8C8C"/>
                <IconProperty iconName="account-group-outline" iconSize={20} text={`${data.activeGuests} huespedes activos`} color="#8C8C8C"/>
                <IconProperty iconName="comment-outline" iconSize={20} text={`0 comentarios`} color="#8C8C8C"/>
                <Text style={myStyles.priceStyle}>$ {data.hostPrice} / dia</Text>
                <Text style={myStyles.createdDate}>Fecha publicacion: {data.hostCreatedAt}</Text>
            </View>

            <View style={myStyles.moreDetailsContainer}>
                <IconButton icon="chevron-right" size={30} iconColor="#8C8C8C"/>
            </View>           
       </View>
    </TouchableHighlight>
}

const myStyles = StyleSheet.create({
    cardContainer:{
        borderWidth:0.6,
        borderRadius:10,
        marginBottom:10,
        borderColor:Colors.borderColor,
        height:250,
        backgroundColor:Colors.backgroundColor,
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        padding:5,
        gap:10
    },
    imageContainer:{

    },
    infoContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        gap:10
    },
    moreDetailsContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center"
    },
    hostImageStyle:{
        width:139,
        height:240,
        borderRadius:5
    },
    avatarContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:5
    },
    ratingContainer:{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row",
        gap:5,
        backgroundColor:Colors.subColor,
        padding:5,
        borderRadius:10
    },
    priceStyle:{
        fontWeight:"bold",
        fontSize:25
    },
    createdDate:{
        color:"#8C8C8C",
        fontSize:10
    }
    
})


/* 
  <View style={myStyles.infoContainer}>
               <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:230,alignItems:"center",padding:5}}>
                    <View style={myStyles.avatarContainer}>
                            <Avatar.Image size={30} source={{uri: data.imageUri}}/>
                            <Text style={{color: "#868686",fontWeight:"bold",fontSize:10}}>{data.hostOwnerId?.userFullName}</Text>
                    </View>
                    <View style={myStyles.averageContainer}>
                        <Icon name="star-box-outline" size={20} color="#FFFFFF"/>
                        <Text style={{fontSize:12,color:"#FFFFFF"}}>{data.averageRating}</Text>
                    </View>
               </View>

                <View style={myStyles.detailContainer}>
                    <Text style={{fontWeight:"bold",fontSize:15}}>{data.hostDescription}</Text>
                    <Text style={{fontWeight:"bold",fontSize:25,color:"#149200"}}>${data.hostPrice}</Text>
                </View>

                <View style={myStyles.iconsContainer}>
                    <IconButton icon="message-text-outline" size={25} onPress={handleContactBtn}/>
                    <PropertyCard text={data.hostOwnerCapacity} icon="paw"/>
                    <PropertyCard text={data.activeGuests} icon="account-group"/>
                </View>
            </View>
            
            {data?.hostImages.length > 0 
                ?<Image source={{uri: data?.hostImages[0].ImageUri}} style={myStyles.imageHost}/> 
                :<View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Image source={NoPhoto} style={myStyles.noImageStyle}/>            
                </View> }

*/