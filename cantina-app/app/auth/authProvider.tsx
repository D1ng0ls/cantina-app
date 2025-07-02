import React, { createContext, useEffect, useState } from 'react'
import { getToken, removeToken, saveToken } from './auth'

type AuthContextType = {
  token: string | null
  isAuthenticated: boolean
  // isLoading: boolean
  login: (token: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  // isLoading: true,
  login: async () => {},
  logout: async () => {}
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [token, setToken] = useState<string | null>(null)

  // const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await getToken()
      setToken(savedToken)
      // setIsLoading(false)
    }

    loadToken()
  }, [])

  const login = async (newToken: string) => {
    await saveToken(newToken)
    setToken(newToken)
  }

  const logout = async () => {
    await removeToken()
    setToken(null)
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
    {/* <AuthContext.Provider value={{ token, isAuthenticated, isLoading, login, logout }}> */}
      { children }
    </AuthContext.Provider>
  )
}
