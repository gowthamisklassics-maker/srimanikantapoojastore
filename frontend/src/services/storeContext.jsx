import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, STORE_DATA } from './api';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // ── Cart State ──
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('smps_cart') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('smps_cart', JSON.stringify(cart));
  }, [cart]);

  // ── Wishlist State ──
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('smps_wishlist') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('smps_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // ── User / Auth State ──
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('smps_user') || 'null');
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('smps_token') || null;
  });

  // ── Modals State ──
  const [isQuickEnquiryOpen, setIsQuickEnquiryOpen] = useState(false);
  const [isStoreMapOpen, setIsStoreMapOpen] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  // ── Toasts State ──
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  // ── Cart Operations ──
  const addToCart = (product, qty = 1, variant = '') => {
    const key = `${product.id}_${variant}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          image: product.image,
          variant,
          qty
        }
      ];
    });
    showToast(`✅ ${product.name} added to cart!`, 'success');
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const updateCartQty = (key, qty) => {
    if (qty <= 0) {
      removeFromCart(key);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.key === key ? { ...item, qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartOriginalTotal = cart.reduce(
    (acc, item) => acc + (item.originalPrice || item.price) * item.qty,
    0
  );
  const cartDiscount = Math.max(0, cartOriginalTotal - cartSubtotal);
  const deliveryFee = cartSubtotal >= 5000 || cartSubtotal === 0 ? 0 : 50;
  const cartGrandTotal = cartSubtotal + deliveryFee;

  // ── Wishlist Operations ──
  const toggleWishlist = (productId) => {
    const idStr = String(productId);
    const exists = wishlist.includes(idStr);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== idStr));
      showToast('Removed from Wishlist', 'default');
    } else {
      setWishlist((prev) => [...prev, idStr]);
      showToast('❤️ Added to Wishlist!', 'success');
    }
    return !exists;
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(String(productId));
  };

  // ── Auth Operations ──
  const handleLogin = (authToken, authUser) => {
    setToken(authToken);
    setUser(authUser);
    localStorage.setItem('smps_token', authToken);
    localStorage.setItem('smps_user', JSON.stringify(authUser));
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('smps_token');
    localStorage.removeItem('smps_user');
    showToast('Logged out successfully', 'default');
  };

  // ── Store Status Live Calculator ──
  const getStoreStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0=Sun, 1-6=Mon-Sat
    const h = now.getHours();
    const m = now.getMinutes();
    const time = h * 60 + m;

    const isSunday = day === 0;
    const openTime = isSunday ? 8 * 60 + 30 : 8 * 60; // 8:30 Sun, 8:00 others
    const closeTime = 22 * 60; // 10:00 PM all days
    const closingSoon = closeTime - 60;

    if (time >= openTime && time < closeTime) {
      if (time >= closingSoon) {
        return {
          open: true,
          soon: true,
          label: '⚠️ Closing Soon',
          detail: 'Closes at 10:00 PM',
          color: '#FFA000'
        };
      }
      return {
        open: true,
        soon: false,
        label: '✅ Open Now',
        detail: 'Closes at 10:00 PM',
        color: '#2E7D32'
      };
    }
    if (time < openTime) {
      const minsUntilOpen = openTime - time;
      const h2 = Math.floor(minsUntilOpen / 60);
      const m2 = minsUntilOpen % 60;
      return {
        open: false,
        soon: false,
        label: '🔴 Currently Closed',
        detail: `Opens in ${h2 > 0 ? h2 + 'h ' : ''}${m2}m`,
        color: '#C62828'
      };
    }
    return {
      open: false,
      soon: false,
      label: '🔴 Currently Closed',
      detail: isSunday ? 'Opens 8:30 AM tomorrow' : 'Opens 8:00 AM tomorrow',
      color: '#C62828'
    };
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        cartOriginalTotal,
        cartDiscount,
        deliveryFee,
        cartGrandTotal,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        token,
        handleLogin,
        handleLogout,
        storeInfo: STORE_DATA,
        storeStatus: getStoreStatus(),
        isQuickEnquiryOpen,
        setIsQuickEnquiryOpen,
        isStoreMapOpen,
        setIsStoreMapOpen,
        isSideDrawerOpen,
        setIsSideDrawerOpen,
        toasts,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
