export type GameScene = 'intro' | 'act1' | 'act2' | 'act3' | 'reflection' | 'certificate';
export type PlayerChoice = 'avoid' | 'freeze' | 'confront';

export interface GameState {
  currentScene: GameScene;
  act1Completed: boolean;
  act2Completed: boolean;
  act3Completed: boolean;
  couragePoints: number;
  selfAwarenessPoints: number;
  regulationPoints: number;
  playerName: string;
  choices: {
    act1?: PlayerChoice;
    act2?: PlayerChoice;
    act3?: PlayerChoice;
  };
}

export interface SceneContent {
  title: string;
  description: string;
  brainMessage: string;
  choices: {
    label: string;
    value: PlayerChoice;
    hint: string;
    consequence: string;
  }[];
  lesson: string;
  realityVsPrediction: {
    prediction: string;
    reality: string;
  };
}

export const BRAIN_CHARACTER_URL =
  'https://d2xsxph8kpxj0f.cloudfront.net/310419663031122711/eeqBtMWiLGrHYESXxrvKCv/cerebro-preocupado-character-RgHCPgKAvXetikeu9V4d38.webp';

export const WISE_GUIDE_URL =
  'https://d2xsxph8kpxj0f.cloudfront.net/310419663031122711/eeqBtMWiLGrHYESXxrvKCv/guia-sabio-character-ee7zbjNfEmmmDhvVRLjCjF.webp';

export const SCENARIO_HOME_URL =
  'https://d2xsxph8kpxj0f.cloudfront.net/310419663031122711/eeqBtMWiLGrHYESXxrvKCv/cenario-casa-Cx6dSgPtq5atmNypBUuTPe.webp';

export const SCENARIO_SCHOOL_URL =
  'https://d2xsxph8kpxj0f.cloudfront.net/310419663031122711/eeqBtMWiLGrHYESXxrvKCv/cenario-escola-6zMzu8A3vkqgLCaWHQ2HyF.webp';

export const GAME_SCENES: Record<GameScene, SceneContent> = {
  intro: {
    title: 'Bem-vindo ao Cérebro Preocupado',
    description:
      'Você vai conhecer o seu Cérebro Protetor: ele tenta te manter seguro, mas às vezes imagina perigos maiores do que os que realmente existem.',
    brainMessage:
      'Oi! Sou seu Cérebro Protetor. Fico de olho em tudo — e às vezes ligo o alarme bem alto!',
    choices: [],
    lesson: '',
    realityVsPrediction: { prediction: '', reality: '' },
  },
  act1: {
    title: 'Ato 1: O copo que caiu',
    description:
      'Você estava brincando na cozinha e, sem querer, derrubou um copo. Ele quebrou no chão. Sua mãe ouviu o barulho e está vindo ver o que aconteceu.',
    brainMessage:
      'PERIGO! Ela vai ficar muito brava! Você é desastrado e ela nunca mais vai confiar em você!',
    choices: [
      {
        label: 'Esconder o copo e sair correndo',
        value: 'avoid',
        hint: 'Tentar fugir do problema',
        consequence:
          'Você tenta esconder, mas sua mãe descobre. Ela fica chateada com o acidente e também por você não ter contado a verdade.',
      },
      {
        label: 'Ficar parado, sem conseguir falar',
        value: 'freeze',
        hint: 'O corpo trava de nervoso',
        consequence:
          'Você fica tão nervoso que não consegue explicar. Sua mãe fica preocupada e acha que algo muito grave aconteceu.',
      },
      {
        label: 'Contar o que aconteceu com calma',
        value: 'confront',
        hint: 'Enfrentar o medo com honestidade',
        consequence:
          'Você conta que foi um acidente. Sua mãe pode ficar um pouco brava no começo, mas depois entende e vocês resolvem juntos.',
      },
    ],
    lesson:
      'Quando contamos a verdade com calma, o medo costuma ser maior na nossa cabeça do que na vida real. Errar faz parte — o importante é aprender.',
    realityVsPrediction: {
      prediction: 'Ela vai ficar furiosa para sempre e nunca mais vai confiar em mim.',
      reality: 'Ela ficou um pouco brava, mas entendeu que foi acidente. Vocês conversaram e combinaram cuidado na cozinha.',
    },
  },
  act2: {
    title: 'Ato 2: O desenho da escola',
    description:
      'Na escola, você precisa fazer um desenho sobre algo que gosta. Seu Cérebro Protetor insiste que precisa sair perfeito.',
    brainMessage:
      'TEM QUE SER PERFEITO! Se não for, todo mundo vai rir! Você não é bom o bastante!',
    choices: [
      {
        label: 'Não fazer o trabalho',
        value: 'avoid',
        hint: 'Desistir para não errar',
        consequence:
          'Você não entrega o desenho. Fica triste e com a sensação de que perdeu uma chance de se divertir aprendendo.',
      },
      {
        label: 'Passar horas tentando deixar perfeito',
        value: 'freeze',
        hint: 'Travar na busca da perfeição',
        consequence:
          'Você gasta muito tempo e fica cansado e frustrado. O desenho nunca parece “perfeito” o suficiente.',
      },
      {
        label: 'Fazer do seu jeito, com carinho',
        value: 'confront',
        hint: 'Tentar sem exigir perfeição',
        consequence:
          'Você desenha com alegria. Não ficou “perfeito”, mas você se sente orgulhoso do esforço e da criatividade.',
      },
    ],
    lesson:
      'Ninguém precisa ser perfeito para ser especial. O que importa é tentar, aprender e se orgulhar do que você fez. “Bom o suficiente” também é ótimo!',
    realityVsPrediction: {
      prediction: 'Todo mundo vai rir e achar que eu não sei desenhar.',
      reality: 'Seus colegas e a professora gostaram do seu esforço. O desenho mostrou quem você é!',
    },
  },
  act3: {
    title: 'Ato 3: Brincar com os amigos',
    description:
      'Seus amigos convidam você para uma brincadeira nova no pátio. Seu Cérebro Protetor começa a listar muitos “e se…”.',
    brainMessage:
      'E SE VOCÊ CAIR? E SE DER ERRADO? E SE RIREM DE VOCÊ? Melhor não ir. Melhor pedir permissão para tudo!',
    choices: [
      {
        label: 'Pedir permissão para cada passo',
        value: 'avoid',
        hint: 'Depender demais dos outros',
        consequence:
          'Você fica esperando respostas o tempo todo e perde várias chances de brincar e aprender.',
      },
      {
        label: 'Ficar só olhando, sem participar',
        value: 'freeze',
        hint: 'Paralisar e não tentar',
        consequence:
          'Você fica de fora. Seus amigos se divertem e você se sente sozinho e com vontade de ter tentado.',
      },
      {
        label: 'Participar com cuidado e coragem',
        value: 'confront',
        hint: 'Tentar, observando a segurança',
        consequence:
          'Você tenta a brincadeira! Pode tropeçar ou errar um pouco, mas descobre que consegue mais do que imaginava.',
      },
    ],
    lesson:
      'Você é mais capaz do que o medo diz. Algumas coisas precisam de um adulto por perto, mas muitas você pode tentar com atenção e coragem.',
    realityVsPrediction: {
      prediction: 'Eu não consigo fazer nada sozinho. É melhor não tentar.',
      reality: 'Você participou, se divertiu e aprendeu. Os amigos te apoiaram quando precisou.',
    },
  },
  reflection: {
    title: 'Reflexão final',
    description:
      'Você terminou a aventura! Agora você conhece melhor o Cérebro Protetor e formas de acalmar a ansiedade.',
    brainMessage:
      'Obrigado por me ensinar! Às vezes eu exagero no alarme — e agora sei que posso confiar mais em você.',
    choices: [],
    lesson:
      'Ansiedade é uma emoção normal. Você pode reconhecê-la, respirar, pedir ajuda e descobrir que é mais forte do que o medo diz.',
    realityVsPrediction: { prediction: '', reality: '' },
  },
  certificate: {
    title: 'Certificado de coragem',
    description:
      'Parabéns! Você completou a aventura e merece celebrar tudo o que aprendeu.',
    brainMessage: 'Estou muito orgulhoso de você! Você foi corajoso em cada passo.',
    choices: [],
    lesson:
      'Quando a ansiedade aparecer: pare, respire, nomeie o que sente e lembre-se — você já praticou coragem antes.',
    realityVsPrediction: { prediction: '', reality: '' },
  },
};

export const REGULATION_TECHNIQUES = [
  {
    name: 'Respiração quadrada',
    description: 'Inspire contando até 4, segure 4, solte o ar em 4, segure 4. Repita 5 vezes.',
    icon: '🫁',
  },
  {
    name: 'Técnica 5-4-3-2-1',
    description:
      'Diga 5 coisas que você vê, 4 que pode tocar, 3 que ouve, 2 que cheira e 1 que sente no corpo.',
    icon: '👀',
  },
  {
    name: 'Movimento',
    description: 'Pule, dance ou estique o corpo por um minuto. Isso ajuda a acalmar o nervoso.',
    icon: '🏃',
  },
  {
    name: 'Conversa',
    description: 'Conte para um adulto de confiança o que você está sentindo. Pedir ajuda é coragem.',
    icon: '💬',
  },
];

export const PHYSICAL_SENSATIONS = [
  { name: 'Coração acelerado', emoji: '💓' },
  { name: 'Mãos tremendo', emoji: '🤚' },
  { name: 'Barriga apertada', emoji: '😰' },
  { name: 'Respiração rápida', emoji: '😮‍💨' },
  { name: 'Suor frio', emoji: '💦' },
  { name: 'Corpo inquieto', emoji: '🦗' },
];

export const THOUGHT_TRAPS = [
  'E se der tudo errado…',
  'Sempre dá problema comigo',
  'Nunca vou conseguir',
  'Todo mundo vai rir',
  'Tem que ser perfeito',
  'Ninguém vai gostar de mim',
];

export const CHOICE_LABELS: Record<PlayerChoice, string> = {
  avoid: 'Evitar',
  freeze: 'Paralisar',
  confront: 'Enfrentar com calma',
};
