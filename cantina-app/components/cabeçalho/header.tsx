import React from 'react';
import {Image,Text, View, StyleSheet } from 'react-native';

export default function Header(){
    return(
        <>
            <View style={style.cabecalho}>
                <View style={style.logo}>
                    <Image style={{resizeMode: 'contain'}} source={require('../../assets/images/Login/if-icon.png')} />
                </View>
                <Text style={style.titulo}>Cantina</Text>
            </View>
        </>
    )
}
const style = StyleSheet.create({
    logo:{
        padding:15,
        width: 45,
        height: 45,
        borderRadius: 15,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        shadowColor: 'rgba(76, 175, 80, 1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    titulo:{
        paddingLeft:25,
        fontFamily: 'Poppins',
        fontSize: 35,
        textAlign: 'center',
        color: '#4CAF50',
    },
    cabecalho:{
        flex: 1,
        flexGrow:20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e1e5e9',
        borderBottomColor: '#e1e5e9',
        borderBottomWidth: 1,
    }
});