import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { usePathname, useRouter } from 'expo-router';

export default function Footer (){
    const router = useRouter();
    const pathname = usePathname();

    const paginaAtual = !pathname || pathname === '/' ? 'index' : pathname.replace(/^\//, '');

    const getIconColor = (screenName: string) => {
        return pathname === `/${screenName}` ? '#4CAF50' : '#8E8E8E';
    };

    return(
        <View style={style.footerContainer}>
            <TouchableOpacity onPress={() => router.push('/produtos')}>
                <MaterialCommunityIcons name="silverware-variant" size={24} color={getIconColor('produtos')} style={style.iconContainer} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/carrinho')}>
                <MaterialCommunityIcons name="cart" size={24} color={getIconColor('carrinho')} style={style.iconContainer} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>router.push('/pedidos')}>
                <MaterialCommunityIcons name="receipt" size={24} color={getIconColor('pedidos')} style={style.iconContainer} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/perfil')}>
                <MaterialCommunityIcons name="account" size={24} color={getIconColor('perfil')} style={style.iconContainer} />
            </TouchableOpacity>
        </View>
    )
}
const style = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e1e5e9',
    },
    iconContainer: {
        alignItems: 'center',
    }
});