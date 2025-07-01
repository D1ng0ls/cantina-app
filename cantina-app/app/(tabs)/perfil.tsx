import AntDesign from '@expo/vector-icons/AntDesign';
import { Text } from '@react-navigation/elements';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Layout from '@/components/ui/Layout'

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        nome: 'Bruno Takeo Açano',
        email: 'lucario123@gmail.com',
        senha: '12345678',
        cartao: '1234',
    }
];

export default function Perfil() {

    const [showPassword, setShowPassword] = useState(false);

    const [user, setUser] = useState(DATA[0]);

    type Field = 'nome' | 'email' | 'senha' | 'cartao';

    const [editMode, setEditMode] = useState({
        nome: false,
        email: false,
        senha: false,
        cartao: false,
    });

    const handleEdit = (field: Field) => {
        setEditMode((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };
    return (
        <Layout>
            <ScrollView contentContainerStyle={style.perfil} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={style.inicio}>
                    <Link href='/'>
                        <TouchableOpacity>
                            <AntDesign name="arrowleft" size={24} color="#4CAF50" />
                        </TouchableOpacity>
                    </Link>

                    <View>
                        <Image source={require('../../assets/images/Perfil/perfil.jpg')} style={style.imagem} />
                    </View>
                </View>
                <View style={style.areaTabela}>
                    <View style={style.tabelaDados}>
                        <TextInput
                            value={user.nome}
                            style={style.dadosPerfilNome}
                            placeholder="Usuario"
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={editMode.nome}
                            onChangeText={(text) => setUser({ ...user, nome: text })}
                        />
                    </View>
                    <TouchableOpacity style={style.buttonEdit} onPress={() => handleEdit('nome')}>
                        <FontAwesome name="pencil" size={24} color={editMode.nome ? '#4CAF50' : 'black'} />
                    </TouchableOpacity>
                </View>
                <View style={style.areaTabela}>
                    <View style={style.tabelaDados}>
                        <TextInput
                            value={user.email}
                            style={style.dadosPerfil}
                            placeholder="Email"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={editMode.email}
                            onChangeText={(text) => setUser({ ...user, email: text })}
                        />
                    </View>
                    <TouchableOpacity style={style.buttonEdit} onPress={() => handleEdit('email')}>
                        <FontAwesome name="pencil" size={24} color={editMode.email ? '#4CAF50' : 'black'} />
                    </TouchableOpacity>
                </View>
                <View style={style.areaTabela}>
                    <View style={style.tabelaDados}>
                        <TextInput
                            style={[style.dadosPerfil, { flex: 1 }]}
                            placeholder="Senha"
                            placeholderTextColor="#999"
                            value={user.senha}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={editMode.senha}
                            onChangeText={(text) => setUser({ ...user, senha: text })}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            accessibilityLabel="Mostrar ou ocultar senha"
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <AntDesign name={showPassword ? "eyeo" : "eye"} size={20} color="gray" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={style.buttonEdit} onPress={() => handleEdit('senha')}>
                        <FontAwesome name="pencil" size={24} color={editMode.senha ? '#4CAF50' : 'black'} />
                    </TouchableOpacity>
                </View>
                <View style={style.tabelaCartao}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Suas Formas De Pagamento</Text>
                    <View style={style.tabelaCartaoDetalhe}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <AntDesign name="creditcard" size={24} color="black" style={{ marginRight: 8 }} />
                            <Text style={{ marginRight: 8 }}>Cartão 1</Text>
                            <TextInput
                                value={user.cartao}
                                style={style.dadosPerfil}
                                placeholder="Final: 0000"
                                placeholderTextColor="#999"
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={editMode.cartao}
                                onChangeText={(text) => setUser({ ...user, cartao: text })}
                            />
                            <TouchableOpacity style={style.buttonEdit_1} onPress={() => handleEdit('cartao')}>
                                <FontAwesome name="pencil" size={24} color={editMode.cartao ? '#4CAF50' : 'black'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={style.pedidosList}>
                    <Text>Seus Pedidos</Text>
                    <SimpleLineIcons name="notebook" size={35} color="black" />
                </View>
            </ScrollView>
        </Layout>
    );
}
const style = StyleSheet.create({
    header: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e1e5e9',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    texto: {
        color: '#4CAF50',
        fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'Poppins',
        textAlign: 'center',
    },
    areaTabela: {
        flexDirection: 'row',
        paddingLeft: 50
    },
    inicio: {
        flexDirection: 'row',
        paddingRight: 20,
    },
    dadosPerfil: {
        width: 110,
        display: 'flex',
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '400',
        color: '#666',
    },
    dadosPerfilNome: {
        width: 220,
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
    buttonEdit: {
        paddingLeft: 20,
        paddingTop: 24
    },
    buttonEdit_1: {
        paddingLeft: 5,
    },
    perfil: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        paddingBottom: 40,
    },
    imagem: {
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
    pedidosList: {
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
        borderRadius: 12,
    },
    rodape: {
        flexDirection: 'row-reverse',
    }
})