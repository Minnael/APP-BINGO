import { Platform } from 'react-native';

// Importar expo-updates apenas se não for web
let Updates = null;
if (Platform.OS !== 'web') {
  try {
    Updates = require('expo-updates');
  } catch (e) {
    console.log('Expo-updates não disponível');
  }
}

// Versão atual do app (sincronizada com app.json)
const VERSAO_ATUAL = '1.1.0';

// URL onde você hospedará o arquivo de versão (pode ser GitHub, seu servidor, etc.)
// Por enquanto, vamos simular localmente
const VERSION_CHECK_URL = 'https://raw.githubusercontent.com/Minnael/APP-BINGO/master/version.json';

/**
 * Verifica se há uma nova versão disponível
 * @returns {Promise<Object>} { hasUpdate, latestVersion, downloadUrl, updateMessage }
 */
export const verificarAtualizacao = async () => {
  try {
    // Se estiver em desenvolvimento, não verificar atualizações
    if (__DEV__) {
      console.log('Modo desenvolvimento - verificação de atualização desabilitada');
      return { hasUpdate: false };
    }

    // Buscar informações da versão mais recente
    const response = await fetch(VERSION_CHECK_URL, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      console.log('Não foi possível verificar atualizações');
      return { hasUpdate: false };
    }

    const versionData = await response.json();
    
    // Comparar versões
    const hasUpdate = compararVersoes(VERSAO_ATUAL, versionData.version);
    
    return {
      hasUpdate,
      currentVersion: VERSAO_ATUAL,
      latestVersion: versionData.version,
      downloadUrl: Platform.OS === 'android' ? versionData.androidUrl : versionData.iosUrl,
      updateMessage: versionData.message || 'Nova versão disponível!',
      releaseNotes: versionData.releaseNotes || [],
      mandatory: versionData.mandatory || false,
    };
  } catch (error) {
    console.log('Erro ao verificar atualizações:', error);
    return { hasUpdate: false };
  }
};

/**
 * Compara duas versões no formato X.Y.Z
 * @returns {boolean} true se newVersion é maior que currentVersion
 */
const compararVersoes = (currentVersion, newVersion) => {
  const current = currentVersion.split('.').map(Number);
  const latest = newVersion.split('.').map(Number);

  for (let i = 0; i < 3; i++) {
    if (latest[i] > current[i]) return true;
    if (latest[i] < current[i]) return false;
  }
  
  return false;
};

/**
 * Verifica atualizações OTA do Expo (Over-The-Air)
 * Funciona apenas em builds publicados, não em desenvolvimento
 */
export const verificarAtualizacaoOTA = async () => {
  try {
    if (__DEV__ || Platform.OS === 'web' || !Updates) {
      return { isAvailable: false };
    }

    const update = await Updates.checkForUpdateAsync();
    
    if (update.isAvailable) {
      return {
        isAvailable: true,
        manifest: update.manifest,
      };
    }
    
    return { isAvailable: false };
  } catch (error) {
    console.log('Erro ao verificar atualização OTA:', error);
    return { isAvailable: false };
  }
};

/**
 * Baixa e aplica atualização OTA
 */
export const aplicarAtualizacaoOTA = async () => {
  try {
    if (__DEV__ || Platform.OS === 'web' || !Updates) {
      return false;
    }

    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
    return true;
  } catch (error) {
    console.log('Erro ao aplicar atualização OTA:', error);
    return false;
  }
};

/**
 * Abre a URL de download do APK
 */
export const abrirDownloadAPK = async (url) => {
  const { Linking } = require('react-native');
  
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
      return true;
    } else {
      console.log('Não foi possível abrir a URL:', url);
      return false;
    }
  } catch (error) {
    console.log('Erro ao abrir URL de download:', error);
    return false;
  }
};
