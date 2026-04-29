// hooks/useTacoRecommendation.js
// Hook personalizado para encapsular la lógica de fetch

import { useState, useCallback } from 'react';

/**
 * Hook para obtener recomendación de taco del backend
 * @param {string} apiUrl - URL base del API (ej: http://localhost:8000)
 * @returns {Object} { recommend, loading, error, result }
 */
export const useTacoRecommendation = (apiUrl = 'http://localhost:8000') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const recommend = useCallback(
    async (answers) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiUrl}/api/recommend-taco/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            spiciness: answers.spiciness,
            hunger: answers.hunger,
            preference: answers.preference,
          }),
          signal: AbortSignal.timeout(10000), // Timeout de 10 segundos
        });

        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: ${response.statusText}`
          );
        }

        const data = await response.json();
        setResult(data);
        return data;
      } catch (err) {
        const errorMessage =
          err.name === 'AbortError'
            ? 'La solicitud tardó demasiado. Intenta de nuevo.'
            : err.message || 'Error al obtener recomendación';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiUrl]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setResult(null);
  }, []);

  return { recommend, loading, error, result, reset };
};

// ============================================================

// hooks/useQuizState.js
// Hook para manejar el estado del cuestionario

import { useState, useCallback } from 'react';

/**
 * Hook para manejar el estado del quiz
 * @param {number} totalSteps - Número total de pasos
 * @returns {Object} { currentStep, answers, screen, ... }
 */
export const useQuizState = (totalSteps = 3) => {
  const [screen, setScreen] = useState('home'); // home, quiz, loading, result
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    spiciness: null,
    hunger: null,
    preference: null,
  });

  const handleOptionSelect = useCallback((stepId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [stepId]: value,
    }));
  }, []);

  const goToNextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setScreen('loading');
    }
  }, [currentStep, totalSteps]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const reset = useCallback(() => {
    setScreen('home');
    setCurrentStep(0);
    setAnswers({
      spiciness: null,
      hunger: null,
      preference: null,
    });
  }, []);

  return {
    screen,
    setScreen,
    currentStep,
    answers,
    handleOptionSelect,
    goToNextStep,
    goToPreviousStep,
    reset,
  };
};

// ============================================================

// hooks/index.js
// Exportar todos los hooks en un archivo centralizado

export { useTacoRecommendation } from './useTacoRecommendation';
export { useQuizState } from './useQuizState';
