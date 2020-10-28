import React,{ useState, useEffect}from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker'
import api from '../../services/api';

interface OrphanageDataRouteParams {
  position:{
    latitude:number,
    longitude:number
  };
  name:string;
  about:string;
  whatsapp:string;
  images:string[];
}

export default function OrphanageInstructions() {
  const route = useRoute()

  
  const [instructions, setInstructions] = useState("")
  const [opening_hours, setOpeningHours] = useState("")
  const [open_on_weekends, setOpeningOnWeekends] = useState(true)

  const [selectedOpenOnWeekends, setSelectedOpenOnWeekends] = useState(false)
  const [notOpenOnWeekends, setNotOpenOnWeek] = useState<any>(null)
  const [yesOpenOnWeekends, setYesOpenOnWeek] = useState<any>(null)
  const [notTextOpenOnWeekends, setNotTextOpenOnWeek] = useState<any>(null)
  const [yesTextOpenOnWeekends, setYesTextOpenOnWeek] = useState<any>(null)

  
  const params = route.params as OrphanageDataRouteParams

  const navigation = useNavigation()

  async function handleCreateOrphanage(){
    const {latitude, longitude} = params.position
    const {name, about, images, whatsapp} = params
    
    const data = new FormData();

    data.append("name",name)
    data.append("about",about)
    data.append('whatsapp', whatsapp)
    data.append("latitude",String(latitude))
    data.append("longitude",String(longitude))
    data.append("instructions",instructions)
    data.append("opening_hours",opening_hours)
    data.append("open_on_weekends",String(open_on_weekends))

    images.forEach((image, index) => {
      data.append("images",{
        type: 'image/jpg',
        name: `image_${index}.jpg`,
        uri: image
      }as any)
    })

    await api.post('orphanages', data)

    navigation.navigate('Subscribe')
   
  }

  function handleSelectOpenOnWeeks(select : boolean){
    setOpeningOnWeekends(select)
    setSelectedOpenOnWeekends(true)
  }

  useEffect(()=>{
    if(selectedOpenOnWeekends){
      if(open_on_weekends){
        setYesOpenOnWeek(styles.switchYesButton)
        setNotOpenOnWeek(null)
        setYesTextOpenOnWeek(styles.switchYesTextButton)
        setNotTextOpenOnWeek(null)
      }
      if(!open_on_weekends){
        setNotOpenOnWeek(styles.switchNotButton)
        setYesOpenOnWeek(null)
        setNotTextOpenOnWeek(styles.switchNotTextButton)
        setYesTextOpenOnWeek(null)
      }
    }
  },[open_on_weekends,selectedOpenOnWeekends])

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Visitação</Text>
        <View style={styles.pagination}>
          <Text style={styles.pageBack}>01</Text>
          <Text style={styles.pageBack}>-</Text>
          <Text style={styles.pageCurrent}>02</Text>    
        </View>
      </View>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horario de Atendimento</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>

        <View style={styles.switchButtonContainer}>
          <TouchableOpacity 
           style={[
            styles.switchButton,
            {
              borderRightWidth:0.7,
              borderTopStartRadius: 20,
              borderBottomStartRadius: 20, 
            },
            yesOpenOnWeekends
            ]}
            onPress={()=>handleSelectOpenOnWeeks(true)}  
          >

            <Text style={[styles.switchTextButton, yesTextOpenOnWeekends]}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.switchButton,
              {
                borderLeftWidth:0.7,
                borderTopEndRadius: 20,
                borderBottomEndRadius: 20,
              },
              notOpenOnWeekends
              ]}
              onPress={()=>handleSelectOpenOnWeeks(false)}
            >
            <Text style={[styles.switchTextButton,notTextOpenOnWeekends]}>Não</Text>
          </TouchableOpacity>
        </View>
        
 
      </View>
      {instructions !== "" && opening_hours !== "" && selectedOpenOnWeekends === true &&(
        <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
          <Text style={styles.nextButtonText}>Cadastrar</Text>
        </RectButton>
      )}
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: 50
  },
  pageCurrent: {
    fontFamily: 'Nunito_700Bold',
    color: '#5c8599',

  },
  pageBack:{
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',

  },


  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  uploadedImagesContainer:{
    flexDirection: 'row',
  },
  uploadedImage:{
    width:64,
    height:64,
    borderRadius: 20,
    marginBottom:32,
    marginRight:8,
  },
  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  switchButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchButton:{
    justifyContent: 'center',
    alignItems: 'center',
    
    borderWidth: 1.4,
    borderColor:"#D3E2E5",

    height: 56,
    width: "50%"
  },
  switchYesButton:{
    borderColor:"#A1E9C5",
    backgroundColor:"#EDFFF6"
  },
  switchNotButton:{
    borderColor:"#ECB4B7",
    backgroundColor:"#FBF0F4"
  },
  switchTextButton: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize:15,
    color:"#5C8599"
  },
  switchNotTextButton: {
    color:"#FF669D"
  },
  switchYesTextButton: {
    color: "#39CC83"
  },
  nextButton: {
    backgroundColor: '#39CC83',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
  
})