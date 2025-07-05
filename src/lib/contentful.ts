import { createClient, Entry } from 'contentful';

// Interface pour les produits Contentful
export interface ContentfulProduct {
  sys: { id: string };
  fields: {
    name?: string;
    price?: number;
    originalPrice?: number;
    image?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    images?: Array<{
      fields: {
        file: {
          url: string;
        };
      };
    }>;
    category?: string | {
      fields: {
        name?: string;
        slug?: string;
      };
    };
    brand?: string;
    description?: string;
    specifications?: any;
    inStock?: boolean;
    rating?: number;
    reviewCount?: number;
    isNew?: boolean;
    isFeatured?: boolean;
    featured?: boolean;
  };
}

// Interface pour les catégories Contentful
export interface ContentfulCategory {
  sys: { id: string };
  fields: {
    name?: string;
    slug?: string;
    icon?: string;
    productCount?: number;
  };
}

// Interface pour l'application
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  description: string;
  specifications: Record<string, string>;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
}

// Client Contentful
let client: any = null;

export const initializeContentful = () => {
  const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

  console.log('🔧 Initializing Contentful...');

  if (!spaceId || !accessToken) {
    console.error('❌ Contentful credentials missing!');
    return null;
  }

  try {
    client = createClient({
      space: spaceId,
      accessToken: accessToken,
      environment: 'master',
    });

    console.log('✅ Contentful client created successfully');
    return client;
  } catch (error) {
    console.error('❌ Error creating Contentful client:', error);
    return null;
  }
};

// Vérifier la connexion Contentful
export const checkContentfulConnection = async (): Promise<boolean> => {
  if (!client) {
    console.log('🔄 Client not initialized, initializing...');
    initializeContentful();
  }

  if (!client) {
    console.error('❌ Contentful client not available');
    return false;
  }

  try {
    console.log('🔍 Testing Contentful connection...');
    const space = await client.getSpace();
    console.log('✅ Connected to Contentful space:', space.name);
    return true;
  } catch (error) {
    console.error('❌ Contentful connection failed:', error);
    return false;
  }
};

// Helper function to extract category string from Contentful field
const extractCategoryString = (categoryField: any): string => {
  if (!categoryField) {
    return 'general';
  }
  
  // If it's already a string
  if (typeof categoryField === 'string') {
    return categoryField;
  }
  
  // If it's a Contentful reference object
  if (categoryField.fields) {
    return categoryField.fields.slug || categoryField.fields.name || 'general';
  }
  
  // If it's an object but not a Contentful reference, try to extract meaningful data
  if (typeof categoryField === 'object') {
    // Try common property names
    if (categoryField.slug) return categoryField.slug;
    if (categoryField.name) return categoryField.name;
    if (categoryField.title) return categoryField.title;
    
    console.warn('⚠️ Unknown category object structure:', categoryField);
    return 'general';
  }
  
  // Fallback: convert to string
  return String(categoryField);
};

// Récupérer tous les produits
export const getProducts = async (): Promise<Product[]> => {
  if (!client) {
    console.log('🔄 Initializing client for products...');
    initializeContentful();
  }

  if (!client) {
    console.error('❌ No Contentful client available for products');
    return [];
  }

  try {
    console.log('📦 Fetching products from Contentful...');
    
    const response = await client.getEntries({
      content_type: 'product',
      limit: 100,
      include: 2, // Include referenced entries (like categories)
    });

    console.log('📊 Products response:', {
      total: response.total,
      items: response.items.length
    });

    if (!response.items || response.items.length === 0) {
      console.warn('⚠️ No products found in Contentful');
      return [];
    }

    const products = response.items.map((item: Entry<ContentfulProduct>, index: number) => {
      try {
        const isFeatured = item.fields?.isFeatured || item.fields?.featured || false;
        
        // Extract and normalize category
        const rawCategory = item.fields?.category;
        let category = extractCategoryString(rawCategory);
        category = category.toLowerCase().trim();

        console.log(`🔍 Product ${index + 1}: "${item.fields?.name}" - Raw category:`, rawCategory, '- Processed category:', category);

        const product = {
          id: item.sys.id,
          name: item.fields?.name || `Produit ${index + 1}`,
          price: item.fields?.price || 100,
          originalPrice: item.fields?.originalPrice,
          image: item.fields?.image ? `https:${item.fields.image.fields.file.url}` : 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
          images: item.fields?.images?.map(img => `https:${img.fields.file.url}`) || [],
          category: category,
          brand: item.fields?.brand || 'Sans marque',
          description: item.fields?.description || 'Description du produit',
          specifications: item.fields?.specifications || {},
          inStock: item.fields?.inStock !== false,
          rating: item.fields?.rating || 4.5,
          reviewCount: item.fields?.reviewCount || 10,
          isNew: item.fields?.isNew || false,
          isFeatured: isFeatured,
        };

        console.log(`✅ Product processed: ${product.name} (category: ${product.category})`);
        return product;
      } catch (error) {
        console.error(`❌ Error processing product ${index + 1}:`, error);
        return null;
      }
    }).filter(Boolean);

    console.log(`✅ Successfully processed ${products.length} products`);
    
    // Log des catégories trouvées
    const foundCategories = [...new Set(products.map(p => p.category))];
    console.log('📂 Categories found in products:', foundCategories);
    
    return products as Product[];
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return [];
  }
};

// Récupérer toutes les catégories
export const getCategories = async (): Promise<Category[]> => {
  if (!client) {
    console.log('🔄 Initializing client for categories...');
    initializeContentful();
  }

  if (!client) {
    console.error('❌ No Contentful client available for categories');
    return [];
  }

  try {
    console.log('📂 Fetching categories from Contentful...');
    
    // D'abord, récupérer tous les produits pour calculer les catégories
    const products = await getProducts();
    console.log('📊 Products loaded for category calculation:', products.length);

    // Essayer de récupérer les catégories depuis Contentful
    let contentfulCategories: Category[] = [];
    
    try {
      const contentTypes = await client.getContentTypes();
      const categoryContentType = contentTypes.items.find((ct: any) => ct.sys.id === 'category');
      
      if (categoryContentType) {
        console.log('📂 Category content type found, fetching categories...');
        const response = await client.getEntries({
          content_type: 'category',
          limit: 50,
        });

        if (response.items && response.items.length > 0) {
          contentfulCategories = response.items.map((item: Entry<ContentfulCategory>, index: number) => {
            try {
              let slug = String(item.fields?.slug || item.fields?.name || `category-${index + 1}`);
              slug = slug.toLowerCase().trim();
              
              const productCount = products.filter(p => p.category === slug).length;
              
              const category = {
                id: item.sys.id,
                name: item.fields?.name || `Catégorie ${index + 1}`,
                slug: slug,
                icon: item.fields?.icon || getCategoryIcon(slug),
                productCount: productCount,
              };

              console.log(`✅ Contentful category processed: ${category.name} (${productCount} produits)`);
              return category;
            } catch (error) {
              console.error(`❌ Error processing category ${index + 1}:`, error);
              return null;
            }
          }).filter(Boolean) as Category[];
        }
      }
    } catch (error) {
      console.warn('⚠️ Could not fetch categories from Contentful:', error);
    }

    // Si pas de catégories Contentful ou vides, générer depuis les produits
    if (contentfulCategories.length === 0) {
      console.log('📂 Generating categories from products...');
      const uniqueCategories = [...new Set(products.map(p => p.category))];
      
      contentfulCategories = uniqueCategories.map((cat, index) => {
        const productCount = products.filter(p => p.category === cat).length;
        
        const category = {
          id: `cat-${index}`,
          name: formatCategoryName(cat),
          slug: cat,
          icon: getCategoryIcon(cat),
          productCount: productCount
        };
        
        console.log(`✅ Generated category: ${category.name} (${productCount} produits)`);
        return category;
      });
    }

    // Recalculer les comptes de produits pour s'assurer qu'ils sont corrects
    const finalCategories = contentfulCategories.map(category => {
      const actualCount = products.filter(p => p.category === category.slug).length;
      return {
        ...category,
        productCount: actualCount
      };
    });

    console.log(`✅ Successfully processed ${finalCategories.length} categories`);
    finalCategories.forEach(cat => {
      console.log(`📊 ${cat.name}: ${cat.productCount} produits (slug: ${cat.slug})`);
    });
    
    return finalCategories;
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    
    // Fallback: générer des catégories basiques
    const products = await getProducts();
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    
    return uniqueCategories.map((cat, index) => ({
      id: `cat-${index}`,
      name: formatCategoryName(cat),
      slug: cat,
      icon: getCategoryIcon(cat),
      productCount: products.filter(p => p.category === cat).length
    }));
  }
};

// Fonction pour formater le nom de la catégorie
const formatCategoryName = (slug: string): string => {
  const categoryNames: Record<string, string> = {
    'computers': 'Ordinateurs',
    'ordinateurs': 'Ordinateurs',
    'pc': 'PC',
    'laptop': 'Ordinateurs Portables',
    'smartphones': 'Smartphones',
    'phones': 'Téléphones',
    'telephone': 'Téléphones',
    'audio': 'Audio',
    'headphones': 'Casques Audio',
    'casque': 'Casques',
    'gaming': 'Gaming',
    'jeux': 'Jeux',
    'accessories': 'Accessoires',
    'accessoires': 'Accessoires',
    'tv': 'Télévisions',
    'television': 'Télévisions',
    'tablets': 'Tablettes',
    'tablettes': 'Tablettes',
    'watches': 'Montres',
    'montres': 'Montres',
    'cameras': 'Appareils Photo',
    'appareils-photo': 'Appareils Photo',
    'general': 'Général',
    'default': 'Autres'
  };

  return categoryNames[slug.toLowerCase()] || slug.charAt(0).toUpperCase() + slug.slice(1);
};

// Fonction pour obtenir l'icône d'une catégorie
const getCategoryIcon = (category: string): string => {
  const categoryIcons: Record<string, string> = {
    'computers': 'Monitor',
    'ordinateurs': 'Monitor',
    'pc': 'Monitor',
    'laptop': 'Laptop',
    'smartphones': 'Smartphone',
    'phones': 'Smartphone',
    'telephone': 'Smartphone',
    'audio': 'Headphones',
    'headphones': 'Headphones',
    'casque': 'Headphones',
    'gaming': 'Gamepad2',
    'jeux': 'Gamepad2',
    'accessories': 'Package',
    'accessoires': 'Package',
    'tv': 'Tv',
    'television': 'Tv',
    'tablets': 'Tablet',
    'tablettes': 'Tablet',
    'watches': 'Watch',
    'montres': 'Watch',
    'cameras': 'Camera',
    'appareils-photo': 'Camera',
    'general': 'Package',
    'default': 'Package'
  };

  const lowerCategory = category.toLowerCase();
  return categoryIcons[lowerCategory] || categoryIcons['default'];
};

// Récupérer un produit par ID
export const getProductById = async (id: string): Promise<Product | null> => {
  if (!client) {
    initializeContentful();
  }

  if (!client) {
    return null;
  }

  try {
    console.log('🔍 Fetching product by ID:', id);
    const response = await client.getEntry<ContentfulProduct>(id, {
      include: 2 // Include referenced entries
    });

    if (!response) {
      console.warn('⚠️ Product not found:', id);
      return null;
    }

    const isFeatured = response.fields?.isFeatured || response.fields?.featured || false;
    
    // Extract and normalize category
    const rawCategory = response.fields?.category;
    let category = extractCategoryString(rawCategory);
    category = category.toLowerCase().trim();

    const product = {
      id: response.sys.id,
      name: response.fields?.name || 'Produit sans nom',
      price: response.fields?.price || 100,
      originalPrice: response.fields?.originalPrice,
      image: response.fields?.image ? `https:${response.fields.image.fields.file.url}` : 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: response.fields?.images?.map(img => `https:${img.fields.file.url}`) || [],
      category: category,
      brand: response.fields?.brand || 'Sans marque',
      description: response.fields?.description || 'Description du produit',
      specifications: response.fields?.specifications || {},
      inStock: response.fields?.inStock !== false,
      rating: response.fields?.rating || 4.5,
      reviewCount: response.fields?.reviewCount || 10,
      isNew: response.fields?.isNew || false,
      isFeatured: isFeatured,
    };

    console.log('✅ Product found:', product.name);
    return product;
  } catch (error) {
    console.error('❌ Error fetching product by ID:', error);
    return null;
  }
};

// Recherche intelligente de produits
export const searchProducts = async (query: string, products: Product[]): Promise<Product[]> => {
  if (!query || query.length < 2) {
    return products;
  }

  const normalizeString = (str: string) => {
    return str.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
      .replace(/[^a-z0-9\s]/g, '') // Supprimer la ponctuation
      .trim();
  };

  const normalizedQuery = normalizeString(query);
  const queryWords = normalizedQuery.split(/\s+/);

  // Fonction de scoring pour la pertinence
  const calculateScore = (product: Product): number => {
    let score = 0;
    const normalizedName = normalizeString(product.name);
    const normalizedBrand = normalizeString(product.brand);
    const normalizedDescription = normalizeString(product.description);
    const normalizedCategory = normalizeString(product.category);

    // Score pour correspondance exacte
    if (normalizedName.includes(normalizedQuery)) score += 100;
    if (normalizedBrand.includes(normalizedQuery)) score += 80;
    if (normalizedDescription.includes(normalizedQuery)) score += 40;
    if (normalizedCategory.includes(normalizedQuery)) score += 60;

    // Score pour correspondance de mots individuels
    queryWords.forEach(word => {
      if (word.length > 2) {
        if (normalizedName.includes(word)) score += 50;
        if (normalizedBrand.includes(word)) score += 40;
        if (normalizedDescription.includes(word)) score += 20;
        if (normalizedCategory.includes(word)) score += 30;
      }
    });

    // Bonus pour correspondance au début
    if (normalizedName.startsWith(normalizedQuery)) score += 50;
    if (normalizedBrand.startsWith(normalizedQuery)) score += 40;

    return score;
  };

  // Filtrer et scorer les produits
  const scoredProducts = products
    .map(product => ({
      product,
      score: calculateScore(product)
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);

  // Si aucun résultat exact, suggérer des produits similaires
  if (scoredProducts.length === 0) {
    console.log('🔍 Aucun résultat exact, recherche de suggestions...');
    
    // Recherche de suggestions basée sur des mots-clés partiels
    const suggestions = products.filter(product => {
      const allText = `${product.name} ${product.brand} ${product.description} ${product.category}`.toLowerCase();
      return queryWords.some(word => 
        word.length > 2 && allText.includes(word.substring(0, Math.max(3, word.length - 1)))
      );
    }).slice(0, 6);

    return suggestions;
  }

  return scoredProducts;
};

// Fonction pour obtenir les produits par catégorie
export const getProductsByCategory = async (categorySlug: string): Promise<Product[]> => {
  const products = await getProducts();
  console.log(`🔍 Filtering products for category: ${categorySlug}`);
  console.log(`📊 Total products available: ${products.length}`);
  
  const filtered = products.filter(product => {
    const matches = product.category === categorySlug;
    if (matches) {
      console.log(`✅ Product matches category: ${product.name} (${product.category})`);
    }
    return matches;
  });
  
  console.log(`📊 Products found for category ${categorySlug}: ${filtered.length}`);
  return filtered;
};