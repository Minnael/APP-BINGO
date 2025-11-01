import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { carregarCartelas, carregarNumerosSorteados, salvarNumerosSorteados, limparNumerosSorteados } from '../utils/storage';
import { mostrarAlerta, confirmarAcao } from '../utils/alerts';
import CartelaCard from '../components/CartelaCard';

export default function BingoScreen({ route }) {
  const [cartelas, setCartelas] = useState([]);
  const [numerosSorteados, setNumerosSorteados] = useState([]);
  const [numeroInput, setNumeroInput] = useState('');

  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  const carregarDadosIniciais = async () => {
    // Carregar cartelas
    const cartelasCarregadas = await carregarCartelas();
    if (cartelasCarregadas.length > 0) {
      setCartelas(cartelasCarregadas);
    } else if (route.params?.cartelas) {
      setCartelas(route.params.cartelas);
    }

    // Carregar números sorteados
    const numerosSalvos = await carregarNumerosSorteados();
    if (numerosSalvos.length > 0) {
      setNumerosSorteados(numerosSalvos);
    }
  };

  const adicionarNumero = async () => {
    const numero = parseInt(numeroInput);
    
    if (!numero || numero < 1 || numero > 75) {
      mostrarAlerta('Erro', 'Digite um número válido entre 1 e 75!');
      return;
    }
    
    if (numerosSorteados.includes(numero)) {
      mostrarAlerta('Atenção', 'Número já registrado!');
      return;
    }

    const novosNumeros = [...numerosSorteados, numero];
    setNumerosSorteados(novosNumeros);
    setNumeroInput('');

    // Salvar no storage
    await salvarNumerosSorteados(novosNumeros);

    verificarVencedores(novosNumeros);
  };

  const verificarVencedores = (numeros) => {
    cartelas.forEach((cartela, index) => {
      const venceu = cartela.every(n => numeros.includes(n));
      if (venceu) {
        mostrarAlerta('BINGO! 🎉', `Cartela ${index + 1} bateu!`);
      }
    });
  };

  const resetarJogo = () => {
    if (numerosSorteados.length === 0) {
      mostrarAlerta('Atenção', 'Não há números sorteados para limpar!');
      return;
    }

    confirmarAcao(
      'Reiniciar Jogo',
      `Deseja realmente limpar todos os ${numerosSorteados.length} números sorteados e reiniciar o jogo?`,
      async () => {
        setNumerosSorteados([]);
        setNumeroInput('');
        await limparNumerosSorteados();
        mostrarAlerta('Sucesso', 'Jogo reiniciado! Boa sorte! 🎲');
      }
    );
  };

  const recarregarCartelas = async () => {
    confirmarAcao(
      'Recarregar Cartelas',
      'Deseja recarregar as cartelas do armazenamento? Os números sorteados serão mantidos.',
      async () => {
        const cartelasCarregadas = await carregarCartelas();
        if (cartelasCarregadas.length > 0) {
          setCartelas(cartelasCarregadas);
        } else if (route.params?.cartelas) {
          setCartelas(route.params.cartelas);
        }
        mostrarAlerta('Sucesso', 'Cartelas recarregadas!');
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bingo!</Text>
        <View style={styles.botoesAcao}>
          <TouchableOpacity onPress={recarregarCartelas} style={styles.btnRecarregar}>
            <Text style={styles.txtBtnAcao}>🔄 Cartelas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetarJogo} style={styles.btnResetar}>
            <Text style={styles.txtBtnAcao}>🔄 Reiniciar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o número sorteado"
          value={numeroInput}
          onChangeText={setNumeroInput}
          keyboardType="numeric"
        />
        <Button title="Registrar" onPress={adicionarNumero} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.numerosSorteados}>
          Números sorteados ({numerosSorteados.length}): {numerosSorteados.join(', ') || 'Nenhum'}
        </Text>
        <Text style={styles.cartelasInfo}>
          {cartelas.length} {cartelas.length === 1 ? 'cartela' : 'cartelas'} no jogo
        </Text>
      </View>

      <FlatList
        data={cartelas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.cartelaWrapper}>
            <Text style={styles.cartelaLabel}>Cartela {index + 1}</Text>
            <CartelaCard cartela={item} numerosSorteados={numerosSorteados} />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.semCartelas}>Nenhuma cartela cadastrada. Volte e cadastre cartelas!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#333'
  },
  botoesAcao: {
    flexDirection: 'row',
    gap: 8
  },
  btnRecarregar: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5
  },
  btnResetar: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5
  },
  txtBtnAcao: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  inputContainer: { 
    flexDirection: 'row', 
    marginBottom: 10, 
    alignItems: 'center' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1, 
    marginRight: 5, 
    padding: 8,
    fontSize: 16
  },
  infoContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15
  },
  numerosSorteados: { 
    fontSize: 14, 
    marginBottom: 5,
    color: '#333',
    fontWeight: '500'
  },
  cartelasInfo: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic'
  },
  cartelaWrapper: {
    marginBottom: 15
  },
  cartelaLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555'
  },
  semCartelas: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 50,
    fontStyle: 'italic'
  }
});
