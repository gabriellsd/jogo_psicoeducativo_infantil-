import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CertificateSceneProps {
  playerName: string;
  totalPoints: number;
  onPlayAgain: () => void;
}

function getLevel(points: number) {
  if (points >= 55) return { level: 'Campeão de coragem', emoji: '🏆' };
  if (points >= 45) return { level: 'Guerreiro corajoso', emoji: '⚔️' };
  if (points >= 35) return { level: 'Explorador valente', emoji: '🧭' };
  return { level: 'Aprendiz de coragem', emoji: '🌱' };
}

export default function CertificateScene({
  playerName,
  totalPoints,
  onPlayAgain,
}: CertificateSceneProps) {
  const reducedMotion = useReducedMotion();
  const { level, emoji } = getLevel(totalPoints);
  const displayName = playerName.trim() || 'Explorador(a) Corajoso(a)';
  const issuedDate = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center px-4 py-8 relative overflow-hidden print:bg-white print:py-4"
    >
      {!reducedMotion && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.8, y: -20, x: `${(i * 8) % 100}vw` }}
              animate={{ opacity: 0, y: '100vh', rotate: 180 }}
              transition={{ duration: 2.5, delay: i * 0.15, ease: 'easeIn' }}
              className="absolute text-3xl"
            >
              {['🎉', '⭐', '🌟'][i % 3]}
            </motion.span>
          ))}
        </div>
      )}

      <div className="max-w-2xl w-full">
        <article
          id="certificado"
          aria-labelledby="cert-titulo"
          className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-8 md:p-16 border-4 border-amber-300 relative print:shadow-none"
        >
          <div className="absolute top-4 left-4 text-4xl" aria-hidden>
            🏅
          </div>
          <div className="absolute top-4 right-4 text-4xl" aria-hidden>
            🏅
          </div>

          <div className="text-center space-y-6">
            <header>
              <p className="text-amber-700 font-serif text-lg tracking-widest">
                CERTIFICADO DE HONRA
              </p>
              <h1 id="cert-titulo" className="text-4xl md:text-5xl font-bold text-amber-900 mt-2">
                Certificado de Coragem
              </h1>
            </header>

            <div
              className="h-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 rounded-full"
              aria-hidden
            />

            <div className="space-y-4">
              <p className="text-gray-700 text-lg font-serif">Este certificado é concedido a</p>
              <p className="text-3xl md:text-4xl font-bold text-amber-900">{displayName}</p>
              <p className="text-gray-700 text-lg font-serif">
                por completar com dedicação a aventura
              </p>
              <p className="text-2xl md:text-3xl font-bold text-purple-600">
                O Cérebro Preocupado
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-300">
              <p className="text-gray-700 font-semibold mb-2">Nível alcançado</p>
              <p className="text-5xl mb-2" aria-hidden>
                {emoji}
              </p>
              <p className="text-2xl font-bold text-purple-900">{level}</p>
              <p className="text-lg text-purple-700 mt-2">{totalPoints} pontos no total</p>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-amber-200 space-y-3 text-left">
              <p className="font-bold text-gray-800 mb-4 text-center">Você conquistou</p>
              <ul className="space-y-2 text-sm text-gray-700 list-none p-0 m-0">
                <li>Reconheceu sinais de ansiedade no corpo</li>
                <li>Entendeu o papel do Cérebro Protetor</li>
                <li>Praticou enfrentar medos com calma</li>
                <li>Conheceu técnicas de regulação emocional</li>
                <li>Descobriu que pedir ajuda é coragem</li>
              </ul>
            </div>

            <footer className="pt-4 border-t-2 border-amber-300">
              <p className="text-amber-900 font-serif italic text-sm">
                Emitido em {issuedDate}
              </p>
              <p className="text-3xl mt-2" aria-label="Assinatura do Guia Sábio">
                🧠 Guia Sábio
              </p>
            </footer>
          </div>
        </article>

        <div className="text-center mt-8 space-y-4 print:hidden">
          <p className="text-xl text-gray-800 font-semibold">
            Parabéns! Você completou a jornada.
          </p>
          <p className="text-gray-700 max-w-md mx-auto">
            Quando a ansiedade aparecer: pare, respire, nomeie o que sente e lembre-se do que você
            já praticou aqui.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 print:hidden">
          <Button
            onClick={handlePrint}
            size="lg"
            variant="outline"
            className="font-bold border-2 border-amber-400"
            aria-label="Imprimir ou salvar certificado em PDF"
          >
            Imprimir certificado
          </Button>
          <Button
            onClick={onPlayAgain}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg"
            aria-label="Jogar novamente desde o início"
          >
            Jogar novamente
          </Button>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6 print:hidden" role="note">
          Você pode jogar de novo para experimentar outras escolhas e aprender mais.
        </p>
      </div>
    </motion.div>
  );
}
