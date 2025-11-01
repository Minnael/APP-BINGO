import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function MatrizCartela({ matriz, onAlterarNumero }) {
  return (
    <>
      {matriz.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((num, j) => (
            <View key={j} style={[styles.cell, i === 2 && j === 2 ? styles.centerCell : null]}>
              {i === 2 && j === 2 ? (
                <Text style={styles.cellText}>⭐</Text>
              ) : (
                <TextInput
                  style={styles.inputCell}
                  value={num.toString()}
                  onChangeText={(text) => onAlterarNumero(i, j, text.replace(/[^0-9]/g, ''))}
                  keyboardType="numeric"
                  maxLength={2}
                />
              )}
            </View>
          ))}
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  row: { 
    flexDirection: 'row' 
  },
  cell: { 
    width: 50, 
    height: 50, 
    borderWidth: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 2, 
    borderRadius: 5 
  },
  centerCell: { 
    backgroundColor: '#ffe066', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  inputCell: { 
    width: '100%', 
    height: '100%', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  cellText: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});
