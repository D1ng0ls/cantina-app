import Layout from '@/components/ui/Layout';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '@react-navigation/elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';

type ItemProps = {
    id: number,
    name: string, 
    quantity: number, 
    price: string,
    isEven: boolean,
    onEdit: () => void
}

export default function Carrinho(){

    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    
    const [products, setProducts] = useState<any[]>([])
    
    const [modalVisible, setModalVisible] = useState(false)
    
    const { token, isAuthenticated } = useAuth()

    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
          router.replace('/login')
        }
    }, [isAuthenticated])

    useEffect(() => {

        const fetchOrder = async () => {

            if (!token) return
            
            try {
                
                const stored = await AsyncStorage.getItem('@pedido')
            
                if (stored) {
                    const parsed = JSON.parse(stored)
                    setProducts(parsed)
                }
            } 
            catch (error) {
                console.error('Erro ao buscar pedido local', error)
            }
        }

        fetchOrder()
    }, [])

    const handleCreateOrder = async () => {
        
        if (!token) return

        try {

            const formattedProducts = products.map(product => ({
                id: product.id,
                quantity: product.quantity
            }))

            const body = {
                products: formattedProducts
            }

            const response = await fetch('https://cantinaapi.dingols.com.br/api/cantina/orders', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(body)
            })

            const data = await response.json()

            if (response.ok) {
                await AsyncStorage.removeItem('@pedido')

                Alert.alert('Sucesso', 'Pedido criado com sucesso!', [
                    {
                        text: 'OK',
                        onPress: () => router.replace('/pedidos')
                    }
                ])
            } 
            else {
                Alert.alert('Erro ao criar pedido.')
            }
        } 
        catch (error) {
            Alert.alert('Erro', 'Erro ao conectar com o servidor.')
        }
    }


    const updateQuantity = (delta: number) => {
        setSelectedProduct((prev: any) => {
            const newQuantity = prev.quantity + delta

            if (newQuantity < 1) return { ...prev, quantity: 1 }

            if (newQuantity > prev.stock) {
                Alert.alert('Estoque insuficiente', 'Você já selecionou a quantidade máxima disponível em estoque.')
                return prev
            }

            return { ...prev, quantity: newQuantity }
        })
    }

    const handleEdit = (item: any) => {
        setSelectedProduct(item)
        setModalVisible(true)
    }

    const confirmUpdate = async () => {
        const updated = products.map(prod =>
            prod.id === selectedProduct.id ? selectedProduct : prod
        )
        
        setProducts(updated)
    
        await AsyncStorage.setItem('@carrinho', JSON.stringify(updated))

        setModalVisible(false)
    }

    const handleDelete = async (id: number) => {
        const updated = products.filter(item => item.id !== id)
     
        setProducts(updated)
     
        await AsyncStorage.setItem('@carrinho', JSON.stringify(updated))
    }

    const quantityItems = products.reduce((sum, p) => sum + p.quantity, 0)

    const total = products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toFixed(2)

    const Item = ({ id, name, quantity, price, isEven, onEdit }: ItemProps) => (
        <View style={[style.item, isEven ? style.itemEven : style.itemOdd]}>
            <View style={style.itemHeader}>
                <Text style={style.itemName}>{name}</Text>
                
                <Text style={style.itemQuantity}>{quantity}x</Text>
                
                <Text style={style.itemPrice}>R${price}</Text>
            </View>

            <View style={style.itemBottom}>
                <TouchableOpacity style={style.itemBottomButton} onPress={onEdit}>
                    <Ionicons
                        name="pencil"
                        size={20}
                        color="#000"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={style.itemBottomButton} onPress={() => handleDelete(id)}>
                    <Ionicons
                        name="trash"
                        size={20}
                        color="#D54A4A"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )

    return(
        <Layout>
            {
                products.length ? (
                    <ScrollView contentContainerStyle={style.main}>
                        <Text style={style.nPedido}>Carrinho</Text>
                        
                        <FlatList
                            data={products}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (
                                <Item 
                                    id={item.id}
                                    name={item.name} 
                                    quantity={item.quantity} 
                                    price={item.price} 
                                    isEven={index % 2 === 0}
                                    onEdit={() => handleEdit(item)}
                                />
                            )}
                            style={style.productsList}
                            scrollEnabled={false}
                        />
                        
                         <LinearGradient
                            colors={['#F2F2F2', '#32984D', '#F2F2F2']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={style.linha}
                        />

                        <View style={style.resultado}>
                            <Text style={style.resultadoText}>Total:</Text>
                            
                            <Text style={style.resultadoText}>{`${quantityItems} ${quantityItems > 1 ? 'Itens' : 'Item'}`}</Text>
                            
                            <Text style={style.resultadoText}>R${total}</Text>
                        </View>
                        
                        <LinearGradient
                            colors={['#F2F2F2', '#32984D', '#F2F2F2']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={style.linha}
                        />
                        
                        <Text style={style.bottomTitle}>Formas de Pagamento</Text>
                        
                        <View style={style.bottomWaysToPay}>
                            <TouchableOpacity>
                                <AntDesign name="creditcard" size={30} color="#32984D" />
                            </TouchableOpacity>
                            
                            <TouchableOpacity>
                                <FontAwesome6 name="pix" size={30} color="#32984D" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={style.buttonConfirm} onPress={handleCreateOrder}>
                            <Text style={style.buttonConfirmText}>REALIZAR PEDIDO</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    
                ) : (
                    <View style={style.emptyCart}>
                        <Text style={style.emptyCartText}>Seu carrinho está vazio!</Text>
                        <Link href="/produtos" style={style.emptyCartButton}>COMPRAR AGORA</Link>
                    </View>
                )
            }

            {
                modalVisible && selectedProduct && (
                    <View style={style.modalBackground}>
                        <View style={style.modal}>
                        
                            <Text style={style.modalTitle}>{selectedProduct.name}</Text>
                            
                            <Text style={style.modalDescription}>{selectedProduct.description}</Text>

                            <View style={style.modalQuantity}>
                                <TouchableOpacity onPress={() => updateQuantity(-1)}>
                                    <Text style={style.modalQuantityButton}>-</Text>
                                </TouchableOpacity>

                                <Text style={style.modalQuantityButtonText}>{selectedProduct.quantity}</Text>

                                <TouchableOpacity onPress={() => updateQuantity(1)}>
                                    <Text style={style.modalQuantityButton}>+</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={confirmUpdate} style={style.modalButtonConfirm}>
                                <Text style={style.modalButtonText}>ATUALIZAR</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setModalVisible(false)} style={style.modalButtonClose}>
                                <Text style={style.modalButtonText}>FECHAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        </Layout>
    )
}

const screenHeight = Dimensions.get('window').height

const style = StyleSheet.create({
    main: {
        fontFamily: 'Poppins',
        flexGrow: 1,
        paddingVertical: 20,
        alignItems: 'center',
        paddingBottom: 40
    },
    item: {
        width: '100%',
        flex: 1,
        height: 110,
        paddingTop: 15,
        paddingBottom: 10,
        paddingHorizontal: 15
    },
    itemEven: {
        backgroundColor: 'rgba(50, 152, 77, .1)'
    },
    itemOdd: {
        backgroundColor: 'rgba(50, 152, 77, .5)'
    },
    productsList: {
        width: '100%',
        marginBottom: 20
    },
    itemName: {
        width: '60%',
        fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 18
    },
    itemQuantity: {
        width: '10%',
        fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 18,
        textAlign: 'center'
    },
    itemPrice: {
        width: '30%',
        fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 18,
        textAlign: 'right'
    },
    itemHeader: {
        width: '100%',
        height: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemBottom: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15,
        marginTop: 'auto',
    },
    itemBottomButton: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultado: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 70,
        paddingHorizontal: 40
    },
    resultadoText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        lineHeight: 16,
        color: '#666'
    },
    linha: {
        width: '100%',
        height: 1,
        marginVertical: 20,
    },
    nPedido: {
        fontFamily: 'Poppins',
        fontSize: 24,
        textAlign: 'center',
        paddingVertical: 40
    },
    bottomTitle: {
        fontFamily: 'Poppins',
        fontSize: 20,
        lineHeight: 24,
        paddingVertical: 20,
        color: '#666'
    },
    bottomWaysToPay: {
        flexDirection: 'row', 
        gap: 25
    },
    emptyCart: {
        height: screenHeight - 128,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyCartText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24,
        lineHeight: 28,
        paddingBottom: 20,
        color: '#666'
    },
    emptyCartButton: {
        width: 250,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        lineHeight: 16,
        paddingVertical: 15,
        alignItems: 'center',
        textAlign: 'center',
        elevation: 5,
        borderRadius: 8,
        shadowRadius: 8,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        color: '#FFF',
        backgroundColor: '#4CAF50',
    },
    modalBackground: {
        position: 'absolute',
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        width: '80%',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 40,
        paddingHorizontal: 40,
        backgroundColor: '#FFF',
    },
    modalTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20, 
        lineHeight: 24,
        paddingBottom: 8
    },
    modalDescription: {
        fontFamily: 'Poppins',
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 16,
    },
    modalQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    modalQuantityButton: {
        fontSize: 24,
        paddingHorizontal: 12,
        color: '#32984D'
    },
    modalQuantityButtonText: {
        fontFamily: 'Poppins',
        fontSize: 18,
        lineHeight: 18,
        marginHorizontal: 10
    },
    modalButtonConfirm: {
        width: 180,
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#4CAF50',
    },
    modalButtonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        lineHeight: 14,
        color: '#fff',
    },
    modalButtonClose: {
        width: 180,
        marginTop: 10,
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#D54A4A', 
    },
     buttonConfirm: {
        width: 180,
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 40,
        backgroundColor: '#4CAF50',
    },
    buttonConfirmText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        lineHeight: 14,
        color: '#fff',
    },
})