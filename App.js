import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import CartelaScreen from './screens/CartelaScreen';
import BingoScreen from './screens/BingoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cartelas" component={CartelaScreen} />
        <Stack.Screen name="Bingo" component={BingoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
