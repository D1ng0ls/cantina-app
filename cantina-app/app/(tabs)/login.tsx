import { Ionicons } from '@expo/vector-icons';
import { Text } from '@react-navigation/elements';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function Home() {

  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.login}>
        <View style={styles.loginCircle}>
          <Image source={require('../../assets/images/Login/if-icon.png')} />
        </View>

        <View>
          <Text style={styles.loginTitle}>Cantina APP</Text>
          <Text style={styles.loginSubtitle}>Bem-vindo(a) à sua cantina digital</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.loginLabel}>E-mail</Text>
            <View style={styles.inputWrapper}>
              <Ionicons 
                name="mail-outline" 
                size={20} 
                color="#666" 
                style={styles.inputIcon} 
              />
              <TextInput
                style={styles.loginTextInput}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.loginLabel}>Senha</Text>
            <View style={styles.inputWrapper}>
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#666" 
                  style={styles.inputIcon}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.loginTextInput}
                placeholder="Digite sua senha"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.formButton}>
            <Text style={styles.formButtonText}>ENTRAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  login: {
    fontFamily: 'Poppins',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  loginCircle: {
    width: 70,
    height: 70,
    borderRadius: 15,
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    shadowColor: 'rgba(76, 175, 80, 1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  loginTitle: {
    fontFamily: 'Poppins',
    fontSize: 22,
    fontWeight: 500,
    textAlign: 'center',
    color: '#4CAF50',
  },
  loginSubtitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
    paddingTop: '2%',
    color: '#666'
  },
  form: {
    width: '100%',
    paddingTop: '20%'
  },
  formButton: {
    width: '100%',
    height: 52,
    backgroundColor: 'rgba(76, 175, 80, 1)',
    borderRadius: 12,
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  formButtonText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF'
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    paddingHorizontal: 16,
    height: 52,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    paddingRight: 12,
    paddingVertical: 12
  },
  loginLabel: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 400,
    color: '#666'
  },
  loginTextInput: {
    width: '100%',
    display: 'flex',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 400,
    color: '#666'
  },
});