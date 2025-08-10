import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem } from '../types';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  deliveryPrice: number;
  paymentMethod: 'cash' | 'mobile_money';
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
  };
  items: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }>;
}

interface OrderState {
  orders: Order[];
}

type OrderAction =
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: Order['status'] } }
  | { type: 'LOAD_ORDERS'; payload: Order[] };

interface OrderContextType extends OrderState {
  addOrder: (order: Omit<Order, 'id' | 'date'>) => string;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  getUserOrders: (userId: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'ADD_ORDER':
      const newOrders = [...state.orders, action.payload];
      localStorage.setItem('fybyShop_orders', JSON.stringify(newOrders));
      return { ...state, orders: newOrders };
    
    case 'UPDATE_ORDER_STATUS':
      const updatedOrders = state.orders.map(order =>
        order.id === action.payload.id
          ? { ...order, status: action.payload.status }
          : order
      );
      localStorage.setItem('fybyShop_orders', JSON.stringify(updatedOrders));
      return { ...state, orders: updatedOrders };
    
    case 'LOAD_ORDERS':
      return { ...state, orders: action.payload };
    
    default:
      return state;
  }
};

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, { orders: [] });

  React.useEffect(() => {
    const savedOrders = localStorage.getItem('fybyShop_orders');
    if (savedOrders) {
      try {
        const orders = JSON.parse(savedOrders);
        dispatch({ type: 'LOAD_ORDERS', payload: orders });
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    }
  }, []);

  const addOrder = (orderData: Omit<Order, 'id' | 'date'>): string => {
    const order: Order = {
      ...orderData,
      id: `CMD${Date.now()}`,
      date: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_ORDER', payload: order });
    
    // Envoyer message WhatsApp automatiquement
    sendWhatsAppMessage(order);
    
    return order.id;
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id, status } });
  };

  const getUserOrders = (userId: string): Order[] => {
    // Pour la démo, on retourne toutes les commandes
    // En production, filtrer par userId
    return state.orders;
  };

  const sendWhatsAppMessage = (order: Order) => {
    const deliveryType = order.customerInfo.address ? 'Livraison' : 'Retrait en magasin';
    
    let addressInfo = '';
    if (order.customerInfo.address) {
      addressInfo = `🏠 *Adresse de livraison:*
${order.customerInfo.address.street}
${order.customerInfo.address.city}, ${order.customerInfo.address.postalCode}
${order.customerInfo.address.country}`;
    } else {
      addressInfo = `🏪 *Retrait en magasin*
Adresse du magasin: 123 Avenue des Champs-Élysées, 75008 Paris`;
    }

    const message = `🛒 *Nouvelle commande fybyShop*

#${order.customerInfo.firstName}${order.customerInfo.lastName}#

👤 *Client:* ${order.customerInfo.firstName} ${order.customerInfo.lastName}
📧 *Email:* ${order.customerInfo.email}
📱 *Téléphone:* ${order.customerInfo.phone}

${addressInfo}

📦 *Produits commandés:*
${order.items.map(item => `• ${item.name} x${item.quantity} - ${(item.price * 655).toLocaleString('fr-FR')} FCFA`).join('\n')}

💰 *Total:* ${order.total.toLocaleString('fr-FR')} FCFA
🚚 *${deliveryType}:* ${order.deliveryPrice === 0 ? 'Gratuite' : `${order.deliveryPrice.toLocaleString('fr-FR')} FCFA`}
💳 *Paiement:* ${order.paymentMethod === 'cash' ? 'À la livraison' : 'Mobile Money'}

📋 *Commande #${order.id}*`;

    const whatsappUrl = `https://wa.me/22952353484?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <OrderContext.Provider value={{
      ...state,
      addOrder,
      updateOrderStatus,
      getUserOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};