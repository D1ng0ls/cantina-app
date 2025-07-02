// app/auth/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage'

const TOKEN_KEY = 'token'

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token)
  } 
  catch (error) {
    console.error('Erro ao salvar token:', error)
  }
}

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY)
    return token
  } 
  catch (error) {
    console.error('Erro ao buscar token: ', error)
    return null
  }
}

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY)
  } 
  catch (error) {
    console.error('Erro ao remover token: ', error)
  }
}

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getToken()
  return !!token
}
