import AntDesign from '@expo/vector-icons/AntDesign';
import { Text } from '@react-navigation/elements';
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function Perfil(){
      const [password, setPassword] = useState('')
    
      const [showPassword, setShowPassword] = useState(false)
    return(
        <>
            <View style={style.header}>
                    <Image source={require('../../assets/images/Perfil/ifsp_logo.png')} style={style.icon} />
                    <Text style={style.texto}>Cantina</Text>
                    <TouchableOpacity>
                        <AntDesign name="search1" size={24} color="#4CAF50" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Entypo name="menu" size={24} color="#4CAF50" />
                    </TouchableOpacity>
            </View>
             <ScrollView contentContainerStyle={style.perfil} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <Link href='/'>
                    <TouchableOpacity>
                        <AntDesign name="arrowleft" size={24} color="#4CAF50" />
                    </TouchableOpacity>
                </Link>
                
                <View>
                    <Image source={require('../../assets/images/Perfil/perfil.jpg')} style={style.imagem}/>
                </View>

                <View style={style.tabelaDados}>
                    <TextInput
                        style={style.dadosPerfil}
                        placeholder="Nome Completo"
                        placeholderTextColor="#999"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View style={style.tabelaDados}>
                    <TextInput
                        style={style.dadosPerfil}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View style={style.tabelaDados}>
                    <TextInput
                        style={[style.dadosPerfil, { flex: 1 }]}
                        placeholder="Senha"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TouchableOpacity 
                        onPress={() => setShowPassword(!showPassword)}
                        accessibilityLabel="Mostrar ou ocultar senha"
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                        <AntDesign name={showPassword ? "eyeo" : "eye"} size={20} color="gray" />
                    </TouchableOpacity>
                </View>
                <View style={style.tabelaCartao}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Suas Formas De Pagamento</Text>
                <View style={style.tabelaCartaoDetalhe}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <AntDesign name="creditcard" size={24} color="black" style={{ marginRight: 8 }} />
                    <Text style={{ marginRight: 8 }}>Cartão 1</Text>
                    <TextInput
                        style={style.dadosPerfil}
                        placeholder="Final: 0000"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    </View>
                </View>
                </View>
                <View style={style.pedidosList}>
                    <Text>Seus Pedidos</Text>
                    <SimpleLineIcons name="notebook" size={24} color="black" />
                </View>
            </ScrollView>
            <View style={style.rodape}>
                <Image source={require('../../assets/images/Perfil/ifsp_logo.png')} style={style.icon} />
            </View>
        </>
    );
}
const style = StyleSheet.create({
    header:{
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e1e5e9',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 10,
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
    dadosPerfil: {
        display: 'flex',
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '400',
        color: '#666',
    },
    tabelaDados: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e1e5e9',
        paddingHorizontal: 16,
        height: 60,
        width: 250,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        marginVertical: 10,
    },
    perfil:{
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        paddingBottom: 40,
    },
    imagem:{
        width: 200,
        height: 200,
    },
    tabelaCartao: {
        width: 250,
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 5,
    },

    tabelaCartaoDetalhe: {
        width: 250,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e1e5e9',
        padding: 10,
    },
    pedidosList:{
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
        borderRadius: 12,
    },
    rodape:{
        flexDirection: 'row-reverse',
    }
})