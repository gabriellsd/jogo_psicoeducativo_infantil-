import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import type { PlayerChoice, SceneContent } from '@/types/game';
import { CHOICE_LABELS, WISE_GUIDE_URL } from '@/types/game';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ResultSceneProps {
  scene: SceneContent;
  choice: PlayerChoice;
  onContinue: () => void;
}

export default function ResultScene({ scene, choice, onContinue }: ResultSceneProps) {
  const reducedMotion = useReducedMotion();
  const isPositiveChoice = choice === 'confront';
  const selected = scene.choices.find((c) => c.value === choice);
  const bgColor = isPositiveChoice
    ? 'from-green-50 to-emerald-50'
    : 'from-yellow-50 to-orange-50';
  const borderColor = isPositiveChoice ? 'border-green-400' : 'border-yellow-400';
  const textColor = isPositiveChoice ? 'text-green-900' : 'text-yellow-900';
  const continueLabel =
    scene.title.includes('Ato 3') ? 'Ir para reflexão final' : 'Próximo ato';

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen bg-gradient-to-b ${bgColor} px-4 py-8`}
      role="region"
      aria-labelledby="resultado-titulo"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <p className="text-center text-6xl md:text-8xl" aria-hidden>
          {isPositiveChoice ? '🌟' : '🤔'}
        </p>

        <h1 id="resultado-titulo" className={`text-4xl font-bold text-center ${textColor}`}>
          {isPositiveChoice ? 'Boa escolha!' : 'Vamos refletir juntos'}
        </h1>

        <Card className="bg-white border-2 border-purple-200 p-6">
          <p className="text-purple-900 font-bold text-lg mb-2">
            Você escolheu: {CHOICE_LABELS[choice]}
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            {selected?.consequence}
          </p>
        </Card>

        <div className="flex gap-4 items-start">
          <img
            src={WISE_GUIDE_URL}
            alt=""
            aria-hidden
            className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0"
          />
          <Card className={`flex-1 bg-white border-2 ${borderColor} p-6`}>
            <p className={`${textColor} font-bold text-lg mb-2`}>Guia Sábio explica:</p>
            <p className="text-gray-700 text-base leading-relaxed">{scene.lesson}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-red-50 border-2 border-red-300 p-6">
            <h2 className="font-bold text-red-900 mb-3 flex items-center gap-2">
              <span aria-hidden>🚨</span>
              O que o Cérebro Protetor previu
            </h2>
            <p className="text-red-800 italic">{scene.realityVsPrediction.prediction}</p>
          </Card>
          <Card className="bg-green-50 border-2 border-green-300 p-6">
            <h2 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <span aria-hidden>✨</span>
              O que aconteceu de verdade
            </h2>
            <p className="text-green-800 italic">{scene.realityVsPrediction.reality}</p>
          </Card>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-purple-200">
          <p className="text-center text-lg font-bold text-purple-900 mb-3">Pontos ganhos</p>
          <div className="grid grid-cols-3 gap-4 text-center" role="list">
            <div role="listitem">
              <p className="text-3xl font-bold text-orange-500">
                {isPositiveChoice ? '10' : '5'}
              </p>
              <p className="text-sm text-gray-600">Coragem</p>
            </div>
            <div role="listitem">
              <p className="text-3xl font-bold text-blue-500">5</p>
              <p className="text-sm text-gray-600">Autoconhecimento</p>
            </div>
            <div role="listitem">
              <p className="text-3xl font-bold text-green-500">
                {isPositiveChoice ? '10' : '5'}
              </p>
              <p className="text-sm text-gray-600">Regulação</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onContinue}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg"
            aria-label={`${continueLabel} da história`}
          >
            {continueLabel} →
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
