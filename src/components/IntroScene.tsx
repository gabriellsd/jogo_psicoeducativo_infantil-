import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BRAIN_CHARACTER_URL } from '@/types/game';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface IntroSceneProps {
  playerName: string;
  onPlayerNameChange: (name: string) => void;
  onStart: () => void;
}

export default function IntroScene({
  playerName,
  onPlayerNameChange,
  onStart,
}: IntroSceneProps) {
  const reducedMotion = useReducedMotion();
  const motionProps = reducedMotion
    ? { initial: false, animate: { opacity: 1 } }
    : {};

  return (
    <motion.div
      {...motionProps}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center px-4 py-8"
    >
      <div className="max-w-2xl w-full text-center space-y-8">
        <motion.div
          initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 mb-4">
            O Cérebro Preocupado
          </h1>
          <p className="text-xl text-purple-600 font-semibold">Uma Aventura de Coragem</p>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.6, type: 'spring', stiffness: 100 }}
          className="flex justify-center"
        >
          <img
            src={BRAIN_CHARACTER_URL}
            alt="Personagem do Cérebro Protetor, um cérebro simpático e colorido"
            className="w-48 h-48 md:w-64 md:h-64 drop-shadow-lg"
            width={256}
            height={256}
          />
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-200 text-left"
        >
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
            Às vezes nosso cérebro quer nos proteger tanto que imagina perigos maiores do que os
            que realmente existem.
          </p>
          <p className="text-base text-gray-600 mt-4">
            Nesta aventura você vai aprender a reconhecer quando o Cérebro Protetor exagera no
            alarme — e o que fazer quando isso acontecer.
          </p>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl p-4 shadow-md border border-purple-100 text-left"
        >
          <label htmlFor="player-name" className="block text-sm font-bold text-purple-900 mb-2">
            Como você quer ser chamado no certificado? (opcional)
          </label>
          <input
            id="player-name"
            type="text"
            maxLength={40}
            value={playerName}
            onChange={(e) => onPlayerNameChange(e.target.value)}
            placeholder="Ex.: Maria, João, Campeão…"
            className="w-full rounded-lg border-2 border-purple-200 px-4 py-3 text-gray-800 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
            autoComplete="nickname"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="bg-blue-100 rounded-xl p-4 border-l-4 border-blue-500">
            <p className="text-sm font-bold text-blue-900 mb-1">Reconhecer</p>
            <p className="text-xs text-blue-800">Identificar sinais de ansiedade no corpo e na mente</p>
          </div>
          <div className="bg-green-100 rounded-xl p-4 border-l-4 border-green-500">
            <p className="text-sm font-bold text-green-900 mb-1">Enfrentar</p>
            <p className="text-xs text-green-800">Descobrir que você é mais forte do que o medo diz</p>
          </div>
          <div className="bg-purple-100 rounded-xl p-4 border-l-4 border-purple-500">
            <p className="text-sm font-bold text-purple-900 mb-1">Acionar</p>
            <p className="text-xs text-purple-800">Praticar formas de acalmar o corpo e a mente</p>
          </div>
        </div>

        <Button
          onClick={onStart}
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg"
          aria-label="Começar a aventura O Cérebro Preocupado"
        >
          Começar a aventura
        </Button>

        <p className="text-xs text-gray-500 mt-4" role="note">
          Este jogo ajuda a aprender sobre ansiedade de forma lúdica. Se você se sentir muito
          assustado ou triste, converse com um adulto de confiança — pedir ajuda também é coragem.
        </p>
      </div>
    </motion.div>
  );
}
