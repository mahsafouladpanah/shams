import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartProduct {
  id: string;
  name: string;
  nameEn?: string;
  nameAr?: string;
  price: number;
  image: string;
  category?: string;
  type?: string;
  [key: string]: any;
}

export interface CartItem {
  id: string;
  name: string;
  title?: string;
  type?: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
  product: CartProduct;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: any, quantity?: number) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, newQuantityOrDelta: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
}

const defaultCartItems: CartItem[] = [
  {
    id: 'pack-sleep',
    name: 'پک سلامت خواب شمس (SHAMS Better Sleep Pack)',
    title: 'پک سلامت خواب شمس (SHAMS Better Sleep Pack)',
    type: 'پک سلامت',
    price: 890000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1615486511484-92e172cb41ea?q=80&w=800&auto=format&fit=crop',
    category: 'packs',
    product: {
      id: 'pack-sleep',
      name: 'پک سلامت خواب شمس (SHAMS Better Sleep Pack)',
      nameEn: 'SHAMS Better Sleep Pack',
      price: 890000,
      image: 'https://images.unsplash.com/photo-1615486511484-92e172cb41ea?q=80&w=800&auto=format&fit=crop',
      category: 'packs',
      type: 'پک سلامت',
    }
  },
  {
    id: 'dig-sleep-course',
    name: 'برنامه صوتی اصلاح ریتم شبانه‌روزی و بهداشت خواب',
    title: 'برنامه صوتی اصلاح ریتم شبانه‌روزی و بهداشت خواب',
    type: 'شمس دیجیتال',
    price: 340000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?q=80&w=800&auto=format&fit=crop',
    category: 'digital',
    product: {
      id: 'dig-sleep-course',
      name: 'برنامه صوتی اصلاح ریتم شبانه‌روزی و بهداشت خواب',
      nameEn: 'Circadian Sleep Rhythm Audio Masterclass',
      price: 340000,
      image: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?q=80&w=800&auto=format&fit=crop',
      category: 'digital',
      type: 'شمس دیجیتال',
    }
  }
];

function sanitizeCartItem(raw: any): CartItem {
  const prod = raw?.product || raw || {};
  const id = String(raw?.id || prod?.id || 'item-1');
  const name = String(raw?.name || prod?.name || raw?.title || prod?.title || 'محصول سلامت شمس');
  const price = typeof raw?.price === 'number' ? raw.price : (typeof prod?.price === 'number' ? prod.price : 0);
  const image = String(raw?.image || prod?.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop');
  const category = String(raw?.category || prod?.category || 'general');
  const type = String(raw?.type || prod?.type || (category === 'packs' ? 'پک سلامت' : category === 'digital' ? 'محصول دیجیتال' : 'مکمل بالینی'));
  const quantity = typeof raw?.quantity === 'number' && raw.quantity > 0 ? raw.quantity : 1;

  const normalizedProduct: CartProduct = {
    id,
    name,
    nameEn: prod?.nameEn || raw?.nameEn,
    nameAr: prod?.nameAr || raw?.nameAr,
    price,
    image,
    category,
    type,
    ...(typeof prod === 'object' ? prod : {})
  };

  return {
    id,
    name,
    title: name,
    type,
    price,
    quantity,
    image,
    category,
    product: normalizedProduct,
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('shams_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(sanitizeCartItem);
        }
      }
    } catch (e) {
      console.warn('Could not restore cart from storage', e);
    }
    return defaultCartItems;
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('shams_cart', JSON.stringify(items));
    } catch (e) {
      console.warn('Could not persist cart to storage', e);
    }
  }, [items]);

  const addToCart = (item: any, quantity?: number) => {
    if (!item) return;
    const addQty = typeof quantity === 'number' && quantity > 0 
      ? quantity 
      : (typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1);
    
    const normalized = sanitizeCartItem(item);
    normalized.quantity = addQty;

    setItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === normalized.id || i.product?.id === normalized.id);
      if (existingIndex > -1) {
        return prev.map((curr, idx) =>
          idx === existingIndex
            ? { ...curr, quantity: curr.quantity + addQty }
            : curr
        );
      }
      return [...prev, normalized];
    });
  };

  const removeFromCart = (id: string | number) => {
    const stringId = String(id);
    setItems(prev => prev.filter(item => String(item.id) !== stringId && String(item.product?.id) !== stringId));
  };

  const updateQuantity = (id: string | number, newQuantityOrDelta: number) => {
    const stringId = String(id);
    setItems(prev =>
      prev.map(item => {
        if (String(item.id) === stringId || String(item.product?.id) === stringId) {
          const targetQty = Math.max(1, newQuantityOrDelta);
          return { ...item, quantity: targetQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = items.reduce((sum, item) => {
    const itemPrice = typeof item.price === 'number' ? item.price : (typeof item.product?.price === 'number' ? item.product.price : 0);
    const itemQty = item.quantity || 1;
    return sum + (itemPrice * itemQty);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
        isCheckoutOpen,
        setIsCheckoutOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
