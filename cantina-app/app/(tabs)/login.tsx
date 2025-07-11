  import { Ionicons } from '@expo/vector-icons'
import { Text } from '@react-navigation/elements'
import { Link, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../hooks/useAuth'

  export default function Login() {

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const [modalVisible, setModalVisible] = useState(false)
      
    const [modalMessage, setModalMessage] = useState('')

    const [loginSuccess, setLoginSuccess] = useState(false)

    const { login, isAuthenticated } = useAuth()
    
    const router = useRouter()
    
    useEffect(() => {
      if (isAuthenticated && !loginSuccess) {
        router.replace('/produtos')
      }
    }, [isAuthenticated])

    const handleLogin = async () => {

      if (!email || !password) {
        setModalMessage('Por favor, preencha todos os campos.')
    
        setModalVisible(true)
    
        return
      }

      try {
        
        let body = {
          'email': email,
          'password': password
        }

        const response = await fetch('https://cantinaapi.dingols.com.br/api/cantina/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(body)
        })

        const data = await response.json()

        if (response.ok) {
          setModalMessage(data.message)
          
          setLoginSuccess(true) 

          setModalVisible(true)

          await login(data.token)
        } 
        else {
          setModalMessage(data.error)
          setModalVisible(true)
        }
      } 
      catch (error) {
        setModalMessage('Erro ao conectar com o servidor.')
        setModalVisible(true)
      }
    }

    const handleCloseModal = () => {
      setModalVisible(false)
      
      if (loginSuccess) {
        setLoginSuccess(false)
        router.replace('/produtos')
      }
    }
    
    return (
      <>
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
              <Text style={styles.loginFormLabel}>E-mail</Text>
              <View style={styles.loginFormWrapper}>
                <Ionicons 
                  name="mail-outline" 
                  size={20} 
                  color="#666" 
                  style={styles.loginFormIcon} 
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
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

            <TouchableOpacity style={styles.loginFormButton} onPress={handleLogin}>
              <Text style={styles.loginFormButtonText}>ENTRAR</Text>
            </TouchableOpacity>
          
            <Text style={styles.loginFormAccount}>Não tem uma conta? <Link style={styles.loginFormAccountLink} href='/register'>Registre-se já!</Link></Text>  
          </View>
        </View>

        {
          modalVisible && (
            <View style={styles.modal}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>{modalMessage}</Text>
                <TouchableOpacity onPress={handleCloseModal} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>FECHAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
      </>
    )
  }

  const styles = StyleSheet.create({
    login: {
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
      paddingTop: '20%'
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
    loginFormIcon: {
      paddingRight: 12,
      paddingVertical: 12
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
      fontFamily: 'Poppins-SemiBold',
      fontSize: 12,
    },
    modal: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, .5)',
    },
    modalContent: {
      width: '80%',
      padding: 20,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      backgroundColor: '#FFF',
    },
    modalText: {
      fontFamily: 'Poppins',
      fontSize: 16,
      marginBottom: 15,
      textAlign: 'center',
      color: '#333',
    },
    modalButton: {
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: '#4CAF50',
    },
    modalButtonText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 14,
      color: '#FFF',
    },
  })