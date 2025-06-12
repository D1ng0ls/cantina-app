import AntDesign from '@expo/vector-icons/AntDesign';
import { Text } from '@react-navigation/elements';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function perfil(){
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
            </View>

        <View style={style.perfil}>
            <button><AntDesign name="back" size={24} color="black" /></button>
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
                    style={style.dadosPerfil}
                    placeholder="Senha"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
             <View style={style.tabelaCartao}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Suas Formas De Pagamento</Text>
                    <View style={style.tabelaCartaoDetalhe}>
                        <Text>Cartão 1</Text>
                        <AntDesign name="creditcard" size={24} color="black" />
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
            <View>
                Seus Pedidos
                <SimpleLineIcons name="notebook" size={24} color="black" />
            </View>
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
        justifyContent: 'space-between',
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
        width: '100%',
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
        height: 52,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        marginVertical: 10,
    },
    perfil:{
        fontFamily: 'Poppins',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    imagem:{
        width: 200,
        height: 200,
    },
    tabelaCartaoDetalhe:{
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
    },
    tabelaCartao: {
        flex: 1,
        marginTop: 20,
    },
    rodape:{
        flexDirection: 'row-reverse',
    }
})