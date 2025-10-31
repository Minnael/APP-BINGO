import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartelaScreen({ navigation }) {
  const [cartelas, setCartelas] = useState([]);
  const [numeroInput, setNumeroInput] = useState('');

  // Carregar cartelas salvas ao iniciar
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem('@cartelas');
        if (json != null) {
          setCartelas(JSON.parse(json));
        }
      } catch (e) {
        console.log('Erro ao carregar cartelas', e);
      }
    })();
  }, []);

  const salvarCartelas = async (novaLista) => {
    try {
      await AsyncStorage.setItem('@cartelas', JSON.stringify(novaLista));
    } catch (e) {
      console.log('Erro ao salvar cartelas', e);
    }
  };

  const addCartela = () => {
    if (numeroInput) {
      const nova = numeroInput.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
      if(nova.length > 0){
        const novaLista = [...cartelas, nova];
        setCartelas(novaLista);
        salvarCartelas(novaLista);  // salva no AsyncStorage
        setNumeroInput('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Cartelas</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite os números separados por vírgula"
        value={numeroInput}
        onChangeText={setNumeroInput}
      />
      <Button title="Adicionar Cartela" onPress={addCartela} />
      <FlatList
        data={cartelas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Text>{item.join(', ')}</Text>
        )}
      />
      <Button title="Ir para Bingo" onPress={() => navigation.navigate('Bingo', { cartelas })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:20, marginBottom:10 },
  input: { borderWidth:1, marginBottom:10, padding:5 }
});
