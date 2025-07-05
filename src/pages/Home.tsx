import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Headphones, AlertCircle, RefreshCw, Package, Plus } from 'lucide-react';
import ProductCard from '../components/UI/ProductCard';
import Button from '../components/UI/Button';
import { useContentful } from '../contexts/ContentfulContext';
import { Fade, Slide, Bounce, Zoom, Flip, Rotate, Roll, JackInTheBox, Hinge } from "react-awesome-reveal";


const Home: React.FC = () => {
  const { products, isLoading, isConnected, error, refreshData } = useContentful();
  const featuredProducts = products.filter(product => product.isFeatured);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-emerald-900/90 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-slide-in-left">
                          <Rotate direction="top-left" >
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
                <span className="text-orange-400 font-semibold text-sm sm:text-lg">Électronique Premium</span>
              </div>
                            </Rotate>



              <Rotate direction="top-left" cascade >
                                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                L'innovation à 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400"> portée de main</span>
              </h1>
                            </Rotate>

            
            <Rotate direction="top-left" cascade >
                                        <p className="text-sm sm:text-lg lg:text-xl mb-6 sm:mb-8 text-gray-200 leading-relaxed">
                Découvrez notre sélection exceptionnelle de produits électroniques haut de gamme. 
                De la dernière technologie aux accessoires indispensables.
              </p>
                            </Rotate>

              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                 <Fade direction="left">
                <Button size="lg" className="text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4" icon={ArrowRight} iconPosition="right">
                  <Link to="/shop">Découvrir la boutique</Link>
                </Button>
                 </Fade>

                                 <Fade direction="right">
                <Button variant="outline" size="lg" className="text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-white text-white hover:bg-white hover:text-black hover:text-emerald-900">
                  <Link to="/categories">Voir les catégories</Link>
                </Button>
                 </Fade>

              </div>
            </div>  

        
            {/* Images statiques - cachées sur mobile */}
            <div className="relative animate-slide-in-right hidden lg:block">
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-4 lg:space-y-6">
                     <Fade direction="up" delay={400} cascade>
                  <div className="bg-white rounded-xl shadow-lg p-1 lg:p-1">
                    <img 
                      src="https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=300" 
                      alt="MacBook" 
                      className="w-full h-32 lg:h-40 object-cover rounded-lg"
                    />
                  </div>
                  </Fade>

                     <Fade direction="up" delay={500} cascade>
                  <div className="bg-white rounded-xl shadow-lg p-1 lg:p-1">
                    <img 
                      src="https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=300" 
                      alt="AirPods" 
                      className="w-full h-32 lg:h-40 object-cover rounded-lg"
                    />
                  </div>
                  </Fade>

                </div>
                <div className="space-y-4 lg:space-y-6 mt-8 lg:mt-12">
                     <Fade direction="up" delay={600} cascade>
                                       <div className="bg-white rounded-xl shadow-lg p-1 lg:p-1">
                    <img 
                      src="https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=300" 
                      alt="iPhone" 
                      className="w-full h-32 lg:h-40 object-cover rounded-lg"
                    />
                  </div>
                  </Fade>
 
                     <Fade direction="up" delay={700} cascade>
                                        <div className="bg-white rounded-xl shadow-lg p-1 lg:p-1">
                    <img 
                      src="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=300" 
                      alt="Gaming" 
                      className="w-full h-32 lg:h-40 object-cover rounded-lg"
                    />
                  </div>
                  </Fade>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-gray-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 ">
            <Fade direction="left">
            <div className="text-center group animate-slide-up">
              <div className="bg-emerald-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-emerald-200 transition-colors duration-300">
                <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Livraison Express</h3>
              <p className="text-sm sm:text-base text-gray-600">Livraison chez vous ou récupération en <br/> magasin selon votre choix</p>
            </div>
          </Fade>
                        <Fade direction="right">

            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-teal-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-teal-200 transition-colors duration-300">
                <Headphones className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Support 24/7</h3>
              <p className="text-sm sm:text-base text-gray-600">Une équipe d'experts à votre disposition <br /> pour tous vos besoins techniques</p>
            </div>
          </Fade>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 animate-slide-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Produits en Vedette
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de produits phares, choisis pour leur innovation et leur qualité exceptionnelle
            </p>
          </div>

          {error && (
              <div className="flex flex-col items-start items-center justify-center space-x-3">
                <div className="flex gap-2">
                <AlertCircle className="h-6 w-6 text-red-600 mt-1" />
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Erreur de connexion</h3>
                </div>

                  <p className="text-red-800">Vérifiez votre connexion et veuillez Réessayer</p>
                
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des produits...</p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {featuredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
                  />
                ))}
              </div>
              
              <div className="text-center animate-slide-up">
                <Button size="lg" icon={ArrowRight} iconPosition="right">
                  <Link to="/shop">Voir tous les produits</Link>
                </Button>
              </div>
            </>
          ) : isConnected && products.length > 0 ? (
            // Si connecté mais pas de produits featured, afficher les premiers produits
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {products.slice(0, 3).map((product, index) => (
                              <Roll direction="left" cascade>

                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
                  />            </Roll>

                ))}
              </div>
              
              <div className="text-center animate-slide-up">
                <Zoom>
                <Button size="lg" icon={ArrowRight} iconPosition="right">
                  <Link to="/shop">Voir tous les produits</Link>
                </Button></Zoom>
              </div>
            </>
          ) : null}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-emerald-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <Fade direction="up" cascade>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Prêt à découvrir l'excellence technologique ?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-emerald-100">
            Rejoignez des milliers de clients satisfaits et profitez de nos offres exceptionnelles
          </p></Fade>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Slide direction="left">
            <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100">
              <Link to="/shop">Commencer mes achats</Link>
            </Button>
          </Slide>
          <Slide direction="right" >
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </Slide>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;