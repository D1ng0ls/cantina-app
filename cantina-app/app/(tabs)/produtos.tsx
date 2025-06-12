import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Produtos() {

  const comidasData = [
    {
      id: '1',
      name: 'Item 1',
      price: 5.00,
      image: require('../../assets/images/Produtos/img-1.png'),
      highlighted: false,
    },
    {
      id: '2',
      name: 'Item 2',
      price: 5.00,
      image: require('../../assets/images/Produtos/img-1.png'),
      highlighted: true,
    },
    {
      id: '3',
      name: 'Item 3',
      price: 5.00,
      image: require('../../assets/images/Produtos/img-1.png'),
      highlighted: false,
    },
    {
      id: '4',
      name: 'Item 4',
      price: 5.00,
      image: require('../../assets/images/Produtos/img-1.png'),
      highlighted: true,
    },
    {
      id: '5',
      name: 'Item 5',
      price: 5.00,
      image: require('../../assets/images/Produtos/img-1.png'),
      highlighted: false,
    },
    {
      id: '6',
      name: 'Item 6',
      price: 5.00,
      image: require('../../assets/images/Produtos/img-1.png'),
      highlighted: true,
    },
  ];

  interface ItemType {
    id: string;
    name: string;
    price: number;
    image: any;
    highlighted: boolean;
  }

  interface ItemCardProps {
    item: ItemType;
    isEven: boolean;
  }

  const ItemCard: React.FC<ItemCardProps> = ({ item, isEven }) => (
    <View style={[styles.product, isEven ? styles.productEven : styles.productOdd]}>
      <View style={styles.productImage}>
        <Image source={item.image} style={styles.productImageIn}/>
      </View>

      <View style={styles.productLine}></View>
      
      <View style={styles.productInfo}>
        <Text>{item.name}</Text>

        <View>
          <Text>R${item.price.toFixed(2)}</Text>
          
          <TouchableOpacity style={styles.productInfoArea}>
            <Ionicons name="bag" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  
  return (
    <>
      <SafeAreaView>
        <FlatList
          data={comidasData}                              
          keyExtractor={(item) => item.id}                
          renderItem={({ item, index }) => (
            <ItemCard item={item} isEven={index % 2 === 0} />
          )}
          showsVerticalScrollIndicator={false}           
        />
      </SafeAreaView>
    </>
  )
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  product: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 1
  },
  productEven: {
    backgroundColor: 'rgba(50, 152, 77, 0.1)'
  },
  productOdd: {
    backgroundColor: 'rgba(50, 152, 77, 0.5)'
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
    objectFit: 'cover',
    padding: 10
  },
  productLine: {
    width: '100%',
    height: 2,
    position: 'absolute',
    bottom: -1,
    backgroundColor: 'rgba(50, 152, 77, 0.1)',
    zIndex: 1
  },
  productInfo: {
    width: screenWidth - 110,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
    padding: 15,
  },
  productInfoArea: {
    marginTop: 'auto',
    marginLeft: 'auto'
    // backgroundColor: 'blue',
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  }
});