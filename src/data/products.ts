import { Product, Category } from '@/types/Product';

export const categories: Category[] = [
  {
    id: 'panelas-pressao',
    name: 'Panelas de Pressão',
    subcategories: [
      { id: 'fechamento-externo', name: 'Panelas Fechamento Externo' },
      { id: '2-5-litros', name: 'Panelas 2,5 Litros' },
      { id: '3-litros', name: 'Panelas 3 Litros' },
      { id: '4-5-litros', name: 'Panelas 4,5 Litros' },
      { id: '7-litros', name: 'Panelas 7 Litros' },
      { id: '10-litros', name: 'Panelas 10 Litros' },
      { id: 'pecas-reposicao', name: 'Peças de Reposição' },
    ],
  },
  {
    id: 'panelas-cacarolas',
    name: 'Panelas e Caçarolas',
    subcategories: [
      { id: 'antiaderente-fort-flon', name: 'Antiaderente Fort Flon' },
      { id: 'antiaderente-super-grafite', name: 'Antiaderente Super Grafite' },
      { id: 'super-forte-polida', name: 'Linha Super Forte Polida' },
      { id: 'extra-forte-polida', name: 'Linha Extra Forte Polida' },
      { id: 'reforcada-polida', name: 'Linha Reforçada Polida' },
    ],
  },
  {
    id: 'caldeiroes',
    name: 'Caldeirões',
    subcategories: [
      { id: 'antiaderente-fort-flon', name: 'Antiaderente Fort Flon' },
      { id: 'extra-forte-polida', name: 'Linha Extra Forte Polida' },
      { id: 'reforcada-polida', name: 'Linha Reforçada Polida' },
    ],
  },
  {
    id: 'canecoes-fervedores',
    name: 'Canecões e Fervedores',
    subcategories: [
      { id: 'antiaderente-fort-flon', name: 'Antiaderente Fort Flon' },
      { id: 'extra-forte-polido', name: 'Linha Extra Forte Polido' },
      { id: 'reforcado-polido', name: 'Linha Reforçado Polido' },
    ],
  },
  {
    id: 'frigideiras',
    name: 'Frigideiras',
    subcategories: [
      { id: 'antiaderente-fort-flon', name: 'Antiaderente Fort Flon' },
      { id: 'antiaderente-super-grafite', name: 'Antiaderente Super Grafite' },
      { id: 'super-forte-polida', name: 'Linha Super Forte Polida' },
      { id: 'extra-forte-polida', name: 'Linha Extra Forte Polida' },
      { id: 'reforcada-polida', name: 'Linha Reforçada Polida' },
    ],
  },
  {
    id: 'formas-assadeiras',
    name: 'Formas e Assadeiras',
    subcategories: [
      { id: 'retangulares', name: 'Retangulares' },
      { id: 'redondas', name: 'Redondas' },
      { id: 'bolo-pudim', name: 'Bolo e Pudim' },
      { id: 'fundo-removivel', name: 'Fundo Removível' },
      { id: 'ballerine', name: 'Ballerine' },
      { id: 'pizza', name: 'Pizza' },
    ],
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Panela de Pressão 4,5L Alumínio',
    category: 'panelas-pressao',
    subcategory: '4-5-litros',
    description: 'Panela de pressão em alumínio de alta qualidade com fechamento externo.',
    prices: { avista: 119.90, dias30: 134.30, dias90: 149.90 },
    sizes: ['4.5L'],
    defaultSize: '4.5L',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'],
    icon: 'ChefHat',
    kits: [
      { 
        id: '1-6', 
        units: 6, 
        prices: { avista: 540.00, dias30: 604.80, dias90: 675.00 }
      },
      { 
        id: '1-12', 
        units: 12, 
        prices: { avista: 1020.00, dias30: 1142.40, dias90: 1275.00 },
        popular: true 
      },
      { 
        id: '1-20', 
        units: 20, 
        prices: { avista: 1650.00, dias30: 1848.00, dias90: 2062.50 }
      }
    ]
  },
  {
    id: '2',
    name: 'Panela de Pressão 6L Alumínio',
    category: 'panelas-pressao',
    subcategory: '7-litros',
    description: 'Panela de pressão em alumínio, ideal para família pequena.',
    prices: { avista: 149.90, dias30: 167.90, dias90: 187.40 },
    sizes: ['6L'],
    defaultSize: '6L',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'],
    icon: 'ChefHat',
    kits: [
      { 
        id: '2-6', 
        units: 6, 
        prices: { avista: 720.00, dias30: 806.40, dias90: 900.00 }
      },
      { 
        id: '2-12', 
        units: 12, 
        prices: { avista: 1380.00, dias30: 1545.60, dias90: 1725.00 },
        popular: true 
      },
      { 
        id: '2-20', 
        units: 20, 
        prices: { avista: 2200.00, dias30: 2464.00, dias90: 2750.00 }
      }
    ]
  },
  {
    id: '3',
    name: 'Caldeirão Alumínio 20L Industrial',
    category: 'caldeiroes',
    subcategory: 'antiaderente-fort-flon',
    description: 'Caldeirão grande com revestimento antiaderente, ideal para grandes quantidades.',
    prices: { avista: 229.90, dias30: 257.50, dias90: 287.40 },
    sizes: ['20L'],
    defaultSize: '20L',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    icon: 'Package',
    kits: [
      { 
        id: '3-6', 
        units: 6, 
        prices: { avista: 1100.00, dias30: 1232.00, dias90: 1375.00 }
      },
      { 
        id: '3-12', 
        units: 12, 
        prices: { avista: 2040.00, dias30: 2284.80, dias90: 2550.00 },
        popular: true 
      },
      { 
        id: '3-20', 
        units: 20, 
        prices: { avista: 3300.00, dias30: 3696.00, dias90: 4125.00 }
      }
    ]
  },
  {
    id: '4',
    name: 'Jogo de Panelas Alumínio 5 Peças',
    category: 'panelas-cacarolas',
    subcategory: 'super-forte-polida',
    description: 'Conjunto completo com 5 panelas da linha super forte polida.',
    prices: { avista: 399.90, dias30: 447.90, dias90: 499.90 },
    sizes: ['P', 'M', 'G'],
    defaultSize: 'M',
    isKit: true,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    icon: 'Package',
    kits: [
      { 
        id: '4-6', 
        units: 6, 
        prices: { avista: 1800.00, dias30: 2016.00, dias90: 2250.00 }
      },
      { 
        id: '4-12', 
        units: 12, 
        prices: { avista: 3360.00, dias30: 3763.20, dias90: 4200.00 },
        popular: true 
      },
      { 
        id: '4-20', 
        units: 20, 
        prices: { avista: 5400.00, dias30: 6048.00, dias90: 6750.00 }
      }
    ]
  },
  {
    id: '5',
    name: 'Panela Alumínio Grosso 8L',
    category: 'panelas-cacarolas',
    subcategory: 'extra-forte-polida',
    description: 'Panela de alumínio grosso para uso profissional.',
    prices: { avista: 199.90, dias30: 223.90, dias90: 249.90 },
    sizes: ['8L'],
    defaultSize: '8L',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop'],
    icon: 'Soup',
    kits: [
      { 
        id: '5-6', 
        units: 6, 
        prices: { avista: 960.00, dias30: 1075.20, dias90: 1200.00 }
      },
      { 
        id: '5-12', 
        units: 12, 
        prices: { avista: 1800.00, dias30: 2016.00, dias90: 2250.00 },
        popular: true 
      },
      { 
        id: '5-20', 
        units: 20, 
        prices: { avista: 2900.00, dias30: 3248.00, dias90: 3625.00 }
      }
    ]
  },
  {
    id: '6',
    name: 'Frigideira Alumínio 26cm',
    category: 'frigideiras',
    subcategory: 'antiaderente-fort-flon',
    description: 'Frigideira com excelente revestimento antiaderente.',
    prices: { avista: 279.90, dias30: 313.50, dias90: 349.90 },
    sizes: ['26cm'],
    defaultSize: '26cm',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1583416750470-965b2707b8f1?w=400&h=400&fit=crop'],
    icon: 'Utensils',
    kits: [
      { 
        id: '6-6', 
        units: 6, 
        prices: { avista: 1260.00, dias30: 1411.20, dias90: 1575.00 }
      },
      { 
        id: '6-12', 
        units: 12, 
        prices: { avista: 2400.00, dias30: 2688.00, dias90: 3000.00 },
        popular: true 
      },
      { 
        id: '6-20', 
        units: 20, 
        prices: { avista: 3900.00, dias30: 4368.00, dias90: 4875.00 }
      }
    ]
  },
  {
    id: '7',
    name: 'Caldeirão Hotel Alumínio 30L',
    category: 'caldeiroes',
    subcategory: 'extra-forte-polida',
    description: 'Caldeirão profissional da linha hotel para grandes volumes.',
    prices: { avista: 429.90, dias30: 481.50, dias90: 537.40 },
    sizes: ['30L'],
    defaultSize: '30L',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    icon: 'Package',
    kits: [
      { 
        id: '7-6', 
        units: 6, 
        prices: { avista: 2040.00, dias30: 2284.80, dias90: 2550.00 }
      },
      { 
        id: '7-12', 
        units: 12, 
        prices: { avista: 3840.00, dias30: 4300.80, dias90: 4800.00 },
        popular: true 
      },
      { 
        id: '7-20', 
        units: 20, 
        prices: { avista: 6200.00, dias30: 6944.00, dias90: 7750.00 }
      }
    ]
  },
  {
    id: '8',
    name: 'Forma de Bolo Alumínio 30cm',
    category: 'formas-assadeiras',
    subcategory: 'redondas',
    description: 'Forma redonda clássica para bolos perfeitos.',
    prices: { avista: 89.90, dias30: 100.70, dias90: 112.40 },
    sizes: ['30cm'],
    defaultSize: '30cm',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop'],
    icon: 'Circle',
    kits: [
      { 
        id: '8-6', 
        units: 6, 
        prices: { avista: 480.00, dias30: 537.60, dias90: 600.00 }
      },
      { 
        id: '8-12', 
        units: 12, 
        prices: { avista: 900.00, dias30: 1008.00, dias90: 1125.00 },
        popular: true 
      },
      { 
        id: '8-20', 
        units: 20, 
        prices: { avista: 1440.00, dias30: 1612.80, dias90: 1800.00 }
      }
    ]
  },
  {
    id: '9',
    name: 'Forma de Pudim Alumínio',
    category: 'formas-assadeiras',
    subcategory: 'bolo-pudim',
    description: 'Forma especial para pudins e bolos com furo central.',
    prices: { avista: 69.90, dias30: 78.30, dias90: 87.40 },
    sizes: ['22cm', '25cm'],
    defaultSize: '22cm',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop'],
    icon: 'Circle',
    kits: [
      { 
        id: '9-6', 
        units: 6, 
        prices: { avista: 360.00, dias30: 403.20, dias90: 450.00 }
      },
      { 
        id: '9-12', 
        units: 12, 
        prices: { avista: 660.00, dias30: 739.20, dias90: 825.00 },
        popular: true 
      },
      { 
        id: '9-20', 
        units: 20, 
        prices: { avista: 1080.00, dias30: 1209.60, dias90: 1350.00 }
      }
    ]
  },
  {
    id: '10',
    name: 'Tampa Alumínio Universal 32cm',
    category: 'panelas-cacarolas',
    subcategory: 'reforcada-polida',
    description: 'Tampa universal de alumínio para diversas panelas.',
    prices: { avista: 49.90, dias30: 55.90, dias90: 62.40 },
    sizes: ['32cm'],
    defaultSize: '32cm',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1583416750470-965b2707b8f1?w=400&h=400&fit=crop'],
    icon: 'Circle',
    kits: [
      { 
        id: '10-6', 
        units: 6, 
        prices: { avista: 240.00, dias30: 268.80, dias90: 300.00 }
      },
      { 
        id: '10-12', 
        units: 12, 
        prices: { avista: 450.00, dias30: 504.00, dias90: 562.50 },
        popular: true 
      },
      { 
        id: '10-20', 
        units: 20, 
        prices: { avista: 720.00, dias30: 806.40, dias90: 900.00 }
      }
    ]
  },
  {
    id: '11',
    name: 'Escumadeira Alumínio Grande',
    category: 'panelas-cacarolas',
    subcategory: 'reforcada-polida',
    description: 'Escumadeira de alumínio resistente para uso profissional.',
    prices: { avista: 29.90, dias30: 33.50, dias90: 37.40 },
    sizes: ['Grande'],
    defaultSize: 'Grande',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop'],
    icon: 'Utensils',
    kits: [
      { 
        id: '11-6', 
        units: 6, 
        prices: { avista: 150.00, dias30: 168.00, dias90: 187.50 }
      },
      { 
        id: '11-12', 
        units: 12, 
        prices: { avista: 270.00, dias30: 302.40, dias90: 337.50 },
        popular: true 
      },
      { 
        id: '11-20', 
        units: 20, 
        prices: { avista: 420.00, dias30: 470.40, dias90: 525.00 }
      }
    ]
  },
  {
    id: '12',
    name: 'Concha Alumínio Profissional',
    category: 'panelas-cacarolas',
    subcategory: 'reforcada-polida',
    description: 'Concha de alumínio para uso profissional em cozinhas comerciais.',
    prices: { avista: 24.90, dias30: 27.90, dias90: 31.20 },
    sizes: ['Média'],
    defaultSize: 'Média',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    icon: 'Soup',
    kits: [
      { 
        id: '12-6', 
        units: 6, 
        prices: { avista: 120.00, dias30: 134.40, dias90: 150.00 }
      },
      { 
        id: '12-12', 
        units: 12, 
        prices: { avista: 216.00, dias30: 241.92, dias90: 270.00 },
        popular: true 
      },
      { 
        id: '12-20', 
        units: 20, 
        prices: { avista: 336.00, dias30: 376.32, dias90: 420.00 }
      }
    ]
  },
  {
    id: '13',
    name: 'Assadeira Alumínio Retangular',
    category: 'formas-assadeiras',
    subcategory: 'retangulares',
    description: 'Assadeira retangular perfeita para assados e gratinados.',
    prices: { avista: 129.90, dias30: 145.50, dias90: 162.40 },
    sizes: ['35x25cm'],
    defaultSize: '35x25cm',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop'],
    icon: 'RectangleHorizontal',
    kits: [
      { 
        id: '13-6', 
        units: 6, 
        prices: { avista: 660.00, dias30: 739.20, dias90: 825.00 }
      },
      { 
        id: '13-12', 
        units: 12, 
        prices: { avista: 1200.00, dias30: 1344.00, dias90: 1500.00 },
        popular: true 
      },
      { 
        id: '13-20', 
        units: 20, 
        prices: { avista: 1920.00, dias30: 2150.40, dias90: 2400.00 }
      }
    ]
  },
  {
    id: '14',
    name: 'Panela Leiteira Alumínio 2L',
    category: 'canecoes-fervedores',
    subcategory: 'extra-forte-polido',
    description: 'Panela leiteira ideal para preparar bebidas quentes.',
    prices: { avista: 79.90, dias30: 89.50, dias90: 99.90 },
    sizes: ['2L'],
    defaultSize: '2L',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1574263867128-a70d6c4d14c9?w=400&h=400&fit=crop'],
    icon: 'Coffee',
    kits: [
      { 
        id: '14-6', 
        units: 6, 
        prices: { avista: 420.00, dias30: 470.40, dias90: 525.00 }
      },
      { 
        id: '14-12', 
        units: 12, 
        prices: { avista: 780.00, dias30: 873.60, dias90: 975.00 },
        popular: true 
      },
      { 
        id: '14-20', 
        units: 20, 
        prices: { avista: 1260.00, dias30: 1411.20, dias90: 1575.00 }
      }
    ]
  },
  {
    id: '15',
    name: 'Kit Formas Alumínio 3 Peças',
    category: 'formas-assadeiras',
    subcategory: 'fundo-removivel',
    description: 'Conjunto com 3 formas de alumínio com fundo removível.',
    prices: { avista: 189.90, dias30: 212.70, dias90: 237.40 },
    sizes: ['P', 'M', 'G'],
    defaultSize: 'M',
    isKit: true,
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop'],
    icon: 'Package',
    kits: [
      { 
        id: '15-6', 
        units: 6, 
        prices: { avista: 960.00, dias30: 1075.20, dias90: 1200.00 }
      },
      { 
        id: '15-12', 
        units: 12, 
        prices: { avista: 1800.00, dias30: 2016.00, dias90: 2250.00 },
        popular: true 
      },
      { 
        id: '15-20', 
        units: 20, 
        prices: { avista: 2880.00, dias30: 3225.60, dias90: 3600.00 }
      }
    ]
  }
];

export const productLines = [
  'Todas as Linhas',
  'Panela de Pressão',
  'Caldeirão', 
  'Jogo de Panelas',
  'Panela Comum',
  'Frigideira',
  'Hotel',
  'Formas',
  'Tampas',
  'Utensílios'
] as const;