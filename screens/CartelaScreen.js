import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { carregarCartelas, adicionarCartela, removerCartela, limparTodasCartelas } from '../utils/storage';
import { mostrarAlerta, confirmarAcao } from '../utils/alerts';
import MatrizCartela from '../components/MatrizCartela';
import ListaCartelas from '../components/ListaCartelas';

export default function CartelaScreen({ navigation }) {
  const [cartelas, setCartelas] = useState([]);
  const [matriz, setMatriz] = useState(
    Array.from({ length: 5 }, () => Array(5).fill(''))
  );

  useEffect(() => {
    carregarCartelasIniciais();
  }, []);

  const carregarCartelasIniciais = async () => {
    const cartelasCarregadas = await carregarCartelas();
    setCartelas(cartelasCarregadas);
  };

  const alterarNumero = (row, col, valor) => {
    setMatriz(prev => {
      const copia = prev.map(r => [...r]);
      copia[row][col] = valor;
      return copia;
    });
  };

  const handleAddCartela = async () => {
    const numeros = matriz.flat().filter((n, i) => !(i === 12)); // exclui centro
    
    if (numeros.length < 24 || numeros.some(n => n === '')) {
      mostrarAlerta('Atenção', 'Complete todos os números da cartela (exceto o centro)!');
      return;
    }

    const novaLista = await adicionarCartela(numeros.map(n => parseInt(n)));
    setCartelas(novaLista);
    setMatriz(Array.from({ length: 5 }, () => Array(5).fill(''))); // reset matriz
  };

  const handleExcluirCartela = async (index) => {
    confirmarAcao(
      'Confirmar Exclusão',
      `Deseja realmente excluir a Cartela ${index + 1}?`,
      async () => {
        const novaLista = await removerCartela(index);
        setCartelas(novaLista);
      }
    );
  };

  const handleExcluirTodas = async () => {
    if (cartelas.length === 0) {
      mostrarAlerta('Atenção', 'Nenhuma cartela para excluir!');
      return;
    }

    confirmarAcao(
      'Confirmar Exclusão',
      `Deseja realmente excluir todas as ${cartelas.length} cartelas?`,
      async () => {
        await limparTodasCartelas();
        setCartelas([]);
        mostrarAlerta('Sucesso', 'Todas as cartelas foram excluídas!');
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Cartela 5x5</Text>

      <MatrizCartela matriz={matriz} onAlterarNumero={alterarNumero} />

      <Button title="Adicionar Cartela" onPress={handleAddCartela} />

      <ListaCartelas 
        cartelas={cartelas}
        onExcluir={handleExcluirCartela}
        onExcluirTodas={handleExcluirTodas}
      />

      <Button 
        title="Ir para Bingo" 
        onPress={() => navigation.navigate('Bingo', { cartelas })} 
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 20, 
    marginBottom: 10 
  }
});
