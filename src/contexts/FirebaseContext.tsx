import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { firebaseAuth, firebaseDB, isFirebaseConfigured } from '../lib/firebase';

// Types
interface UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  } | null;
  preferences: {
    newsletter: boolean;
    smsNotifications: boolean;
    emailNotifications: boolean;
  };
  createdAt: any;
  updatedAt: any;
}

interface Order {
  id: string;
  userId: string;
  items: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  deliveryPrice: number;
  paymentMethod: 'cash' | 'mobile_money';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
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
    } | null;
  };
  createdAt: any;
  updatedAt: any;
}

interface FirebaseContextType {
  // Auth
  user: User | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  
  // Auth methods
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  
  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  getUserOrders: () => Promise<Order[]>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<boolean>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Écouter les changements d'authentification
  useEffect(() => {
    if (!isFirebaseConfigured || !firebaseAuth) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      console.log('🔥 Auth state changed:', user?.email);
      setUser(user);
      
      if (user) {
        // Charger le profil utilisateur
        await loadUserProfile(user.uid);
        // Charger les commandes
        await loadUserOrders(user.uid);
      } else {
        setUserProfile(null);
        setOrders([]);
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Charger le profil utilisateur
  const loadUserProfile = async (uid: string): Promise<void> => {
    if (!firebaseDB) return;

    try {
      const userDoc = await getDoc(doc(firebaseDB, 'users', uid));
      if (userDoc.exists()) {
        const profileData = userDoc.data() as UserProfile;
        setUserProfile(profileData);
        console.log('✅ User profile loaded:', profileData);
      } else {
        console.warn('⚠️ No user profile found for uid:', uid);
      }
    } catch (error) {
      console.error('❌ Error loading user profile:', error);
    }
  };

  // Charger les commandes utilisateur
  const loadUserOrders = async (uid: string): Promise<void> => {
    if (!firebaseDB) return;

    try {
      const ordersQuery = query(
        collection(firebaseDB, 'orders'),
        where('userId', '==', uid),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(ordersQuery);
      const userOrders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      
      setOrders(userOrders);
      console.log('✅ Orders loaded:', userOrders.length);
    } catch (error) {
      console.error('❌ Error loading user orders:', error);
    }
  };

  // Connexion
  const login = async (email: string, password: string): Promise<boolean> => {
    if (!firebaseAuth) {
      console.error('❌ Firebase Auth not configured');
      return false;
    }

    try {
      console.log('🔐 Attempting login for:', email);
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log('✅ Login successful for:', userCredential.user.email);
      return true;
    } catch (error: any) {
      console.error('❌ Login error:', error.code, error.message);
      // Throw the error with Firebase error code for better error handling
      const firebaseError = new Error(error.code || 'auth/unknown-error');
      throw firebaseError;
    }
  };

  // Inscription
  const register = async (userData: RegisterData): Promise<boolean> => {
    if (!firebaseAuth || !firebaseDB) {
      console.error('❌ Firebase not configured');
      return false;
    }

    try {
      console.log('📝 Attempting registration for:', userData.email);
      
      // Créer le compte
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth, 
        userData.email, 
        userData.password
      );
      
      // Mettre à jour le profil
      await updateProfile(userCredential.user, {
        displayName: `${userData.firstName} ${userData.lastName}`
      });

      // Créer le document utilisateur avec des règles de sécurité appropriées
      const userProfile: UserProfile = {
        uid: userCredential.user.uid,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        address: null, // Initialiser à null au lieu d'undefined
        preferences: {
          newsletter: true,
          smsNotifications: false,
          emailNotifications: true
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(firebaseDB, 'users', userCredential.user.uid), userProfile);
      
      console.log('✅ Registration successful');
      return true;
    } catch (error: any) {
      console.error('❌ Registration error:', error.code, error.message);
      // Throw the error with Firebase error code for better error handling
      const firebaseError = new Error(error.code || 'auth/unknown-error');
      throw firebaseError;
    }
  };

  // Déconnexion
  const logout = async (): Promise<void> => {
    if (!firebaseAuth) return;

    try {
      await signOut(firebaseAuth);
      console.log('👋 Logout successful');
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  // Mettre à jour le profil utilisateur
  const updateUserProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    if (!firebaseDB || !user) {
      console.error('❌ Firebase DB not configured or user not authenticated');
      return false;
    }

    try {
      const userRef = doc(firebaseDB, 'users', user.uid);
      
      // Nettoyer les données pour éviter les valeurs undefined
      const cleanData = {
        ...data,
        address: data.address || null, // Convertir undefined en null
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(userRef, cleanData);
      
      // Recharger le profil
      await loadUserProfile(user.uid);
      console.log('✅ Profile updated successfully');
      return true;
    } catch (error) {
      console.error('❌ Profile update error:', error);
      return false;
    }
  };

  // Changer le mot de passe
  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!firebaseAuth || !user || !user.email) {
      console.error('❌ Firebase Auth not configured or user not authenticated');
      return false;
    }

    try {
      // Ré-authentifier l'utilisateur
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Mettre à jour le mot de passe
      await updatePassword(user, newPassword);
      
      console.log('✅ Password updated successfully');
      return true;
    } catch (error: any) {
      console.error('❌ Password update error:', error.code, error.message);
      throw new Error(error.code || 'auth/unknown-error');
    }
  };

  // Créer une commande
  const createOrder = async (orderData: Omit<Order, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    if (!firebaseDB || !user) {
      console.error('❌ Firebase DB not configured or user not authenticated');
      throw new Error('Firebase not configured or user not authenticated');
    }

    try {
      console.log('📦 Creating order for user:', user.uid);
      console.log('📦 Order data:', orderData);

      // Nettoyer les données pour éviter les valeurs undefined
      const cleanOrderData: Omit<Order, 'id'> = {
        ...orderData,
        userId: user.uid,
        customerInfo: {
          ...orderData.customerInfo,
          address: orderData.customerInfo.address || null // Convertir undefined en null
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      console.log('📦 Clean order data:', cleanOrderData);

      const docRef = await addDoc(collection(firebaseDB, 'orders'), cleanOrderData);
      
      // Recharger les commandes
      await loadUserOrders(user.uid);
      
      console.log('✅ Order created successfully:', docRef.id);
      
      // Envoyer message WhatsApp automatiquement
      sendWhatsAppMessage({
        id: docRef.id,
        ...cleanOrderData
      } as Order);
      
      return docRef.id;
    } catch (error) {
      console.error('❌ Order creation error:', error);
      throw new Error('Erreur lors de la création de la commande: ' + (error as Error).message);
    }
  };

  // Récupérer les commandes utilisateur
  const getUserOrders = async (): Promise<Order[]> => {
    if (!user) return [];
    await loadUserOrders(user.uid);
    return orders;
  };

  // Mettre à jour le statut d'une commande
  const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<boolean> => {
    if (!firebaseDB) {
      console.error('❌ Firebase DB not configured');
      return false;
    }

    try {
      const orderRef = doc(firebaseDB, 'orders', orderId);
      await updateDoc(orderRef, {
        status,
        updatedAt: serverTimestamp()
      });
      
      // Recharger les commandes si l'utilisateur est connecté
      if (user) {
        await loadUserOrders(user.uid);
      }
      
      console.log('✅ Order status updated successfully');
      return true;
    } catch (error) {
      console.error('❌ Order status update error:', error);
      return false;
    }
  };

  // Envoyer message WhatsApp
  const sendWhatsAppMessage = (order: Order) => {
    try {
      const deliveryType = order.customerInfo.address ? 'Livraison' : 'Retrait en magasin';
      
      let addressInfo = '';
      if (order.customerInfo.address) {
        addressInfo = `🏠 *Adresse de livraison:*
${order.customerInfo.address.street}
${order.customerInfo.address.city}, ${order.customerInfo.address.postalCode}
${order.customerInfo.address.country}`;
      } else {
        addressInfo = `🏪 *Retrait en magasin*
Abomey Calavi, Benin`;
      }

      const message = `🛒 *Nouvelle commande FybyShop*

#${order.customerInfo.firstName}${order.customerInfo.lastName}#

👤 *Client:* ${order.customerInfo.firstName} ${order.customerInfo.lastName}
📧 *Email:* ${order.customerInfo.email}
📱 *Téléphone:* ${order.customerInfo.phone}

${addressInfo}

📦 *Produits commandés:*
${order.items.map(item => `• ${item.name} x${item.quantity} - ${item.price.toLocaleString('fr-FR')} FCFA`).join('\n')}

💰 *Total:* ${order.total.toLocaleString('fr-FR')} FCFA
🚚 *${deliveryType}:* ${order.deliveryPrice === 0 ? 'Gratuite' : `${order.deliveryPrice.toLocaleString('fr-FR')} FCFA`}
💳 *Paiement:* ${order.paymentMethod === 'cash' ? 'À la livraison' : 'Mobile Money'}

📋 *Commande #${order.id}*`;

      const whatsappUrl = `https://wa.me/22952353484?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('❌ Error sending WhatsApp message:', error);
    }
  };

  const value: FirebaseContextType = {
    // Auth
    user,
    userProfile,
    isAuthenticated: !!user,
    isLoading,
    isConfigured: isFirebaseConfigured,
    
    // Auth methods
    login,
    register,
    logout,
    updateUserProfile,
    changePassword,
    
    // Orders
    orders,
    createOrder,
    getUserOrders,
    updateOrderStatus
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};