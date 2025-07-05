import React from 'react';
import { Scale, Building, Phone, Mail, MapPin, Globe } from 'lucide-react';

const LegalNotice: React.FC = () => {
  const legalSections = [
    {
      title: 'Identification de l\'entreprise',
      icon: Building,
      content: [
        'Dénomination sociale : FriedShop SARL',
        'Siège social : 123 Avenue des Champs-Élysées, 75008 Paris, France',
        'Capital social : 50 000 € entièrement libéré',
        'RCS Paris : 123 456 789',
        'SIRET : 123 456 789 00012',
        'TVA intracommunautaire : FR12 123456789'
      ]
    },
    {
      title: 'Directeur de publication',
      icon: Globe,
      content: [
        'Nom : Alexandre Martin',
        'Qualité : Gérant de la société FriedShop SARL',
        'Email : direction@friedshop.fr',
        'Responsable éditorial du contenu du site web'
      ]
    },
    {
      title: 'Hébergement du site',
      icon: Globe,
      content: [
        'Hébergeur : OVH SAS',
        'Adresse : 2 rue Kellermann, 59100 Roubaix, France',
        'Téléphone : +33 9 72 10 10 07',
        'Site web : www.ovh.com',
        'Serveurs localisés en France et Europe'
      ]
    },
    {
      title: 'Propriété intellectuelle',
      icon: Scale,
      content: [
        'Tous droits réservés FriedShop © 2024',
        'Marques, logos et contenus protégés',
        'Reproduction interdite sans autorisation',
        'Images produits : droits d\'utilisation acquis',
        'Respect du droit d\'auteur et des marques'
      ]
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+229 97 12 34 56',
      description: 'Service client : Lun-Ven 9h-18h'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@friedshop.fr',
      description: 'Réponse sous 24h ouvrées'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      value: '123 Avenue des Champs-Élysées',
      description: '75008 Paris, France'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-slide-up">
            <Scale className="h-16 w-16 text-accent-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mentions Légales
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Informations légales et réglementaires concernant FriedShop
            </p>
          </div>
        </div>
      </section>

      {/* Legal Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {legalSections.map((section, index) => (
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

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nous Contacter
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pour toute question juridique ou administrative
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((contact, index) => (
              <div
                key={contact.title}
                className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <contact.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.title}</h3>
                <p className="text-lg font-medium text-gray-900 mb-2">{contact.value}</p>
                <p className="text-sm text-gray-600">{contact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms and Conditions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Conditions Générales</h2>
            
            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Acceptation des conditions</h3>
                <p className="leading-relaxed">
                  L'utilisation du site web FriedShop implique l'acceptation pleine et entière des 
                  conditions générales d'utilisation décrites ci-après. Ces conditions d'utilisation 
                  sont susceptibles d'être modifiées ou complétées à tout moment.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Utilisation du site</h3>
                <p className="leading-relaxed">
                  Le site FriedShop est accessible 24h/24, 7j/7 sauf cas de force majeure, 
                  difficultés informatiques ou techniques. FriedShop se réserve le droit 
                  d'interrompre, de suspendre momentanément ou de modifier sans préavis 
                  l'accès à tout ou partie du site.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Responsabilité</h3>
                <p className="leading-relaxed">
                  Les informations contenues sur ce site sont aussi précises que possible. 
                  Toutefois, FriedShop ne pourra être tenue responsable des omissions, 
                  inexactitudes et carences dans la mise à jour, qu'elles soient de son fait 
                  ou du fait des tiers partenaires qui lui fournissent ces informations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Droit applicable</h3>
                <p className="leading-relaxed">
                  Les présentes conditions d'utilisation du site sont régies par les lois 
                  françaises et soumises à la compétence des tribunaux du siège social de 
                  la société, sauf règles de procédure civile contraires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dispute Resolution */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Résolution des Litiges
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            En cas de litige, nous privilégions toujours la résolution amiable
          </p>
          
          <div className="bg-white/10 rounded-2xl p-8 text-left">
            <h3 className="text-xl font-semibold mb-4">Médiation de la consommation</h3>
            <p className="text-primary-100 mb-4">
              Conformément à l'article L. 616-1 du Code de la consommation, nous vous informons 
              qu'en cas de litige, vous pouvez recourir gratuitement au service de médiation 
              de la consommation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Médiateur de la consommation</h4>
                <p className="text-sm text-primary-200">
                  Centre de médiation de la consommation<br />
                  27 avenue de la libération<br />
                  42400 Saint-Chamond<br />
                  contact@cm2c.net
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Plateforme européenne</h4>
                <p className="text-sm text-primary-200">
                  Vous pouvez également utiliser la plateforme<br />
                  de résolution des litiges en ligne de l'UE :<br />
                  https://ec.europa.eu/consumers/odr/
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalNotice;