import {} from "react"
import { FlatList, Image, Linking, StyleSheet, View } from "react-native"
import { Avatar, Button, Card, Divider, IconButton, Text } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Colors } from "../tools/constant"
import ContactBtn from "./ContactBtn"
import ImageItemSlide from "./ImageItemSlide"
import ImageCarrousel from "./ImageCarrousel"

const PropertyCard = ({text,icon}) => {
    return <View style={myStyles.propertyContainer}>
        <Icon name={icon} size={30} style={{color: Colors.principal}}/>
        <Text>{text}</Text>
    </View>
}


export default function ItemSearch({data,navigation}){

    const handleContactBtn = () =>{
        Linking.openURL(`https://wa.me/${data.hostOwnerId.userPhone}?text=Hola!, estoy interesando en tu publicacion`)
    }

    return <Card style={myStyles.cardContainer} mode="contained">
        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
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
                /* style={myStyles.btnViewHost} */
                labelStyle={myStyles.btnViewHost}
                mode="text"
            >Ver Publicacion</Button>
        </View>
    </Card>
}

const myStyles = StyleSheet.create({
    UserInfoContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        padding:5,
        marginHorizontal:5,
        alignItems:"center",
        marginBottom:5
    },
    dataContainer:{
        marginHorizontal:10
    },
    titleName:{
        fontSize:14
    },
    titleHost:{
        fontSize:15,
        fontWeight:"bold",
        textAlign:"center",
        marginTop:5,
        marginBottom:5
    },
    propertyContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    contentContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:10,
        marginBottom:10    
    },
    cardContainer:{
        marginTop:10,
        marginBottom:10,
        backgroundColor:Colors.backgroundColor,
        padding:5,
        borderColor:"#CACACA",
        borderWidth:1
    },
    textCapacity:{
        textAlign:"center",
        marginTop:10,
        marginBottom:10
    },
    btnViewHost:{
        padding:3,
        color:Colors.principal
    }
})