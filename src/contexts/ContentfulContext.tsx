import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Category, getProducts, getCategories, checkContentfulConnection } from '../lib/contentful';

interface ContentfulState {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  isConnected: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const ContentfulContext = createContext<ContentfulState | undefined>(undefined);

export const ContentfulProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    console.log('🚀 Starting Contentful data loading...');
    setIsLoading(true);
    setError(null);

    try {
      // Vérifier les variables d'environnement
      const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
      const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
      
      console.log('🔧 Environment check:', {
        spaceId: spaceId ? 'Present' : 'Missing',
        accessToken: accessToken ? 'Present' : 'Missing'
      });

      if (!spaceId || !accessToken) {
        setError('Variables d\'environnement Contentful manquantes. Vérifiez votre fichier .env.local');
        setIsConnected(false);
        return;
      }

      // Vérifier la connexion
      console.log('🔍 Testing connection...');
      const connected = await checkContentfulConnection();
      console.log('📡 Connection result:', connected);
      setIsConnected(connected);

      if (connected) {
        console.log('✅ Connection successful, loading data...');
        
        // Charger les données
        const [productsData, categoriesData] = await Promise.all([
          getProducts().catch(err => {
            console.error('❌ Error loading products:', err);
            return [];
          }),
          getCategories().catch(err => {
            console.error('❌ Error loading categories:', err);
            return [];
          })
        ]);

        console.log('📊 Data loaded:', { 
          products: productsData.length, 
          categories: categoriesData.length 
        });

        setProducts(productsData);
        setCategories(categoriesData);
        
        if (productsData.length === 0 && categoriesData.length === 0) {
          setError('Aucun contenu trouvé. Assurez-vous d\'avoir créé et publié des produits dans Contentful.');
        } else if (productsData.length === 0) {
          setError('Aucun produit trouvé. Créez des entrées de type "product" dans Contentful.');
        }
      } else {
        setError('Connexion à Contentful échouée. Vérifiez vos identifiants et que votre espace existe.');
      }
    } catch (err) {
      console.error('💥 Critical error in loadData:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(`Erreur critique: ${errorMessage}`);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
      console.log('🏁 Data loading completed');
    }
  };

  const refreshData = async () => {
    console.log('🔄 Refreshing Contentful data...');
    await loadData();
  };

  useEffect(() => {
    // Attendre que les variables d'environnement soient disponibles
    const timer = setTimeout(() => {
      loadData();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ContentfulContext.Provider value={{
      products,
      categories,
      isLoading,
      isConnected,
      error,
      refreshData
    }}>
      {children}
    </ContentfulContext.Provider>
  );
};

export const useContentful = () => {
  const context = useContext(ContentfulContext);
  if (context === undefined) {
    throw new Error('useContentful must be used within a ContentfulProvider');
  }
  return context;
};