import {} from "react"
import { StyleSheet } from "react-native"
import InputSignUp from "./InputSignUp"


export default function GuestInputs({handleGuestData,validationMessage}){
    return <>
        <InputSignUp 
            textLabel="Ingresa el nombre de tu mascota"
            type="text"
            name="userGuestAnimalName"
            handleData={handleGuestData}
            /* validMessage={validationMessage.guestAnimalAge} */
        />
        <InputSignUp 
            textLabel="Ingresa la edad de tu mascota en años*"
            type="numeric"
            name="userGuestAnimalAge"
            handleData={handleGuestData}
            validMessage={validationMessage.guestAnimalAge}
        />
        <InputSignUp 
            textLabel="Ingresa el peso aproximado en kg*"
            type="numeric"
            name="userGuestAnimalWeight"
            handleData={handleGuestData}
            validMessage={validationMessage.guestAnimalWeight}
        />
    </>
}

const myStyles = StyleSheet.create({
    container:{

    }
})