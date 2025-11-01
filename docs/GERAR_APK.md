# 📱 Guia Completo: Como Gerar APK do Bingo App

## 🎯 Método Recomendado: EAS Build (Expo Application Services)

### ✅ Pré-requisitos
- Conta Expo (gratuita): https://expo.dev/signup
- EAS CLI instalado ✓ (já instalado)

---

## 🚀 PASSO A PASSO

### 1️⃣ Fazer Login no Expo
```bash
eas login
```
- Digite seu email/username
- Digite sua senha

### 2️⃣ Configurar o Projeto (Primeira Vez)
```bash
eas build:configure
```
- Selecione "All" quando perguntar sobre plataformas
- Confirme as configurações

### 3️⃣ Gerar o APK
```bash
eas build -p android --profile preview
```

**O que acontece:**
- 📤 Código é enviado para servidores do Expo
- 🔨 Build é feito na nuvem
- ⏱️ Aguarde ~10-15 minutos
- 📥 Link para download do APK será gerado

### 4️⃣ Baixar o APK
- Ao final, você receberá um link
- Ou acesse: https://expo.dev/accounts/[seu-usuario]/projects/bingo-app/builds
- Baixe o APK e instale no celular

---

## 📦 OPÇÃO 2: Build Local (Sem Conta Expo)

⚠️ **Mais complexo, requer:**
- Android Studio instalado
- Java JDK configurado
- Variáveis de ambiente Android SDK

### Comandos:
```bash
# 1. Instalar dependências
npm install -g eas-cli

# 2. Gerar arquivos nativos
npx expo prebuild --platform android

# 3. Build local
cd android
./gradlew assembleRelease

# APK estará em: android/app/build/outputs/apk/release/app-release.apk
```

---

## 🎨 OPÇÃO 3: Expo Go (Apenas Teste)

Para testar rapidamente no celular **SEM gerar APK:**

```bash
# No computador
npx expo start

# No celular
1. Instale o app "Expo Go" (Play Store)
2. Escaneie o QR Code que aparecer
3. O app será carregado no Expo Go
```

⚠️ **Limitação:** Funciona apenas com Expo Go instalado

---

## 🏗️ BUILDS CONFIGURADOS

O arquivo `eas.json` já está configurado com 3 perfis:

### 📱 **preview** (Recomendado para testes)
```bash
eas build -p android --profile preview
```
- Gera **APK** (fácil de instalar)
- Para distribuição interna/teste
- Não vai para Play Store

### 🚀 **production** (Para publicar)
```bash
eas build -p android --profile production
```
- Gera **AAB** (Android App Bundle)
- Para publicar na Play Store
- Formato oficial do Google

### 🔧 **development**
```bash
eas build -p android --profile development
```
- Build de desenvolvimento
- Com debugging ativado

---

## 📱 Como Instalar o APK no Celular

1. **Baixe o APK** do link fornecido pelo EAS
2. **Transfira para o celular** (USB, email, Drive, etc.)
3. **Ative "Fontes Desconhecidas":**
   - Configurações → Segurança → Permitir instalação de fontes desconhecidas
4. **Abra o arquivo APK** e instale

---

## 🔑 Informações do App

- **Nome:** Bingo App
- **Package:** com.minnael.bingoapp
- **Versão:** 1.0.0
- **Version Code:** 1

---

## 🆘 Problemas Comuns

### ❌ "EAS Build failed"
- Verifique se há erros no código
- Execute: `npx expo doctor` para diagnosticar

### ❌ "No EAS account"
- Certifique-se de ter feito login: `eas login`
- Crie uma conta em: https://expo.dev/signup

### ❌ "APK não instala no celular"
- Verifique se permitiu "Fontes Desconhecidas"
- Tente desinstalar versão antiga primeiro

---

## 💡 Dicas

✅ **Primeira vez:** Use perfil `preview` para testar
✅ **Atualizações:** Incremente a versão em `app.json`
✅ **Grátis:** Expo oferece builds gratuitos (com limite mensal)
✅ **Histórico:** Veja todos os builds em expo.dev

---

## 📚 Recursos

- 📖 Documentação EAS: https://docs.expo.dev/build/introduction/
- 🎓 Tutorial Vídeo: https://www.youtube.com/watch?v=LE4Mgkrf7Sk
- 💬 Fórum Expo: https://forums.expo.dev/

---

## ⚡ Comandos Rápidos

```bash
# Login
eas login

# Build APK (preview)
eas build -p android --profile preview

# Build AAB (produção)
eas build -p android --profile production

# Ver status dos builds
eas build:list

# Informações do projeto
eas project:info
```

---

**✨ Boa sorte com seu app de Bingo! 🎲🎉**
