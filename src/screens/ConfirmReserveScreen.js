import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { ActivityIndicator, Button, HelperText, Text, TextInput } from "react-native-paper";
import InputView from "../components/InputView";
import { Colors } from "../tools/constant";
import DateTimePicker from "@react-native-community/datetimepicker";
import { server } from "../api/server";
import MiReserva from "../../assets/reserva.png"

export default function ConfirmReserveScreen({route,navigation}) {
  let {guestId,hostId} = route.params

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [openDateFrom, setOpenDateFrom] = useState(false);
  const [openDateTo, setOpenDateTo] = useState(false);
  const [datesSelected, setDateSelected] = useState({
    datesSelectedFrom: "",
    dateSelectedTo: "",
  });
  const [datesUserView, setDatesUserView] = useState({
    from: "",
    to: "",
  });
  const [loadingServer,setLoadingServer] = useState(false)
  const [messageServer,setMessageServer] = useState("")
  const [userReserve,setUserReserve] = useState(false)
  const [loadingBtn,setLoadingBtn] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")

  const handleModalDateFrom = () => setOpenDateFrom(!openDateFrom);
  const handleModalDateTo = () => setOpenDateTo(!openDateTo);

  const handleDateFrom = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpenDateFrom(false);
    setDateFrom(currentDate);
    let year = currentDate.getFullYear();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let dateFromString = `${year}-${month}-${day}`;
    setDatesUserView({...datesUserView,from: `${year}/${month}/${day}`})
    setDateSelected({ ...datesSelected, datesSelectedFrom: dateFromString });
  };

  const handleDateTo = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpenDateTo(false);
    setDateTo(currentDate);
    let year = currentDate.getFullYear();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let dateToString = `${year}-${month}-${day}`;
    setDatesUserView({...datesUserView,to: `${year}/${month}/${day}`})
    setDateSelected({ ...datesSelected, dateSelectedTo: dateToString });
  };

  

  const validateDates = () =>{
    setErrorMessage("")
    if(datesSelected.datesSelectedFrom === "" || datesSelected.dateSelectedTo === ""){
      setErrorMessage("Debes elegir una fecha para reservar tu estadia")
      return
    }

    let dateFromMonth = dateFrom.getMonth() + 1
    let dateFromDay = dateFrom.getDay()
    let dateToMonth = dateTo.getMonth() + 1
    let dateToDay = dateTo.getDay()
    
    if(dateFromMonth < dateToMonth){
      setErrorMessage("El mes de la fecha inicio no puede ser menor que el mes de fin")
      return
    }

    if(dateToMonth < dateFromMonth){
      setErrorMessage("El mes de la fecha fin no puede ser menor que el mes de inicio")
      return
    }
   /*  if(dateFromMonth === dateToMonth){
      if(dateToDay < dateFromDay){
        setErrorMessage("El dia fin de tu estadia no puede ser menor que la de inicio")
        return
      }
       if(dateFromDay > dateToDay){
        setErrorMessage("El dia inicio de tu estadia no puede ser mayor que el dia de fin")
        return
      } 
    } */


    createReserve()
  }

  const createReserve = async () =>{
    setLoadingBtn(true)
    setErrorMessage("")
    try {
        let response = await server.post(`/booking`,{
          bookingHostId: hostId,
          bookingGuestId:guestId,
          bookingDateStart: datesSelected.datesSelectedFrom,
          bookingDateEnd: datesSelected.dateSelectedTo,
          bookingState:"Reservada"
        })
        if(!response.data.result){
          setLoadingBtn(false)
          setErrorMessage(response.data.message)
          return
        }
        navigation.navigate("MyBookings")
    } catch (error) {
      setErrorMessage(error.response.data)
    }
    setLoadingBtn(false)
  }

  useEffect(()=>{
   /*  checkifUserHaveReserve() */
  },[])

  if(loadingServer) return <View style={myStyles.serverContainer}>
    <ActivityIndicator animating size={45}/>
  </View>

  if(userReserve) return <View style={myStyles.serverContainer}>
    <Text style={{textAlign:"center",fontSize:15}}>{messageServer}</Text>
    <Image source={MiReserva} style={myStyles.imageReserva}/>
    <Button
      mode="contained"
      onPress={()=>navigation.navigate("GuestHost")}
      style={myStyles.btnReserveUser}
    >
        Ver mi Reserva
    </Button>
  </View>

  return (
    <View style={myStyles.container}>
      {/* <ScrollView> */}
      <Text style={myStyles.title}>Seleccioná la fecha de tu reserva</Text>
      <Button
        mode="outlined"
        onPress={handleModalDateFrom}
        style={myStyles.btnDatePicker}
        labelStyle={{color:"#000000"}}
        icon="calendar"
        >
        Fecha reserva desde
      </Button>

        {datesSelected.datesSelectedFrom && (
          <Text style={myStyles.titleDate}>Fecha desde seleccionado: {datesUserView.from}</Text>
        )}

      <Button
        mode="outlined"
        onPress={handleModalDateTo}
        style={myStyles.btnDatePicker}
        labelStyle={{color:"#000000"}}
        icon="calendar"
      >
        Fecha reserva hasta
      </Button>

      {datesSelected.dateSelectedTo && (
        <Text style={myStyles.titleDate}>Fecha hasta seleccionado: {datesUserView.to}</Text>
      )}
      {openDateFrom && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateFrom}
          mode="date"
          onChange={handleDateFrom}
          display="default"
        />
      )}

      {openDateTo && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateTo}
          mode="date"
          onChange={handleDateTo}
          display="default"
        />
      )}

      {errorMessage && <HelperText type="error">{errorMessage}</HelperText>}

      <View style={myStyles.btnReserve}>
        <Button 
          mode="contained"
          style={myStyles.btnActionReserve}
          loading={loadingBtn}
          onPress={validateDates}
        >Confirmar Reserva
        
        </Button>
      </View>
      {/* </ScrollView> */}
    </View>
  );
}

const myStyles = StyleSheet.create({
  serverContainer:{
    flex:1,
    justifyContent:"space-evenly",
    alignItems:"center",
    backgroundColor:Colors.backgroundColor
  },
  imageReserva:{
    width:300,
    height:300
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 10,
    justifyContent: "space-evenly",
    alignItems:"center"
  },
  title:{
    textAlign:"center",
    fontSize:16
  },
  btnDatePicker: {
    borderColor:"#000000",
    borderRadius:10
  },
  btnReserveUser:{
    backgroundColor:Colors.secondary,
    borderRadius:10,
    width:200,
    padding:5,
    marginTop:10    
  },
  btnReserve: {
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    marginTop: 10,
    marginBottom: 10,
  },
  titleDate:{
    textAlign:"center"
  },
  btnActionReserve:{
    width:300,
    borderRadius:10,
    backgroundColor:Colors.principal,
    padding:3
  }
});
