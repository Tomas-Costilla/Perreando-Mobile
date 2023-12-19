import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native"
import {Button, Checkbox, Text} from "react-native-paper"
import { Colors } from "../../tools/constant";

export default function TermAndConditions({doneFunction}){


    return <ScrollView style={{marginHorizontal:20}}>
               <View style={{flex:1,paddingBottom:100}}>
                <Text style={{fontSize:20,textAlign:"justify"}}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
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
    }
})