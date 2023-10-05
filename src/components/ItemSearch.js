import {} from "react"
import { FlatList, Image, Linking, StyleSheet, TouchableHighlight, View } from "react-native"
import { Avatar, Button, Card, Divider, IconButton, Text } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Colors } from "../tools/constant"
import ContactBtn from "./ContactBtn"
import ImageItemSlide from "./ImageItemSlide"
import ImageCarrousel from "./ImageCarrousel"

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
    style={{borderRadius:10,height:185,marginBottom:10}}>
        <View style={myStyles.cardContainer}>
            <View style={myStyles.infoContainer}>
               <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:230,alignItems:"center"}}>
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
            <Image source={{uri: data?.hostImages[0].ImageUri}} style={myStyles.imageHost} />
       </View>
    </TouchableHighlight>
}

const myStyles = StyleSheet.create({
    cardContainer:{
        borderWidth:0.5,
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        borderTopRightRadius:6,
        borderBottomEndRadius:6,
        marginBottom:10,
        height:185,
        backgroundColor:Colors.backgroundColor,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    infoContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between"
    },
    imageHost:{
        width:150,
        height:'100%',
        borderTopRightRadius:5,
   /*      borderBottomEndRadius:5 */
    },
    propertyContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:5
    },
    avatarContainer:{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row",
        gap:5,
        padding:5
    },
    detailContainer:{
        padding:5,
        gap:10
    },
    averageContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Colors.principal,
        padding:4,
        borderRadius:5,
        width:50,
        gap:5
    },
    iconsContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        gap:5
    }
})


/* 
 {/* <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
            <View style={myStyles.UserInfoContainer}>
                <Avatar.Image size={48} source={{uri: data.imageUri}}/>
                <View style={myStyles.dataContainer}>
                    <Text style={myStyles.titleName}>{data.hostOwnerId?.userFullName}</Text>
                </View>
            </View>
        </View>
        <Divider />
        <ImageCarrousel images={data?.hostImages}/>
        <Card.Content>
            <Text style={myStyles.titleHost}>{data.hostDescription}</Text>
            <View style={myStyles.contentContainer}>
                <IconButton icon="message-text-outline" size={30} onPress={handleContactBtn}/>
                <PropertyCard text={data.hostOwnerCapacity} icon="paw"/>
                <PropertyCard text={data.hostPrice} icon="currency-usd"/>
            </View>

        </Card.Content>
        <View style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:10,padding:10}}>
            <Button 
                icon="eye"
                onPress={()=>navigation.navigate("ViewHost",{hostId: data._id})}
                labelStyle={myStyles.btnViewHost}
                mode="text"
            >Ver Publicacion</Button>
        </View> 


*/