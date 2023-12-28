import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native"
import {Button, Checkbox, Text} from "react-native-paper"
import { Colors } from "../../tools/constant";

export default function TermAndConditions({doneFunction}){


    return <ScrollView style={{marginHorizontal:20}}>
               <View style={{flex:1,paddingBottom:100}}>
                <Text style={myStyles.title}>Nuestros terminos y condiciones</Text>
                <Text style={myStyles.subTitle}>1. Introducción</Text>
                <Text style={myStyles.text}>Bienvenido a Perreando, la aplicación que conecta a dueños de mascotas con anfitriones para el cuidado de perros durante sus vacaciones. Al utilizar la aplicación Perreando, usted acepta los siguientes términos y condiciones. Por favor, lea detenidamente antes de utilizar nuestros servicios.</Text>

                <Text style={myStyles.subTitle}>2. Relación entre las Partes</Text>
                <Text style={myStyles.text}>Perreando actúa únicamente como un intermediario entre el dueño de la mascota (en adelante, el "Huesped") y el anfitrión que proporciona refugio (en adelante, el "Anfitrión"). El acuerdo para el cuidado de la mascota es un contrato entre el Huesped y el Anfitrión.</Text>

                <Text style={myStyles.subTitle}>3. Responsabilidades del Anfitrión y del Huesped</Text>
                <Text style={myStyles.text}> 3.1 Responsabilidades del Anfitrión: El Anfitrión es responsable de proporcionar un ambiente seguro y adecuado para la mascota durante el período acordado. El Anfitrión debe seguir las instrucciones proporcionadas por el Huesped con respecto al cuidado y la alimentación de la mascota.
                3.2 Responsabilidades del Huesped: El Huesped es responsable de proporcionar información precisa y detallada sobre la mascota, incluyendo cualquier necesidad especial o requisito médico. El Huesped es responsable de proporcionar los suministros necesarios para el cuidado de la mascota durante el período acordado.</Text>

                <Text style={myStyles.subTitle}>4. Limitación de Responsabilidad de Perreando</Text>
                <Text style={myStyles.text}>Perreando no asume responsabilidad alguna por cualquier daño, lesión o pérdida que pueda ocurrir durante el cuidado de la mascota. Perreando no es parte del contrato entre el Huesped y el Anfitrión y no tiene control sobre las acciones de ninguna de las partes.</Text>

                <Text style={myStyles.subTitle}>5. Resolución de Disputas</Text>
                <Text style={myStyles.text}>Cualquier disputa entre el Huesped y el Anfitrión debe resolverse entre las partes involucradas. Perreando no será responsable de resolver disputas ni participará en litigios entre Huesped y Anfitrión.</Text>

                <Text style={myStyles.subTitle}>6. Modificaciones de los Términos y Condiciones</Text>
                <Text style={myStyles.text}>
                Perreando se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigencia inmediatamente después de la publicación de la versión actualizada en la aplicación. El uso continuado de la aplicación después de dichas modificaciones constituye la aceptación de los términos revisados.
                Al utilizar la aplicación Perreando, usted indica que ha leído, comprendido y aceptado estos términos y condiciones.
                    </Text>
               </View>
            </ScrollView>
    /* </View> */
}

const myStyles = StyleSheet.create({
    container:{
        
    },
    checkboxStyle:{
        marginBottom:20
    },
    title:{
        fontSize:20,
        textAlign:"center",
        marginBottom:10
    },
    subTitle:{
        fontSize:15,
        fontWeight:"bold",
        textAlign:"left"
    },
    text:{
        fontSize:15,
        textAlign:"justify"
    }
})