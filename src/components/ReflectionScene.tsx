import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  REGULATION_TECHNIQUES,
  PHYSICAL_SENSATIONS,
  THOUGHT_TRAPS,
  WISE_GUIDE_URL,
} from '@/types/game';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ReflectionSceneProps {
  onCertificate: () => void;
}

export default function ReflectionScene({ onCertificate }: ReflectionSceneProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-green-50 px-4 py-8"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-3">
            Reflexão final
          </h1>
          <p className="text-lg text-gray-700">
            Você completou a jornada! Vamos revisar o que você aprendeu.
          </p>
        </header>

        <div className="flex gap-4 items-start">
          <img
            src={WISE_GUIDE_URL}
            alt="Guia Sábio, personagem amigável que ajuda na reflexão"
            className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0"
          />
          <Card className="flex-1 bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-300 p-6">
            <p className="text-blue-900 font-bold text-lg mb-2">Guia Sábio diz:</p>
            <ul className="text-gray-700 text-base leading-relaxed space-y-2 list-disc pl-5">
              <li>A ansiedade é normal — todo mundo tem um Cérebro Protetor.</li>
              <li>Você é mais forte do que o medo costuma dizer.</li>
              <li>Enfrentar medos com calma ajuda você a crescer.</li>
              <li>Pedir ajuda a um adulto de confiança é um ato de coragem.</li>
            </ul>
          </Card>
        </div>

        <section aria-labelledby="sinais-titulo">
          <h2 id="sinais-titulo" className="text-2xl font-bold text-gray-800 mb-4">
            Sinais físicos de ansiedade
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 list-none p-0 m-0">
            {PHYSICAL_SENSATIONS.map((sensation) => (
              <li
                key={sensation.name}
                className="bg-white rounded-lg p-4 border-2 border-red-200 text-center"
              >
                <span className="text-3xl mb-2 block" aria-hidden>
                  {sensation.emoji}
                </span>
                <span className="text-sm font-medium text-gray-700">{sensation.name}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 mt-4 italic" role="note">
            Quando você notar esses sinais, pode dizer: “Meu Cérebro Protetor está tentando me
            proteger.”
          </p>
        </section>

        <section aria-labelledby="armadilhas-titulo">
          <h2 id="armadilhas-titulo" className="text-2xl font-bold text-gray-800 mb-4">
            Pensamentos armadilha
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 m-0">
            {THOUGHT_TRAPS.map((trap) => (
              <li
                key={trap}
                className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-400"
              >
                <p className="text-gray-700 font-medium">{trap}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 mt-4 italic" role="note">
            Nem todo pensamento assustador é verdade. Respire e pergunte: “Isso já aconteceu ou
            estou imaginando?”
          </p>
        </section>

        <section aria-labelledby="tecnicas-titulo">
          <h2 id="tecnicas-titulo" className="text-2xl font-bold text-gray-800 mb-4">
            Técnicas de regulação
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 m-0">
            {REGULATION_TECHNIQUES.map((technique) => (
              <li key={technique.name}>
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 p-6 h-full">
                  <span className="text-4xl mb-3 block" aria-hidden>
                    {technique.icon}
                  </span>
                  <h3 className="font-bold text-green-900 mb-2">{technique.name}</h3>
                  <p className="text-sm text-gray-700">{technique.description}</p>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        <aside className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 border-2 border-purple-300 text-center">
          <p className="text-lg text-purple-900 font-bold mb-3">Lembre-se sempre</p>
          <p className="text-gray-800 leading-relaxed text-base">
            Quando a ansiedade aparecer, você pode reconhecê-la, respirar e lembrar que já
            praticou coragem. Seu Cérebro Protetor quer ajudar — e agora você sabe conversar com
            ele.
          </p>
        </aside>

        <div className="flex justify-center">
          <Button
            onClick={onCertificate}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg"
            aria-label="Ver certificado de coragem"
          >
            Ver meu certificado de coragem
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
