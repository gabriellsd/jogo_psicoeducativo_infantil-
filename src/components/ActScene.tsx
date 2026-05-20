import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import type { PlayerChoice, SceneContent } from '@/types/game';
import { BRAIN_CHARACTER_URL } from '@/types/game';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ActSceneProps {
  scene: SceneContent;
  scenarioImage: string;
  onChoice: (choice: PlayerChoice) => void;
  loading?: boolean;
}

export default function ActScene({
  scene,
  scenarioImage,
  onChoice,
  loading = false,
}: ActSceneProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 px-4 py-8"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-purple-700">{scene.title}</h1>

        <div className="relative rounded-2xl overflow-hidden shadow-xl h-64 md:h-96">
          <img
            src={scenarioImage}
            alt={`Ilustração do cenário: ${scene.title}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden />
        </div>

        <section
          aria-labelledby="situacao-titulo"
          className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500"
        >
          <h2 id="situacao-titulo" className="text-xl font-bold text-gray-800 mb-3">
            O que está acontecendo
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">{scene.description}</p>
        </section>

        <section aria-labelledby="cerebro-mensagem" className="flex gap-4 items-start">
          <img
            src={BRAIN_CHARACTER_URL}
            alt=""
            aria-hidden
            className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0"
          />
          <Card className="flex-1 bg-orange-50 border-2 border-orange-300 p-6">
            <p id="cerebro-mensagem" className="text-orange-900 font-bold text-lg mb-2">
              Cérebro Protetor diz:
            </p>
            <p className="text-orange-800 text-base leading-relaxed italic">{scene.brainMessage}</p>
          </Card>
        </section>

        <section aria-labelledby="escolhas-titulo">
          <h2 id="escolhas-titulo" className="text-xl font-bold text-gray-800 mb-4">
            O que você faz?
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 list-none p-0 m-0">
            {scene.choices.map((choice) => (
              <li key={choice.value} className="min-w-0">
                <Button
                  onClick={() => onChoice(choice.value)}
                  disabled={loading}
                  variant="outline"
                  className="flex h-auto min-h-[5rem] w-full min-w-0 flex-col items-stretch justify-start gap-2 whitespace-normal py-6 px-4 text-left hover:bg-blue-50 hover:border-blue-400 border-2 transition-all"
                  aria-describedby={`hint-${choice.value}`}
                >
                  <span className="block w-full break-words font-bold text-base text-gray-800 leading-snug">
                    {choice.label}
                  </span>
                  <span
                    id={`hint-${choice.value}`}
                    className="block w-full break-words text-xs text-gray-600 leading-relaxed"
                  >
                    {choice.hint}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </section>

        <aside className="bg-blue-100 rounded-lg p-4 border-l-4 border-blue-500" role="note">
          <p className="text-sm text-blue-900">
            <span className="font-bold">Dica:</span> Pense no que o Cérebro Protetor está prevendo
            e no que poderia acontecer de verdade.
          </p>
        </aside>
      </div>
    </motion.div>
  );
}
