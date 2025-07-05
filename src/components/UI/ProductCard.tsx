import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';

interface ProductCardProps {
  product: Product;
  className?: string;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '', compact = false }) => {
  const { addItem } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  if (compact) {
    return (
      <div className={`group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}>
        <Link to={`/product/${product.id}`} className="block">
          {/* Image compacte */}
          <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Contenu compact */}
          <div className="p-3">
            {/* Nom */}
            <h3 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200 mb-2">
              {product.name}
            </h3>

            {/* Prix */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {(product.price).toLocaleString('fr-FR')} FCFA
              </span>
              
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="p-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className={`group relative bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${className}`}>
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col space-y-2">
        {product.isNew && (
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            NOUVEAU
          </span>
        )}
      </div>

      {/* Quick Actions */}
      <div className="absolute top-3 right-3 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={handleToggleFavorite}
          className={`p-2 rounded-full shadow-lg transition-colors duration-200 ${
            isFavorite(product.id) 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
        </button>
        <Link
          to={`/product/${product.id}`}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <Eye className="h-4 w-4 text-gray-600" />
        </Link>
      </div>

      <Link to={`/product/${product.id}`} className="block">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Brand */}
          <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          
          {/* Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {(product.price).toLocaleString('fr-FR')} FCFA
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {(product.originalPrice).toLocaleString('fr-FR')} FCFA
                </span>
              )}
            </div>
          </div>

          {/* Stock status */}
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${
              product.inStock ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {product.inStock ? 'En stock' : 'Rupture de stock'}
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="absolute bottom-2 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex justify-center">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg text-sm"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;