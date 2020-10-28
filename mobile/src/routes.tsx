import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding from './pages/Onboarding'

import Intro from './pages/Intro';
import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';

import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import OrphanageInstructions from './pages/CreateOrphanage/OrphanageInstructions';
import Subscribe from './pages/CreateOrphanage/Subscribe';
import Unsubscribe from './pages/CreateOrphanage/Unsubscribe';




import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator 
        screenOptions={{ 
          headerShown: false, 
          cardStyle: { 
            backgroundColor: '#F2F3F5' 
            } 
          }}
      >
        <Screen 
          name="Onboarding" 
          component={Onboarding} 
        />

       
        <Screen 
          name="Intro" 
          component={Intro} 
        />
        
        <Screen 
          name="OrphanagesMap" 
          component={OrphanagesMap} 
        />

        <Screen 
          name="OrphanageDetails" 
          component={OrphanageDetails}
          options={{
            headerShown:true,
            header:()=><Header showCancel={false} title="Orfanato"/>
          }}
        />

        <Screen 
          name="SelectMapPosition" 
          component={SelectMapPosition}
          options={{
            headerShown:true,
            header:()=><Header title="Selecione no mapa"/>
          }}
        />
        
        <Screen 
          name="OrphanageData" 
          component={OrphanageData}
          options={{
            headerShown:true,
            header:()=><Header title="Informe os dados"/>
          }}
        />
       
       <Screen 
          name="OrphanageInstructions" 
          component={OrphanageInstructions}
          options={{
            headerShown:true,
            header:()=><Header title="Informe os dados"/>
          }}
        />
         <Screen 
          name="Subscribe" 
          component={Subscribe} 
        />
          <Screen 
          name="Unsubscribe" 
          component={Unsubscribe} 
        />
      </Navigator>
    </NavigationContainer>
  )
}



