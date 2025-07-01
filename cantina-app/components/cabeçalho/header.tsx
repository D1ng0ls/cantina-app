import React from 'react';
import {Image,Text, View, StyleSheet } from 'react-native';

export default function Header(){
    return(
        <>
            <View style={style.cabecalho}>
                {/* <View style={style.logo}>
                    <Image style={{resizeMode: 'contain'}} source={require('../../assets/images/Login/if-icon.png')} />
                </View> */}
                <Text style={style.titulo}>IFSP - Cantina</Text>
            </View>
        </>
    )
}
const style = StyleSheet.create({
    logo:{
        width: 40,
        height: 40,
        borderRadius: 10,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#4CAF50',
    },
    titulo:{
        fontFamily: 'Poppins',
        fontSize: 28,
        textAlign: 'center',
        color: '#4CAF50',
    },
    cabecalho:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#fff',
        borderBottomColor: '#e1e5e9',
        borderBottomWidth: 1,
        position: 'absolute',
        width: '100%',
        top: 0,
        paddingVertical: 10,
        zIndex: 10,
    }
});