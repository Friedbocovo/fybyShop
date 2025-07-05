import React from 'react';
import { Truck, MapPin, Clock, CheckCircle, AlertCircle, Package } from 'lucide-react';

const Shipping: React.FC = () => {
  const freeShippingZones = [
    { name: 'Cococodji', code: 'COC' },
    { name: 'Hêvié', code: 'HEV' },
    { name: 'Pahou', code: 'PAH' },
    { name: 'Calavi', code: 'CAL' }
  ];

  const shippingOptions = [
    {
      name: 'Livraison Express',
      description: 'Livraison en 24h dans les zones éligibles',
      price: 'Gratuite',
      zones: freeShippingZones,
      icon: Truck,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Livraison Standard',
      description: 'Livraison en 2-3 jours ouvrés',
      price: '2,500 FCFA',
      zones: ['Autres zones du Bénin'],
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-slide-up">
            <Truck className="h-16 w-16 text-accent-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Livraison & Expédition
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos options de livraison et zones de couverture
            </p>
          </div>
        </div>
      </section>

      {/* Free Shipping Zones */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <span className="text-green-600 font-semibold text-lg">Livraison Gratuite</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Zones de Livraison Gratuite
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Profitez de la livraison gratuite dans ces zones privilégiées
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {freeShippingZones.map((zone, index) => (
              <div
                key={zone.code}
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center border-2 border-green-200 hover:border-green-300 transition-colors duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{zone.name}</h3>
                <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Livraison Gratuite
                </span>
              </div>
            ))}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 animate-slide-up">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Conditions de livraison gratuite
                </h3>
                <ul className="text-green-800 space-y-1">
                  <li>• Commande minimum : Aucun minimum requis</li>
                  <li>• Délai de livraison : 24-48h ouvrées</li>
                  <li>• Horaires de livraison : 8h-18h du lundi au samedi</li>
                  <li>• Paiement à la livraison disponible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Options de Livraison
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choisissez l'option qui vous convient le mieux
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {shippingOptions.map((option, index) => (
              <div
                key={option.name}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`${option.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                  <option.icon className={`h-8 w-8 ${option.color}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{option.name}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-gray-900">{option.price}</span>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Rapide</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Zones couvertes :</h4>
                  <div className="space-y-2">
                    {Array.isArray(option.zones) ? (
                      option.zones.map((zone) => (
                        <div key={typeof zone === 'string' ? zone : zone.name} className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">
                            {typeof zone === 'string' ? zone : zone.name}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{option.zones}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Processus de livraison simple et transparent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Commande',
                description: 'Passez votre commande en ligne ou par téléphone',
                icon: Package
              },
              {
                step: '2',
                title: 'Confirmation',
                description: 'Nous confirmons votre commande et préparons l\'expédition',
                icon: CheckCircle
              },
              {
                step: '3',
                title: 'Expédition',
                description: 'Votre commande est expédiée avec un numéro de suivi',
                icon: Truck
              },
              {
                step: '4',
                title: 'Livraison',
                description: 'Réception de votre commande à l\'adresse indiquée',
                icon: MapPin
              }
            ].map((step, index) => (
              <div
                key={step.step}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
            <div className="flex items-start space-x-4">
              <AlertCircle className="h-8 w-8 text-orange-600 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Informations importantes
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Zones de livraison gratuite :</strong> Cococodji, Hêvié, Pahou, Calavi
                  </p>
                  <p>
                    <strong>Autres zones :</strong> Frais de livraison de 2,500 FCFA
                  </p>
                  <p>
                    <strong>Délais :</strong> 24-48h pour les zones gratuites, 2-3 jours pour les autres zones
                  </p>
                  <p>
                    <strong>Paiement :</strong> Paiement à la livraison disponible dans toutes les zones
                  </p>
                  <p>
                    <strong>Contact :</strong> Pour toute question, contactez-nous au +229 97 12 34 56
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shipping;