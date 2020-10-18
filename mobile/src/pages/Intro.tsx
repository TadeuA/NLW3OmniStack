import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function Intro() {
    const [blinkEye, setBlinkEye ] = useState(21)
    const navigation = useNavigation()
    useEffect(() =>{
        setTimeout(()=>{ 
            setBlinkEye(3),
            setTimeout(()=>{ setBlinkEye(21)},500)
            setTimeout(()=>{ navigation.navigate('OrphanagesMap')},1000)
        },2000)

        
       

    },[])
    return (
        <LinearGradient 
            colors={['#15B6D6', '#15D6D6']}
            style={styles.container}
        >
            <View style={styles.balloon}>
                <View style={styles.eyesContainer}>
                    <View style={[styles.eyes,{height:21}]}/>
                    
                    <View style={[styles.eyes,{height:blinkEye}]}/>
                </View>
                <View style={styles.mouth}/>
            </View>
            <View style={styles.balloonMarker}/>
            
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    balloon:{
        backgroundColor: '#FFD666',
        width:120,
        height: 130,
        borderRadius:30,
        justifyContent:"space-between",
        alignItems: 'center',
        paddingVertical: 35
    },
    eyesContainer: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:65,
        
    },
    eyes:{
        width:21,
        backgroundColor:"#FFF",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
      
    },

    
    
    mouth:{
        width:73,
        height:20,
        backgroundColor:"#FFF",
        borderBottomRightRadius:40,
        borderBottomLeftRadius:40,
    },
    balloonMarker:{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 25,
        borderBottomWidth: 35,
        borderLeftWidth: 25,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#FFD666',
        borderLeftColor: 'transparent',
        transform: [
            { rotateX: "180deg" },
        ]
    },
})