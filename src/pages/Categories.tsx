import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Smartphone, Headphones, Gamepad2, Volume2, Tv, ArrowRight, Star, TrendingUp, Zap, AlertCircle, RefreshCw, Package, Laptop, Camera, Watch, Tablet } from 'lucide-react';
import ProductCard from '../components/UI/ProductCard';
import Button from '../components/UI/Button';
import { useContentful } from '../contexts/ContentfulContext';
import { getProductsByCategory } from '../lib/contentful';
import { Fade, Slide, Bounce, Zoom, Flip, Rotate, Roll, JackInTheBox, Hinge } from "react-awesome-reveal";

const Categories: React.FC = () => {
  const { products, categories, isLoading, isConnected, error, refreshData } = useContentful();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryIcons = {
    Monitor,
    Smartphone,
    Headphones,
    Gamepad2,
    Volume2,
    Tv,
    Package,
    Laptop,
    Camera,
    Watch,
    Tablet
  };

  const featuredProducts = products.filter(product => product.isFeatured).slice(0, 3);
  const newProducts = products.filter(product => product.isNew).slice(0, 3);

  const getCategoryProducts = (categorySlug: string) => {
    console.log(`🔍 Getting products for category: ${categorySlug}`);
    const categoryProducts = products.filter(product => {
      const matches = product.category === categorySlug;
      console.log(`Product: ${product.name}, Category: ${product.category}, Matches: ${matches}`);
      return matches;
    });
    console.log(`📊 Found ${categoryProducts.length} products for category ${categorySlug}`);
    return categoryProducts.slice(0, 4);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des catégories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <Fade direction="right">
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-primary-900/90 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-slide-up">
            <Rotate direction="top-left" cascade>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Zap className="h-8 w-8 text-accent-400" />
              <span className="text-accent-400 font-semibold text-lg">Toutes nos catégories</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Explorez notre 
              <span className="text-accent-400"> univers tech</span>
            </h1>

            <p className="text-xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
              Découvrez notre sélection complète organisée par catégories pour trouver 
              exactement ce que vous cherchez
            </p>
          </Rotate>
          </div>
        </div>
      </section>
    </Fade>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Zoom>
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Catégories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {categories.length > 0 
                ? 'Chaque catégorie regroupe les meilleurs produits sélectionnés par nos experts'
                : 'Vérifiez votre connexion et veuillez Réessayer '
              }
            </p>
          </div>
        </Zoom>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {categories.map((category, index) => {
                const IconComponent = categoryIcons[category.icon as keyof typeof categoryIcons] || Monitor;
                const categoryProducts = getCategoryProducts(category.slug);
                
                return (
                     <Fade direction="left" cascade>

                  <div
                    key={category.id}
                    className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-8">
                                                                    <Rotate direction="top-left" cascade>

                      <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-primary-600" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-sm font-medium text-gray-500">
                          {category.productCount > 0 ? (
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-4 w-4 text-green-500" />
                              <span className="text-green-600 font-medium">Disponible</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">Aucun produit</span>
                          )}
                        </span>
                      </div>
                      
                      <Link
                        to={`/shop?category=${category.slug}`}
                        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold group-hover:translate-x-2 transition-transform duration-300"
                      >
                        <span>Explorer</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      </Rotate>
                    </div>
                    
                    {/* Preview products */}

                    {categoryProducts.length > 0 && (
                      <div className="px-8 pb-8">
                        <div className="grid grid-cols-2 gap-2">
                          {categoryProducts.slice(0, 2).map((product) => (
                            <div key={product.id} className="relative">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-20 object-cover rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div></Fade>
                );
              })}
            </div>
          ) : isConnected ? (
            <div className="text-center py-12 animate-slide-up">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune catégorie trouvée
              </h3>
            </div>
          ) : null}
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <Fade direction="right">
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Produits en Vedette
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Nos coups de cœur sélectionnés dans toutes les catégories
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
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
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <span>Voir tous les produits</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </Fade>
      )}

      {/* New Products */}
      {newProducts.length > 0 && (
         <Fade direction="right">
        <section className="py-16 bg-gradient-to-br from-accent-50 to-accent-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-slide-up">
              <Rotate direction="bottom-left" cascade>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="h-6 w-6 text-accent-600" />
                <span className="text-accent-600 font-semibold">Nouveautés</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Dernières Arrivées
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Découvrez les dernières innovations technologiques
              </p>
            </Rotate>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {newProducts.map((product, index) => (
                <Rotate>
                <ProductCard
                  key={product.id}
                  product={product}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
                /></Rotate>
              ))}
            </div>
          </div>
        </section></Fade>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <Fade direction="up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
        </Fade>
          <Fade direction="up">
          <p className="text-xl mb-8 text-primary-100">
            Contactez nos experts pour des conseils personnalisés
          </p>
        </Fade>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                       <Fade direction="left"> 
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              Nous contacter
            </Link>
          </Fade>
            <Fade direction="right">
            <Link
              to="/shop"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200 inline-block"
            >
            
              Parcourir la boutique
            </Link></Fade>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;