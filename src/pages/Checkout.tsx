import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Calendar, MapPin, Clock, AlertCircle, Smartphone, CheckCircle } from 'lucide-react';
import Button from '../components/UI/Button';
import { useCart } from '../contexts/CartContext';
import { useFirebase } from '../contexts/FirebaseContext';
import { DeliveryOption, CustomerInfo } from '../types';
import LoginModal from '../components/Auth/LoginModal';

const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const { isAuthenticated, userProfile, createOrder } = useFirebase();
  const [step, setStep] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'mobile_money'>('cash');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: userProfile?.firstName || '',
    lastName: userProfile?.lastName || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
  });

  // Update customer info when userProfile changes
  React.useEffect(() => {
    if (userProfile) {
      setCustomerInfo({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        address: userProfile.address || undefined
      });
    }
  }, [userProfile]);

  // Si l'utilisateur n'est pas connecté
  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Connexion requise</h2>
            <p className="text-gray-600 mb-8">
              Vous devez vous connecter pour passer une commande.
            </p>
            <Button 
              size="lg" 
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-gradient-to-r from-emerald-600 to-teal-600"
            >
              Se connecter
            </Button>
          </div>
        </div>
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      </>
    );
  }

  // Zones de livraison gratuite
  const freeShippingZones = ['Cococodji', 'Hêvié', 'Pahou', 'Calavi'];

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'express-free',
      type: 'delivery',
      name: 'Livraison Express Gratuite',
      description: 'Livraison en 24h dans les zones éligibles (Cococodji, Hêvié, Pahou, Calavi)',
      price: 0,
      estimatedTime: 'Demain avant 18h'
    },
    {
      id: 'standard',
      type: 'delivery',
      name: 'Livraison Standard',
      description: 'Livraison en 2-3 jours ouvrés (autres zones du Bénin)',
      price: 2500,
      estimatedTime: '2-3 jours ouvrés'
    },
    {
      id: 'pickup',
      type: 'pickup',
      name: 'Retrait en magasin',
      description: 'Prenez rendez-vous pour récupérer votre commande',
      price: 0,
      estimatedTime: 'Dès demain'
    }
  ];

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddressChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      } as any
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const isInFreeShippingZone = (city: string) => {
    return freeShippingZones.some(zone => 
      city.toLowerCase().includes(zone.toLowerCase())
    );
  };

  const getDeliveryPrice = () => {
    if (!deliveryOption) return 0;
    
    if (deliveryOption.type === 'pickup') return 0;
    
    if (customerInfo.address?.city && isInFreeShippingZone(customerInfo.address.city)) {
      return 0;
    }
    
    return deliveryOption.id === 'standard' ? 2500 : 0;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!customerInfo.firstName) {
      newErrors.firstName = 'Le prénom est obligatoire';
    }
    if (!customerInfo.lastName) {
      newErrors.lastName = 'Le nom est obligatoire';
    }
    if (!customerInfo.email) {
      newErrors.email = 'L\'email est obligatoire';
    }
    if (!customerInfo.phone) {
      newErrors.phone = 'Le téléphone est obligatoire';
    }

    if (deliveryOption?.type === 'delivery') {
      if (!customerInfo.address?.street) {
        newErrors.street = 'L\'adresse est obligatoire';
      }
      if (!customerInfo.address?.city) {
        newErrors.city = 'La ville est obligatoire';
      }
      if (!customerInfo.address?.country) {
        newErrors.country = 'Le pays est obligatoire';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 1 && !deliveryOption) {
      return false;
    }
    
    if (currentStep === 2) {
      return validateForm();
    }
    
    return true;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    const finalDeliveryPrice = getDeliveryPrice();
    const finalTotal = (total * 655) + finalDeliveryPrice;

    try {
      console.log('🛒 Submitting order...');
      console.log('📊 Order details:', {
        total: finalTotal,
        deliveryPrice: finalDeliveryPrice,
        paymentMethod,
        customerInfo,
        itemsCount: items.length
      });

      const orderId = await createOrder({
        total: finalTotal,
        deliveryPrice: finalDeliveryPrice,
        paymentMethod,
        customerInfo,
        status: 'pending',
        items: items.map(item => ({
          id: item.product.id,
          name: item.product.name,
          image: item.product.image,
          price: item.product.price * 655,
          quantity: item.quantity
        }))
      });

      console.log('✅ Order created successfully:', orderId);
      clearCart();
      setShowSuccessPopup(true);
      
      // Rediriger vers le profil après 3 secondes
      setTimeout(() => {
        setShowSuccessPopup(false);
        window.location.href = '/profile?tab=orders';
      }, 3000);
    } catch (error) {
      console.error('❌ Error creating order:', error);
      alert('Erreur lors de la création de la commande: ' + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Votre panier est vide</h2>
          <Link to="/shop" className="text-emerald-600 hover:text-emerald-700">
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  const finalDeliveryPrice = getDeliveryPrice();
  const finalTotal = (total * 655) + finalDeliveryPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6 sm:mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour au panier</span>
          </Link>
          
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Commande</h1>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold text-sm sm:text-base ${
                  step >= stepNumber 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-8 sm:w-12 h-1 ${
                    step > stepNumber ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Choisissez votre mode de livraison
                </h2>
                
                {/* Free Shipping Notice */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Truck className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-emerald-900 mb-1">Livraison gratuite disponible</h3>
                      <p className="text-sm text-emerald-800">
                        Livraison gratuite dans les zones : {freeShippingZones.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {deliveryOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                        deliveryOption?.id === option.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setDeliveryOption(option)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {option.type === 'delivery' ? (
                            <Truck className="h-5 w-5 text-emerald-600" />
                          ) : (
                            <MapPin className="h-5 w-5 text-emerald-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="font-semibold text-gray-900">{option.name}</h3>
                            <span className="font-semibold text-gray-900 mt-1 sm:mt-0">
                              {option.price === 0 ? 'Gratuit' : `${option.price.toLocaleString('fr-FR')} FCFA`}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1 text-sm">{option.description}</p>
                          <div className="flex items-center space-x-1 mt-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{option.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <Button
                    onClick={() => {
                      if (validateStep(1)) setStep(2);
                    }}
                    disabled={!deliveryOption}
                    size="lg"
                  >
                    Continuer
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Informations de {deliveryOption?.type === 'delivery' ? 'livraison' : 'contact'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.firstName}
                      onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                      className={`w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.lastName}
                      onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                      className={`w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                      className={`w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                      className={`w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {deliveryOption?.type === 'delivery' && (
                  <div className="space-y-4 mb-6">
                    <h3 className="font-semibold text-gray-900">Adresse de livraison</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.address?.street || ''}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                        className={`w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base ${
                          errors.street ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.street && (
                        <p className="text-red-500 text-sm mt-1">{errors.street}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ville *
                        </label>
                        <input
                          type="text"
                          value={customerInfo.address?.city || ''}
                          onChange={(e) => handleAddressChange('city', e.target.value)}
                          className={`w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base ${
                            errors.city ? 'border-red-500' : 'border-gray-300'
                          }`}
                          required
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                        )}
                        {customerInfo.address?.city && (
                          <p className={`text-xs mt-1 ${
                            isInFreeShippingZone(customerInfo.address.city) 
                              ? 'text-emerald-600' 
                              : 'text-orange-600'
                          }`}>
                            {isInFreeShippingZone(customerInfo.address.city) 
                              ? '✓ Livraison gratuite disponible' 
                              : '⚠ Frais de livraison : 2,500 FCFA'
                            }
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pays *
                        </label>
                        <input
                          type="text"
                          value={customerInfo.address?.country || ''}
                          onChange={(e) => handleAddressChange('country', e.target.value)}
                          className={`w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base ${
                            errors.country ? 'border-red-500' : 'border-gray-300'
                          }`}
                          required
                        />
                        {errors.country && (
                          <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {deliveryOption?.type === 'pickup' && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-900">Rendez-vous en magasin</h3>
                    </div>
                    <p className="text-blue-800 text-sm">
                      Nous vous contacterons sous 24h pour planifier votre rendez-vous de récupération.
                    </p>
                    <p className="text-blue-800 text-sm mt-1">
                      <strong>Adresse :</strong> 123 Avenue des Champs-Élysées, 75008 Paris
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Retour
                  </Button>
                  <Button
                    onClick={() => {
                      if (validateStep(2)) setStep(3);
                    }}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Continuer
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Mode de paiement
                </h2>

                <div className="space-y-4 mb-6">
                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      paymentMethod === 'cash' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('cash')}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-emerald-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Paiement à la livraison</h3>
                        <p className="text-gray-600 text-sm">Payez en espèces lors de la réception</p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      paymentMethod === 'mobile_money' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('mobile_money')}
                  >
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-emerald-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Mobile Money</h3>
                        <p className="text-gray-600 text-sm">Paiement par mobile money (MTN, Moov)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-orange-900 mb-1">Information importante</h3>
                      <p className="text-sm text-orange-800">
                        {paymentMethod === 'cash' 
                          ? 'Préparez le montant exact de votre commande pour faciliter la livraison.'
                          : 'Vous recevrez les instructions de paiement mobile money après confirmation.'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Retour
                  </Button>
                  <Button
                    onClick={() => setStep(4)}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Continuer
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Confirmation de commande
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Récapitulatif</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Mode de livraison:</span>
                        <span>{deliveryOption?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mode de paiement:</span>
                        <span>{paymentMethod === 'cash' ? 'À la livraison' : 'Mobile Money'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Adresse:</span>
                        <span>
                          {deliveryOption?.type === 'pickup' 
                            ? 'Retrait en magasin' 
                            : `${customerInfo.address?.city}`
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
                  <Button
                    variant="outline"
                    onClick={() => setStep(3)}
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    Retour
                  </Button>
                  <Button
                    onClick={handleSubmitOrder}
                    size="lg"
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 w-full sm:w-auto"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  >
                    {isSubmitting ? 'Création en cours...' : 'Confirmer la commande'}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Résumé de commande
              </h3>
              
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-gray-900">
                      {(item.product.price * item.quantity * 655).toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{(total * 655).toLocaleString('fr-FR')} FCFA</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className={finalDeliveryPrice === 0 ? 'text-emerald-600' : ''}>
                    {finalDeliveryPrice === 0 ? 'Gratuite' : `${finalDeliveryPrice.toLocaleString('fr-FR')} FCFA`}
                  </span>
                </div>
                
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>{finalTotal.toLocaleString('fr-FR')} FCFA</span>
                </div>
                
                {finalDeliveryPrice === 0 && deliveryOption?.type === 'delivery' && (
                  <p className="text-xs text-emerald-600 mt-2">
                    🎉 Vous bénéficiez de la livraison gratuite !
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center max-w-md w-full animate-slide-up">
              <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Commande confirmée !
              </h2>
              <p className="text-gray-600 mb-4">
                Votre commande a été bien effectuée. Vous allez être redirigé vers vos commandes.
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;