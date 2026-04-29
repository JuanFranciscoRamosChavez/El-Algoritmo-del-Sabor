// __tests__/TacoPicker.test.jsx
// Ejemplos de tests para el componente TacoPicker

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TacoPicker from '../TacoPicker';

// Mock del fetch global
global.fetch = vi.fn();

describe('TacoPicker Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  // ==================== HOME SCREEN ====================

  describe('Home Screen', () => {
    it('debe renderizar la pantalla de inicio', () => {
      render(<TacoPicker />);
      
      expect(screen.getByText(/El Algoritmo del Sabor/i)).toBeInTheDocument();
      expect(screen.getByText(/Descubrir mi taco ideal/i)).toBeInTheDocument();
    });

    it('debe cambiar a pantalla de quiz al hacer click', () => {
      render(<TacoPicker />);
      
      const button = screen.getByText(/Descubrir mi taco ideal/i);
      fireEvent.click(button);
      
      expect(screen.getByText(/Pregunta 1 de 3/i)).toBeInTheDocument();
    });

    it('debe mostrar mensaje de error si existe', () => {
      // Este test requeriría pasar un prop de error o manipular estado
      render(<TacoPicker />);
      
      // Placeholder - la implementación depende de cómo manejes errores
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });
  });

  // ==================== QUIZ SCREEN ====================

  describe('Quiz Screen', () => {
    beforeEach(() => {
      render(<TacoPicker />);
      const startButton = screen.getByText(/Descubrir mi taco ideal/i);
      fireEvent.click(startButton);
    });

    it('debe mostrar la primera pregunta', () => {
      expect(screen.getByText(/¿Qué tanto te gusta el picante?/i)).toBeInTheDocument();
    });

    it('debe permitir seleccionar una opción', () => {
      const options = screen.getAllByRole('button');
      const suaveOption = options.find(btn => btn.textContent.includes('Suavecito'));
      
      fireEvent.click(suaveOption);
      
      expect(suaveOption).toHaveClass('border-primary');
    });

    it('debe desactivar el botón siguiente si no hay selección', () => {
      const nextButton = screen.getByText('Siguiente →');
      expect(nextButton).toBeDisabled();
    });

    it('debe activar el botón siguiente después de seleccionar', () => {
      const options = screen.getAllByRole('button');
      const suaveOption = options.find(btn => btn.textContent.includes('Suavecito'));
      
      fireEvent.click(suaveOption);
      
      const nextButton = screen.getByText('Siguiente →');
      expect(nextButton).not.toBeDisabled();
    });

    it('debe avanzar a la siguiente pregunta', () => {
      // Seleccionar opción
      const options = screen.getAllByRole('button');
      const suaveOption = options.find(btn => btn.textContent.includes('Suavecito'));
      fireEvent.click(suaveOption);
      
      // Click siguiente
      const nextButton = screen.getByText('Siguiente →');
      fireEvent.click(nextButton);
      
      // Verificar segunda pregunta
      expect(screen.getByText(/Pregunta 2 de 3/i)).toBeInTheDocument();
      expect(screen.getByText(/¿Cuánta hambre tienes?/i)).toBeInTheDocument();
    });

    it('debe mostrar botón atrás después del primer paso', () => {
      const options = screen.getAllByRole('button');
      const suaveOption = options.find(btn => btn.textContent.includes('Suavecito'));
      fireEvent.click(suaveOption);
      
      const nextButton = screen.getByText('Siguiente →');
      fireEvent.click(nextButton);
      
      expect(screen.getByText('← Atrás')).toBeInTheDocument();
    });

    it('debe retroceder a la pregunta anterior', () => {
      // Avanzar a pregunta 2
      let options = screen.getAllByRole('button');
      let suaveOption = options.find(btn => btn.textContent.includes('Suavecito'));
      fireEvent.click(suaveOption);
      
      let nextButton = screen.getByText('Siguiente →');
      fireEvent.click(nextButton);
      
      // Retroceder
      const backButton = screen.getByText('← Atrás');
      fireEvent.click(backButton);
      
      expect(screen.getByText(/Pregunta 1 de 3/i)).toBeInTheDocument();
    });
  });

  // ==================== LOADING SCREEN ====================

  describe('Loading Screen', () => {
    it('debe mostrar pantalla de carga al enviar', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          name: 'Taco Test',
          description: 'Descripción test',
          price: '8.99',
        }),
      });

      render(<TacoPicker />);
      
      // Navegar al quiz y responder
      const startButton = screen.getByText(/Descubrir mi taco ideal/i);
      fireEvent.click(startButton);
      
      // Responder las 3 preguntas
      for (let i = 0; i < 3; i++) {
        const options = screen.getAllByRole('button');
        fireEvent.click(options[0]); // Seleccionar primera opción
        
        if (i < 2) {
          const nextButton = screen.getByText(/Siguiente|Encontrar/);
          fireEvent.click(nextButton);
        }
      }
      
      // Último paso - click en "Encontrar"
      const findButton = screen.getByText(/¡Encontrar!/);
      fireEvent.click(findButton);
      
      // Verificar carga
      expect(screen.getByText(/Analizando tu sabor/i)).toBeInTheDocument();
    });
  });

  // ==================== RESULT SCREEN ====================

  describe('Result Screen', () => {
    it('debe mostrar resultado después de responder', async () => {
      const mockResult = {
        id: 1,
        name: 'El Fuego Absoluto',
        description: 'Explosión de sabor',
        price: '8.99',
        spiciness: 'hot',
        size: 'heavy',
        protein: 'beef',
        ingredients: ['carne asada', 'chipotle'],
        calories: 450,
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResult,
      });

      render(<TacoPicker />);
      
      // Navegar y responder (código similar al test anterior)
      const startButton = screen.getByText(/Descubrir mi taco ideal/i);
      fireEvent.click(startButton);
      
      // Responder y enviar...
      // (código omitido por brevedad)
      
      await waitFor(() => {
        expect(screen.getByText(/Lo encontramos!/i)).toBeInTheDocument();
      });
    });

    it('debe mostrar botón Pedir ahora', async () => {
      // Similar al test anterior...
      expect(screen.getByText(/🛒 Pedir ahora/i)).toBeInTheDocument();
    });

    it('debe permitir descubrir otro taco', async () => {
      // Similar al test anterior...
      const discoverButton = screen.getByText(/Descubrir otro taco/i);
      fireEvent.click(discoverButton);
      
      // Debe volver a home
      expect(screen.getByText(/Descubrir mi taco ideal/i)).toBeInTheDocument();
    });
  });

  // ==================== ERROR HANDLING ====================

  describe('Error Handling', () => {
    it('debe manejar error de API correctamente', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      render(<TacoPicker />);
      
      const startButton = screen.getByText(/Descubrir mi taco ideal/i);
      fireEvent.click(startButton);
      
      // Responder preguntas...
      // (código omitido)
      
      // Esperar manejo de error
      await waitFor(() => {
        // El componente debería mostrar mensaje de error
      });
    });

    it('debe manejar respuesta inválida del servidor', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      render(<TacoPicker />);
      // ... test
    });

    it('debe manejar timeout', async () => {
      fetch.mockImplementationOnce(
        () => new Promise(resolve => {
          setTimeout(() => {
            resolve({
              ok: true,
              json: async () => ({}),
            });
          }, 15000); // Más que el timeout
        })
      );

      render(<TacoPicker />);
      // ... test
    });
  });
});

// ==================== HOOKS TESTS ====================

import { renderHook, act } from '@testing-library/react';
import { useTacoRecommendation } from '../hooks';

describe('useTacoRecommendation Hook', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('debe recomendar un taco correctamente', async () => {
    const mockTaco = {
      id: 1,
      name: 'Taco Test',
      description: 'Descripción',
      price: '8.99',
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTaco,
    });

    const { result } = renderHook(() => useTacoRecommendation());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    let recommendResult;
    await act(async () => {
      recommendResult = await result.current.recommend({
        spiciness: 'hot',
        hunger: 'heavy',
        preference: 'beef',
      });
    });

    expect(recommendResult).toEqual(mockTaco);
    expect(result.current.result).toEqual(mockTaco);
  });

  it('debe manejar errores', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useTacoRecommendation());

    await act(async () => {
      try {
        await result.current.recommend({
          spiciness: 'hot',
          hunger: 'heavy',
          preference: 'beef',
        });
      } catch (e) {
        // Error esperado
      }
    });

    expect(result.current.error).toBeTruthy();
  });
});

// ==================== VITEST CONFIGURATION ====================
// vitest.config.js

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/__tests__/',
      ],
    },
  },
});

// ==================== SETUP TESTING ====================
// src/__tests__/setup.js

import '@testing-library/jest-dom';

// Mock de window.matchMedia para responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock de fetch global (si es necesario)
global.fetch = vi.fn();
