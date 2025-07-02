import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../hooks/useAuth'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: any
  quantity: number
}

interface Category {
  id: number
  name: string
  products: Product[]
}

interface ItemCardProps {
  item: Product
  isEven: boolean
}

export default function Produtos() {

  const { token, isAuthenticated } = useAuth()
  
  const router = useRouter()

  const [categories, setCategories] = useState<Category[]>([])
  
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated])

  useEffect(() => {
    const total = Object.values(quantities).reduce((acc, qty) => acc + qty, 0)
    setModalVisible(total > 0)
  }, [quantities])
   
  useEffect(() => {
    
    const fetchCategories = async () => {

      if (!token) return
        
      const response = await fetch('https://cantinaapi.dingols.com.br/api/cantina/menu', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })

      const data = await response.json()
      
      if (response.ok) {
        setCategories(data)
      }
      else {
        console.error('Erro - ', data)
      }
    }

    fetchCategories()
  }, [token])

  const handleCreateOrder = async () => {
    
    if (!token) return

    try {

      const selectedProducts = Object
      .entries(quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([id, quantity]) => {
        const product = categories.flatMap(c => c.products).find(p => p.id === Number(id))
        return {
          id: product?.id,
          name: product?.name,
          description: product?.description,
          quantity,
          price: product?.price,
          stock: product?.quantity
        }
      })

      await AsyncStorage.setItem('@pedido', JSON.stringify(selectedProducts))

      router.push('/carrinho')
    }
    catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o pedido.')
    }
  }

  const increaseQuantity = (item: Product) => {
    
    const currentQuantity = quantities[item.id] || 0;
    
    const stockQuantity = item.quantity;

    if (currentQuantity < stockQuantity) {
      setQuantities(prev => ({
        ...prev,
        [item.id]: currentQuantity + 1
      }))
    } 
    else {
      Alert.alert('Estoque esgotado', `A quantidade máxima para ${item.name} já foi selecionada.`);
    }
  }

  const decreaseQuantity = (itemId: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) - 1)
    }))
  }

  const getQuantity = (itemId: number) => quantities[itemId] || 0

  const ItemCard: React.FC<ItemCardProps> = ({ item, isEven }) => {
    
    const currentQuantity = getQuantity(item.id)
    
    return (
      <View style={[styles.product, isEven ? styles.productEven : styles.productOdd]}>
        <View style={styles.productImage}>
          {/* <Image source={item.image} style={styles.productImageIn} /> */}
          <Image source={{ uri: item.image }} style={styles.productImageIn} />
        </View>
        
        <View style={styles.productInfo}>
          <View style={styles.productInfoOne}>
            <Text style={styles.productName}>{item.name}</Text>
            
            <Text style={styles.productDescription}>{item.description}</Text>
          </View>

          <View style={styles.productInfoTwo}>
            <Text style={styles.productPrice}>R${Number(item.price).toFixed(2)}</Text>

            <View style={styles.productCart}>
              <TouchableOpacity 
                style={[styles.productButtonLess, isEven ? styles.productButtonLessEven : styles.productButtonLessOdd]}
                onPress={() => decreaseQuantity(item.id)}
              >
                <Text style={styles.productButtonLessText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.productCartNumber}>{currentQuantity}</Text>

              <TouchableOpacity 
                style={[styles.productButtonPlus, isEven ? styles.productButtonPlusEven : styles.productButtonPlusOdd]}
                onPress={() => increaseQuantity(item)}
              >
                <Text style={styles.productButtonPlusText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
  
  return (
    <>  
      <View style={styles.products}>
        {
          categories.map((category) => (
            <FlatList
              key={category.id}
              data={category.products}                              
              keyExtractor={(item) => item.id.toString()}                
              renderItem={({ item, index }) => (
                <ItemCard item={item} isEven={index % 2 === 0} />
              )}
              ListHeaderComponent={() => (
                <Text style={styles.productsTitle}>{category.name}</Text>
              )}      
              style={styles.productsList}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              removeClippedSubviews={true}  
              windowSize={10}
            />
          ))
        }
      </View>

      {
        modalVisible && (
          <TouchableOpacity onPress={handleCreateOrder} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>FINALIZAR PEDIDO</Text>
          </TouchableOpacity>
        )
      }
    </>
  )
}

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  products: {
    flex: 1
  },
  productsTitle: {
    fontFamily: 'Poppins',
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 60
  },
  productsList: {
    flex: 1,
  },
  product: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    height: 110
  },  
  productEven: {
    backgroundColor: 'rgba(50, 152, 77, .1)'
  },
  productOdd: {
    backgroundColor: 'rgba(50, 152, 77, .5)'
  },
  productImage: {
    width: 110,
    height: 110,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#FFF'
  },
  productImageIn: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    padding: 10
  },
  productInfo: {
    width: screenWidth - 110,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    padding: 15,
  },
  productInfoOne: {
    width: '70%',
    flex: 1,
  },
  productInfoTwo: {
    width: '30%',
    flexDirection: 'column',
  },
  productName: {
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  productPrice: {
    fontFamily: 'Poppins',
    fontSize: 16,
    textAlign: 'right',
  },
  productDescription: {
    fontFamily: 'Poppins',
    fontSize: 12
  },
  productCart: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 'auto',
    marginRight: 15,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  productCartNumber: {
    fontFamily: 'Poppins',
    fontSize: 13,
    lineHeight: 13
  },
  productButtonLess: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  productButtonLessEven: {
    borderColor: 'rgba(50, 152, 77, .4)'
  },
  productButtonLessOdd: {
    borderColor: 'rgba(50, 152, 77, 1)'
  },
  productButtonLessText: {
    fontFamily: 'Poppins',
    fontSize: 13,
    lineHeight: 13,
  },
  productButtonPlus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  productButtonPlusEven: {
    borderColor: 'rgba(50, 152, 77, .4)'
  },
  productButtonPlusOdd: {
    borderColor: 'rgba(50, 152, 77, 1)'
  },
  productButtonPlusText: {
    fontFamily: 'Poppins',
    fontSize: 13,
    lineHeight: 13,
  },
  modalButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -0.5 * 250 }],
    width: 250,    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  modalButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFF',
  },
})