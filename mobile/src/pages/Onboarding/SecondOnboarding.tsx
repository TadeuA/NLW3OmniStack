import React from 'react';
import {View, StyleSheet, Text, Image, Dimensions, SafeAreaView, Platform} from "react-native"
import {useNavigation} from '@react-navigation/native'

import kids from '../../images/kids.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export default function SecondOnboarding(){
    const navigation = useNavigation();

    function handleNavigationToIntro(){
        navigation.navigate('Intro')
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <Image style={styles.imageHappyWorld} source={kids}/>
            <View style={styles.textContainer}>
                <Text style={styles.textTitle}>Escolha um</Text>
                <Text style={styles.textTitle}>orfanato no mapa</Text>
                <Text style={styles.textTitle}>e faça uma visita</Text>
               
            </View>
            <View style={styles.footer}>
                <View style={styles.pagination}>
                    <View style={[styles.backPage, styles.pageMarker]}/>
                    <View style={[styles.currentPage, styles.pageMarker]}/>
                </View>
                <TouchableOpacity style={styles.nextButton} onPress={handleNavigationToIntro}>
                    <Feather name='arrow-right' size={20} color='#FFF'/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems:'center',
        justifyContent: 'space-between',
        
        paddingTop: Platform.OS === 'android' ? 30 : 0

    },
    imageHappyWorld:{
        height: 256,
        width: 175
    },  
    textContainer:{
        position: 'relative',
        top: -40,
        alignItems:"flex-end",

        width:Dimensions.get('window').width,
        paddingHorizontal:30
    },
    textTitle:{
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 30,
        flexDirection: 'column',
        color: '#0089A5',
    },
    
    footer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        width: Dimensions.get('window').width,
        paddingHorizontal:20,

        position:'relative',
        bottom:50

    },
    pagination:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:35
    },
    pageMarker:{
        borderRadius:20
    },
    currentPage:{
        width:20,
        height:5,
        backgroundColor: '#FFD152'
    },
    backPage:{
        width:10,
        height:5,
        backgroundColor: '#BECFD8'
    },
    nextButton:{
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,
    
        justifyContent: 'center',
        alignItems: 'center'
    },

})