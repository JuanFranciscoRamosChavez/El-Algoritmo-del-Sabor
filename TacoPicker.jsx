import React, { useState } from 'react';

const TacoPicker = () => {
  const [screen, setScreen] = useState('home'); // home, quiz, loading, result
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    spiciness: null,
    hunger: null,
    preference: null,
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Configuración del cuestionario
  const quizSteps = [
    {
      id: 'spiciness',
      title: '¿Qué tanto te gusta el picante?',
      options: [
        { label: '🟢 Suavecito', value: 'mild' },
        { label: '🟡 Medio', value: 'medium' },
        { label: '🔴 Bien picoso', value: 'hot' },
      ],
    },
    {
      id: 'hunger',
      title: '¿Cuánta hambre tienes?',
      options: [
        { label: '🥙 Aperitivo', value: 'light' },
        { label: '🤤 Normal', value: 'normal' },
        { label: '🦁 ¡Mucha!', value: 'heavy' },
      ],
    },
    {
      id: 'preference',
      title: '¿Cuál es tu proteína favorita?',
      options: [
        { label: '🐔 Pollo', value: 'chicken' },
        { label: '🐄 Res', value: 'beef' },
        { label: '🐷 Cerdo', value: 'pork' },
      ],
    },
  ];

  // Enviar respuestas al backend
  const submitQuiz = async () => {
    setScreen('loading');
    try {
      const response = await fetch('http://localhost:8000/api/recommend-taco/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spiciness: answers.spiciness,
          hunger: answers.hunger,
          preference: answers.preference,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      setResult(data);
      setScreen('result');
    } catch (err) {
      setError(err.message || 'Algo salió mal. Intenta de nuevo.');
      setScreen('home');
    }
  };

  // Manejar selección de opción
  const handleOptionSelect = (stepId, value) => {
    setAnswers(prev => ({
      ...prev,
      [stepId]: value,
    }));
  };

  // Ir al siguiente paso
  const goToNextStep = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      submitQuiz();
    }
  };

  // Regresar al paso anterior
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Reiniciar la experiencia
  const restart = () => {
    setScreen('home');
    setCurrentStep(0);
    setAnswers({ spiciness: null, hunger: null, preference: null });
    setResult(null);
    setError(null);
  };

  // ==================== PANTALLA DE INICIO ====================
  if (screen === 'home') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #b90027 0%, #fd8100 100%)' }}>
        <div className="text-center max-w-md">
          <div className="mb-8 text-6xl animate-bounce">🌮</div>

          <h1 className="text-headline-xl text-white mb-4 font-bold">
            Escuadrón Suadero: Tu taquería digital.
          </h1>

          <p className="text-body-lg text-white mb-2 opacity-90">
            Déjate guiar por la ciencia del sabor y encuentra tu taco perfecto.
          </p>

          <p className="text-label-sm text-white opacity-75 mb-8">
            Responde 3 preguntas simples
          </p>

          {error && (
            <div className="bg-error-container text-on-error-container p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <button
            onClick={() => setScreen('quiz')}
            className="w-full bg-white text-primary hover:bg-surface-container-high transition-all duration-300 font-label-bold text-label-bold py-4 px-6 rounded-full shadow-lg active:scale-95"
          >
            🎯 Descubrir mi taco ideal
          </button>

          <p className="text-label-sm text-white opacity-60 mt-6">
            ¡Rápido, fácil y delicioso!
          </p>
        </div>
      </div>
    );
  }

  // ==================== PANTALLA DEL CUESTIONARIO ====================
  if (screen === 'quiz') {
    const currentQuestion = quizSteps[currentStep];
    const isAnswered = answers[currentQuestion.id] !== null;
    const progress = ((currentStep + 1) / quizSteps.length) * 100;

    return (
      <div className="min-h-screen bg-surface flex flex-col" style={{ paddingTop: 'max(env(safe-area-inset-top), 1rem)' }}>
        {/* Header con progreso */}
        <div className="sticky top-0 bg-white shadow-sm z-10 p-6">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-label-bold text-on-surface">
                Pregunta {currentStep + 1} de {quizSteps.length}
              </span>
              <button
                onClick={() => setScreen('home')}
                className="text-2xl hover:opacity-70 transition-opacity"
              >
                ✕
              </button>
            </div>
            <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary-container transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 flex items-center justify-center p-6 pb-24">
          <div className="max-w-md w-full">
            {/* Tarjeta animada */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {/* Ícono del paso */}
              <div className="text-6xl mb-6 text-center">
                {currentStep === 0 ? '🌶️' : currentStep === 1 ? '🍖' : '👍'}
              </div>

              {/* Título de la pregunta */}
              <h2 className="text-headline-md text-on-surface text-center mb-8 font-bold">
                {currentQuestion.title}
              </h2>

              {/* Opciones */}
              <div className="space-y-4 mb-8">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                    className={`w-full p-5 rounded-xl font-label-bold text-label-bold transition-all duration-300 border-2 ${
                      answers[currentQuestion.id] === option.value
                        ? 'border-primary bg-primary-container text-on-primary-container shadow-md scale-105'
                        : 'border-outline-variant bg-surface-container hover:border-primary'
                    } active:scale-95`}
                  >
                    <div className="text-lg">{option.label}</div>
                  </button>
                ))}
              </div>

              {/* Indicadores de selección */}
              <div className="flex justify-center gap-2 mb-8">
                {quizSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      answers[step.id] !== null
                        ? 'w-6 bg-primary'
                        : 'w-2 bg-outline-variant'
                    }`}
                  />
                ))}
              </div>

              {/* Botones de navegación */}
              <div className="flex gap-4">
                {currentStep > 0 && (
                  <button
                    onClick={goToPreviousStep}
                    className="flex-1 py-4 px-4 rounded-full border-2 border-outline font-label-bold text-on-surface hover:bg-surface-container transition-all active:scale-95"
                  >
                    ← Atrás
                  </button>
                )}

                <button
                  onClick={goToNextStep}
                  disabled={!isAnswered}
                  className={`flex-1 py-4 px-4 rounded-full font-label-bold transition-all ${
                    isAnswered
                      ? 'bg-gradient-to-r from-primary to-secondary-container text-on-primary hover:shadow-lg active:scale-95'
                      : 'bg-outline-variant text-on-surface opacity-50 cursor-not-allowed'
                  }`}
                >
                  {currentStep === quizSteps.length - 1 ? '¡Encontrar! 🎯' : 'Siguiente →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== PANTALLA DE CARGA ====================
  if (screen === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-surface">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-outline-variant rounded-full border-t-primary animate-spin" />
            </div>
          </div>

          <h2 className="text-headline-md text-on-surface mb-2 font-bold">
            Analizando tu sabor...
          </h2>

          <p className="text-body-md text-on-surface-variant mb-8">
            Nuestro algoritmo está encontrando el taco perfecto para ti.
          </p>

          {/* Animación de puntos */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==================== PANTALLA DE RESULTADO ====================
  if (screen === 'result' && result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-container to-surface flex flex-col" style={{ paddingTop: 'max(env(safe-area-inset-top), 1rem)' }}>
        {/* Header */}
        <div className="p-6 text-center">
          <h1 className="text-headline-lg text-on-primary-container font-bold">
            ¡Lo encontramos!
          </h1>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 flex items-center justify-center p-6 pb-24">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Imagen del taco */}
              <div className="bg-gradient-to-b from-secondary-container to-secondary p-12 text-center">
                <div className="text-8xl mb-4 inline-block animate-bounce">
                  🌮
                </div>
              </div>

              {/* Contenido */}
              <div className="p-8">
                {/* Nombre del taco */}
                <h2 className="text-headline-lg text-on-surface mb-2 font-bold text-center">
                  {result.name}
                </h2>

                {/* Descripción corta */}
                <p className="text-body-md text-on-surface-variant text-center mb-6">
                  {result.description}
                </p>

                {/* Detalles */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-3xl mb-1">
                      {result.spiciness === 'hot' ? '🔴' : result.spiciness === 'medium' ? '🟡' : '🟢'}
                    </div>
                    <p className="text-label-sm text-on-surface-variant">Picante</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-1">
                      {result.size === 'heavy' ? '🦁' : result.size === 'normal' ? '🤤' : '🥙'}
                    </div>
                    <p className="text-label-sm text-on-surface-variant">Porción</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-1">
                      {result.protein === 'beef' ? '🐄' : result.protein === 'pork' ? '🐷' : '🐔'}
                    </div>
                    <p className="text-label-sm text-on-surface-variant">Proteína</p>
                  </div>
                </div>

                {/* Precio */}
                <div className="bg-surface-container rounded-xl p-4 mb-8 text-center">
                  <p className="text-label-sm text-on-surface-variant mb-1">Precio</p>
                  <p className="text-headline-md text-primary font-bold">
                    ${result.price}
                  </p>
                </div>

                {/* Botón de pedido */}
                <button
                  onClick={() => {
                    // Aquí iría la lógica para agregar al carrito
                    console.log('Pedido:', result);
                  }}
                  className="w-full bg-gradient-to-r from-primary to-secondary-container text-on-primary hover:shadow-lg transition-all active:scale-95 font-label-bold text-label-bold py-4 px-6 rounded-full mb-4 shadow-md"
                >
                  🛒 Pedir ahora
                </button>

                {/* Botón secundario */}
                <button
                  onClick={restart}
                  className="w-full border-2 border-outline text-on-surface font-label-bold text-label-bold py-4 px-6 rounded-full hover:bg-surface-container transition-all active:scale-95"
                >
                  🔄 Descubrir otro taco
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default TacoPicker;
