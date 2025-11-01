# 🔄 Sistema de Atualização Automática - Guia Completo

## 📋 **O QUE FOI IMPLEMENTADO**

Sistema completo de detecção e notificação de atualizações que:
- ✅ Verifica automaticamente ao abrir o app
- ✅ Exibe modal bonito com informações da atualização
- ✅ Permite atualização opcional ou obrigatória
- ✅ Mostra notas de versão (changelog)
- ✅ Abre link para download do novo APK

---

## 🏗️ **ARQUITETURA**

### **Arquivos Criados:**

1. **`utils/updateChecker.js`**
   - Funções de verificação de atualização
   - Comparação de versões
   - Integração com Expo Updates (OTA)

2. **`components/ModalAtualizacao.js`**
   - Modal visual bonito
   - Exibe versão atual vs nova
   - Botões de ação

3. **`version.json`**
   - Arquivo de configuração de versão
   - Deve ser hospedado online

4. **`App.js`** (modificado)
   - Integração do sistema de atualização
   - Verificação ao iniciar

---

## 🚀 **COMO FUNCIONA**

### **1. Ao Abrir o App:**
```
1. App inicia
2. Verifica version.json online
3. Compara com versão atual (app.json)
4. Se houver atualização → Mostra modal
5. Usuário escolhe atualizar ou não
```

### **2. Arquivo version.json:**
```json
{
  "version": "1.1.0",
  "androidUrl": "link-do-apk",
  "message": "Nova versão com melhorias!",
  "mandatory": false,
  "releaseNotes": [...]
}
```

---

## 📝 **CONFIGURAÇÃO NECESSÁRIA**

### **Passo 1: Instalar Dependência**

```bash
npx expo install expo-updates
```

### **Passo 2: Hospedar version.json**

Você precisa hospedar o arquivo `version.json` online. Opções:

#### **Opção A: GitHub (Grátis e Fácil)**

1. Faça commit do `version.json` no seu repositório
2. No GitHub, vá até o arquivo
3. Clique em "Raw"
4. Copie a URL (será algo como):
   ```
   https://raw.githubusercontent.com/Minnael/APP-BINGO/master/version.json
   ```

5. Cole esta URL em `utils/updateChecker.js`:
   ```javascript
   const VERSION_CHECK_URL = 'sua-url-aqui';
   ```

#### **Opção B: Seu Próprio Servidor**
- Hospede o `version.json` em qualquer servidor
- Use a URL do arquivo

#### **Opção C: Firebase Hosting (Grátis)**
- Hospede no Firebase
- Use a URL pública

---

## 🔧 **COMO ATUALIZAR O APP**

### **Quando lançar uma nova versão:**

1. **Atualize `app.json`:**
   ```json
   {
     "expo": {
       "version": "1.1.0"  ← Nova versão
     }
   }
   ```

2. **Atualize `version.json` online:**
   ```json
   {
     "version": "1.1.0",
     "androidUrl": "link-do-novo-apk",
     "message": "🎉 Novidades incríveis na versão 1.1.0!",
     "mandatory": false,
     "releaseNotes": [
       "✨ Funcionalidade X",
       "🐛 Correção Y",
       "🚀 Melhoria Z"
     ]
   }
   ```

3. **Gere novo APK:**
   ```bash
   eas build -p android --profile preview
   ```

4. **Atualize a URL no version.json:**
   - Cole o link do novo APK no campo `androidUrl`

5. **Pronto!** Usuários com versão antiga verão o modal

---

## 📱 **TIPOS DE ATUALIZAÇÃO**

### **Atualização Opcional** (padrão)
```json
{
  "mandatory": false
}
```
- Usuário pode clicar "Mais Tarde"
- Modal pode ser fechado

### **Atualização Obrigatória**
```json
{
  "mandatory": true
}
```
- Usuário DEVE atualizar
- Não pode fechar o modal
- Não pode usar o app sem atualizar

---

## 🎨 **PERSONALIZAR O MODAL**

Edite `components/ModalAtualizacao.js`:

```javascript
// Mudar cores
backgroundColor: '#4CAF50'  // Botão atualizar

// Mudar textos
title: "Nova Atualização Disponível!"

// Mudar ícones
icon: "🎉"  // Pode usar qualquer emoji
```

---

## 🧪 **TESTAR EM DESENVOLVIMENTO**

Por padrão, o sistema NÃO verifica atualizações em modo desenvolvimento.

Para testar:

1. Comente a verificação `if (__DEV__)` em `updateChecker.js`
2. Ou faça um build de produção

---

## 💡 **DICAS IMPORTANTES**

### ✅ **Versionamento Semântico**
```
1.0.0 → 1.0.1 (correção de bugs)
1.0.0 → 1.1.0 (nova funcionalidade)
1.0.0 → 2.0.0 (mudança grande/breaking)
```

### ✅ **Quando Marcar como Obrigatória**
```
mandatory: true quando:
- Correção de segurança crítica
- Bug grave que impede uso
- Mudança na API/backend
```

### ✅ **Notas de Versão**
```
Seja claro e objetivo:
✅ "Sistema de backup automático"
❌ "Melhorias gerais"
```

---

## 🔍 **VERIFICAR MANUALMENTE**

Adicione um botão nas configurações:

```javascript
import { verificarAtualizacao } from './utils/updateChecker';

const handleCheckUpdate = async () => {
  const result = await verificarAtualizacao();
  if (result.hasUpdate) {
    // Mostrar modal
  } else {
    alert('Você já está na versão mais recente!');
  }
};
```

---

## 📊 **FLUXO COMPLETO**

```
┌─────────────────┐
│  Usuário abre   │
│      app        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Verifica       │
│  version.json   │
└────────┬────────┘
         │
         ▼
    ┌───────┐
    │Nova?  │
    └───┬───┘
        │
    ┌───┴───┐
    │ SIM   │ NÃO
    ▼       ▼
┌─────┐  ┌─────┐
│Modal│  │App  │
│Abre │  │Abre │
└─────┘  └─────┘
    │
    ▼
┌─────────┐
│Usuário  │
│escolhe  │
└────┬────┘
     │
┌────┴─────┐
│Atualizar │ Depois
▼          ▼
┌─────┐  ┌─────┐
│Abre │  │Fecha│
│Link │  │Modal│
└─────┘  └─────┘
```

---

## ⚠️ **LIMITAÇÕES**

1. **Requer conexão com internet** para verificar
2. **URL pública** necessária para version.json
3. **Não atualiza automaticamente** - usuário precisa baixar APK
4. **Modo dev** - desabilitado por padrão

---

## 🚀 **PRÓXIMOS PASSOS**

1. ✅ Instale: `npx expo install expo-updates`
2. ✅ Hospede `version.json` no GitHub (ou outro)
3. ✅ Atualize a URL em `updateChecker.js`
4. ✅ Teste fazendo um build
5. ✅ Incremente versão para testar modal

---

## 📚 **RECURSOS**

- Expo Updates: https://docs.expo.dev/versions/latest/sdk/updates/
- Versionamento: https://semver.org/lang/pt-BR/

---

**✨ Sistema de atualização profissional implementado! 🚀**
