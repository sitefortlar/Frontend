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
    prices: { avista: 119.90, '2x': 125.90, '4x': 134.30, '10x': 149.90 },
    sizes: ['4.5L'],
    defaultSize: '4.5L',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'],
    icon: 'ChefHat',
    kits: [
      { 
        id: '1-6', 
        units: 6, 
        prices: { avista: 540.00, '2x': 567.00, '4x': 604.80, '10x': 675.00 }
      },
      { 
        id: '1-12', 
        units: 12, 
        prices: { avista: 1020.00, '2x': 1071.00, '4x': 1142.40, '10x': 1275.00 },
        popular: true 
      },
      { 
        id: '1-20', 
        units: 20, 
        prices: { avista: 1650.00, '2x': 1732.50, '4x': 1848.00, '10x': 2062.50 }
      }
    ]
  },
  {
    id: '2',
    name: 'Panela de Pressão 6L Alumínio',
    category: 'panelas-pressao',
    subcategory: '7-litros',
    description: 'Panela de pressão em alumínio, ideal para família pequena.',
    prices: { avista: 149.90, '2x': 157.40, '4x': 167.90, '10x': 187.40 },
    sizes: ['6L'],
    defaultSize: '6L',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'],
    icon: 'ChefHat',
    kits: [
      { 
        id: '2-6', 
        units: 6, 
        prices: { avista: 720.00, '2x': 756.00, '4x': 806.40, '10x': 900.00 }
      },
      { 
        id: '2-12', 
        units: 12, 
        prices: { avista: 1380.00, '2x': 1449.00, '4x': 1545.60, '10x': 1725.00 },
        popular: true 
      },
      { 
        id: '2-20', 
        units: 20, 
        prices: { avista: 2200.00, '2x': 2310.00, '4x': 2464.00, '10x': 2750.00 }
      }
    ]
  },
  {
    id: '3',
    name: 'Caldeirão Alumínio 20L Industrial',
    category: 'caldeiroes',
    subcategory: 'antiaderente-fort-flon',
    description: 'Caldeirão grande com revestimento antiaderente, ideal para grandes quantidades.',
    prices: { avista: 229.90, '2x': 241.40, '4x': 257.50, '10x': 287.40 },
    sizes: ['20L'],
    defaultSize: '20L',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    icon: 'Package',
    kits: [
      { 
        id: '3-6', 
        units: 6, 
        prices: { avista: 1100.00, '2x': 1155.00, '4x': 1232.00, '10x': 1375.00 }
      },
      { 
        id: '3-12', 
        units: 12, 
        prices: { avista: 2040.00, '2x': 2142.00, '4x': 2284.80, '10x': 2550.00 },
        popular: true 
      },
      { 
        id: '3-20', 
        units: 20, 
        prices: { avista: 3300.00, '2x': 3465.00, '4x': 3696.00, '10x': 4125.00 }
      }
    ]
  },
  {
    id: '4',
    name: 'Jogo de Panelas Alumínio 5 Peças',
    category: 'panelas-cacarolas',
    subcategory: 'super-forte-polida',
    description: 'Conjunto completo com 5 panelas da linha super forte polida.',
    prices: { avista: 399.90, '2x': 419.90, '4x': 447.90, '10x': 499.90 },
    sizes: ['P', 'M', 'G'],
    defaultSize: 'M',
    isKit: true,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    icon: 'Package',
    kits: [
      { 
        id: '4-6', 
        units: 6, 
        prices: { avista: 1800.00, '2x': 1890.00, '4x': 2016.00, '10x': 2250.00 }
      },
      { 
        id: '4-12', 
        units: 12, 
        prices: { avista: 3360.00, '2x': 3528.00, '4x': 3763.20, '10x': 4200.00 },
        popular: true 
      },
      { 
        id: '4-20', 
        units: 20, 
        prices: { avista: 5400.00, '2x': 5670.00, '4x': 6048.00, '10x': 6750.00 }
      }
    ]
  },
  {
    id: '5',
    name: 'Panela Alumínio Grosso 8L',
    category: 'panelas-cacarolas',
    subcategory: 'extra-forte-polida',
    description: 'Panela de alumínio grosso para uso profissional.',
    prices: { avista: 199.90, '2x': 209.90, '4x': 223.90, '10x': 249.90 },
    sizes: ['8L'],
    defaultSize: '8L',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop'],
    icon: 'Soup',
    kits: [
      { 
        id: '5-6', 
        units: 6, 
        prices: { avista: 960.00, '2x': 1008.00, '4x': 1075.20, '10x': 1200.00 }
      },
      { 
        id: '5-12', 
        units: 12, 
        prices: { avista: 1800.00, '2x': 1890.00, '4x': 2016.00, '10x': 2250.00 },
        popular: true 
      },
      { 
        id: '5-20', 
        units: 20, 
        prices: { avista: 2900.00, '2x': 3045.00, '4x': 3248.00, '10x': 3625.00 }
      }
    ]
  },
  {
    id: '6',
    name: 'Frigideira Alumínio 26cm',
    category: 'frigideiras',
    subcategory: 'antiaderente-fort-flon',
    description: 'Frigideira com excelente revestimento antiaderente.',
    prices: { avista: 279.90, '2x': 293.90, '4x': 313.50, '10x': 349.90 },
    sizes: ['26cm'],
    defaultSize: '26cm',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1583416750470-965b2707b8f1?w=400&h=400&fit=crop'],
    icon: 'Utensils',
    kits: [
      { 
        id: '6-6', 
        units: 6, 
        prices: { avista: 1260.00, '2x': 1323.00, '4x': 1411.20, '10x': 1575.00 }
      },
      { 
        id: '6-12', 
        units: 12, 
        prices: { avista: 2400.00, '2x': 2520.00, '4x': 2688.00, '10x': 3000.00 },
        popular: true 
      },
      { 
        id: '6-20', 
        units: 20, 
        prices: { avista: 3900.00, '2x': 4095.00, '4x': 4368.00, '10x': 4875.00 }
      }
    ]
  },
  {
    id: '7',
    name: 'Caldeirão Hotel Alumínio 30L',
    category: 'caldeiroes',
    subcategory: 'extra-forte-polida',
    description: 'Caldeirão profissional da linha hotel para grandes volumes.',
    prices: { avista: 429.90, '2x': 451.40, '4x': 481.50, '10x': 537.40 },
    sizes: ['30L'],
    defaultSize: '30L',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    icon: 'Package',
    kits: [
      { 
        id: '7-6', 
        units: 6, 
        prices: { avista: 2040.00, '2x': 2142.00, '4x': 2284.80, '10x': 2550.00 }
      },
      { 
        id: '7-12', 
        units: 12, 
        prices: { avista: 3840.00, '2x': 4032.00, '4x': 4300.80, '10x': 4800.00 },
        popular: true 
      },
      { 
        id: '7-20', 
        units: 20, 
        prices: { avista: 6200.00, '2x': 6510.00, '4x': 6944.00, '10x': 7750.00 }
      }
    ]
  },
  {
    id: '8',
    name: 'Forma de Bolo Alumínio 30cm',
    category: 'formas-assadeiras',
    subcategory: 'redondas',
    description: 'Forma redonda clássica para bolos perfeitos.',
    prices: { avista: 89.90, '2x': 94.40, '4x': 100.70, '10x': 112.40 },
    sizes: ['30cm'],
    defaultSize: '30cm',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop'],
    icon: 'Circle',
    kits: [
      { 
        id: '8-6', 
        units: 6, 
        prices: { avista: 480.00, '2x': 504.00, '4x': 537.60, '10x': 600.00 }
      },
      { 
        id: '8-12', 
        units: 12, 
        prices: { avista: 900.00, '2x': 945.00, '4x': 1008.00, '10x': 1125.00 },
        popular: true 
      },
      { 
        id: '8-20', 
        units: 20, 
        prices: { avista: 1440.00, '2x': 1512.00, '4x': 1612.80, '10x': 1800.00 }
      }
    ]
  },
  {
    id: '9',
    name: 'Forma de Pudim Alumínio',
    category: 'formas-assadeiras',
    subcategory: 'bolo-pudim',
    description: 'Forma especial para pudins e bolos com furo central.',
    prices: { avista: 69.90, '2x': 73.40, '4x': 78.30, '10x': 87.40 },
    sizes: ['22cm', '25cm'],
    defaultSize: '22cm',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop'],
    icon: 'Circle',
    kits: [
      { 
        id: '9-6', 
        units: 6, 
        prices: { avista: 360.00, '2x': 378.00, '4x': 403.20, '10x': 450.00 }
      },
      { 
        id: '9-12', 
        units: 12, 
        prices: { avista: 660.00, '2x': 693.00, '4x': 739.20, '10x': 825.00 },
        popular: true 
      },
      { 
        id: '9-20', 
        units: 20, 
        prices: { avista: 1080.00, '2x': 1134.00, '4x': 1209.60, '10x': 1350.00 }
      }
    ]
  },
  {
    id: '10',
    name: 'Tampa Alumínio Universal 32cm',
    category: 'panelas-cacarolas',
    subcategory: 'reforcada-polida',
    description: 'Tampa universal de alumínio para diversas panelas.',
    prices: { avista: 49.90, '2x': 52.40, '4x': 55.90, '10x': 62.40 },
    sizes: ['32cm'],
    defaultSize: '32cm',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1583416750470-965b2707b8f1?w=400&h=400&fit=crop'],
    icon: 'Circle',
    kits: [
      { 
        id: '10-6', 
        units: 6, 
        prices: { avista: 240.00, '2x': 252.00, '4x': 268.80, '10x': 300.00 }
      },
      { 
        id: '10-12', 
        units: 12, 
        prices: { avista: 450.00, '2x': 472.50, '4x': 504.00, '10x': 562.50 },
        popular: true 
      },
      { 
        id: '10-20', 
        units: 20, 
        prices: { avista: 720.00, '2x': 756.00, '4x': 806.40, '10x': 900.00 }
      }
    ]
  },
  {
    id: '11',
    name: 'Escumadeira Alumínio Grande',
    category: 'panelas-cacarolas',
    subcategory: 'reforcada-polida',
    description: 'Escumadeira de alumínio resistente para uso profissional.',
    prices: { avista: 29.90, '2x': 31.40, '4x': 33.50, '10x': 37.40 },
    sizes: ['Grande'],
    defaultSize: 'Grande',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop'],
    icon: 'Utensils',
    kits: [
      { 
        id: '11-6', 
        units: 6, 
        prices: { avista: 150.00, '2x': 157.50, '4x': 168.00, '10x': 187.50 }
      },
      { 
        id: '11-12', 
        units: 12, 
        prices: { avista: 270.00, '2x': 283.50, '4x': 302.40, '10x': 337.50 },
        popular: true 
      },
      { 
        id: '11-20', 
        units: 20, 
        prices: { avista: 420.00, '2x': 441.00, '4x': 470.40, '10x': 525.00 }
      }
    ]
  },
  {
    id: '12',
    name: 'Concha Alumínio Profissional',
    category: 'panelas-cacarolas',
    subcategory: 'reforcada-polida',
    description: 'Concha de alumínio para uso profissional em cozinhas comerciais.',
    prices: { avista: 24.90, '2x': 26.20, '4x': 27.90, '10x': 31.20 },
    sizes: ['Média'],
    defaultSize: 'Média',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'],
    icon: 'Soup',
    kits: [
      { 
        id: '12-6', 
        units: 6, 
        prices: { avista: 120.00, '2x': 126.00, '4x': 134.40, '10x': 150.00 }
      },
      { 
        id: '12-12', 
        units: 12, 
        prices: { avista: 216.00, '2x': 226.80, '4x': 241.92, '10x': 270.00 },
        popular: true 
      },
      { 
        id: '12-20', 
        units: 20, 
        prices: { avista: 336.00, '2x': 352.80, '4x': 376.32, '10x': 420.00 }
      }
    ]
  },
  {
    id: '13',
    name: 'Assadeira Alumínio Retangular',
    category: 'formas-assadeiras',
    subcategory: 'retangulares',
    description: 'Assadeira retangular perfeita para assados e gratinados.',
    prices: { avista: 129.90, '2x': 136.40, '4x': 145.50, '10x': 162.40 },
    sizes: ['35x25cm'],
    defaultSize: '35x25cm',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop'],
    icon: 'RectangleHorizontal',
    kits: [
      { 
        id: '13-6', 
        units: 6, 
        prices: { avista: 660.00, '2x': 693.00, '4x': 739.20, '10x': 825.00 }
      },
      { 
        id: '13-12', 
        units: 12, 
        prices: { avista: 1200.00, '2x': 1260.00, '4x': 1344.00, '10x': 1500.00 },
        popular: true 
      },
      { 
        id: '13-20', 
        units: 20, 
        prices: { avista: 1920.00, '2x': 2016.00, '4x': 2150.40, '10x': 2400.00 }
      }
    ]
  },
  {
    id: '14',
    name: 'Panela Leiteira Alumínio 2L',
    category: 'canecoes-fervedores',
    subcategory: 'extra-forte-polido',
    description: 'Panela leiteira ideal para preparar bebidas quentes.',
    prices: { avista: 79.90, '2x': 83.90, '4x': 89.50, '10x': 99.90 },
    sizes: ['2L'],
    defaultSize: '2L',
    isKit: false,
    images: ['https://images.unsplash.com/photo-1574263867128-a70d6c4d14c9?w=400&h=400&fit=crop'],
    icon: 'Coffee',
    kits: [
      { 
        id: '14-6', 
        units: 6, 
        prices: { avista: 420.00, '2x': 441.00, '4x': 470.40, '10x': 525.00 }
      },
      { 
        id: '14-12', 
        units: 12, 
        prices: { avista: 780.00, '2x': 819.00, '4x': 873.60, '10x': 975.00 },
        popular: true 
      },
      { 
        id: '14-20', 
        units: 20, 
        prices: { avista: 1260.00, '2x': 1323.00, '4x': 1411.20, '10x': 1575.00 }
      }
    ]
  },
  {
    id: '15',
    name: 'Kit Formas Alumínio 3 Peças',
    category: 'formas-assadeiras',
    subcategory: 'fundo-removivel',
    description: 'Conjunto com 3 formas de alumínio com fundo removível.',
    prices: { avista: 189.90, '2x': 199.40, '4x': 212.70, '10x': 237.40 },
    sizes: ['P', 'M', 'G'],
    defaultSize: 'M',
    isKit: true,
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop'],
    icon: 'Package',
    kits: [
      { 
        id: '15-6', 
        units: 6, 
        prices: { avista: 960.00, '2x': 1008.00, '4x': 1075.20, '10x': 1200.00 }
      },
      { 
        id: '15-12', 
        units: 12, 
        prices: { avista: 1800.00, '2x': 1890.00, '4x': 2016.00, '10x': 2250.00 },
        popular: true 
      },
      { 
        id: '15-20', 
        units: 20, 
        prices: { avista: 2880.00, '2x': 3024.00, '4x': 3225.60, '10x': 3600.00 }
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