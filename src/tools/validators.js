import { MAIL_FORMAT, PROFILE_TYPES } from "./constant"

export class InputError extends Error {
    constructor(message){
        super(message)
        this.name = 'InputError'
    }
}

/* 
userFullName:"",
        userEmail:"",
        userPhone:0,
        userPassword:"",
        userUbication:"CABA",
        userAddressStreet:"",
        userAddressNumber:"",
        userAddressBetwStreet:"",
        userAddressExtraInfo:"",
        userPhoto: photo,
        userProfile: profile,
        userHostType:"",
        userHostAnimalWeightFrom:0,
        userHostAnimalWeightTo:0,
        userHostAnimalAgeFrom:0,
        userHostAnimalAgeTo:0
*/

/* return an object with all error message and true of false if error exist */
export const ValidateUserData = (userObject,passRpt) =>{
    let validationMessage = {
        name:"",
        email:"",
        phone:"",
        password:"",
        passwordRepeat:"",
        address:"",
        addressNumber:"",
        addressBetwStreet:"",
        addressExtrainf:"",
        guestAnimalAge:"",
        guestAnimalWeight:"",
        hosttype:"",
        hostanimalweight:"",
        hostanimalage:"",
    }
    let isValid = true

    if(userObject.userFullName === ""){
        validationMessage.name = "Tu nombre es requerido"
        isValid = false
    }

    if(!userObject.userEmail.match(MAIL_FORMAT)){
        validationMessage.email = "Tu email tiene un formato incorrecto o esta vacio"
        isValid = false
    }


    if(userObject.userPhone === 0){
        validationMessage.phone = "Tu numero de telefono esta vacio"
        isValid = false
    }

    if(userObject.userPassword === ""){
        validationMessage.password = "Tu contraseña esta vacia"
        isValid = false
    }

    if(userObject.userPassword !== userObject.userRepeatPassword){
        validationMessage.passwordRepeat = "Las contraseñas no coinciden"
        isValid = false
    }

    if(userObject.userAddressStreet === ""){
        validationMessage.address = "Tu direccion esta vacia"
        isValid = false
    }

    if(userObject.userAddressNumber === 0){
        validationMessage.addressNumber = "Debes ingresar una altura a tu direccion"
        isValid = false
    }

    if(userObject.userProfile === PROFILE_TYPES.ANFITRION){
        if(userObject.userHostAnimalWeightFrom === 0 || userObject.userHostAnimalWeightTo === 0){
            validationMessage.hostanimalweight = "Como anfitrion, debes ingresar el peso de animales que permites"
            isValid = false
        }
    
        if(userObject.userHostAnimalAgeFrom === 0 || userObject.userHostAnimalAgeTo === 0){
            validationMessage.hostanimalage = "Como anfitrion, debes ingresar la edad de animales que permites"
            isValid = false
        }

    }else{
        if(userObject.userGuestAnimalAge === 0){
            validationMessage.guestAnimalAge = "Debes ingresar la edad de tu mascota"
            isValid = false
        }
    
        if(userObject.userGuestAnimalWeight === 0){
            validationMessage.guestAnimalWeight = "Debes ingresar el peso aproximado de tu mascota"
            isValid = false
        }
    }
    return {
        isValid,
        validationMessage
    }


}