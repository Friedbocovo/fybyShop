import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../types';

interface FavoritesState {
  favorites: Product[];
}

type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: Product }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'LOAD_FAVORITES'; payload: Product[] };

interface FavoritesContextType extends FavoritesState {
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const favoritesReducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      const newFavorites = [...state.favorites, action.payload];
      localStorage.setItem('friedshop_favorites', JSON.stringify(newFavorites));
      return { ...state, favorites: newFavorites };
    
    case 'REMOVE_FAVORITE':
      const filteredFavorites = state.favorites.filter(product => product.id !== action.payload);
      localStorage.setItem('friedshop_favorites', JSON.stringify(filteredFavorites));
      return { ...state, favorites: filteredFavorites };
    
    case 'LOAD_FAVORITES':
      return { ...state, favorites: action.payload };
    
    default:
      return state;
  }
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { favorites: [] });

  React.useEffect(() => {
    const savedFavorites = localStorage.getItem('friedshop_favorites');
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites);
        dispatch({ type: 'LOAD_FAVORITES', payload: favorites });
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  const addToFavorites = (product: Product) => {
    if (!state.favorites.find(fav => fav.id === product.id)) {
      dispatch({ type: 'ADD_FAVORITE', payload: product });
    }
  };

  const removeFromFavorites = (productId: string) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: productId });
  };

  const isFavorite = (productId: string): boolean => {
    return state.favorites.some(product => product.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{
      ...state,
      addToFavorites,
      removeFromFavorites,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};