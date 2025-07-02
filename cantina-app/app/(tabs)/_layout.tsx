import * as Font from 'expo-font'
import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { AuthProvider } from '../auth/authProvider'

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins': require('../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf'),
        'Poppins-Thin': require('../../assets/fonts/Poppins-Thin.ttf'),
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Black': require('../../assets/fonts/Poppins-Black.ttf'),
        'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Italic': require('../../assets/fonts/Poppins-Italic.ttf'),
      })
      setFontsLoaded(true)
    }

    loadFonts()
  }, [])

  if (!fontsLoaded) return null

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: 'Início' }} />
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="produtos" options={{ title: 'Produtos' }} />
        <Stack.Screen name="register" options={{ title: 'Registro' }} />
        <Stack.Screen name="perfil" options={{ title: 'Perfil' }} />
        <Stack.Screen name="carrinho" options={{ title: 'Carrinho' }} />
        <Stack.Screen name="pedidos" options={{ title: 'Meus Pedidos' }} />
      </Stack>
    </AuthProvider>
  )
}