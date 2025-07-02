import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function Index() {
  return (
    <View>
      <Text>Tela principal</Text>

      <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 18 }}>
        Texto com fonte Poppins
      </Text>

      <Link href='/login'>Logar</Link>
      <Link href='/perfil'>Perfil</Link>
      <Link href='/register'>Registrar</Link>
      <Link href='/produtos'>Produtos</Link>
      <Link href='/carrinho'>Carrinho</Link>
      <Link href='/pedidos'>Pedidos</Link>
    </View>
  )
}