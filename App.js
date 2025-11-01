import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';

import HomeScreen from './screens/HomeScreen';
import CartelaScreen from './screens/CartelaScreen';
import BingoScreen from './screens/BingoScreen';
import ModalAtualizacao from './components/ModalAtualizacao';
import { verificarAtualizacao, abrirDownloadAPK } from './utils/updateChecker';

const Stack = createNativeStackNavigator();

export default function App() {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(null);

  useEffect(() => {
    // Verificar atualizações ao iniciar o app
    checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    const result = await verificarAtualizacao();
    
    if (result.hasUpdate) {
      setUpdateInfo(result);
      setShowUpdateModal(true);
    }
  };

  const handleUpdate = async () => {
    if (updateInfo?.downloadUrl) {
      await abrirDownloadAPK(updateInfo.downloadUrl);
      setShowUpdateModal(false);
    }
  };

  const handleCloseModal = () => {
    if (!updateInfo?.mandatory) {
      setShowUpdateModal(false);
    }
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cartelas" component={CartelaScreen} />
          <Stack.Screen name="Bingo" component={BingoScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      <ModalAtualizacao
        visible={showUpdateModal}
        onClose={handleCloseModal}
        onUpdate={handleUpdate}
        updateInfo={updateInfo}
      />
    </>
  );
}
