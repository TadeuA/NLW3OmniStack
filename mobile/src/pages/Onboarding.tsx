import React from 'react';
import {View, StyleSheet, Text, Image, Dimensions, SafeAreaView, Platform} from "react-native"
import {useNavigation} from '@react-navigation/native'
import Onboarding from 'react-native-onboarding-swiper';
import WorldHappy from '../images/happy-world.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import kids from '../images/kids.png'

interface SquareProps{
    isLight: boolean;
    selected: boolean;
}
interface NextProps {
    allowFontScaling: boolean,
    isLight: boolean,
    nextLabel: string,
    onPress: [Function],
  }

export default function Onboarding(){
    const navigation = useNavigation();

    function handleNavigationToIntro() {
        navigation.navigate('Intro')
    }

const Done = (isLight:any, ...props:any)=>{
    console.log(props)
    return(
        <TouchableOpacity style={styles.nextButton} onPress={handleNavigationToIntro}>
             <Feather name='arrow-right' size={20} color='#FFF'/>
        </TouchableOpacity>
        )
}
const Next = (props:NextProps ) => {
    return(
    <TouchableOpacity style={styles.nextButton} onPress={props.onPress}>
         <Feather name='arrow-right' size={20} color='#FFF'/>
    </TouchableOpacity>
    )
}
const Square = ( isLight: SquareProps ) => {
   
    let style;

  
    if (isLight.selected) {
      style = styles.currentPage 
    } 
    if(!isLight.selected){
        style = styles.nextPage
    }
    return (
      <View
        style={[styles.pageMarker, style]}
      />
    );
  };
  
  
    return(
        <Onboarding
            containerStyles={styles.container}
            onDone={handleNavigationToIntro}
            doneButtonComponent={Done}
            NextButtonComponent={Next}
            bottomBarColor="#FFF"
            showSkip={false}
            DotComponent={Square}
            pages={[
              {
                backgroundColor: '#fff',
                image: <Image  source={WorldHappy}/>,
                title:  <View style={[styles.textContainer, {
                    position: 'relative',
                    top: -120,
                }]}>
                            <Text style={styles.textTitle}>Leve</Text>
                            <Text style={styles.textTitle}>felicidade</Text>
                            <Text style={styles.textTitle}>para o</Text>
                            <Text style={styles.textTitle}>mundo</Text>
                            <Text style={styles.textSimple}>Visite orfanatos e mude o</Text>
                            <Text style={styles.textSimple}>dia de muitas crianças.</Text>
                        </View>,
                subtitle: '',
              },
              {
                backgroundColor: '#FFF',
                image: <Image style={styles.imageHappyKids} source={kids}/>,
                title:  <View style={[styles.textContainer,{
                    position: 'relative',
                    top:-30,
                    alignItems: 'flex-end',
                }]}>
                            <Text style={[styles.textTitle,{fontSize:30}]}>Escolha um</Text>
                            <Text style={[styles.textTitle,{fontSize:30}]}>orfanato no mapa</Text>
                            <Text style={[styles.textTitle,{fontSize:30}]}>e faça uma visita</Text>
               
                        </View>,
                subtitle: '',
              },
          
        ]}
  />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems:'center',
        justifyContent: 'center',
        
        paddingTop: Platform.OS === 'android' ? 30 : 0

    },
   
    imageHappyWorld:{
        height: 250,
        width: 200
    },  
    imageHappyKids:{
        height: 314,
        width: 217
    },  
    textContainer:{
       
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
 
 
    pageMarker:{
        position: 'relative',
        left:"-200%",
        borderRadius:20,
        marginRight:8
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
        position: 'relative',
        left:-8,
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        
        justifyContent: 'center',
        alignItems: 'center'
    },

})