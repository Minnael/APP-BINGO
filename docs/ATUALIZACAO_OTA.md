# 🚀 Sistema de Atualização OTA (Over-The-Air)

## ✅ **Como Funciona Agora**

### **Atualização Automática Sem Baixar APK**

O app agora usa o sistema **OTA do Expo**, que permite atualizações automáticas diretamente no aplicativo instalado, **sem precisar baixar um novo APK**!

---

## 📡 **Fluxo de Atualização OTA**

```
1. Você faz alterações no código
2. Você publica a atualização: `eas update --branch production`
3. O app instalado verifica atualizações ao abrir
4. Se houver atualização, mostra um modal
5. Usuário clica "Atualizar Agora"
6. App baixa a atualização em background
7. App reinicia automaticamente com a nova versão
```

---

## 🔧 **Comandos Importantes**

### **Publicar Nova Atualização OTA**
```powershell
eas update --branch production --message "Descrição da atualização"
```

### **Ver Histórico de Atualizações**
```powershell
eas update:list --branch production
```

### **Verificar Status**
```powershell
eas update:view [UPDATE_ID]
```

---

## ⚙️ **Configuração Atual**

### **App.js**
- ✅ Verifica atualizações OTA ao iniciar
- ✅ Mostra modal quando há atualização disponível
- ✅ Baixa e aplica atualização automaticamente
- ✅ Reinicia o app após aplicar

### **app.json**
```json
"updates": {
  "fallbackToCacheTimeout": 0,
  "url": "https://u.expo.dev/1e6cd7b7-ff3d-4f69-ab47-9cad9c895c53"
},
"runtimeVersion": {
  "policy": "appVersion"
}
```

---

## 📋 **Quando Usar Cada Tipo**

### **Atualização OTA** (eas update)
✅ Mudanças em JavaScript/React
✅ Correções de bugs
✅ Novos recursos sem código nativo
✅ Mudanças de UI/UX
✅ Alterações de texto

### **Nova Build APK** (eas build)
⚠️ Mudança de ícone/splash screen
⚠️ Mudança de permissões
⚠️ Adição de bibliotecas nativas
⚠️ Mudança no app.json (nome, package, etc.)
⚠️ Atualização de dependências nativas

---

## 🎯 **Vantagens do OTA**

1. ⚡ **Rápido**: Atualização em segundos
2. 🔄 **Automático**: Sem precisar ir à Play Store
3. 💾 **Leve**: Baixa apenas o código alterado
4. 🎯 **Instantâneo**: Todos os usuários recebem imediatamente
5. 🔙 **Reversível**: Pode voltar para versão anterior

---

## 📱 **Testando a Atualização**

### **1. Instale a versão anterior**
```powershell
# Instale o APK da v1.1.0 no seu celular
```

### **2. Publique uma atualização OTA**
```powershell
eas update --branch production --message "Teste OTA"
```

### **3. Abra o app**
- O modal de atualização aparecerá automaticamente
- Clique em "Atualizar Agora"
- Aguarde o download (alguns segundos)
- O app reiniciará com a nova versão

---

## 🐛 **Troubleshooting**

### **Atualização não aparece?**
1. Certifique-se que o APK foi buildado com `eas build`
2. Verifique se o branch é o mesmo: `production`
3. O app não detecta updates em modo desenvolvimento (`__DEV__ === true`)
4. Aguarde alguns minutos após publicar

### **Como forçar verificação?**
- Feche o app completamente
- Abra novamente
- A verificação acontece no `useEffect` inicial

---

## 📊 **Versão Atual**

- **Versão do App**: 1.2.0
- **Sistema OTA**: Ativado ✅
- **Branch**: production
- **Última Atualização**: [Data do último `eas update`]

---

## 🔗 **Links Úteis**

- [Dashboard EAS](https://expo.dev/accounts/minnael/projects/bingo-app)
- [Documentação OTA](https://docs.expo.dev/eas-update/introduction/)
- [Histórico de Updates](https://expo.dev/accounts/minnael/projects/bingo-app/updates)
