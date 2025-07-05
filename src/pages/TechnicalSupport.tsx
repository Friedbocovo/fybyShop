import React, { useState } from 'react';
import { Headphones, MessageCircle, Phone, Mail, Search, ChevronDown, ChevronUp, Monitor, Smartphone, Settings, Wifi } from 'lucide-react';
import Button from '../components/UI/Button';

const TechnicalSupport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const supportCategories = [
    { id: 'all', name: 'Toutes les catégories', icon: Settings },
    { id: 'computers', name: 'Ordinateurs', icon: Monitor },
    { id: 'smartphones', name: 'Smartphones', icon: Smartphone },
    { id: 'connectivity', name: 'Connectivité', icon: Wifi }
  ];

  const faqs = [
    {
      id: 1,
      category: 'computers',
      question: 'Mon ordinateur portable ne s\'allume plus, que faire ?',
      answer: 'Vérifiez d\'abord que la batterie est chargée et que l\'adaptateur secteur fonctionne. Essayez de retirer la batterie et de redémarrer uniquement sur secteur. Si le problème persiste, contactez notre support technique.'
    },
    {
      id: 2,
      category: 'smartphones',
      question: 'Mon smartphone se décharge très rapidement',
      answer: 'Vérifiez les applications qui consomment le plus de batterie dans les paramètres. Désactivez la localisation pour les apps non essentielles, réduisez la luminosité de l\'écran et activez le mode économie d\'énergie.'
    },
    {
      id: 3,
      category: 'connectivity',
      question: 'Problème de connexion Wi-Fi sur mes appareils',
      answer: 'Redémarrez votre routeur et votre appareil. Vérifiez que vous utilisez le bon mot de passe Wi-Fi. Si le problème persiste, oubliez le réseau dans les paramètres et reconnectez-vous.'
    },
    {
      id: 4,
      category: 'computers',
      question: 'Mon PC est très lent, comment l\'optimiser ?',
      answer: 'Nettoyez votre disque dur, désinstallez les programmes inutiles, mettez à jour vos pilotes et effectuez une analyse antivirus complète. Considérez l\'ajout de RAM ou le passage à un SSD.'
    },
    {
      id: 5,
      category: 'smartphones',
      question: 'Comment transférer mes données vers un nouveau téléphone ?',
      answer: 'Utilisez les outils de transfert intégrés (Smart Switch pour Samsung, Move to iOS pour Apple). Vous pouvez aussi sauvegarder sur le cloud ou utiliser un câble de transfert direct.'
    },
    {
      id: 6,
      category: 'connectivity',
      question: 'Mes écouteurs Bluetooth ne se connectent pas',
      answer: 'Assurez-vous que les écouteurs sont en mode appairage. Supprimez l\'ancien appairage dans les paramètres Bluetooth et recommencez la procédure de connexion.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const supportOptions = [
    {
      title: 'Chat en direct',
      description: 'Assistance immédiate avec nos experts',
      icon: MessageCircle,
      availability: 'Lun-Ven: 9h-18h',
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Support téléphonique',
      description: 'Appelez-nous pour une aide personnalisée',
      icon: Phone,
      availability: '+229 97 12 34 56',
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Support email',
      description: 'Envoyez-nous vos questions détaillées',
      icon: Mail,
      availability: 'Réponse sous 4h',
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-slide-up">
            <Headphones className="h-16 w-16 text-accent-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Support Technique
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Notre équipe d'experts est là pour résoudre tous vos problèmes techniques
            </p>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment pouvons-nous vous aider ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choisissez le canal de support qui vous convient le mieux
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {supportOptions.map((option, index) => (
              <div
                key={option.title}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${option.color}`}></div>
                
                <div className="p-8 text-center">
                  <div className={`${option.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <option.icon className={`h-8 w-8 ${option.textColor}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <p className="text-sm font-medium text-gray-500 mb-6">{option.availability}</p>
                  
                  <Button className="w-full">
                    Commencer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez rapidement des réponses aux problèmes les plus courants
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 animate-slide-up">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher dans les FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {supportCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 animate-slide-up">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune FAQ trouvée
              </h3>
              <p className="text-gray-600">
                Essayez de modifier vos critères de recherche ou contactez notre support.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vous ne trouvez pas la réponse ?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Nos experts techniques sont disponibles pour vous aider personnellement
          </p>
          
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

export default TechnicalSupport;