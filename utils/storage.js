import AsyncStorage from '@react-native-async-storage/async-storage';

const CARTELAS_KEY = '@cartelas';
const NUMEROS_SORTEADOS_KEY = '@numeros_sorteados';

export const carregarCartelas = async () => {
  try {
    const json = await AsyncStorage.getItem(CARTELAS_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.log('Erro ao carregar cartelas:', e);
    return [];
  }
};

export const salvarCartelas = async (cartelas) => {
  try {
    await AsyncStorage.setItem(CARTELAS_KEY, JSON.stringify(cartelas));
    return true;
  } catch (e) {
    console.log('Erro ao salvar cartelas:', e);
    return false;
  }
};

export const adicionarCartela = async (novaCartela) => {
  const cartelas = await carregarCartelas();
  const novaLista = [...cartelas, novaCartela];
  await salvarCartelas(novaLista);
  return novaLista;
};

export const removerCartela = async (index) => {
  const cartelas = await carregarCartelas();
  const novaLista = cartelas.filter((_, i) => i !== index);
  await salvarCartelas(novaLista);
  return novaLista;
};

export const limparTodasCartelas = async () => {
  await salvarCartelas([]);
  return [];
};

// Funções para gerenciar números sorteados
export const carregarNumerosSorteados = async () => {
  try {
    const json = await AsyncStorage.getItem(NUMEROS_SORTEADOS_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.log('Erro ao carregar números sorteados:', e);
    return [];
  }
};

export const salvarNumerosSorteados = async (numeros) => {
  try {
    await AsyncStorage.setItem(NUMEROS_SORTEADOS_KEY, JSON.stringify(numeros));
    return true;
  } catch (e) {
    console.log('Erro ao salvar números sorteados:', e);
    return false;
  }
};

export const adicionarNumeroSorteado = async (numero) => {
  const numeros = await carregarNumerosSorteados();
  if (!numeros.includes(numero)) {
    const novosNumeros = [...numeros, numero];
    await salvarNumerosSorteados(novosNumeros);
    return novosNumeros;
  }
  return numeros;
};

export const limparNumerosSorteados = async () => {
  await salvarNumerosSorteados([]);
  return [];
};
