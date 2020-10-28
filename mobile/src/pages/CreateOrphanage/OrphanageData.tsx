import React,{ useState, useEffect}from 'react';
import { ScrollView, View, StyleSheet,  Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient';
import { event } from 'react-native-reanimated';

interface OrphanageDataRouteParams {
  position:{
    latitude:number,
    longitude:number
  };
}

export default function OrphanageData() {
  const route = useRoute()

  const [name, setName] = useState("")
  const [about, setAbout] = useState("")
  const [whatsapp, setWhatsapp] = useState("")

  const [whatsappFormating, setWhatsappFormating] = useState("")

  const [images, setImages] = useState<string[]>([]);
  
  const [invalidNumber, setInvalidNumber] = useState<any>(null)
  const [warningNumber, setWarningNumber] = useState<any>(styles.warningNumber)

  const [invalidAbout, setInvalidAbout] = useState<any>(null)
  const [warningAbout, setWarningAbout] = useState<any>(null)

  const params = route.params as OrphanageDataRouteParams

  const navigation = useNavigation()

  useEffect(()=>{
    if(about.length > 300){
      setWarningAbout(styles.badText)
      setInvalidAbout(styles.badRegistration)
      setAbout(about.substring(0,300))
      setTimeout(()=>{ 
        setInvalidAbout(null)
        setWarningAbout(null)
      },3000)
    }
  },[about])
  function handleWhatsapp(){
    let phone = whatsapp.replace(/\s/g, "")
    phone = phone.replace(")","")
    phone = phone.replace("-","")
    phone = phone.replace("(","")
    return phone;
  }
  useEffect(()=>{
    let phone =  handleWhatsapp()

   
    if(phone.length >= 1 && phone.length <= 2 ){
      setWhatsappFormating(`(${phone})`)
      return;
    }
    if(phone.length === 3 ){
      const ddd = phone.substring(0,2)
      const nine = phone.substring(2)
      setWhatsappFormating(`(${ddd}) ${nine}`)
      return;
    }
    if(phone.length > 3 && phone.length < 8 ){
      const ddd = phone.substring(0,2)
      const nine = phone.substring(2,3)
      const first = phone.substring(3)
      setWhatsappFormating(`(${ddd}) ${nine} ${first}`)
      return;
    }
    if(phone.length >= 8 ){
      if(phone.length > 11){
        setInvalidNumber(styles.badRegistration)
        setWarningNumber(null)
        setTimeout(()=>{ 
          setInvalidNumber(null)
          setWarningNumber(styles.warningNumber)
        },3000)
      }
      phone = phone.substring(0,11)
      const ddd = phone.substring(0,2)
      const nine = phone.substring(2,3)
      const first = phone.substring(3,7)
      const second = phone.substring(7)
      setWhatsappFormating(`(${ddd}) ${nine} ${first}-${second}`)
      return;
    }
    if (phone.length === 0){
      setWhatsappFormating(phone)
      return;
    }
  },[whatsapp])
  function handleNextStep() {
    let phone = handleWhatsapp()
    phone = phone.substring(0,11)
  
    const { position} = params
    navigation.navigate(
      'OrphanageInstructions',
      {
        position,
        name,
        about,
        whatsapp: phone, 
        images
      }
    );
  }

  function handleCancelImageUpload(index:number){
      const filteredItems = images.filter(image => image !== images[index]);
      setImages(filteredItems);
  }
  

  async function handleSelectImages(){
    const {status} = await ImagePicker.requestCameraRollPermissionsAsync();

    if(status !== 'granted'){
      alert('Para continuar, precisamos da permissão para acessar suas fotos')
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality:1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if(result.cancelled){
      return;
    }
    const {uri:image} = result
    setImages([...images, image])
    
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Dados</Text>
        <View style={styles.pagination}>
          <Text style={styles.pageCurrent}>01</Text>
          <Text style={styles.pageNext}>-</Text>
          <Text style={styles.pageNext}>02</Text>    
        </View>
      </View>
      
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Sobre</Text>
        <Text style={[styles.warning, warningAbout]}>Máximo de 300 caracteres</Text>
      </View>
      <TextInput
        style={[styles.input, { height: 110 }, invalidAbout]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Whatsapp</Text>
        <Text style={[styles.warning, {color:"#F00"}, warningNumber]}>Número Inválido</Text>
      </View>
      <TextInput
        style={[styles.input, invalidNumber]}
        value={whatsappFormating}  
        onChangeText={setWhatsapp}
        keyboardType="number-pad"
        placeholder="(00) 9 9876-5432"
      />

      <Text style={styles.label}>Fotos</Text>
      <View>
        {images.map((image, index) =>{
          const filename = image.split('/')
          
          return (
            <LinearGradient 
            key={index}
            colors={['#A1E9C5', '#FFC2D8']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={[styles.uploadedImagesContainer, { marginBottom: 8}]}
            >
              <LinearGradient 
                colors={['#EDFFF6', '#FCF0F4']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.uploadedImagesContainer, 
                  {
                    padding:4,
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    alignItems: 'center',
                  }
                ]}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: image}}
                    style={styles.uploadedImage}
                  />
                  <Text style={styles.filename}>{filename[filename.length - 1]}</Text>
                </View>
                
                
                <TouchableOpacity onPress={() => handleCancelImageUpload(index)} style={{paddingRight: 8}}>
                  <Feather name="x" size={24} color="#FF669D" />
                </TouchableOpacity>
              </LinearGradient>
            </LinearGradient>
          )
        })}
      </View>
      {images.length < 5 &&(
        <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
          <Feather name="plus" size={24} color="#15B6D6" />
        </TouchableOpacity>
      )}
      
      {name !== "" && about !== "" && images.length > 0 && whatsapp.length >= 16 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
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
  pageNext:{
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',

  },

  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },
  warning: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 10
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
    borderRadius: 20, 
    padding: 1.4,
  },
  imageContainer:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  uploadedImage:{
    width:64,
    height:64,
    borderRadius: 20,
    marginRight:8
  },
  filename: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize:12,
    color:"#37C77F",
    width:150,
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
    marginBottom: 8,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 8,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
  badRegistration:{
    borderColor: '#F00'
  },
  badText:{
    color:"#F00"
  },
  warningNumber:{
    display:'none'
  }
})