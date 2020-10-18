import React from 'react';
import {View, StyleSheet, Text, Image, Dimensions, SafeAreaView, Platform} from "react-native"
import {useNavigation} from '@react-navigation/native'

import WorldHappy from '../../images/happy-world.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export default function FirstOnboarding(){
    const navigation = useNavigation();

    function handleNavigationToSecondOnboarding() {
        navigation.navigate('SecondOnboarding')
    }

    return (
        <SafeAreaView style={styles.container}>
            
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
                    <View style={[styles.currentPage, styles.pageMarker]}/>
                    <View style={[styles.nextPage, styles.pageMarker]}/>
                </View>
                <TouchableOpacity style={styles.nextButton} onPress={handleNavigationToSecondOnboarding}>
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
        height: 250,
        width: 200
    },  
    textContainer:{
        position: 'relative',
        top: -60,
        alignItems:"flex-start",

        width:Dimensions.get('window').width,
        paddingHorizontal:50
    },
    textTitle:{
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 35,
        flexDirection: 'column',
        color: '#0089A5',
    },
    textSimple:{
        fontFamily: 'Nunito_600SemiBold',
        fontSize:18,
        color: '#5C8599'

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
    nextPage:{
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