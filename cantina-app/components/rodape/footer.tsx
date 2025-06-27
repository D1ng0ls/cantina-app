import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View , StyleSheet} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function Footer (){
    const route = useRoute();
    const navigation = useNavigation();

    const getIconColor = (screenName: string) => {
        return route.name === screenName ? '#4CAF50' : '#8E8E8E';
    };

    const showUnderline = (screenName: string) => {
        return route.name === screenName ? { borderBottomWidth: 3, 
                                            borderBottomColor: '#4CAF50', 
                                            width: 24, 
                                            marginTop: 5, } : {width : 0};
    };

    return(
        <View style={style.footerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Produtos')}>
                <MaterialIcons name="restaurant-menu" size={24} color={getIconColor('Produtos')} style={style.iconContainer} />
                <View style={[{ width: 24, marginTop: 5 }, showUnderline('Produtos')]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
                <Entypo name="shopping-cart" size={24} color={getIconColor('Carrinho')} style={style.iconContainer} />
                <View style={[{ width: 24, marginTop: 5 }, showUnderline('Carrinho')]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                <MaterialCommunityIcons name="account" size={24} color={getIconColor('Perfil')} style={style.iconContainer} />
                <View style={[{ width: 24, marginTop: 5 }, showUnderline('Perfil')]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Pedidos')}>
                <SimpleLineIcons name="notebook" size={24} color={getIconColor('Pedidos')} style={style.iconContainer} />
                <View style={[{ width: 24, marginTop: 5 }, showUnderline('Pedidos')]} />
            </TouchableOpacity>
        </View>
    )
}
const style = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 35,
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