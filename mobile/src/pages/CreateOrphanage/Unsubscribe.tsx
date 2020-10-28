import React, {useState, useEffect} from 'react';
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export default function Unsubscribe() {
   const navigation = useNavigation();

   function returnSubscribe(){
       navigation.goBack()
   }

   function navigationToHome(){
       navigation.navigate('OrphanagesMap')
   }
    return (
        <View style={styles.container}>
            <View style={styles.xCancel}>
                <Feather name="x" size={32} color="#FF669D" />
            </View>
            <Text style={styles.title}>Cancelar cadastro</Text>
            <Text style={styles.paragraph}>Tem certeza que quer</Text>
            <Text style={styles.paragraph}>cancelar esse cadastro?</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={returnSubscribe}>
                    <Text style={styles.buttonText}>Não</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {backgroundColor:"#D6487B"}]} onPress={navigationToHome}>
                    <Text style={styles.buttonText}>Sim</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FF669D"
    },
    xCancel: {
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor:"#FFF",
        borderRadius: 20,

        width:64,
        height:64,

        marginBottom:24
    },

    title:{
        fontSize: 32,
        fontFamily: 'Nunito_800ExtraBold',
        color: '#FFF',

        marginBottom:24

    },
    paragraph:{
        color: '#FFF',
        fontFamily: 'Nunito_600SemiBold',
        fontSize:20,

    },
    buttonContainer:{
        marginTop:24,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        width:128,
        height:56,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 20,
        borderWidth: 1.4,
        borderColor: '#D6487B',

        marginHorizontal: 4
    },
    buttonText:{
        fontSize:15,
        fontFamily:"Nunito_600SemiBold",
        color:"#FFF"
    }
})