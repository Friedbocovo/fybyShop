import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, Search, SlidersHorizontal, X, AlertCircle, RefreshCw } from 'lucide-react';
import ProductCard from '../components/UI/ProductCard';
import Button from '../components/UI/Button';
import { useContentful } from '../contexts/ContentfulContext';
import { searchProducts } from '../lib/contentful';
import { Fade, Slide, Bounce, Zoom, Flip, Rotate, Roll, JackInTheBox, Hinge } from "react-awesome-reveal";


const Shop: React.FC = () => {
  const { products, categories, isLoading, isConnected, error, refreshData } = useContentful();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Get URL search params
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    const categoryParam = urlParams.get('category');
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  const brands = useMemo(() => {
    const allBrands = [...new Set(products.map(product => product.brand))];
    return allBrands.sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    console.log('🔍 Starting filter process...');
    console.log('📊 Total products:', products.length);
    console.log('🔍 Search term:', searchTerm);
    console.log('📂 Selected category:', selectedCategory);

    // Recherche intelligente
    if (searchTerm.trim()) {
      filtered = searchProducts(searchTerm, filtered);
      console.log('🔍 After search:', filtered.length);
    }

    // Filtres
    filtered = filtered.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
      
      if (!matchesCategory) {
        console.log(`❌ Product ${product.name} doesn't match category. Product category: "${product.category}", Selected: "${selectedCategory}"`);
      }
      
      return matchesCategory && matchesBrand;
    });

    console.log('📊 After category filter:', filtered.length);

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    console.log('📊 Final filtered products:', filtered.length);
    return filtered;
  }, [products, searchTerm, selectedCategory, selectedBrand, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSortBy('name');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1">
              <Fade direction="left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Boutique</h1>
             </Fade>
              {searchTerm && (
                <p className="text-gray-600 mt-1">
                  Résultats pour "{searchTerm}"
                  {filteredProducts.length === 0 && products.length > 0 && (
                    <span className="text-orange-600"> - Aucun résultat exact, voici des suggestions similaires</span>
                  )}
                </p>
              )}
              {selectedCategory !== 'all' && (
                <p className="text-gray-600 mt-1">
                  Catégorie: {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                </p>
              )}
            </div>
            
                          <Fade direction="right">

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              
              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              
              {/* Filters Toggle */}
              <Button
                variant="outline"
                icon={SlidersHorizontal}
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                Filtres
              </Button>
            </div>
          </Fade>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <Fade direction="left">
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Effacer
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
                            <Rotate direction="top-left">
              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Catégorie
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </Rotate>

              {/* Brand Filter */}
                          <Rotate direction="top-left">

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Marque
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                >
                  <option value="all">Toutes les marques</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
</Rotate>
              {/* Sort By */}
              <Rotate direction="top-left">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Trier par
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                >
                  <option value="name">Nom (A-Z)</option>
                  <option value="price-low">Prix croissant</option>
                  <option value="price-high">Prix décroissant</option>
                  <option value="rating">Mieux notés</option>
                  <option value="newest">Nouveautés</option>
                </select>
              </div>
</Rotate>
            </div>
          </div>
        </Fade>
          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <Zoom>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {isConnected ? 'Aucun produit trouvé' : 'Votre connexion es instable'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {isConnected 
                    ? searchTerm 
                      ? `Aucun résultat pour "${searchTerm}". Essayez des termes différents.`
                      : 'Essayez de modifier vos critères de recherche.'
                    : 'Vérifiez votre connexion et veuillez Réessayer .'
                  }
                </p>
                {isConnected && (
                  <Button onClick={clearFilters}>
                    Effacer les filtres
                  </Button>
                )}
              </div>
            </Zoom>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product, index) => (
                  <Rotate  cascade>
                  <ProductCard
                    key={product.id}
                    product={product}
                    compact={viewMode === 'list'}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` } as React.CSSProperties}
                  /></Rotate>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;