import React,{ useState}from 'react';
import { View, StyleSheet, Dimensions, Text, Modal, Image,TouchableHighlight } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';

import mapMarkerImg from '../../images/map-marker.png';
import touch from '../../images/touch.png';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({latitude:0, longitude:0})
  const [modalVisible, setModalVisible] = useState(true)

  function handleNextStep() {
    navigation.navigate('OrphanageData',{position});
  }

  function handleSelectMapPosition(event:MapEvent){
    setPosition(event.nativeEvent.coordinate)
  }

  return (
    <View style={styles.container}>
      <Modal 
        style={styles.modal}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        
      >
        <TouchableHighlight
        onPress={() => {
          setModalVisible(false);
        }}
        >
        <LinearGradient 
            colors={['rgba(21,182,214, 0.7)', 'rgba(21,214,214, 0.7)']}
            style={styles.containerModal}
        >
          <Image source={touch} style={styles.imgModal}/>
          <Text style={styles.textModal}>
            Toque no mapa 
          </Text>
          <Text style={styles.textModal}>
            para adicionar um 
          </Text>
          <Text style={styles.textModal}>
            orfanato
          </Text>
        </LinearGradient>
        </TouchableHighlight>
      </Modal>
      <MapView 
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
           <Marker 
          icon={mapMarkerImg}
          coordinate={{ latitude: position.latitude, longitude: position.longitude }}
        />
        )}
       
      </MapView>
        {position.latitude !== 0 && (
          <RectButton style={styles.nextButton} onPress={handleNextStep}>
            <Text style={styles.nextButtonText}>Próximo</Text>
          </RectButton>
        )}
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  modal: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  containerModal: {
    justifyContent: 'center',
    alignItems: 'center',

    height: "100%",
  },
  imgModal: {
    paddingBottom: 20
  },
  textModal: {
    fontFamily: 'Nunito_800ExtraBold',
    color:"#FFF",
    fontSize: 24,

    justifyContent: 'center',
    alignItems: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})