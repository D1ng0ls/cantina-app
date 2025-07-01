import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { Text } from '@react-navigation/elements';
import { ScrollView } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { FlatList, Image, StyleSheet, TouchableOpacity, View, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Footer from '@/components/rodape/footer';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Item 1',
    qtd: 1,
    valor: '5,00',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Item 2',
    qtd: 1,
    valor: '5,00',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Item 3',
    qtd: 1,
    valor: '5,00',
  },
  {
    id: 'bdouahfhafiiajfi8128eg2iu1d1hduo12h2',
    title: 'Item 4',
    qtd: 1,
    valor: '5,00',
  },
];

type ItemProps = {title: string, qtd: number, valor: string};

const Item = ({title, qtd, valor}: ItemProps) => (
  <View style={style.item}>
    <Text style={style.title}>{title}</Text>
    <View style={style.title_2}>
        <Text>{qtd}x</Text>
        <Text style={{marginLeft:20}}>R${valor}</Text>
    </View>
  </View>
);

const qtdMax = DATA.length;

const calcularValorTotal = () => {
  let total = 0;
  DATA.forEach(item => {
    const valorNumerico = parseFloat(item.valor.replace(',', '.'));
    total += valorNumerico * item.qtd;
  });
  return total.toFixed(2).replace('.', ',');
};

export default function Carrinho(){
    return(
        <>
            <View style={style.header}>
                <Image source={require('../../assets/images/Perfil/ifsp_logo.png')} style={style.icon} />
                <Text style={style.texto}>Cantina</Text>
            </View>
            <ScrollView contentContainerStyle={style.main}>
                <View style={style.inicio}>
                    <Link href='/'>
                        <TouchableOpacity>
                            <AntDesign name="arrowleft" size={35} color="#4CAF50" />
                        </TouchableOpacity>
                    </Link>
                    <Text style={style.nPedido}>Número do Pedido 12345</Text>
                </View>
                <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Item title={item.title} qtd={item.qtd} valor={item.valor} />
                )}
                scrollEnabled={false}
                />
                <View style={style.resultado}>
                    <Text style={{fontSize:16}}>Total</Text>
                    <Text style={{fontSize:16}}>{qtdMax} Itens</Text>
                    <Text style={{fontSize:16}}>R${calcularValorTotal()}</Text>
                </View>
                <LinearGradient
                    colors={['#FFFFFF', '#32984D', '#FFFFFF']}
                    style={style.linha}
                />
                <Text style={{fontSize:24, textAlign:'center'}}>
                    Formas de Pagamento
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap:20 , marginTop: 20 }}>
                    <TouchableOpacity>
                        <AntDesign name="creditcard" size={48} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome6 name="pix" size={48} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome6 name="money-bills" size={48} color="black" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Layout>
    )
}
const style = StyleSheet.create({
    main:{
        backgroundColor: '#ffffff',
        fontFamily: 'Poppins',
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
        paddingBottom: 40,
    },
    icon:{
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    texto:{
        color: '#4CAF50',
        fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'Poppins',
        textAlign: 'center',
    },
    container: {
        flex: 1,
    },
    item: {
        flex:1,
        flexDirection: "row",
        backgroundColor: '#32984DC4',
        width: 320,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    inicio:{
        flexDirection:"row"
    },
    title: {
        fontSize: 16,
    },
    title_2:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    resultado:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    linha: {
        height: 2,
        width: '50%',
        marginVertical: 20,
        borderRadius: 2,
    },
    nPedido: {
        fontSize: 25,
        textAlign:'center'  
    },
    rodape:{
        flexDirection: 'row-reverse',
    }
})