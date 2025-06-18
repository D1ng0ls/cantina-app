import React, { useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Produtos() {

  const comidasData = [
    {
      id: '1',
      name: 'Item 1',
      description: 'Farinha, ovos e mais ovos',
      price: 5.00,
      image: require('../../assets/images/Produtos/img-1.png'),
      highlighted: false,
    },
    {
      id: '2',
      name: 'Item 2',
      description: 'Farinha, ovos e mais ovos ovos ovos',
      price: 5.00,
      image: require('../../assets/images/Produtos/img-1.png'),
      highlighted: true,
    },
    {
      id: '3',
      name: 'Item 3',
      description: 'Farinha, ovos e mais ovos',
      price: 5.00,
      image: require('../../assets/images/Produtos/img-1.png'),
      highlighted: false,
    },
    {
      id: '4',
      name: 'Item 4',
      description: 'Farinha, ovos e mais ovos',
      price: 5.00,
      image: require('../../assets/images/Produtos/img-1.png'),
      highlighted: true,
    },
    {
      id: '5',
      name: 'Item 5',
      description: 'Farinha, ovos e mais ovos',
      price: 5.00,
      image: require('../../assets/images/Produtos/img-1.png'),
      highlighted: false,
    },
    {
      id: '6',
      name: 'Item 6',
      description: 'Farinha, ovos e mais ovos',
      price: 5.00,
      image: require('../../assets/images/Produtos/img-1.png'),
      highlighted: true,
    },
  ]

  interface ItemType {
    id: string
    name: string
    description: string
    price: number
    image: any
    highlighted: boolean
  }

  interface ItemCardProps {
    item: ItemType
    isEven: boolean
  }

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

  const increaseQuantity = (itemId: string) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }))
  }

  const decreaseQuantity = (itemId: string) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) - 1)
    }))
  }

  const getQuantity = (itemId: string) => {
    return quantities[itemId] || 0
  }

  const ItemCard: React.FC<ItemCardProps> = ({ item, isEven }) => {
    const currentQuantity = getQuantity(item.id)
    
    return (
      <View style={[styles.product, isEven ? styles.productEven : styles.productOdd]}>
        <View style={styles.productImage}>
          <Image source={item.image} style={styles.productImageIn}/>
        </View>
        
        <View style={styles.productInfo}>
          <View style={styles.productInfoOne}>
            <Text style={styles.productName}>{item.name}</Text>
            
            <Text style={styles.productDescription}>{item.description}</Text>
          </View>

          <View style={styles.productInfoTwo}>
            <Text style={styles.productPrice}>R${item.price.toFixed(2)}</Text>

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
                onPress={() => increaseQuantity(item.id)}
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
        <FlatList
          renderItem={({ item, index }) => (
            <ItemCard item={item} isEven={index % 2 === 0} />
          )}
          ListHeaderComponent={() => (
            <Text style={styles.productsTitle}>Comidas</Text>
          )}      
          keyExtractor={(item) => item.id}                
          data={comidasData}                              
          style={styles.productsList}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          removeClippedSubviews={true}
          windowSize={10}
        />
      </View>
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
    marginBottom: 1,
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
})