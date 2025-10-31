import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CartelaCard({ cartela, numerosSorteados }) {
  return (
    <View style={styles.card}>
      {cartela.map((num, index) => {
        const marcado = numerosSorteados.includes(num);
        return (
          <Text key={index} style={[styles.numero, marcado && styles.marcado]}>
            {num}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginBottom: 10, 
    padding: 5, 
    borderWidth: 1, 
    borderRadius: 5 
  },
  numero: { width: 30, textAlign:'center', margin:2, fontSize:16 },
  marcado: { backgroundColor: '#4caf50', color:'#fff', borderRadius:3 }
});
