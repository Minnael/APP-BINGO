import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bingo App</Text>
      <Button title="Cadastrar Cartelas" onPress={() => navigation.navigate('Cartelas')} />
      <Button title="Iniciar Bingo" onPress={() => navigation.navigate('Bingo')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center' },
  title: { fontSize:24, marginBottom:20 }
});
