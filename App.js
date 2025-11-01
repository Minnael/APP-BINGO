import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { Platform, View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import CartelaScreen from './screens/CartelaScreen';
import BingoScreen from './screens/BingoScreen';
import ModalAtualizacao from './components/ModalAtualizacao';
import { verificarAtualizacaoOTA, aplicarAtualizacaoOTA } from './utils/updateChecker';

// Importar expo-updates apenas em plataformas nativas
let Updates = null;
if (Platform.OS !== 'web') {
  try {
    Updates = require('expo-updates');
  } catch (e) {
    console.log('expo-updates não disponível');
  }
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Verificar atualizações OTA ao iniciar o app
    checkForOTAUpdates();
  }, []);

  const checkForOTAUpdates = async () => {
    // Não verificar em desenvolvimento ou web
    if (__DEV__ || Platform.OS === 'web' || !Updates) {
      return;
    }

    try {
      setIsChecking(true);
      const update = await Updates.checkForUpdateAsync();
      
      if (update.isAvailable) {
        setUpdateInfo({
          hasUpdate: true,
          currentVersion: Updates.manifest?.version || '1.0.0',
          latestVersion: update.manifest?.version || 'Nova',
          updateMessage: 'Uma nova atualização está disponível!',
          releaseNotes: ['Nova versão disponível com melhorias e correções'],
          mandatory: false
        });
        setShowUpdateModal(true);
      }
    } catch (error) {
      console.log('Erro ao verificar atualização OTA:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleUpdate = async () => {
    if (!Updates) return;

    try {
      setIsDownloading(true);
      setShowUpdateModal(false);
      
      // Baixar e aplicar atualização OTA
      await Updates.fetchUpdateAsync();
      
      // Reiniciar o app com a nova versão
      await Updates.reloadAsync();
    } catch (error) {
      console.log('Erro ao aplicar atualização:', error);
      setIsDownloading(false);
      setShowUpdateModal(true);
    }
  };

  const handleCloseModal = () => {
    if (!updateInfo?.mandatory) {
      setShowUpdateModal(false);
    }
  };

  // Mostrar tela de loading durante o download
  if (isDownloading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Baixando atualização...</Text>
        <Text style={styles.loadingSubtext}>O app será reiniciado automaticamente</Text>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingSubtext: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
