// Ejemplos de Extensiones y Mejoras
// Código adicional para ampliar funcionalidades

// ============================================================
// 1. INTEGRACIÓN CON CARRITO DE COMPRAS
// ============================================================

// contexts/CartContext.jsx

import React, { createContext, useReducer, useCallback } from 'react';

export const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + parseFloat(action.payload.price),
        };
      }

      return {
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + parseFloat(action.payload.price),
      };

    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload);
      return {
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - parseFloat(itemToRemove.price) * itemToRemove.quantity,
      };

    case 'UPDATE_QUANTITY':
      const item = state.items.find(item => item.id === action.payload.id);
      const priceDiff = parseFloat(item.price) * (action.payload.quantity - item.quantity);
      
      return {
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
        total: state.total + priceDiff,
      };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback((taco) => {
    dispatch({ type: 'ADD_ITEM', payload: taco });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// hooks/useCart.js
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};

// ============================================================
// 2. COMPONENTE DE CARRITO
// ============================================================

// components/ShoppingCart.jsx

import React from 'react';
import { useCart } from '../hooks/useCart';

export const ShoppingCart = () => {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-body-md text-on-surface-variant mb-4">
          Tu carrito está vacío
        </p>
        <button className="text-primary font-label-bold hover:underline">
          Continuar comprando
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Items */}
      <div className="divide-y">
        {items.map((item) => (
          <div key={item.id} className="p-4 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-label-bold text-on-surface">{item.name}</h3>
              <p className="text-label-sm text-on-surface-variant">
                ${item.price}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-outline hover:bg-surface-container"
              >
                −
              </button>
              <span className="w-6 text-center font-label-bold">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-outline hover:bg-surface-container"
              >
                +
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="text-error hover:opacity-70 ml-2"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="bg-surface-container p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-label-bold text-on-surface">Total:</span>
          <span className="text-headline-md text-primary font-bold">
            ${total.toFixed(2)}
          </span>
        </div>

        <button
          onClick={clearCart}
          className="w-full py-2 px-4 text-label-bold text-on-surface border border-outline rounded-full hover:bg-surface-container-high transition-all"
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

// ============================================================
// 3. MODIFICACIÓN DE TacoPicker PARA AGREGAR AL CARRITO
// ============================================================

// En result screen, modificar:

import { useCart } from '../hooks/useCart';

// Dentro del componente TacoPicker:
const { addItem } = useCart();

// En el botón "Pedir ahora":
<button
  onClick={() => {
    addItem(result);
    // Mostrar notificación
    alert('¡Agregado al carrito! 🛒');
    restart();
  }}
  className="w-full bg-gradient-to-r from-primary to-secondary-container text-on-primary hover:shadow-lg transition-all active:scale-95 font-label-bold text-label-bold py-4 px-6 rounded-full mb-4 shadow-md"
>
  🛒 Pedir ahora
</button>

// ============================================================
// 4. PERSISTENCIA CON LOCAL STORAGE
// ============================================================

// hooks/useLocalStorage.js

import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// Uso en componente:
const [userPreferences, setUserPreferences] = useLocalStorage('tacoPreferences', {
  lastSpiciness: null,
  lastProtein: null,
  favoriteCount: 0,
});

// ============================================================
// 5. SISTEMA DE NOTIFICACIONES
// ============================================================

// contexts/NotificationContext.jsx

import React, { createContext, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info', duration = 3000) => {
    const id = uuidv4();
    const notification = { id, message, type };

    setNotifications(prev => [...prev, notification]);

    if (duration) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification, notifications }}>
      {children}
      <NotificationToast />
    </NotificationContext.Provider>
  );
};

// components/NotificationToast.jsx

const NotificationToast = () => {
  const { notifications, removeNotification } = useContext(NotificationContext);

  return (
    <div className="fixed top-0 right-0 p-4 space-y-2 pointer-events-none">
      {notifications.map(notif => (
        <div
          key={notif.id}
          className={`p-4 rounded-lg shadow-lg animate-slide-in pointer-events-auto ${
            notif.type === 'success' ? 'bg-green-500 text-white' :
            notif.type === 'error' ? 'bg-error text-on-error' :
            'bg-primary text-on-primary'
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{notif.message}</span>
            <button
              onClick={() => removeNotification(notif.id)}
              className="ml-4 opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// hooks/useNotification.js
import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification debe ser usado dentro de NotificationProvider');
  }
  return context;
};

// ============================================================
// 6. AUTENTICACIÓN Y HISTORIAL DE PEDIDOS
// ============================================================

// hooks/useAuthenticatedRecommendation.js

import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useAuthenticatedRecommendation = (apiUrl) => {
  const [token, setToken] = useLocalStorage('authToken', null);
  const [userHistory, setUserHistory] = useLocalStorage('userHistory', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const recommend = useCallback(async (answers) => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${apiUrl}/api/recommend-taco/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();

      // Guardar en historial
      setUserHistory(prev => [
        ...prev,
        {
          timestamp: new Date().toISOString(),
          recommendation: data,
          answers,
        }
      ].slice(-10)); // Mantener últimos 10

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token, apiUrl]);

  return { recommend, loading, error, userHistory, token, setToken };
};

// ============================================================
// 7. ANALYTICS Y TRACKING
// ============================================================

// utils/analytics.js

export const trackEvent = (eventName, eventData = {}) => {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }

  // Custom tracking
  console.log(`[Analytics] ${eventName}:`, eventData);
};

export const trackQuizCompletion = (answers, recommendedTaco) => {
  trackEvent('quiz_completed', {
    spiciness: answers.spiciness,
    hunger: answers.hunger,
    preference: answers.preference,
    recommended_taco_id: recommendedTaco.id,
    recommended_taco_name: recommendedTaco.name,
  });
};

export const trackAddToCart = (taco, quantity = 1) => {
  trackEvent('add_to_cart', {
    item_id: taco.id,
    item_name: taco.name,
    price: taco.price,
    quantity,
  });
};

// ============================================================
// 8. APP MEJORADA CON TODOS LOS CONTEXTOS
// ============================================================

// App.jsx - Versión Mejorada

import React from 'react';
import TacoPicker from './TacoPicker';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <CartProvider>
        <div className="min-h-screen bg-surface">
          <TacoPicker />
        </div>
      </CartProvider>
    </NotificationProvider>
  );
}

export default App;

// ============================================================
// 9. CONFIGURACIÓN DE TAILWIND ADICIONAL
// ============================================================

// En tailwind.config.js, agregar:

module.exports = {
  // ... configuración existente
  theme: {
    extend: {
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
};

// ============================================================
// 10. MEJORAS DE PERFORMANCE
// ============================================================

// utils/performance.js

/**
 * Debounce function - Espera a que el usuario deje de actuar
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function - Ejecutar máximo cada X ms
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Lazy load images
 */
export const lazyLoadImages = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
};

/**
 * Prefetch DNS
 */
export const prefetchDns = (domain) => {
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = domain;
  document.head.appendChild(link);
};
