import { Ionicons } from '@expo/vector-icons';
import { Text } from '@react-navigation/elements';
import { Link, Stack } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function Register() {

  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.login}>
        <View style={styles.loginLogo}>
          <Image source={require('../../assets/images/Login/if-icon.png')} />
        </View>

        <View>
          <Text style={styles.loginTitle}>Cantina APP</Text>
          <Text style={styles.loginSubtitle}>Bem-vindo(a) à sua cantina digital</Text>
        </View>

        <View style={styles.loginForm}>
          <View style={styles.loginFormContainer}>
            <Text style={styles.loginFormLabel}>Nome</Text>
            <View style={styles.loginFormWrapper}>
              <Ionicons 
                name="person-circle-outline" 
                size={20} 
                color="#666" 
                style={styles.loginFormIcon} 
              />
              <TextInput
                style={styles.loginFormInput}
                placeholder="Digite seu nome"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.loginFormContainer}>
            <Text style={styles.loginFormLabel}>E-mail</Text>
            <View style={styles.loginFormWrapper}>
              <Ionicons 
                name="mail-outline" 
                size={20} 
                color="#666" 
                style={styles.loginFormIcon} 
              />
              <TextInput
                style={styles.loginFormInput}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          
          <View style={styles.loginFormContainer}>
            <Text style={styles.loginFormLabel}>Prontuário</Text>
            <View style={styles.loginFormWrapper}>
              <Ionicons 
                name="grid-outline" 
                size={20} 
                color="#666" 
                style={styles.loginFormIcon} 
              />
              <TextInput
                style={styles.loginFormInput}
                placeholder="Digite seu prontuário"
                placeholderTextColor="#999"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.loginFormContainer}>
            <Text style={styles.loginFormLabel}>Senha</Text>
            <View style={styles.loginFormWrapper}>
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#666" 
                  style={styles.loginFormIcon}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.loginFormInput}
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

          <TouchableOpacity style={styles.loginFormButton}>
            <Text style={styles.loginFormButtonText}>ENTRAR</Text>
          </TouchableOpacity>

          <Text style={styles.loginFormAccount}>Já tem uma conta? <Link style={styles.loginFormAccountLink} href='/login'>Entre!</Link></Text>
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
  loginLogo: {
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
  loginForm: {
    width: '100%',
    paddingTop: '15%'
  },
  loginFormButton: {
    width: '100%',
    height: 52,
    backgroundColor: 'rgba(76, 175, 80, 1)',
    borderRadius: 12,
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  loginFormButtonText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF'
  },
  loginFormContainer: {
    marginBottom: 25,
  },
  loginFormWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    paddingRight: 16,
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
  loginFormIcon: {
    padding: 12,
  },
  loginFormLabel: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 400,
    color: '#666'
  },
  loginFormInput: {
    width: '100%',
    display: 'flex',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 400,
    color: '#666'
  },
  loginFormAccount: {
    fontFamily: 'Poppins',
    fontSize: 12,
    paddingTop: 5,
    marginLeft: 'auto'
  },
   loginFormAccountLink: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: 'bold'
  }
});