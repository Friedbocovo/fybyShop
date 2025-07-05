import React from 'react';
import { Award, Users, Zap, Globe, Heart, Shield } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Users, value: '10,000+', label: 'Clients satisfaits' },
    { icon: Award, value: '5 ans', label: 'D\'expérience' },
    { icon: Globe, value: '50+', label: 'Marques partenaires' },
    { icon: Zap, value: '99.9%', label: 'Disponibilité' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Nous sommes passionnés par la technologie et nous nous efforçons de partager cette passion avec nos clients.'
    },
    {
      icon: Shield,
      title: 'Confiance',
      description: 'La confiance de nos clients est notre priorité absolue. Nous garantissons la qualité et l\'authenticité de tous nos produits.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans tout ce que nous faisons, du service client à la sélection de produits.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              À propos de FriedShop
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed animate-slide-up" 
               style={{ animationDelay: '0.2s' }}>
              Votre partenaire de confiance pour l'électronique haut de gamme depuis 2019
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" 
                   style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre Histoire
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  FriedShop a été fondé en 2019 avec une mission simple : démocratiser l'accès 
                  aux technologies les plus avancées. Nous avons commencé comme une petite 
                  boutique en ligne spécialisée dans les produits Apple, avant de nous 
                  développer pour devenir l'un des leaders français de l'électronique premium.
                </p>
                <p>
                  Aujourd'hui, nous proposons une sélection rigoureuse des meilleurs produits 
                  électroniques du marché, des smartphones aux ordinateurs portables, en 
                  passant par les accessoires audio et gaming. Notre équipe d'experts teste 
                  personnellement chaque produit pour garantir qu'il répond à nos standards 
                  de qualité exceptionnels.
                </p>
                <p>
                  Ce qui nous distingue ? Notre service client personnalisé, nos conseils 
                  d'experts et notre engagement à fournir une expérience d'achat exceptionnelle 
                  à chaque étape de votre parcours.
                </p>
              </div>
            </div>
            
            <div className="animate-slide-in-right">
              <img
                src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Notre équipe"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre action au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 animate-slide-up" 
                   style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des experts passionnés à votre service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alexandre Martin',
                role: 'Fondateur & CEO',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
                bio: 'Passionné de technologie depuis l\'enfance, Alexandre a fondé FriedShop pour partager sa passion.'
              },
              {
                name: 'Sophie Dubois',
                role: 'Directrice Technique',
                image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400',
                bio: 'Experte en électronique avec 10 ans d\'expérience, Sophie supervise nos tests produits.'
              },
              {
                name: 'Thomas Bernard',
                role: 'Responsable Commercial',
                image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
                bio: 'Thomas développe nos partenariats avec les plus grandes marques tech du marché.'
              }
            ].map((member, index) => (
              <div key={index} className="text-center animate-slide-up" 
                   style={{ animationDelay: `${index * 0.1}s` }}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Rejoignez l'aventure FriedShop
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Découvrez pourquoi des milliers de clients nous font confiance pour leurs achats tech
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/shop"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              Découvrir nos produits
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200 inline-block"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;