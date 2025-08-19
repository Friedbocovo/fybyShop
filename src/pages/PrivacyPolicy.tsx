import React from 'react';
import { Shield, Eye, Lock, UserCheck, Database, Globe } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      title: 'Collecte des données',
      icon: Database,
      content: [
        'Informations personnelles (nom, prénom, email, téléphone)',
        'Adresses de livraison et de facturation',
        'Historique des commandes et préférences',
        'Données de navigation et cookies techniques',
        'Informations de paiement (traitées de manière sécurisée)'
      ]
    },
    {
      title: 'Utilisation des données',
      icon: UserCheck,
      content: [
        'Traitement et suivi de vos commandes',
        'Communication concernant vos achats',
        'Amélioration de nos services et recommandations',
        'Support client et assistance technique',
        'Respect de nos obligations légales et comptables'
      ]
    },
    {
      title: 'Partage des données',
      icon: Globe,
      content: [
        'Partenaires de livraison pour l\'expédition',
        'Prestataires de paiement sécurisé',
        'Services techniques (hébergement, maintenance)',
        'Autorités légales si requis par la loi',
        'Aucune vente à des tiers à des fins commerciales'
      ]
    },
    {
      title: 'Sécurité des données',
      icon: Lock,
      content: [
        'Chiffrement SSL pour toutes les transactions',
        'Serveurs sécurisés et sauvegardés régulièrement',
        'Accès limité aux données par le personnel autorisé',
        'Mise à jour régulière des systèmes de sécurité',
        'Conformité aux standards internationaux'
      ]
    }
  ];

  const rights = [
    {
      title: 'Droit d\'accès',
      description: 'Vous pouvez demander l\'accès à toutes vos données personnelles que nous détenons.'
    },
    {
      title: 'Droit de rectification',
      description: 'Vous pouvez demander la correction de données inexactes ou incomplètes.'
    },
    {
      title: 'Droit à l\'effacement',
      description: 'Vous pouvez demander la suppression de vos données dans certaines conditions.'
    },
    {
      title: 'Droit à la portabilité',
      description: 'Vous pouvez demander le transfert de vos données vers un autre service.'
    },
    {
      title: 'Droit d\'opposition',
      description: 'Vous pouvez vous opposer au traitement de vos données à des fins marketing.'
    },
    {
      title: 'Droit de limitation',
      description: 'Vous pouvez demander la limitation du traitement de vos données.'
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
              Politique de Confidentialité
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Votre vie privée est notre priorité. Découvrez comment nous protégeons vos données.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Notre Engagement
            </h2>
            <div className="bg-primary-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Chez FriedShop, nous nous engageons à protéger et respecter votre vie privée. 
                Cette politique explique comment nous collectons, utilisons et protégeons vos 
                informations personnelles lorsque vous utilisez notre site web et nos services. 
                Nous respectons le Règlement Général sur la Protection des Données (RGPD) et 
                les lois locales sur la protection des données.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Handling Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-primary-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <section.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                </div>
                
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary-600 mt-2"></div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Eye className="h-8 w-8 text-primary-600" />
              <span className="text-primary-600 font-semibold text-lg">Vos Droits</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vous avez le contrôle
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conformément au RGPD, vous disposez de plusieurs droits concernant vos données personnelles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rights.map((right, index) => (
              <div
                key={right.title}
                className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{right.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{right.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookies Policy */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Politique des Cookies</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Qu'est-ce qu'un cookie ?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez 
                  notre site web. Les cookies nous aident à améliorer votre expérience de navigation 
                  et à personnaliser nos services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Types de cookies utilisés</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Cookies essentiels</h4>
                    <p className="text-sm text-gray-600">Nécessaires au fonctionnement du site (panier, connexion)</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Cookies analytiques</h4>
                    <p className="text-sm text-gray-600">Nous aident à comprendre l'utilisation du site</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Cookies de préférences</h4>
                    <p className="text-sm text-gray-600">Mémorisent vos choix et préférences</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Cookies marketing</h4>
                    <p className="text-sm text-gray-600">Personnalisent les publicités (avec votre consentement)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Privacy */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Questions sur vos données ?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Notre délégué à la protection des données est à votre disposition
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Email dédié</h3>
              <p className="text-primary-100">privacy@friedshop.fr</p>
              <p className="text-sm text-primary-200">Réponse sous 72h</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Courrier postal</h3>
              <p className="text-primary-100 text-sm">
                FriedShop - DPO<br />
                Abomey Calavi, Benin<br />
                75008 Paris, France
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-6 text-left">
            <h3 className="text-lg font-semibold mb-3">Dernière mise à jour</h3>
            <p className="text-primary-100 text-sm">
              Cette politique de confidentialité a été mise à jour le 1er janvier 2024. 
              Nous vous informerons de tout changement significatif par email ou via 
              une notification sur notre site web.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;