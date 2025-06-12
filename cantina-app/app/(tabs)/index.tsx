import * as Font from 'expo-font';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function HomeScreen() {

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
    <>
      <View>
        <Text>Tela principal</Text>

        <Text style={{ fontFamily: 'Poppins', fontSize: 18 }}>
          Texto com fonte Poppins
        
        </Text>
        
        <Link href='/login'>Logar</Link>
        
        <Link href='/register'>Registrar</Link>

        <Link href='/produtos'>Produtos</Link>
      </View>
    </>
  );
}