import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartelaCard from '../components/CartelaCard';

export default function BingoScreen({ route }) {
  const [cartelas, setCartelas] = useState([]);
  const [numerosSorteados, setNumerosSorteados] = useState([]);
  const [numeroInput, setNumeroInput] = useState('');

  // Carregar cartelas do Storage
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem('@cartelas');
        if(json != null) {
          setCartelas(JSON.parse(json));
        } else if(route.params?.cartelas){
          setCartelas(route.params.cartelas);
        }
      } catch(e){
        console.log('Erro ao carregar cartelas', e);
      }
    })();
  }, []);

  const adicionarNumero = () => {
    const numero = parseInt(numeroInput);
    if(!numero || numero < 1 || numero > 75){
      Alert.alert('Digite um número válido entre 1 e 75!');
      return;
    }
    if(numerosSorteados.includes(numero)){
      Alert.alert('Número já registrado!');
      return;
    }

    const novosNumeros = [...numerosSorteados, numero];
    setNumerosSorteados(novosNumeros);
    setNumeroInput('');

    // Verifica cartelas vencedoras
    cartelas.forEach((cartela, index) => {
      const venceu = cartela.every(n => novosNumeros.includes(n));
      if(venceu){
        Alert.alert(`Cartela ${index + 1} bateu! 🎉`);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bingo!</Text>

      <View style={{flexDirection:'row', marginBottom:10, alignItems:'center'}}>
        <TextInput
          style={styles.input}
          placeholder="Digite o número sorteado"
          value={numeroInput}
          onChangeText={setNumeroInput}
          keyboardType="numeric"
        />
        <Button title="Registrar" onPress={adicionarNumero} />
      </View>

      <Text style={styles.ultimo}>
        Números sorteados: {numerosSorteados.join(', ')}
      </Text>

      <FlatList
        data={cartelas}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item}) => (
          <CartelaCard cartela={item} numerosSorteados={numerosSorteados} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:24, marginBottom:10, textAlign:'center' },
  ultimo: { fontSize:16, marginVertical:10, textAlign:'center' },
  input: { borderWidth:1, flex:1, marginRight:5, padding:5 }
});
