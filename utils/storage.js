import AsyncStorage from '@react-native-async-storage/async-storage';

const CARTELAS_KEY = '@cartelas';

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
