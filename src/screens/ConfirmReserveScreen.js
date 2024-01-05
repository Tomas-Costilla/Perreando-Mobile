import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { ActivityIndicator, Button, HelperText, Text, TextInput } from "react-native-paper";
import InputView from "../components/InputView";
import { Colors } from "../tools/constant";
import DateTimePicker from "@react-native-community/datetimepicker";
import { server } from "../api/server";
import MiReserva from "../../assets/reserva.png"
import Message from "../components/Message";
import moment from "moment";
import IconProperty from "../components/IconProperty";

export default function ConfirmReserveScreen({route,navigation}) {
  let {guestId,hostId,hostPrice,petId,petName} = route.params

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [openDateFrom, setOpenDateFrom] = useState(false);
  const [openDateTo, setOpenDateTo] = useState(false);
  const [message,setMessage] = useState("")
  const [datesSelected, setDateSelected] = useState({
    datesSelectedFrom: "",
    dateSelectedTo: "",
  });
  const [datesUserView, setDatesUserView] = useState({
    from: "",
    to: "",
  });
  const [loadingBtn,setLoadingBtn] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")
  const [totalBooking,setTotalBooking] = useState(0)

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
    setDatesUserView({...datesUserView,from: moment(currentDate).format("YYYY-MM-DD")})
    setDateSelected({ ...datesSelected, datesSelectedFrom: dateFromString });
  };

  const handleDateTo = (event, selectedDate) => {
    /* setMessage("") */
    const currentDate = selectedDate;
    setOpenDateTo(false);
    setDateTo(currentDate);
    let year = currentDate.getFullYear();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let dateToString = `${year}-${month}-${day}`;
    setDatesUserView({...datesUserView,to: moment(currentDate).format("YYYY-MM-DD")})
    setDateSelected({ ...datesSelected, dateSelectedTo: dateToString });
    handleTotalBooking(selectedDate)
  };


  const handleTotalBooking = (dateToString) =>{
    let dateFromData = new Date(dateFrom)
    let dateToData = new Date(dateToString)
    let momentFrom = moment(dateFromData)
    let momentTo = moment(dateToData)

    let totalDays = momentTo.diff(momentFrom,'days', ' dias de diferencia') + 1
    let totalBooking = hostPrice * totalDays
    setTotalBooking(totalBooking)
    setMessage(`Reservaras ${totalDays} dias por un total de $${totalBooking}`)

  }
  

  const validateDates = () =>{
    setErrorMessage("")
    if(datesSelected.datesSelectedFrom === "" || datesSelected.dateSelectedTo === ""){
      setErrorMessage("Debes elegir una fecha para reservar tu estadia")
      return
    }

    let dateFromMonth = dateFrom.getMonth() + 1
    let dateFromDay = dateFrom.getDate()
    let dateToMonth = dateTo.getMonth() + 1
    let dateToDay = dateTo.getDate()
    let dateToYear = dateTo.getFullYear()
    let dateFromYear = dateFrom.getFullYear()

    if(moment(dateFrom).isBefore(route.params.hostAvailableStartDate)){
      setErrorMessage("La fecha de inicio debe ser apartir de la indicada por el anfitrion")
      return
    }

    if(moment(dateTo).isAfter(route.params.hostAvailableStartEnd)){
      setErrorMessage("La fecha de fin no puede ser mayor que la indicada por el anfitrion")
      return
    }

    if(dateFromYear > dateToYear){
      setErrorMessage("El año de la fecha inicio no puede ser menor que el año de fin")
      return
    }

    if(dateFromYear === dateToYear){
      if(dateFromMonth > dateToMonth){
        setErrorMessage("El mes de la fecha inicio no puede ser mayor que el mes de fin")
        return
      }

      if(dateFromMonth === dateToMonth){
        if(dateFromDay > dateToDay){
          setErrorMessage("El dia de la fecha inicio no puede ser mayor que el dia de fin")
          return
        }
        if(dateFromDay === dateToDay){
          setErrorMessage("El dia de la fecha inicio no puede ser igual que el dia de fin")
          return
        }
      }
    }

    createReserve()
  }

  const createReserve = async () =>{
    setLoadingBtn(true)
    setErrorMessage("")
    let dateStart = moment(dateFrom).format("YYYY-MM-DD")
    let dateEnd = moment(dateTo).format("YYYY-MM-DD")
    try {
        await server.post(`/booking`,{
          bookingHostId: hostId,
          bookingGuestId:guestId,
          bookingDateStart: dateStart,
          bookingDateEnd: dateEnd,
          bookingState:"Pendiente aprobacion",
          bookingTotal:totalBooking,
          bookingPetId: petId
        })
        navigation.navigate("Feed")
        navigation.jumpTo("AccountStack")
    } catch (error) {
      if(error.response.data?.isLogged===false) {
          navigation.navigate("SessionOut")
          return
        }

        if(error.response.data?.message) setErrorMessage(error.response.data?.message)
        else setErrorMessage("Ocurrio un error en la peticion")
    }
    setLoadingBtn(false)
  }

  useEffect(()=>{
  
  },[])


  return (
    <View style={myStyles.container}>
      <View style={myStyles.selectDatesContainer}>
        {/* <ScrollView> */}
      <Text style={myStyles.title}>Selecciona la fecha de tu reserva para {petName}</Text>
      <View>
        <Text style={{textAlign:"center"}}>Fechas disponibles del anfitrion</Text>
        <Text style={{textAlign:"center",marginTop:10}}>Desde {route.params.hostAvailableStartDate} hasta {route.params.hostAvailableStartEnd}</Text>
      </View>
      <Text style={myStyles.price}>El costo del alojamiento es ${hostPrice} / dia</Text>
      <View style={myStyles.dateContainer}>
        <Button
          mode="outlined"
          onPress={handleModalDateFrom}
          style={myStyles.btnDatePicker}
          labelStyle={{color:Colors.textColor}}
          icon="calendar"
          >
          Fecha desde
        </Button>
        <Text>-</Text>
        <Button
          mode="outlined"
          onPress={handleModalDateTo}
          style={myStyles.btnDatePicker}
          labelStyle={{color:"#000000"}}
          icon="calendar"
        >
          Fecha hasta
        </Button>

          
      </View>

      <View style={myStyles.dateTextContainer}>  
      {datesSelected.datesSelectedFrom && (
            <Text style={myStyles.titleDate}>{datesUserView.from} inclusive</Text>
      )}
        <Text>-</Text>
        {datesSelected.dateSelectedTo && (
          <Text style={myStyles.titleDate}>{datesUserView.to} inclusive</Text>
        )}
      </View>


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

      {message && <Text style={{textAlign:"center"}}>{message}</Text>}

      {errorMessage && <Message msg={errorMessage} type="error"/>}

      <View style={myStyles.btnReserve}>
        <Button 
          mode="contained"
          style={myStyles.btnActionReserve}
          loading={loadingBtn}
          onPress={validateDates}
          icon="calendar-check"
        >Confirmar Reserva
        
        </Button>
      </View>
      {/* </ScrollView> */}
      </View>
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
    backgroundColor: Colors.backgroundGrey,
    padding: 10
  },
  selectDatesContainer:{
    padding:10,
    borderRadius:10,
    borderWidth:0.6,
    borderColor:Colors.borderColor,
    height:600,
    display:"flex",
    justifyContent:"space-evenly",
    alignItems:"center",
    flexDirection:"column"
  },
  title:{
    textAlign:"center",
    fontSize:16
  },
  price:{
    textAlign:"center",
    fontWeight:"bold"
  },
  dateContainer:{
    display:"flex",
    justifyContent:"center",
    flexDirection:"row",
    alignItems:"center",
    gap:5,
    marginTop:10,
    marginBottom:10
  },
  dateTextContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    gap:10
  },
  btnDatePicker: {
    borderRadius:5,
    width:150
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
    textAlign:"center",
    fontWeight:"bold"
  },
  btnActionReserve:{
    width:300,
    backgroundColor:Colors.principalBtn,
    padding:3
  }
});
