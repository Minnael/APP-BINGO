import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ListaCartelas({ cartelas, onExcluir, onExcluirTodas }) {
  if (cartelas.length === 0) {
    return <Text style={styles.nenhumaCartela}>Nenhuma cartela cadastrada</Text>;
  }

  return (
    <View style={styles.cartelasSection}>
      <View style={styles.headerCartelas}>
        <Text style={styles.cartelasTitulo}>Cartelas Salvas ({cartelas.length}):</Text>
        <TouchableOpacity onPress={onExcluirTodas} style={styles.btnExcluirTodas}>
          <Text style={styles.txtExcluirTodas}>🗑️ Excluir Todas</Text>
        </TouchableOpacity>
      </View>

      {cartelas.map((cartela, index) => (
        <View key={index} style={styles.cartelaItem}>
          <View style={styles.cartelaInfo}>
            <Text style={styles.cartelaNumero}>Cartela {index + 1}</Text>
            <Text style={styles.cartelaNumeros}>{cartela.join(', ')}</Text>
          </View>
          <TouchableOpacity 
            onPress={() => onExcluir(index)} 
            style={styles.btnExcluir}
          >
            <Text style={styles.txtExcluir}>🗑️</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cartelasSection: { 
    width: '100%', 
    marginTop: 20, 
    marginBottom: 20 
  },
  headerCartelas: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 10 
  },
  cartelasTitulo: { 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  btnExcluirTodas: { 
    backgroundColor: '#ff4444', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 5 
  },
  txtExcluirTodas: { 
    color: '#fff', 
    fontSize: 12, 
    fontWeight: 'bold' 
  },
  nenhumaCartela: { 
    textAlign: 'center', 
    color: '#888', 
    fontStyle: 'italic', 
    marginVertical: 20,
    width: '100%'
  },
  cartelaItem: { 
    flexDirection: 'row', 
    backgroundColor: '#f5f5f5', 
    padding: 10, 
    marginBottom: 8, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ddd',
    alignItems: 'center' 
  },
  cartelaInfo: { 
    flex: 1 
  },
  cartelaNumero: { 
    fontWeight: 'bold', 
    fontSize: 14, 
    marginBottom: 4,
    color: '#333'
  },
  cartelaNumeros: { 
    fontSize: 11, 
    color: '#666',
    flexWrap: 'wrap'
  },
  btnExcluir: { 
    backgroundColor: '#ff6666', 
    padding: 8, 
    borderRadius: 5, 
    marginLeft: 10 
  },
  txtExcluir: { 
    fontSize: 18 
  }
});
