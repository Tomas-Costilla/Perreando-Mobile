import {} from "react"
import { StyleSheet } from "react-native"
import InputSignUp from "./InputSignUp"
import InputView from "./InputView"


export default function GuestInputs({handleGuestData,validationMessage}){
    return <>
        {/* <InputSignUp 
            textLabel="Ingresa el nombre de tu mascota"
            type="text"
            name="userGuestAnimalName"
            handleData={handleGuestData}
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
        /> */}
        <InputView 
            nameField="userGuestAnimalName"
            label="Ingresa el nombre de tu mascota"
            editable={true}
            handleData={handleGuestData}
            icon="paw"
        />
        <InputView 
            nameField="userGuestAnimalAge"
            label="Ingresa la edad de tu mascota"
            editable={true}
            handleData={handleGuestData}
            typeInput='numeric'
            icon="paw"
            validateMessage={validationMessage.guestAnimalAge}
        />
        <InputView 
            nameField="userGuestAnimalWeight"
            label="Ingresa el peso aproximado en KG de tu mascota"
            editable={true}
            typeInput='numeric'
            handleData={handleGuestData}
            icon="paw"
            validateMessage={validationMessage.guestAnimalWeight}
        />
    </>
}

const myStyles = StyleSheet.create({
    container:{

    }
})