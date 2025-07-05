import React from 'react';
import { RotateCcw, CheckCircle, XCircle, Clock, Package, ArrowRight } from 'lucide-react';

const Returns: React.FC = () => {
  const returnSteps = [
    {
      step: '1',
      title: 'Demande de retour',
      description: 'Contactez-nous dans les 30 jours suivant la réception',
      icon: Package
    },
    {
      step: '2',
      title: 'Autorisation',
      description: 'Nous vous envoyons un numéro d\'autorisation de retour',
      icon: CheckCircle
    },
    {
      step: '3',
      title: 'Emballage',
      description: 'Remballez le produit dans son emballage d\'origine',
      icon: Package
    },
    {
      step: '4',
      title: 'Expédition',
      description: 'Renvoyez le produit à notre adresse avec le numéro d\'autorisation',
      icon: RotateCcw
    }
  ];

  const returnConditions = [
    {
      title: 'Produits éligibles',
      items: [
        'Produits en parfait état',
        'Emballage d\'origine conservé',
        'Accessoires et documentation inclus',
        'Aucun signe d\'utilisation intensive'
      ],
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Produits non éligibles',
      items: [
        'Produits personnalisés ou sur mesure',
        'Logiciels avec licence activée',
        'Produits endommagés par l\'utilisateur',
        'Produits hygiéniques (écouteurs intra-auriculaires)'
      ],
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-slide-up">
            <RotateCcw className="h-16 w-16 text-accent-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Retours & Échanges
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Politique de retour simple et transparente pour votre tranquillité d'esprit
            </p>
          </div>
        </div>
      </section>

      {/* Return Policy Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Politique de Retour
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              30 jours pour changer d'avis, remboursement intégral garanti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl animate-slide-up">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">30 Jours</h3>
              <p className="text-gray-600">Délai de retour à partir de la réception</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Remboursement</h3>
              <p className="text-gray-600">Remboursement intégral sous 7-10 jours</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <RotateCcw className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Échange</h3>
              <p className="text-gray-600">Échange gratuit pour défaut de fabrication</p>
            </div>
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Processus de Retour
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Suivez ces étapes simples pour effectuer votre retour
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {returnSteps.map((step, index) => (
              <div
                key={step.step}
                className="relative bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {step.step}
                </div>
                <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                
                {index < returnSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Return Conditions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conditions de Retour
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Vérifiez l'éligibilité de votre produit avant de faire une demande
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {returnConditions.map((condition, index) => (
              <div
                key={condition.title}
                className={`${condition.bgColor} rounded-2xl p-8 animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <condition.icon className={`h-8 w-8 ${condition.color}`} />
                  <h3 className="text-2xl font-bold text-gray-900">{condition.title}</h3>
                </div>
                
                <ul className="space-y-3">
                  {condition.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full ${condition.color.replace('text-', 'bg-')} mt-2`}></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Returns */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Besoin d'aide pour un retour ?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Notre équipe est là pour vous accompagner dans votre demande de retour
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Par téléphone</h3>
              <p className="text-primary-100">+229 97 12 34 56</p>
              <p className="text-sm text-primary-200">Lun-Ven: 9h-18h</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Par email</h3>
              <p className="text-primary-100">retours@friedshop.fr</p>
              <p className="text-sm text-primary-200">Réponse sous 24h</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              Nous contacter
            </a>
            <a
              href="tel:+22997123456"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200 inline-block"
            >
              Appeler maintenant
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Returns;