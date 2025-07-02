import Layout from '@/components/ui/Layout';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';

interface User {
  id: number
  name: string
}

interface Product {
  id: number  
  name: string
  pivot: {
    quantity: number
    value_unitary: string
  }
}

interface Order {
  id: number
  total_value: string
  status: string
  created_at: string
  products: Product[]
}

interface OrderCardProps {
  pedido: Order
  isEven: boolean
}

export default function Pedidos() {

  const { token, isAuthenticated } = useAuth()
  
  const [orders, setOrders] = useState<Order[]>([])

  const [modalVisible, setModalVisible] = useState(false)
  
  const [orderSelected, setOrderSelected] = useState<Order | null>(null)

  const router = useRouter()
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated])

  useEffect(() => {
    
    const fetchOrders = async () => {
      
      if (!token) return

      try {
        
        const response = await fetch('https://cantinaapi.dingols.com.br/api/cantina/orders/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })
  
        const data = await response.json()

        if (response.ok) {
          setOrders(data.orders)
        }
        else {
          console.error('Erro ao buscar pedidos:', data)
        }
      }
      catch (error) {
        console.error('Erro inesperado:', error)
      }
    }

    fetchOrders()
  }, [token])  

  const openOder = (pedido: Order) => {
    setOrderSelected(pedido);
    setModalVisible(true);
  };

  const closeOrder = () => {
    setModalVisible(false);
    setOrderSelected(null);
  };

  const PedidoCard: React.FC<OrderCardProps> = ({ pedido, isEven }) => {
    return (
      <TouchableOpacity
        onPress={() => openOder(pedido)}
        style={[styles.order, isEven ? styles.orderEven : styles.orderOdd]}
      >
        <View style={styles.orderHeader}>
          <Text style={styles.orderHeaderId}>{pedido.id}</Text>
          <Text style={styles.orderHeaderPrice}>R${pedido.total_value}</Text>
        </View>
        
        <Text  style={styles.orderDate}>Data: { new Date(pedido.created_at).toLocaleDateString('pt-BR') }</Text>
        
        <View style={styles.orderFooter}>
          <Text style={styles.orderFooterItem} numberOfLines={1} ellipsizeMode="tail">
            {
              pedido.products.map((produto: Product, index: number) => {
                const isLast = index === pedido.products.length - 1
                return `${produto.pivot.quantity}x ${produto.name}${!isLast ? ', ' : ''}`
              }).join('')
            }
          </Text>
        
          <Ionicons name="eye-outline" size={18} color="#000" style={styles.orderFooterIcon}/>
        </View>
      </TouchableOpacity>
    )
  }

  const statusMap: Record<string, string> = {
    open: 'Aberto',
    awaiting_payment: 'Aguardando pagamento',
    approved: 'Aprovado',
    in_preparation: 'Em preparação',
    ready: 'Pronto',
    canceled: 'Cancelado'
  }
  
  return (
    <Layout>  
      <View style={styles.orders}>
        <Text style={styles.ordersTitle}>Seus Pedido</Text>

        <View style={styles.ordersList}>
          {
            orders.map((pedido, index) => (
              <PedidoCard key={pedido.id} pedido={pedido} isEven={index % 2 === 0} />
            ))
          }
        </View>

        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={closeOrder}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalCard}>
              <Text style={styles.modalCardNumber}>Pedido #{orderSelected?.id}</Text>
              
              <Text style={styles.modalCardStatus}>Status: {statusMap[orderSelected?.status || ''] || orderSelected?.status || 'Desconhecido'}</Text>
              
              <Text style={styles.modalCardValue}>Valor Total: R${parseFloat(orderSelected?.total_value || '0').toFixed(2)}</Text>

              <Text style={styles.modalCardProductTitle}>Produtos:</Text>
              
              <ScrollView style={{ marginTop: 10 }}>
                {
                  orderSelected?.products.map(produto => (
                    <View key={produto.id} style={{ marginBottom: 10 }}>
                      <Text style={styles.modalCardProductText}>{produto.pivot.quantity}x {produto.name}</Text>
                      <Text style={styles.modalCardProductText}>Valor unitário: R${parseFloat(produto.pivot.value_unitary).toFixed(2)}</Text>
                    </View>
                  ))
                }
              </ScrollView>

              <Pressable onPress={closeOrder}>
                <Text style={styles.modalCardButton}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  orders: {
    flex: 1
  },
  ordersTitle: {
    fontFamily: 'Poppins',
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 40
  },
  ordersList: {
    flex: 1,
  },
  order: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 15,
    height: 110
  },  
  orderEven: {
    backgroundColor: 'rgba(50, 152, 77, .1)'
  },
  orderOdd: {
    backgroundColor: 'rgba(50, 152, 77, .5)'
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderHeaderId: {
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  orderHeaderPrice: {
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  orderDate: {
    fontFamily: 'Poppins',
    fontSize: 12,    
  },
  orderFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20
  },
  orderFooterItem: {
    fontFamily: 'Poppins',
    fontSize: 12,   
    lineHeight: 16,
    flexShrink: 1
  },
  orderFooterIcon: {
    marginVertical: 'auto',
    alignItems: 'center'
  },
  modalBackground: {
    flex: 1, 
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)' 
  },
  modalCard: {
    maxHeight: '80%',
    padding: 20, 
    margin: 20, 
    borderRadius: 10, 
    backgroundColor: '#FFF'
  },
  modalCardNumber: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18, 
    lineHeight: 18,
    paddingBottom: 25
  },
  modalCardStatus: {
    fontFamily: 'Poppins',
    fontSize: 13, 
    lineHeight: 16,
  },
  modalCardValue: {
    fontFamily: 'Poppins',
    fontSize: 13, 
    lineHeight: 16,
  },
  modalCardProductTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 14,
    paddingTop: 25,
    paddingBottom: 5
  },
  modalCardProductText: {
    fontFamily: 'Poppins',
    fontSize: 13, 
    lineHeight: 16,
  },
  modalCardButton: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    lineHeight: 13,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 8,
    color: '#FFF',
    backgroundColor: 'rgba(50, 152, 77, .5)'
  }
})