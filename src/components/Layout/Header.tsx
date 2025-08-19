import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, LogIn } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useFirebase } from '../../contexts/FirebaseContext';
import { useContentful } from '../../contexts/ContentfulContext';
import LoginModal from '../Auth/LoginModal';
import Logo from "/jaune.jpeg";
import { Fade, Slide, Bounce, Zoom, Flip, Rotate, Roll, JackInTheBox, Hinge } from "react-awesome-reveal";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { itemCount } = useCart();
  const { isAuthenticated, userProfile } = useFirebase();
  const { products } = useContentful();
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Boutique', href: '/shop' },
    { name: 'Catégories', href: '/categories' },
    { name: 'À propos', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 2) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.brand.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
      ).slice(0, 5);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      // Naviguer vers le profil si connecté
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src={Logo}
                  alt="fybyShop Logo"
                  className="h-10 w-10 rounded-xl object-cover"
                />
              </div>
              <Fade direction="right">
              <span className="hidden md:block lg:block logo text-xl sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400 ">
               ybyShop
                
              </span></Fade>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8">
              {navigation.map((item) => (
                <Roll cascade>
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    isActive(item.href)
                      ? 'text-emerald-600'
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                > 

                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-200 group-hover:w-full ${
                    isActive(item.href) ? 'w-full' : ''
                  }`}></span>
                </Link> </Roll>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200"
                  aria-label="Rechercher"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>

              {/* Account */}
              {isAuthenticated ? (
                <Link to="/profile" className="flex items-center space-x-2 p-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:block text-sm font-medium">{userProfile?.firstName}</span>
                </Link>
              ) : (
                <button
                  onClick={handleProfileClick}
                  className="flex hidden md:flex lg:flex  items-center space-x-2 p-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200"
                >
                  <LogIn className="h-5 w-5 " />
                  <span className="hidden sm:block text-sm font-medium">Connexion</span>
                </button>
              )}

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200 group"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="pb-4 animate-slide-up">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  autoFocus
                />
                
                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-96 overflow-y-auto z-50">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={clearSearch}
                        className="flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.brand}</p>
                          <p className="text-sm font-semibold text-emerald-600">
                            {(product.price).toLocaleString('fr-FR')} FCFA
                          </p>
                        </div>
                      </Link>
                    ))}
                    
                    {searchTerm.length > 2 && (
                      <Link
                        to={`/shop?search=${encodeURIComponent(searchTerm)}`}
                        onClick={clearSearch}
                        className="block p-3 text-center text-emerald-600 hover:bg-emerald-50 font-medium border-t border-gray-200"
                      >
                        Voir tous les résultats pour "{searchTerm}"
                      </Link>
                    )}
                  </div>
                )}
                
                {searchTerm.length > 2 && searchResults.length === 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl mt-1 p-4 text-center text-gray-500">
                    Aucun produit trouvé pour "{searchTerm}"
                  </div>
                )}
              </div>LegalNotice
            </div>
          )}

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden pb-4 animate-slide-up">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                {isAuthenticated ? (
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                  >
                    Mon Profil
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsLoginModalOpen(true);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                  >
                    ConnexionLegalNotice
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default Header