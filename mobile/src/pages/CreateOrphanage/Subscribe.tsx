import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import subscribeImg from '../../images/subscribe.png'

export default function Subscribe() {
    const navigation = useNavigation();

    function navigationToHome(){
       navigation.navigate('OrphanagesMap')

    }
    
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={subscribeImg}/>
            <Text style={styles.title}>Ebaaa!</Text>
            <Text style={styles.paragraph}>O cadastro deu certo e foi</Text>
            <Text style={styles.paragraph}>enviado ao administrador para ser</Text>
            <Text style={styles.paragraph}>aprovado. Agora é só esperar :)</Text>
            <TouchableOpacity style={styles.button} onPress={navigationToHome}>
                <Text style={styles.buttonText}>ok</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#39CC83",
        paddingVertical:8
    },
    image: {
        width:250,
        height:306
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

    button: {
        width:128,
        height:56,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 20,
        borderWidth: 1.4,
        borderColor: '#19C06D',
        backgroundColor: '#19C06D',

        marginTop:24
    },
    buttonText:{
        fontSize:15,
        fontFamily:"Nunito_600SemiBold",
        color:"#FFF"
    }
  
})