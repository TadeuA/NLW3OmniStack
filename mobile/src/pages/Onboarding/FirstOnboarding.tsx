import React from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from "react-native"
import {useNavigation} from '@react-navigation/native'

import WorldHappy from '../../images/happy-world.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export default function FirstOnboarding(){


    return (
        <View style={styles.container}>
            
            <Image style={styles.imageHappyWorld} source={WorldHappy}/>
            <View style={styles.textContainer}>
                <Text style={styles.textTitle}>Leve</Text>
                <Text style={styles.textTitle}>felicidade</Text>
                <Text style={styles.textTitle}>para o</Text>
                <Text style={styles.textTitle}>mundo</Text>
                <Text style={styles.textSimple}>Visite orfanatos e mude o</Text>
                <Text style={styles.textSimple}>dia de muitas crianças.</Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.pagination}>
                    <View style={styles.currentPage}/>
                    <View style={styles.nextPage}/>
                </View>
                <TouchableOpacity style={styles.nextButton} onPress={()=>{}}>
                    <Feather name='arrow-right' size={20} color='#FFF'/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems:'center',
        justifyContent: 'space-between',
        
        paddingVertical: 10
    },
    imageHappyWorld:{
        height: 250,
        width: 200
    },
    textContainer:{
        position: 'relative',
        top: -50,
        alignItems:"flex-start",

        width:Dimensions.get('window').width,
    },
    textTitle:{
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 35,
        flexDirection: 'column'
    },
    textSimple:{
        fontFamily: 'Nunito_600SemiBold',
        fontSize:18,
    },
    footer:{},
    pagination:{},
    currentPage:{},
    nextPage:{},
    nextButton:{
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,
    
        justifyContent: 'center',
        alignItems: 'center'
    },

})