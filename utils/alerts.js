import { Alert, Platform } from 'react-native';

export const mostrarAlerta = (titulo, mensagem) => {
  if (Platform.OS === 'web') {
    window.alert(mensagem || titulo);
  } else {
    Alert.alert(titulo, mensagem);
  }
};

export const confirmarAcao = (titulo, mensagem, onConfirm) => {
  if (Platform.OS === 'web') {
    const confirmacao = window.confirm(mensagem);
    if (confirmacao && onConfirm) {
      onConfirm();
    }
  } else {
    Alert.alert(
      titulo,
      mensagem,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: onConfirm,
          style: 'destructive'
        }
      ]
    );
  }
};
