import {} from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import ItemImage from "../../assets/itemreserva.png";
import BookingState from "./BookingState";
import { Colors } from "../tools/constant";
import IconProperty from "./IconProperty";

export default function BookingItem({ navigation, data }) {
  return (
    <View style={myStyles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Text style={{ color: "#AFAFAF" }}>{data.bookingCreatedAt}</Text>
      </View>
      <View style={myStyles.containerInfo}>
        <View style={myStyles.startContainer}>
          <Image source={ItemImage} style={myStyles.imageStyle} />
          <View style={myStyles.infoContainer}>
            {data.bookingState === "Cancelado" ? <>
              <Text>Esta reserva se encuentra cancelada</Text>
            </>: <>
              <IconProperty
              iconName="home-circle"
              iconSize={15}
              text={data.bookingHostId?.hostDescription}
            />
            <IconProperty
              iconName="currency-usd"
              iconSize={15}
              text={data.bookingHostId?.hostPrice}
            />        
            </>}
           
            <IconProperty
              iconName="calendar-range"
              iconSize={15}
              text={data.bookingDateStart}
            />
            <IconProperty
              iconName="calendar-range"
              iconSize={15}
              text={data.bookingDateEnd}
            />
            <BookingState state={data.bookingState} />
          </View>
        </View>
        {data.bookingState === "Reservada" && (
          <IconButton 
            icon="chevron-right"
            size={30}
            onPress={() =>
              navigation.navigate("GuestHost", {
                hostId: data.bookingHostId?._id,
                bookingId: data._id,
                startDate: data.bookingDateStart,
                endDate: data.bookingDateEnd,
              })
            }
          />
        )}
      </View>
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#CACACA",
    marginBottom: 10,
  },
  containerInfo: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  startContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
  btnDetail: {
    color: Colors.principal,
  },
  calendarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
