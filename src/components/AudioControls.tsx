import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AudioControlsProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function AudioControls({ isMuted, onToggleMute }: AudioControlsProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed top-4 right-4 z-50"
    >
      <Button
        onClick={onToggleMute}
        size="icon"
        variant="outline"
        className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-2 border-purple-200 hover:border-purple-300 transition-all"
        aria-label={isMuted ? 'Ativar sons do jogo' : 'Silenciar sons do jogo'}
        aria-pressed={!isMuted}
        title={isMuted ? 'Ativar som' : 'Desativar som'}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-purple-600" aria-hidden />
        ) : (
          <Volume2 className="h-5 w-5 text-purple-600" aria-hidden />
        )}
      </Button>
    </motion.div>
  );
}
