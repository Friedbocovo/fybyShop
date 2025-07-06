import React, { useState } from 'react';
import { User, Settings, Package, Heart, MapPin, Phone, Mail, Edit3, Save, X, Eye, EyeOff, CreditCard, Bell, Shield, LogOut, Calendar, Star, Truck, Lock, Check, QrCode, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import ProductCard from '../components/UI/ProductCard';
import QRCodeGenerator from '../components/QRCode/QRCodeGenerator';
import ScrollAnimation from '../components/ScrollAnimations';
import { useFirebase } from '../contexts/FirebaseContext';
import { useFavorites } from '../contexts/FavoritesContext';
import LoginModal from '../components/Auth/LoginModal';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const { user, userProfile, isAuthenticated, logout, updateUserProfile, changePassword, orders } = useFirebase();
  const { favorites } = useFavorites();

  const [editData, setEditData] = useState({
    firstName: userProfile?.firstName || '',
    lastName: userProfile?.lastName || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    street: userProfile?.address?.street || '',
    city: userProfile?.address?.city || '',
    postalCode: userProfile?.address?.postalCode || '',
    country: userProfile?.address?.country || ''
  });

  // Update editData when userProfile changes
  React.useEffect(() => {
    if (userProfile) {
      setEditData({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        street: userProfile.address?.street || '',
        city: userProfile.address?.city || '',
        postalCode: userProfile.address?.postalCode || '',
        country: userProfile.address?.country || ''
      });
    }
  }, [userProfile]);

  // Check URL params for tab
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab && ['profile', 'orders', 'favorites', 'settings'].includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  // Si l'utilisateur n'est pas connecté
  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
          <ScrollAnimation animation="scale-in">
            <div className="text-center max-w-md mx-auto">
              <div className="text-6xl mb-4">👤</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Connexion requise</h2>
              <p className="text-gray-600 mb-8">
                Vous devez vous connecter pour accéder à votre profil.
              </p>
              <Button 
                size="lg" 
                icon={LogOut}
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:scale-105 transition-transform duration-300"
              >
                Se connecter
              </Button>
            </div>
          </ScrollAnimation>
        </div>
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      </>
    );
  }

  const handleSave = async () => {
    // Validation des champs obligatoires
    if (!editData.firstName || !editData.lastName || !editData.email || !editData.phone) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const success = await updateUserProfile({
      firstName: editData.firstName,
      lastName: editData.lastName,
      email: editData.email,
      phone: editData.phone,
      address: {
        street: editData.street,
        city: editData.city,
        postalCode: editData.postalCode,
        country: editData.country
      }
    });

    if (success) {
      setIsEditing(false);
    }
  };

  const handlePasswordChange = async () => {
    setPasswordError('');
    setPasswordSuccess(false);

    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('Veuillez remplir tous les champs');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }

    try {
      const success = await changePassword(passwordData.currentPassword, passwordData.newPassword);
      if (success) {
        setPasswordSuccess(true);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setIsChangingPassword(false);
        setTimeout(() => setPasswordSuccess(false), 3000);
      }
    } catch (error: any) {
      if (error.message === 'auth/wrong-password') {
        setPasswordError('Mot de passe actuel incorrect');
      } else if (error.message === 'auth/weak-password') {
        setPasswordError('Le nouveau mot de passe est trop faible');
      } else {
        setPasswordError('Erreur lors du changement de mot de passe');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-emerald-600 bg-emerald-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'confirmed': return 'text-orange-600 bg-orange-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Livré';
      case 'shipped': return 'Expédié';
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'orders', name: 'Commandes', icon: Package },
    { id: 'favorites', name: 'Favoris', icon: Heart },
    { id: 'settings', name: 'Paramètres', icon: Settings }
  ];

  // Emoji fixe basé sur l'ID utilisateur
  const getFixedEmoji = (userId: string) => {
    const emojis = ['😊', '😎', '🤗', '😄', '🙂', '😌', '🤓', '😇', '🥳', '😋', '🤩', '😍', '🥰', '😘', '🤪'];
    const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return emojis[hash % emojis.length];
  };

  const userEmoji = user ? getFixedEmoji(user.uid) : '😊';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <ScrollAnimation animation="fade-in-up">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 hover-lift">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center border-4 border-emerald-200 hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl sm:text-4xl">{userEmoji}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {userProfile?.firstName || 'Utilisateur'} {userProfile?.lastName || ''}
                </h1>
                <p className="text-gray-600 mb-1 text-sm sm:text-base">
                  {userProfile?.email || user?.email}
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  {userProfile?.phone || 'Téléphone non renseigné'}
                </p>
                {userProfile?.address && (
                  <div className="flex items-center justify-center sm:justify-start space-x-2 mt-3">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-gray-600">
                      {userProfile.address.city}, {userProfile.address.country}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="sm" 
                  icon={Edit3}
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto hover:scale-105 transition-transform duration-200"
                >
                  Modifier le profil
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  icon={LogOut} 
                  className="text-red-600 border-red-300 hover:bg-red-50 w-full sm:w-auto hover:scale-105 transition-transform duration-200"
                  onClick={logout}
                >
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <ScrollAnimation animation="fade-in-left">
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 sticky top-24 hover-lift">
                <nav className="space-y-2">
                  {tabs.map((tab, index) => (
                    <ScrollAnimation key={tab.id} delay={index * 100}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-3 rounded-xl transition-all duration-300 text-sm sm:text-base transform hover:scale-105 ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                        }`}
                      >
                        <tab.icon className="h-5 w-5" />
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    </ScrollAnimation>
                  ))}
                </nav>
              </div>
            </ScrollAnimation>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <ScrollAnimation animation="fade-in-right">
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 hover-lift">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <ScrollAnimation animation="fade-in-up">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Informations personnelles</h2>
                        <Button
                          variant={isEditing ? "secondary" : "outline"}
                          icon={isEditing ? Save : Edit3}
                          onClick={isEditing ? handleSave : () => setIsEditing(true)}
                          size="sm"
                          className="hover:scale-105 transition-transform duration-200"
                        >
                          {isEditing ? 'Sauvegarder' : 'Modifier'}
                        </Button>
                      </div>
                    </ScrollAnimation>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <ScrollAnimation animation="fade-in-up" delay={100}>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                          <input
                            type="text"
                            value={editData.firstName}
                            onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                            disabled={!isEditing}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-50 text-sm sm:text-base transition-all duration-200 hover:border-emerald-300"
                          />
                        </div>
                      </ScrollAnimation>

                      <ScrollAnimation animation="fade-in-up" delay={200}>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                          <input
                            type="text"
                            value={editData.lastName}
                            onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                            disabled={!isEditing}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-50 text-sm sm:text-base transition-all duration-200 hover:border-emerald-300"
                          />
                        </div>
                      </ScrollAnimation>

                      <ScrollAnimation animation="fade-in-up" delay={300}>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                          <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData({...editData, email: e.target.value})}
                            disabled={!isEditing}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-50 text-sm sm:text-base transition-all duration-200 hover:border-emerald-300"
                          />
                        </div>
                      </ScrollAnimation>

                      <ScrollAnimation animation="fade-in-up" delay={400}>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                          <input
                            type="tel"
                            value={editData.phone}
                            onChange={(e) => setEditData({...editData, phone: e.target.value})}
                            disabled={!isEditing}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-50 text-sm sm:text-base transition-all duration-200 hover:border-emerald-300"
                          />
                        </div>
                      </ScrollAnimation>

                      <ScrollAnimation animation="fade-in-up" delay={500}>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                          <input
                            type="text"
                            value={editData.street}
                            onChange={(e) => setEditData({...editData, street: e.target.value})}
                            disabled={!isEditing}
                            placeholder="Rue"
                            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-50 mb-3 text-sm sm:text-base transition-all duration-200 hover:border-emerald-300"
                          />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={editData.city}
                              onChange={(e) => setEditData({...editData, city: e.target.value})}
                              placeholder="Ville"
                              disabled={!isEditing}
                              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-50 text-sm sm:text-base transition-all duration-200 hover:border-emerald-300"
                            />
                            <input
                              type="text"
                              value={editData.country}
                              onChange={(e) => setEditData({...editData, country: e.target.value})}
                              placeholder="Pays"
                              disabled={!isEditing}
                              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-50 text-sm sm:text-base transition-all duration-200 hover:border-emerald-300"
                            />
                          </div>
                        </div>
                      </ScrollAnimation>
                    </div>
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div>
                    <ScrollAnimation animation="fade-in-up">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Mes commandes</h2>
                    </ScrollAnimation>
                    
                    {orders.length === 0 ? (
                      <ScrollAnimation animation="scale-in">
                        <div className="text-center py-12">
                          <div className="text-6xl mb-4">📦</div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Aucune commande
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Vous n'avez pas encore passé de commande.
                          </p>
                          <Link to="/shop">
                            <Button size="lg" className="hover:scale-105 transition-transform duration-300">
                              Découvrir la boutique
                            </Button>
                          </Link>
                        </div>
                      </ScrollAnimation>
                    ) : (
                      <div className="space-y-4 sm:space-y-6">
                        {orders.map((order, index) => (
                          <ScrollAnimation key={order.id} animation="fade-in-up" delay={index * 100}>
                            <div className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover-lift">
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-4 lg:space-y-0">
                                <div className="flex items-center space-x-4">
                                  <div>
                                    <h3 className="font-semibold text-gray-900">Commande #{order.id}</h3>
                                    <p className="text-sm text-gray-600">
                                      <Calendar className="inline h-4 w-4 mr-1" />
                                      {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('fr-FR') : 'Date inconnue'}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)} animate-pulse`}>
                                    {getStatusText(order.status)}
                                  </span>
                                  <span className="text-lg font-bold text-gray-900">
                                    {order.total.toLocaleString('fr-FR')} FCFA
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {order.items.map((item, itemIndex) => (
                                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-12 h-12 object-cover rounded-lg"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                      <p className="text-sm text-gray-600">
                                        {item.quantity} × {item.price.toLocaleString('fr-FR')} FCFA
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-2 sm:space-y-0 sm:space-x-3">
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedOrder(order)}
                                    className="w-full sm:w-auto hover:scale-105 transition-transform duration-200"
                                  >
                                    Voir détails
                                  </Button>
                                  {order.status === 'delivered' && (
                                    <Button variant="outline" size="sm" icon={Star} className="w-full sm:w-auto hover:scale-105 transition-transform duration-200">
                                      Laisser un avis
                                    </Button>
                                  )}
                                </div>
                                
                                {/* QR Code Button */}
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  icon={QrCode}
                                  onClick={() => setSelectedOrder({...order, showQR: true})}
                                  className="w-full sm:w-auto hover:scale-105 transition-transform duration-200 text-emerald-600 border-emerald-300 hover:bg-emerald-50"
                                >
                                  QR Code
                                </Button>
                              </div>
                            </div>
                          </ScrollAnimation>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Favorites Tab */}
                {activeTab === 'favorites' && (
                  <div>
                    <ScrollAnimation animation="fade-in-up">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Mes favoris</h2>
                    </ScrollAnimation>
                    
                    {favorites.length === 0 ? (
                      <ScrollAnimation animation="scale-in">
                        <div className="text-center py-12">
                          <div className="text-6xl mb-4">❤️</div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Aucun favori
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Ajoutez des produits à vos favoris pour les retrouver facilement.
                          </p>
                          <Link to="/shop">
                            <Button size="lg" className="hover:scale-105 transition-transform duration-300">
                              Découvrir la boutique
                            </Button>
                          </Link>
                        </div>
                      </ScrollAnimation>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {favorites.map((product, index) => (
                          <ScrollAnimation key={product.id} animation="fade-in-up" delay={index * 100}>
                            <ProductCard product={product} />
                          </ScrollAnimation>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div>
                    <ScrollAnimation animation="fade-in-up">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Paramètres</h2>
                    </ScrollAnimation>
                    
                    <div className="space-y-8">
                      {/* Security */}
                      <ScrollAnimation animation="fade-in-up" delay={100}>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Shield className="h-5 w-5 mr-2" />
                            Sécurité
                          </h3>
                          <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
                                <p className="font-medium text-gray-900">Mot de passe</p>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                                  className="hover:scale-105 transition-transform duration-200"
                                >
                                  {isChangingPassword ? 'Annuler' : 'Modifier'}
                                </Button>
                              </div>
                              
                              {!isChangingPassword ? (
                                <div className="relative">
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    value="••••••••••••"
                                    disabled
                                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-12 bg-white text-sm sm:text-base"
                                  />
                                  <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:scale-110"
                                  >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                  </button>
                                </div>
                              ) : (
                                <ScrollAnimation animation="fade-in-up">
                                  <div className="space-y-4">
                                    {passwordError && (
                                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                                        {passwordError}
                                      </div>
                                    )}
                                    
                                    {passwordSuccess && (
                                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm flex items-center">
                                        <Check className="h-4 w-4 mr-2" />
                                        Mot de passe modifié avec succès !
                                      </div>
                                    )}
                                    
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                                      <input
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-all duration-200 hover:border-emerald-300"
                                        placeholder="Entrez votre mot de passe actuel"
                                      />
                                    </div>
                                    
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                                      <input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-all duration-200 hover:border-emerald-300"
                                        placeholder="Entrez votre nouveau mot de passe"
                                      />
                                    </div>
                                    
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le nouveau mot de passe</label>
                                      <input
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-all duration-200 hover:border-emerald-300"
                                        placeholder="Confirmez votre nouveau mot de passe"
                                      />
                                    </div>
                                    
                                    <div className="flex space-x-3">
                                      <Button 
                                        onClick={handlePasswordChange}
                                        size="sm"
                                        className="hover:scale-105 transition-transform duration-200"
                                      >
                                        Changer le mot de passe
                                      </Button>
                                      <Button 
                                        variant="outline"
                                        onClick={() => {
                                          setIsChangingPassword(false);
                                          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                          setPasswordError('');
                                        }}
                                        size="sm"
                                        className="hover:scale-105 transition-transform duration-200"
                                      >
                                        Annuler
                                      </Button>
                                    </div>
                                  </div>
                                </ScrollAnimation>
                              )}
                            </div>
                          </div>
                        </div>
                      </ScrollAnimation>
                    </div>
                  </div>
                )}
              </div>
            </ScrollAnimation>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <ScrollAnimation animation="scale-in">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {selectedOrder.showQR ? 'QR Code de la commande' : 'Détails de la commande'} #{selectedOrder.id}
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <div className="p-4 sm:p-6">
                  {selectedOrder.showQR ? (
                    // QR Code View
                    <div className="text-center">
                      <QRCodeGenerator 
                        orderId={selectedOrder.id}
                        orderData={selectedOrder}
                        className="mb-6"
                      />
                      <p className="text-gray-600 mb-4">
                        Présentez ce QR code lors de la livraison ou du retrait en magasin
                      </p>
                    </div>
                  ) : (
                    // Order Details View
                    <div className="space-y-6">
                      {/* Order Info */}
                      <ScrollAnimation animation="fade-in-up">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Date de commande</p>
                            <p className="font-semibold">
                              {selectedOrder.createdAt?.toDate ? selectedOrder.createdAt.toDate().toLocaleDateString('fr-FR') : 'Date inconnue'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Statut</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)} animate-pulse`}>
                              {getStatusText(selectedOrder.status)}
                            </span>
                          </div>
                        </div>
                      </ScrollAnimation>

                      {/* Items */}
                      <ScrollAnimation animation="fade-in-up" delay={100}>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Produits commandés</h3>
                          <div className="space-y-3">
                            {selectedOrder.items.map((item: any, index: number) => (
                              <ScrollAnimation key={item.id} animation="fade-in-left" delay={index * 50}>
                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-900 text-sm sm:text-base">{item.name}</p>
                                    <p className="text-sm text-gray-600">
                                      Quantité : {item.quantity} × {item.price.toLocaleString('fr-FR')} FCFA
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                                      {(item.quantity * item.price).toLocaleString('fr-FR')} FCFA
                                    </p>
                                  </div>
                                </div>
                              </ScrollAnimation>
                            ))}
                          </div>
                        </div>
                      </ScrollAnimation>

                      {/* Total */}
                      <ScrollAnimation animation="fade-in-up" delay={200}>
                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-900">Total</span>
                            <span className="text-xl sm:text-2xl font-bold text-gray-900">
                              {selectedOrder.total.toLocaleString('fr-FR')} FCFA
                            </span>
                          </div>
                        </div>
                      </ScrollAnimation>
                    </div>
                  )}
                </div>
              </div>
            </ScrollAnimation>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;