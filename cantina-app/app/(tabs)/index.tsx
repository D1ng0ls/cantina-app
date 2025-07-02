import * as Font from 'expo-font';
import { Link, useNavigation} from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Produtos from './produtos';
import Carrinho from './carrinho';
import Perfil from './perfil';
import Pedidos from './pedidos';
import { createStaticNavigation } from '@react-navigation/native';

export default function HomeScreen() {

  const navigation = useNavigation();

  const RootStack = createNativeStackNavigator({
  initialRouteName: 'Tarefas',
  screens: {
    HomeScreen,
    teste:Perfil,
    },
  });

  const Navigation = createStaticNavigation(RootStack);
  
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) return null;

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