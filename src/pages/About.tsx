import React from 'react';
import { Award, Users, Zap, Globe, Heart, Shield } from 'lucide-react';
import { Fade, Slide, Bounce, Zoom, Flip, Rotate, Roll, JackInTheBox, Hinge } from "react-awesome-reveal";

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
      <Fade direction="right">
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
           <Rotate direction="top-left" cascade>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              À propos de FriedShop
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed animate-slide-up" 
               style={{ animationDelay: '0.2s' }}>
              Votre partenaire de confiance pour l'électronique haut de gamme.
            </p>
          </Rotate>
          </div>
        </div>
      </section>
    </Fade>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <Fade direction="down" cascade>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre action au quotidien
            </p>
          </Fade>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Zoom cascade>
              <div key={index} className="text-center p-6 animate-slide-up" 
                   style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            </Zoom>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
         <Rotate direction="top-left" cascade>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Rejoignez l'aventure FriedShop
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Découvrez pourquoi des milliers de clients nous font confiance pour leurs achats tech
          </p>
        </Rotate>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Fade direction="left" cascade>
            <a
              href="/shop"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              Découvrir nos produits
            </a>
          </Fade>
          <Fade direction="right" cascade>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200 inline-block"
            >
              Nous contacter
            </a>
          </Fade>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;