import React from 'react';
import { Shield, CheckCircle, Clock, Settings, Phone, Mail } from 'lucide-react';

const Warranty: React.FC = () => {
  const warrantyTypes = [
    {
      title: 'Garantie Constructeur',
      duration: '1-2 ans',
      description: 'Garantie standard fournie par le fabricant',
      coverage: [
        'Défauts de fabrication',
        'Dysfonctionnements matériels',
        'Pièces défectueuses',
        'Main d\'œuvre incluse'
      ],
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Garantie Étendue FriedShop',
      duration: 'Jusqu\'à 3 ans',
      description: 'Protection supplémentaire offerte par FriedShop',
      coverage: [
        'Extension de la garantie constructeur',
        'Support technique prioritaire',
        'Remplacement rapide',
        'Couverture accidents (option)'
      ],
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Garantie Premium',
      duration: 'Jusqu\'à 5 ans',
      description: 'Protection maximale pour vos équipements professionnels',
      coverage: [
        'Couverture complète',
        'Intervention sur site',
        'Prêt de matériel de remplacement',
        'Maintenance préventive'
      ],
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ];

  const warrantyProcess = [
    {
      step: '1',
      title: 'Diagnostic',
      description: 'Contactez notre support pour un diagnostic initial',
      icon: Phone
    },
    {
      step: '2',
      title: 'Évaluation',
      description: 'Nous évaluons la panne et déterminons la couverture',
      icon: Settings
    },
    {
      step: '3',
      title: 'Réparation',
      description: 'Réparation ou remplacement selon les termes de garantie',
      icon: CheckCircle
    },
    {
      step: '4',
      title: 'Retour',
      description: 'Récupération de votre équipement réparé ou remplacé',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-slide-up">
            <Shield className="h-16 w-16 text-accent-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Garantie & Support
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Protection complète et support technique pour tous vos achats
            </p>
          </div>
        </div>
      </section>

      {/* Warranty Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Types de Garantie
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choisissez le niveau de protection adapté à vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {warrantyTypes.map((warranty, index) => (
              <div
                key={warranty.title}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${warranty.color}`}></div>
                
                <div className="p-8">
                  <div className={`${warranty.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                    <Shield className={`h-8 w-8 ${warranty.textColor}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{warranty.title}</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span className="text-lg font-semibold text-gray-700">{warranty.duration}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{warranty.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Couverture incluse :</h4>
                    <ul className="space-y-2">
                      {warranty.coverage.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-600 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Processus de Garantie
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comment faire jouer votre garantie en cas de problème
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {warrantyProcess.map((step, index) => (
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

      {/* Warranty Terms */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conditions de Garantie
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Informations importantes sur nos conditions de garantie
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-2xl p-8 animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900">Couvert par la garantie</h3>
              </div>
              
              <ul className="space-y-3">
                {[
                  'Défauts de fabrication et matériaux',
                  'Dysfonctionnements sans cause externe',
                  'Pièces défectueuses d\'origine',
                  'Problèmes logiciels d\'origine',
                  'Main d\'œuvre de réparation',
                  'Frais de diagnostic'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-8 w-8 text-red-600" />
                <h3 className="text-2xl font-bold text-gray-900">Non couvert</h3>
              </div>
              
              <ul className="space-y-3">
                {[
                  'Dommages causés par l\'utilisateur',
                  'Chutes, chocs et accidents',
                  'Dégâts des eaux et liquides',
                  'Usure normale des composants',
                  'Modifications non autorisées',
                  'Utilisation non conforme'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Support Contact */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Support Technique
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Notre équipe d'experts est à votre disposition pour toute question
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 rounded-xl p-6">
              <Phone className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Support téléphonique</h3>
              <p className="text-primary-100 mb-2">+229 97 12 34 56</p>
              <p className="text-sm text-primary-200">Lun-Ven: 9h-18h, Sam: 10h-16h</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6">
              <Mail className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Support email</h3>
              <p className="text-primary-100 mb-2">support@friedshop.fr</p>
              <p className="text-sm text-primary-200">Réponse sous 4h ouvrées</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              Contacter le support
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

export default Warranty;