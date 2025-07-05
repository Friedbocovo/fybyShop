import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import Button from '../components/UI/Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'envoi du formulaire
    alert('Message envoyé ! Nous vous répondrons dans les plus brefs délais.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      details: '+33 1 23 45 67 89',
      subtitle: 'Lun-Ven: 9h-18h'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'contact@friedshop.fr',
      subtitle: 'Réponse sous 24h'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      details: '123 Avenue des Champs-Élysées',
      subtitle: '75008 Paris, France'
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: 'Lundi - Vendredi: 9h-18h',
      subtitle: 'Samedi: 10h-16h'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Contactez-nous
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed animate-slide-up" 
               style={{ animationDelay: '0.2s' }}>
              Notre équipe d'experts est là pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-6 animate-slide-up" 
                   style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-900 font-medium mb-1">{info.details}</p>
                <p className="text-gray-600 text-sm">{info.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-in-left">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <MessageCircle className="h-6 w-6 text-primary-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Envoyez-nous un message</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="question-produit">Question sur un produit</option>
                      <option value="support">Support technique</option>
                      <option value="commande">Suivi de commande</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Décrivez votre demande en détail..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    icon={Send}
                    iconPosition="right"
                  >
                    Envoyer le message
                  </Button>
                </form>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div className="animate-slide-in-right">
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Nous trouver</h3>
                
                {/* Map Placeholder */}
                <div className="bg-gray-200 rounded-lg h-64 mb-6 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Carte interactive</p>
                    <p className="text-sm">123 Avenue des Champs-Élysées</p>
                    <p className="text-sm">75008 Paris, France</p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-4">
                  <div className="p-4 bg-primary-50 rounded-lg">
                    <h4 className="font-semibold text-primary-900 mb-2">Showroom FriedShop</h4>
                    <p className="text-primary-800 text-sm">
                      Venez découvrir nos produits en situation réelle dans notre showroom parisien. 
                      Nos experts sont présents pour vous conseiller et vous faire tester les dernières innovations.
                    </p>
                  </div>

                  <div className="p-4 bg-accent-50 rounded-lg">
                    <h4 className="font-semibold text-accent-900 mb-2">Service après-vente</h4>
                    <p className="text-accent-800 text-sm">
                      Notre service après-vente est disponible pour tous vos besoins de support, 
                      réparation et garantie. Prise de rendez-vous possible directement en magasin.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Livraison & Retrait</h4>
                    <p className="text-green-800 text-sm">
                      Point de retrait disponible pour toutes vos commandes. 
                      Possibilité de livraison express en région parisienne.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Quels sont vos délais de livraison ?",
                answer: "Nous proposons une livraison express en 24-48h pour la région parisienne et 2-5 jours ouvrés pour le reste de la France. La livraison est gratuite dès 50€ d'achat."
              },
              {
                question: "Puis-je retourner un produit ?",
                answer: "Oui, vous disposez de 30 jours pour retourner un produit en parfait état. Les frais de retour sont à votre charge sauf en cas de défaut du produit."
              },
              {
                question: "Proposez-vous des garanties étendues ?",
                answer: "Tous nos produits bénéficient de la garantie constructeur. Nous proposons également des extensions de garantie jusqu'à 3 ans pour certains produits."
              },
              {
                question: "Comment puis-je suivre ma commande ?",
                answer: "Dès l'expédition de votre commande, vous recevrez un email avec un numéro de suivi. Vous pouvez également nous contacter directement pour un suivi personnalisé."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 animate-slide-up" 
                   style={{ animationDelay: `${index * 0.1}s` }}>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;