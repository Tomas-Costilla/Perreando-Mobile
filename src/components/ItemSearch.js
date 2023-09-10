import {} from "react"
import { StyleSheet, View } from "react-native"
import { Avatar, Button, Card, Text } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Colors } from "../tools/constant"
import ContactBtn from "./ContactBtn"

const PropertyCard = ({text,icon}) => {
    return <View style={myStyles.propertyContainer}>
        <Icon name={icon} size={30} style={{color: Colors.principal}}/>
        <Text>{text}</Text>
    </View>
}

const UserAvatar = () => <Avatar.Icon size={35} icon="account" style={{backgroundColor:Colors.principal}}/>

export default function ItemSearch({data,navigation}){

    return <Card style={myStyles.cardContainer} mode="elevated">
        <Card.Title title={data.hostOwnerId.userFullName} subtitle={data.hostDescription} left={UserAvatar}/>
        <Card.Cover source={{uri: data.imageUri }}/>
        <Card.Content>
            <View style={myStyles.contentContainer}>
                <PropertyCard text={data.hostLocation} icon="map-marker-outline"/>
                <PropertyCard text={data.hostOwnerCapacity} icon="paw"/>
                <PropertyCard text={data.hostPrice} icon="currency-usd"/>
            </View>
            {data.hostGuests.length < data.hostOwnerCapacity
            ? <Text style={myStyles.textCapacity}>Hay lugar disponible!</Text>
            : <Text style={myStyles.textCapacity}>No hay mas lugar disponible</Text>}
        </Card.Content>
        <Card.Actions>
            <ContactBtn phone={data.hostOwnerId.userPhone} message="Hola!, estoy interesado en tu publicacion"/>
            <Button 
                icon="eye"
                onPress={()=>navigation.navigate("ViewHost",{hostId: data._id})}
                style={myStyles.btnViewHost}
            >Ver Publicacion</Button>
        </Card.Actions>
    </Card>
}

const myStyles = StyleSheet.create({
    container:{

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
        padding:5
    },
    textCapacity:{
        textAlign:"center",
        marginTop:10,
        marginBottom:10
    },
    btnViewHost:{
        padding:3,
        borderRadius:10,
        backgroundColor:Colors.principal
    }
})