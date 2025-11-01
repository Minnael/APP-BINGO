import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ModalAtualizacao({ 
  visible, 
  onClose, 
  onUpdate, 
  updateInfo 
}) {
  if (!updateInfo) return null;

  const { 
    currentVersion, 
    latestVersion, 
    updateMessage, 
    releaseNotes = [],
    mandatory = false 
  } = updateInfo;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={mandatory ? null : onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.icon}>🎉</Text>
            <Text style={styles.title}>Nova Atualização Disponível!</Text>
          </View>

          <View style={styles.versaoContainer}>
            <View style={styles.versaoBox}>
              <Text style={styles.versaoLabel}>Versão Atual</Text>
              <Text style={styles.versaoNumero}>{currentVersion}</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
            <View style={styles.versaoBox}>
              <Text style={styles.versaoLabel}>Nova Versão</Text>
              <Text style={styles.versaoNumeroNova}>{latestVersion}</Text>
            </View>
          </View>

          <Text style={styles.mensagem}>{updateMessage}</Text>

          {releaseNotes.length > 0 && (
            <View style={styles.notasContainer}>
              <Text style={styles.notasTitle}>📝 Novidades:</Text>
              <ScrollView style={styles.notasScroll} showsVerticalScrollIndicator={false}>
                {releaseNotes.map((nota, index) => (
                  <View key={index} style={styles.notaItem}>
                    <Text style={styles.notaBullet}>•</Text>
                    <Text style={styles.notaTexto}>{nota}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {mandatory && (
            <View style={styles.obrigatorioContainer}>
              <Text style={styles.obrigatorioTexto}>
                ⚠️ Esta atualização é obrigatória
              </Text>
            </View>
          )}

          <View style={styles.botoesContainer}>
            <TouchableOpacity 
              style={styles.btnAtualizar}
              onPress={onUpdate}
            >
              <Text style={styles.txtBtnAtualizar}>
                ⬇️ Atualizar Agora
              </Text>
            </TouchableOpacity>

            {!mandatory && (
              <TouchableOpacity 
                style={styles.btnDespois}
                onPress={onClose}
              >
                <Text style={styles.txtBtnDespois}>
                  Mais Tarde
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  versaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  versaoBox: {
    alignItems: 'center',
  },
  versaoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  versaoNumero: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  versaoNumeroNova: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  arrow: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  mensagem: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  notasContainer: {
    marginBottom: 20,
  },
  notasTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  notasScroll: {
    maxHeight: 150,
  },
  notaItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 5,
  },
  notaBullet: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 8,
    fontWeight: 'bold',
  },
  notaTexto: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  obrigatorioContainer: {
    backgroundColor: '#fff3cd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffc107',
  },
  obrigatorioTexto: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
    fontWeight: '600',
  },
  botoesContainer: {
    gap: 12,
  },
  btnAtualizar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  txtBtnAtualizar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnDespois: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  txtBtnDespois: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});
