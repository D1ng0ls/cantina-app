import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Layout from '@/components/ui/Layout'

export default function Pedidos() {

  const pedidosData = [
    {
      id: 1,
      valor_total: 25.50,
      status: "aberto",
      usuario: {
        id: 1,
        name: "Carlos Silva"
      },
      produtos: [
        {
          id: 1,
          nome: "Coxinha",
          quantidade: 2,
          valor_unitario: 5.00
        },
        {
          id: 2,
          nome: "Suco de Laranja",
          quantidade: 1,
          valor_unitario: 15.50
        },
        {
          id: 3,
          nome: "Energético",
          quantidade: 1,
          valor_unitario: 11.50
        },
        {
          id: 4,
          nome: "Chiclete",
          quantidade: 5,
          valor_unitario: 1
        }
      ]
    },
    {
      id: 2,
      valor_total: 12.00,
      status: "fechado",
      usuario: {
        id: 1,
        name: "Carlos Silva"
      },
      produtos: [
        {
          id: 3,
          nome: "Pão de Queijo",
          quantidade: 3,
          valor_unitario: 4.00
        }
      ]
    },
    {
      id: 3,
      valor_total: 18.00,
      status: "aberto",
      usuario: {
        id: 1,
        name: "Carlos Silva"
      },
      produtos: [
        {
          id: 4,
          nome: "Refrigerante",
          quantidade: 2,
          valor_unitario: 6.00
        },
        {
          id: 5,
          nome: "Brigadeiro",
          quantidade: 2,
          valor_unitario: 3.00
        }
      ]
    },
    {
      id: 4,
      valor_total: 30.00,
      status: "fechado",
      usuario: {
        id: 1,
        name: "Carlos Silva"
      },
      produtos: [
        {
          id: 6,
          nome: "Pastel de Queijo",
          quantidade: 2,
          valor_unitario: 7.50
        },
        {
          id: 7,
          nome: "Suco Natural",
          quantidade: 1,
          valor_unitario: 15.00
        }
      ]
    }
  ]

  interface Usuario {
    id: number
    name: string
  }

  interface Produto {
    id: number
    nome: string
    quantidade: number
    valor_unitario: number
  }

  interface Pedido {
    id: number
    valor_total: number
    status: string
    usuario: Usuario
    produtos: Produto[]
  }

  interface PedidoCardProps {
    pedido: Pedido
    isEven: boolean
  }

  const PedidoCard: React.FC<PedidoCardProps> = ({ pedido, isEven }) => {
    return (
      <View style={[styles.order, isEven ? styles.orderEven : styles.orderOdd]}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderHeaderId}>{pedido.id}</Text>
          <Text style={styles.orderHeaderPrice}>R${pedido.valor_total.toFixed(2)}</Text>
        </View>
        
        <Text  style={styles.orderDate}>Data: 01/01/2025</Text>
        
        <View style={styles.orderFooter}>
          <Text style={styles.orderFooterItem} numberOfLines={1} ellipsizeMode="tail">
            {
              pedido.produtos.map((produto, index) => {
                const isLast = index === pedido.produtos.length - 1
                return `${produto.quantidade}x ${produto.nome}${!isLast ? ', ' : ''}`
              }).join('')
            }
          </Text>
          
          <Ionicons name="eye-outline" size={18} color="#000" style={styles.orderFooterIcon}/>
        </View>
      </View>
    )
  }
  
  return (
    <Layout>  
      <View style={styles.orders}>
        <Text style={styles.ordersTitle}>Seus Pedido</Text>

        <FlatList
          renderItem={({ item, index }) => (
            <PedidoCard pedido={item} isEven={index % 2 === 0} />
          )}    
          keyExtractor={(item) => item.id.toString()}                
          data={pedidosData}        
          style={styles.ordersList}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          removeClippedSubviews={true}
          windowSize={10}
        />
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
    paddingVertical: 60
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
  }
})