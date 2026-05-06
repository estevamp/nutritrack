import { FoodItem } from '../types';

export const commonFoods: FoodItem[] = [
  // GRÃOS E CARBOIDRATOS (12 itens)
  {
    id: 'arroz-branco-cozido',
    name: 'Arroz Branco Cozido',
    category: 'grain',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '4 colheres de sopa cheias',
    isCustom: false,
    nutrients: { calories: 128, protein: 2.5, carbs: 28.1, sugar: 0.2, fat: 0.2, saturatedFat: 0.05, fiber: 1.6, sodium: 1 }
  },
  {
    id: 'arroz-integral-cozido',
    name: 'Arroz Integral Cozido',
    category: 'grain',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '4 colheres de sopa cheias',
    isCustom: false,
    nutrients: { calories: 124, protein: 2.6, carbs: 25.8, sugar: 0.3, fat: 1, saturatedFat: 0.2, fiber: 2.7, sodium: 1 }
  },
  {
    id: 'feijao-carioca-cozido',
    name: 'Feijão Carioca Cozido',
    category: 'grain',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '1 concha média',
    isCustom: false,
    nutrients: { calories: 76, protein: 4.8, carbs: 13.6, sugar: 0.5, fat: 0.5, saturatedFat: 0.1, fiber: 8.5, sodium: 2 }
  },
  {
    id: 'feijao-preto-cozido',
    name: 'Feijão Preto Cozido',
    category: 'grain',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '1 concha média',
    isCustom: false,
    nutrients: { calories: 77, protein: 4.5, carbs: 14, sugar: 0.5, fat: 0.5, saturatedFat: 0.1, fiber: 8.4, sodium: 2 }
  },
  {
    id: 'macarrao-cozido',
    name: 'Macarrão Cozido',
    category: 'grain',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '1 escumadeira cheia',
    isCustom: false,
    nutrients: { calories: 158, protein: 5.8, carbs: 30.7, sugar: 0.5, fat: 0.9, saturatedFat: 0.2, fiber: 1.8, sodium: 1 }
  },
  {
    id: 'pao-frances',
    name: 'Pão Francês',
    category: 'grain',
    servingSize: 50,
    servingUnit: 'unit',
    servingLabel: '1 unidade',
    isCustom: false,
    nutrients: { calories: 150, protein: 4.7, carbs: 29.3, sugar: 0.8, fat: 1.5, saturatedFat: 0.4, fiber: 1.1, sodium: 320 }
  },
  {
    id: 'pao-de-forma-integral',
    name: 'Pão de Forma Integral',
    category: 'grain',
    servingSize: 50,
    servingUnit: 'g',
    servingLabel: '2 fatias',
    isCustom: false,
    nutrients: { calories: 122, protein: 4.7, carbs: 22, sugar: 1.5, fat: 1.8, saturatedFat: 0.4, fiber: 3.4, sodium: 240 }
  },
  {
    id: 'tapioca',
    name: 'Tapioca (Goma)',
    category: 'grain',
    servingSize: 50,
    servingUnit: 'g',
    servingLabel: '3 colheres de sopa',
    isCustom: false,
    nutrients: { calories: 120, protein: 0.1, carbs: 29, sugar: 0.1, fat: 0, saturatedFat: 0, fiber: 0.2, sodium: 1 }
  },
  {
    id: 'aveia-em-flocos',
    name: 'Aveia em Flocos',
    category: 'grain',
    servingSize: 30,
    servingUnit: 'g',
    servingLabel: '2 colheres de sopa',
    isCustom: false,
    nutrients: { calories: 118, protein: 4.2, carbs: 20, sugar: 0.3, fat: 2.2, saturatedFat: 0.4, fiber: 2.7, sodium: 1 }
  },
  {
    id: 'batata-inglesa-cozida',
    name: 'Batata Inglesa Cozida',
    category: 'grain',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '1 unidade média',
    isCustom: false,
    nutrients: { calories: 86, protein: 1.7, carbs: 20.1, sugar: 0.8, fat: 0.1, saturatedFat: 0, fiber: 1.8, sodium: 3 }
  },
  {
    id: 'mandioca-cozida',
    name: 'Mandioca Cozida',
    category: 'grain',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '1 pedaço médio',
    isCustom: false,
    nutrients: { calories: 160, protein: 1.3, carbs: 38, sugar: 1.7, fat: 0.3, saturatedFat: 0.1, fiber: 1.8, sodium: 1 }
  },
  {
    id: 'cuscuz-de-milho',
    name: 'Cuscuz de Milho',
    category: 'grain',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '1 fatia média',
    isCustom: false,
    nutrients: { calories: 112, protein: 2.2, carbs: 25, sugar: 0.5, fat: 0.6, saturatedFat: 0.1, fiber: 2, sodium: 1 }
  },

  // PROTEÍNAS (10 itens)
  {
    id: 'frango-grelhado-peito',
    name: 'Peito de Frango Grelhado',
    category: 'protein',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '1 filé médio',
    isCustom: false,
    nutrients: { calories: 165, protein: 31, carbs: 0, sugar: 0, fat: 3.6, saturatedFat: 1, fiber: 0, sodium: 74 }
  },
  {
    id: 'carne-moida-patinho',
    name: 'Carne Moída (Patinho)',
    category: 'protein',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '3 colheres de sopa cheias',
    isCustom: false,
    nutrients: { calories: 219, protein: 35.9, carbs: 0, sugar: 0, fat: 7.3, saturatedFat: 3, fiber: 0, sodium: 65 }
  },
  {
    id: 'ovo-cozido',
    name: 'Ovo Cozido',
    category: 'protein',
    servingSize: 50,
    servingUnit: 'unit',
    servingLabel: '1 unidade',
    isCustom: false,
    nutrients: { calories: 78, protein: 6.3, carbs: 0.6, sugar: 0.1, fat: 5.3, saturatedFat: 1.6, fiber: 0, sodium: 62 }
  },
  {
    id: 'atum-em-lata-agua',
    name: 'Atum em Lata (em água)',
    category: 'protein',
    servingSize: 60,
    servingUnit: 'g',
    servingLabel: '3 colheres de sopa',
    isCustom: false,
    nutrients: { calories: 60, protein: 14, carbs: 0, sugar: 0, fat: 0.5, saturatedFat: 0.1, fiber: 0, sodium: 200 }
  },
  {
    id: 'sardinha-em-lata-oleo',
    name: 'Sardinha em Lata (em óleo)',
    category: 'protein',
    servingSize: 60,
    servingUnit: 'g',
    servingLabel: '2 unidades',
    isCustom: false,
    nutrients: { calories: 120, protein: 12, carbs: 0, sugar: 0, fat: 8, saturatedFat: 2, fiber: 0, sodium: 250 }
  },
  {
    id: 'file-de-tilapia-grelhado',
    name: 'Filé de Tilápia Grelhado',
    category: 'protein',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '1 filé médio',
    isCustom: false,
    nutrients: { calories: 128, protein: 26, carbs: 0, sugar: 0, fat: 2.7, saturatedFat: 0.9, fiber: 0, sodium: 52 }
  },
  {
    id: 'carne-bovina-patinho-grelhado',
    name: 'Carne Bovina (Patinho) Grelhado',
    category: 'protein',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '1 bife médio',
    isCustom: false,
    nutrients: { calories: 219, protein: 35.9, carbs: 0, sugar: 0, fat: 7.3, saturatedFat: 3, fiber: 0, sodium: 65 }
  },
  {
    id: 'frango-coxinha-da-asa',
    name: 'Coxinha da Asa de Frango',
    category: 'protein',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '3 unidades pequenas',
    isCustom: false,
    nutrients: { calories: 203, protein: 18, carbs: 0, sugar: 0, fat: 14, saturatedFat: 4, fiber: 0, sodium: 80 }
  },
  {
    id: 'ovos-mexidos',
    name: 'Ovos Mexidos',
    category: 'protein',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '2 unidades',
    isCustom: false,
    nutrients: { calories: 150, protein: 12, carbs: 1, sugar: 0.2, fat: 11, saturatedFat: 3.3, fiber: 0, sodium: 150 }
  },
  {
    id: 'camarao-cozido',
    name: 'Camarão Cozido',
    category: 'protein',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '10 unidades médias',
    isCustom: false,
    nutrients: { calories: 99, protein: 24, carbs: 0.2, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 0, sodium: 111 }
  },

  // LATICÍNIOS (10 itens)
  {
    id: 'leite-integral',
    name: 'Leite Integral',
    category: 'dairy',
    servingSize: 200,
    servingUnit: 'ml',
    servingLabel: '1 copo americano',
    isCustom: false,
    nutrients: { calories: 120, protein: 6.4, carbs: 9.4, sugar: 9.4, fat: 6.4, saturatedFat: 3.8, fiber: 0, sodium: 100 }
  },
  {
    id: 'leite-desnatado',
    name: 'Leite Desnatado',
    category: 'dairy',
    servingSize: 200,
    servingUnit: 'ml',
    servingLabel: '1 copo americano',
    isCustom: false,
    nutrients: { calories: 70, protein: 6.4, carbs: 10, sugar: 10, fat: 0, saturatedFat: 0, fiber: 0, sodium: 100 }
  },
  {
    id: 'iogurte-natural',
    name: 'Iogurte Natural',
    category: 'dairy',
    servingSize: 170,
    servingUnit: 'g',
    servingLabel: '1 pote',
    isCustom: false,
    nutrients: { calories: 100, protein: 6, carbs: 9, sugar: 9, fat: 5, saturatedFat: 3, fiber: 0, sodium: 80 }
  },
  {
    id: 'queijo-minas-frescal',
    name: 'Queijo Minas Frescal',
    category: 'dairy',
    servingSize: 30,
    servingUnit: 'g',
    servingLabel: '1 fatia média',
    isCustom: false,
    nutrients: { calories: 73, protein: 5.2, carbs: 1, sugar: 0.5, fat: 5.4, saturatedFat: 3.5, fiber: 0, sodium: 150 }
  },
  {
    id: 'queijo-mucarela',
    name: 'Queijo Muçarela',
    category: 'dairy',
    servingSize: 30,
    servingUnit: 'g',
    servingLabel: '1 fatia',
    isCustom: false,
    nutrients: { calories: 90, protein: 7, carbs: 0.5, sugar: 0.1, fat: 7, saturatedFat: 4.5, fiber: 0, sodium: 180 }
  },
  {
    id: 'requeijao-cremoso',
    name: 'Requeijão Cremoso',
    category: 'dairy',
    servingSize: 30,
    servingUnit: 'g',
    servingLabel: '1 colher de sopa',
    isCustom: false,
    nutrients: { calories: 75, protein: 2.5, carbs: 1, sugar: 0.5, fat: 7, saturatedFat: 4.5, fiber: 0, sodium: 150 }
  },
  {
    id: 'iogurte-grego-natural',
    name: 'Iogurte Grego Natural',
    category: 'dairy',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '1/2 pote',
    isCustom: false,
    nutrients: { calories: 110, protein: 5, carbs: 15, sugar: 12, fat: 4, saturatedFat: 2.5, fiber: 0, sodium: 50 }
  },
  {
    id: 'whey-protein-chocolate',
    name: 'Whey Protein (Chocolate)',
    category: 'dairy',
    servingSize: 30,
    servingUnit: 'g',
    servingLabel: '1 medidor (scoop)',
    isCustom: false,
    nutrients: { calories: 120, protein: 24, carbs: 3, sugar: 1, fat: 1.5, saturatedFat: 0.5, fiber: 0.5, sodium: 60 }
  },
  {
    id: 'leite-fermentado',
    name: 'Leite Fermentado',
    category: 'dairy',
    servingSize: 80,
    servingUnit: 'ml',
    servingLabel: '1 frasco pequeno',
    isCustom: false,
    nutrients: { calories: 50, protein: 1.5, carbs: 11, sugar: 11, fat: 0, saturatedFat: 0, fiber: 0, sodium: 30 }
  },
  {
    id: 'ricota',
    name: 'Ricota',
    category: 'dairy',
    servingSize: 30,
    servingUnit: 'g',
    servingLabel: '1 fatia média',
    isCustom: false,
    nutrients: { calories: 52, protein: 3.5, carbs: 1.2, sugar: 0.8, fat: 3.8, saturatedFat: 2.4, fiber: 0, sodium: 80 }
  },

  // VEGETAIS (10 itens)
  {
    id: 'alface-crespa',
    name: 'Alface Crespa',
    category: 'vegetable',
    servingSize: 20,
    servingUnit: 'g',
    servingLabel: '3 folhas médias',
    isCustom: false,
    nutrients: { calories: 3, protein: 0.3, carbs: 0.5, sugar: 0.1, fat: 0, saturatedFat: 0, fiber: 0.4, sodium: 2 }
  },
  {
    id: 'tomate-salada',
    name: 'Tomate Salada',
    category: 'vegetable',
    servingSize: 50,
    servingUnit: 'g',
    servingLabel: '3 fatias médias',
    isCustom: false,
    nutrients: { calories: 9, protein: 0.5, carbs: 1.9, sugar: 1.3, fat: 0.1, saturatedFat: 0, fiber: 0.6, sodium: 2 }
  },
  {
    id: 'cenoura-crua',
    name: 'Cenoura Crua',
    category: 'vegetable',
    servingSize: 50,
    servingUnit: 'g',
    servingLabel: '1/2 unidade média',
    isCustom: false,
    nutrients: { calories: 20, protein: 0.5, carbs: 4.8, sugar: 2.4, fat: 0.1, saturatedFat: 0, fiber: 1.4, sodium: 35 }
  },
  {
    id: 'brocolis-cozido',
    name: 'Brócolis Cozido',
    category: 'vegetable',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '4 ramos médios',
    isCustom: false,
    nutrients: { calories: 35, protein: 3.3, carbs: 6.6, sugar: 1.4, fat: 0.4, saturatedFat: 0.1, fiber: 3.3, sodium: 12 }
  },
  {
    id: 'abobrinha-cozida',
    name: 'Abobrinha Cozida',
    category: 'vegetable',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '3 colheres de sopa',
    isCustom: false,
    nutrients: { calories: 15, protein: 1.1, carbs: 3, sugar: 1.5, fat: 0.2, saturatedFat: 0, fiber: 1.1, sodium: 1 }
  },
  {
    id: 'chuchu-cozido',
    name: 'Chuchu Cozido',
    category: 'vegetable',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '3 colheres de sopa',
    isCustom: false,
    nutrients: { calories: 19, protein: 0.7, carbs: 4.5, sugar: 1.8, fat: 0.1, saturatedFat: 0, fiber: 1.2, sodium: 1 }
  },
  {
    id: 'couve-refogada',
    name: 'Couve Refogada',
    category: 'vegetable',
    servingSize: 50,
    servingUnit: 'g',
    servingLabel: '2 colheres de sopa',
    isCustom: false,
    nutrients: { calories: 45, protein: 1.5, carbs: 4, sugar: 0.5, fat: 3, saturatedFat: 0.5, fiber: 2.5, sodium: 20 }
  },
  {
    id: 'espinafre-cozido',
    name: 'Espinafre Cozido',
    category: 'vegetable',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '3 colheres de sopa',
    isCustom: false,
    nutrients: { calories: 23, protein: 3, carbs: 3.6, sugar: 0.4, fat: 0.3, saturatedFat: 0.1, fiber: 2.4, sodium: 70 }
  },
  {
    id: 'pepino-cru',
    name: 'Pepino Cru',
    category: 'vegetable',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '1 unidade pequena',
    isCustom: false,
    nutrients: { calories: 15, protein: 0.7, carbs: 3.6, sugar: 1.7, fat: 0.1, saturatedFat: 0, fiber: 0.5, sodium: 2 }
  },
  {
    id: 'beterraba-cozida',
    name: 'Beterraba Cozida',
    category: 'vegetable',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '3 fatias médias',
    isCustom: false,
    nutrients: { calories: 43, protein: 1.6, carbs: 9.6, sugar: 6.8, fat: 0.2, saturatedFat: 0, fiber: 2.8, sodium: 78 }
  },

  // FRUTAS (11 itens)
  {
    id: 'banana-nanica',
    name: 'Banana Nanica',
    category: 'fruit',
    servingSize: 100,
    servingUnit: 'unit',
    servingLabel: '1 unidade média',
    isCustom: false,
    nutrients: { calories: 92, protein: 1.4, carbs: 23.8, sugar: 12.2, fat: 0.1, saturatedFat: 0, fiber: 2, sodium: 1 }
  },
  {
    id: 'maca-fuji',
    name: 'Maçã Fuji',
    category: 'fruit',
    servingSize: 150,
    servingUnit: 'unit',
    servingLabel: '1 unidade média',
    isCustom: false,
    nutrients: { calories: 78, protein: 0.4, carbs: 22, sugar: 15, fat: 0.2, saturatedFat: 0, fiber: 3, sodium: 1 }
  },
  {
    id: 'mamao-papaia',
    name: 'Mamão Papaia',
    category: 'fruit',
    servingSize: 150,
    servingUnit: 'g',
    servingLabel: '1/2 unidade pequena',
    isCustom: false,
    nutrients: { calories: 60, protein: 0.8, carbs: 15, sugar: 11, fat: 0.2, saturatedFat: 0, fiber: 2.7, sodium: 5 }
  },
  {
    id: 'laranja-pera',
    name: 'Laranja Pera',
    category: 'fruit',
    servingSize: 150,
    servingUnit: 'unit',
    servingLabel: '1 unidade média',
    isCustom: false,
    nutrients: { calories: 70, protein: 1.5, carbs: 18, sugar: 14, fat: 0.2, saturatedFat: 0, fiber: 3.6, sodium: 1 }
  },
  {
    id: 'abacate',
    name: 'Abacate',
    category: 'fruit',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '3 colheres de sopa',
    isCustom: false,
    nutrients: { calories: 160, protein: 2, carbs: 8.5, sugar: 0.7, fat: 14.7, saturatedFat: 2.1, fiber: 6.7, sodium: 7 }
  },
  {
    id: 'uva-italia',
    name: 'Uva Itália',
    category: 'fruit',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '10 unidades grandes',
    isCustom: false,
    nutrients: { calories: 68, protein: 0.7, carbs: 18, sugar: 15, fat: 0.2, saturatedFat: 0, fiber: 0.9, sodium: 2 }
  },
  {
    id: 'morango',
    name: 'Morango',
    category: 'fruit',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '8 unidades médias',
    isCustom: false,
    nutrients: { calories: 32, protein: 0.7, carbs: 7.7, sugar: 4.9, fat: 0.3, saturatedFat: 0, fiber: 2, sodium: 1 }
  },
  {
    id: 'melancia',
    name: 'Melancia',
    category: 'fruit',
    servingSize: 200,
    servingUnit: 'g',
    servingLabel: '1 fatia grande',
    isCustom: false,
    nutrients: { calories: 60, protein: 1.2, carbs: 15, sugar: 12, fat: 0.3, saturatedFat: 0, fiber: 0.8, sodium: 2 }
  },
  {
    id: 'manga-palmer',
    name: 'Manga Palmer',
    category: 'fruit',
    servingSize: 150,
    servingUnit: 'g',
    servingLabel: '1/2 unidade média',
    isCustom: false,
    nutrients: { calories: 90, protein: 1.2, carbs: 22, sugar: 20, fat: 0.4, saturatedFat: 0.1, fiber: 2.4, sodium: 2 }
  },
  {
    id: 'kiwi',
    name: 'Kiwi',
    category: 'fruit',
    servingSize: 80,
    servingUnit: 'unit',
    servingLabel: '1 unidade média',
    isCustom: false,
    nutrients: { calories: 48, protein: 0.9, carbs: 11, sugar: 7, fat: 0.4, saturatedFat: 0, fiber: 2.4, sodium: 2 }
  },
  {
    id: 'coco-ralado-seco',
    name: 'Coco Ralado Seco',
    category: 'fruit',
    servingSize: 10,
    servingUnit: 'g',
    servingLabel: '1 colher de sopa',
    isCustom: false,
    nutrients: { calories: 65, protein: 0.7, carbs: 2.4, sugar: 0.7, fat: 6.5, saturatedFat: 5.7, fiber: 1.6, sodium: 3 }
  },

  // GORDURAS (10 itens)
  {
    id: 'azeite-de-oliva',
    name: 'Azeite de Oliva Extra Virgem',
    category: 'fat',
    servingSize: 13,
    servingUnit: 'ml',
    servingLabel: '1 colher de sopa',
    isCustom: false,
    nutrients: { calories: 115, protein: 0, carbs: 0, sugar: 0, fat: 13, saturatedFat: 1.8, fiber: 0, sodium: 0 }
  },
  {
    id: 'oleo-de-soja',
    name: 'Óleo de Soja',
    category: 'fat',
    servingSize: 13,
    servingUnit: 'ml',
    servingLabel: '1 colher de sopa',
    isCustom: false,
    nutrients: { calories: 115, protein: 0, carbs: 0, sugar: 0, fat: 13, saturatedFat: 2, fiber: 0, sodium: 0 }
  },
  {
    id: 'manteiga-com-sal',
    name: 'Manteiga com Sal',
    category: 'fat',
    servingSize: 10,
    servingUnit: 'g',
    servingLabel: '1 ponta de faca',
    isCustom: false,
    nutrients: { calories: 72, protein: 0.1, carbs: 0, sugar: 0, fat: 8.1, saturatedFat: 5.1, fiber: 0, sodium: 60 }
  },
  {
    id: 'pasta-de-amendoim',
    name: 'Pasta de Amendoim Integral',
    category: 'fat',
    servingSize: 15,
    servingUnit: 'g',
    servingLabel: '1 colher de sopa',
    isCustom: false,
    nutrients: { calories: 90, protein: 4, carbs: 3, sugar: 0.5, fat: 7.5, saturatedFat: 1.5, fiber: 1.2, sodium: 0 }
  },
  {
    id: 'amendoim-torrado',
    name: 'Amendoim Torrado',
    category: 'fat',
    servingSize: 30,
    servingUnit: 'g',
    servingLabel: '1 punhado pequeno',
    isCustom: false,
    nutrients: { calories: 170, protein: 7.5, carbs: 4.8, sugar: 1.2, fat: 14.5, saturatedFat: 2.1, fiber: 2.4, sodium: 2 }
  },
  {
    id: 'castanha-do-para',
    name: 'Castanha do Pará',
    category: 'fat',
    servingSize: 5,
    servingUnit: 'unit',
    servingLabel: '1 unidade',
    isCustom: false,
    nutrients: { calories: 33, protein: 0.7, carbs: 0.6, sugar: 0.1, fat: 3.3, saturatedFat: 0.8, fiber: 0.4, sodium: 0 }
  },
  {
    id: 'amendoas',
    name: 'Amêndoas',
    category: 'fat',
    servingSize: 15,
    servingUnit: 'g',
    servingLabel: '10 unidades',
    isCustom: false,
    nutrients: { calories: 87, protein: 3.2, carbs: 3.2, sugar: 0.6, fat: 7.5, saturatedFat: 0.6, fiber: 1.8, sodium: 0 }
  },
  {
    id: 'nozes',
    name: 'Nozes',
    category: 'fat',
    servingSize: 15,
    servingUnit: 'g',
    servingLabel: '3 unidades inteiras',
    isCustom: false,
    nutrients: { calories: 98, protein: 2.3, carbs: 2.1, sugar: 0.4, fat: 9.8, saturatedFat: 0.9, fiber: 1, sodium: 0 }
  },
  {
    id: 'maionese-tradicional',
    name: 'Maionese Tradicional',
    category: 'fat',
    servingSize: 12,
    servingUnit: 'g',
    servingLabel: '1 colher de sopa',
    isCustom: false,
    nutrients: { calories: 40, protein: 0.1, carbs: 0.8, sugar: 0.5, fat: 4, saturatedFat: 0.6, fiber: 0, sodium: 75 }
  },
  {
    id: 'creme-de-leite',
    name: 'Creme de Leite',
    category: 'fat',
    servingSize: 15,
    servingUnit: 'g',
    servingLabel: '1 colher de sopa',
    isCustom: false,
    nutrients: { calories: 30, protein: 0.3, carbs: 0.6, sugar: 0.6, fat: 3, saturatedFat: 1.9, fiber: 0, sodium: 10 }
  },

  // BEBIDAS (10 itens)
  {
    id: 'suco-de-laranja-natural',
    name: 'Suco de Laranja Natural',
    category: 'beverage',
    servingSize: 200,
    servingUnit: 'ml',
    servingLabel: '1 copo',
    isCustom: false,
    nutrients: { calories: 90, protein: 1.4, carbs: 21, sugar: 18, fat: 0.4, saturatedFat: 0, fiber: 0.4, sodium: 2 }
  },
  {
    id: 'refrigerante-cola',
    name: 'Refrigerante de Cola',
    category: 'beverage',
    servingSize: 350,
    servingUnit: 'ml',
    servingLabel: '1 lata',
    isCustom: false,
    nutrients: { calories: 147, protein: 0, carbs: 37, sugar: 37, fat: 0, saturatedFat: 0, fiber: 0, sodium: 18 }
  },
  {
    id: 'agua-de-coco',
    name: 'Água de Coco',
    category: 'beverage',
    servingSize: 200,
    servingUnit: 'ml',
    servingLabel: '1 copo',
    isCustom: false,
    nutrients: { calories: 40, protein: 0, carbs: 10, sugar: 9, fat: 0, saturatedFat: 0, fiber: 0, sodium: 40 }
  },
  {
    id: 'cafe-sem-acucar',
    name: 'Café sem Açúcar',
    category: 'beverage',
    servingSize: 50,
    servingUnit: 'ml',
    servingLabel: '1 xícara pequena',
    isCustom: false,
    nutrients: { calories: 2, protein: 0.1, carbs: 0, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 1 }
  },
  {
    id: 'leite-com-achocolatado',
    name: 'Leite com Achocolatado',
    category: 'beverage',
    servingSize: 200,
    servingUnit: 'ml',
    servingLabel: '1 copo',
    isCustom: false,
    nutrients: { calories: 160, protein: 6, carbs: 26, sugar: 24, fat: 4, saturatedFat: 2.5, fiber: 1, sodium: 120 }
  },
  {
    id: 'cerveja-pilsen',
    name: 'Cerveja Pilsen',
    category: 'beverage',
    servingSize: 350,
    servingUnit: 'ml',
    servingLabel: '1 lata',
    isCustom: false,
    nutrients: { calories: 150, protein: 1.5, carbs: 12, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 14 }
  },
  {
    id: 'vinho-tinto-seco',
    name: 'Vinho Tinto Seco',
    category: 'beverage',
    servingSize: 150,
    servingUnit: 'ml',
    servingLabel: '1 taça',
    isCustom: false,
    nutrients: { calories: 125, protein: 0.1, carbs: 3.8, sugar: 0.9, fat: 0, saturatedFat: 0, fiber: 0, sodium: 6 }
  },
  {
    id: 'suco-de-uva-integral',
    name: 'Suco de Uva Integral',
    category: 'beverage',
    servingSize: 200,
    servingUnit: 'ml',
    servingLabel: '1 copo',
    isCustom: false,
    nutrients: { calories: 120, protein: 1, carbs: 28, sugar: 26, fat: 0, saturatedFat: 0, fiber: 0, sodium: 10 }
  },
  {
    id: 'cha-mate-batido',
    name: 'Chá Mate Batido (com açúcar)',
    category: 'beverage',
    servingSize: 200,
    servingUnit: 'ml',
    servingLabel: '1 copo',
    isCustom: false,
    nutrients: { calories: 80, protein: 0, carbs: 20, sugar: 20, fat: 0, saturatedFat: 0, fiber: 0, sodium: 5 }
  },
  {
    id: 'energetico',
    name: 'Energético',
    category: 'beverage',
    servingSize: 250,
    servingUnit: 'ml',
    servingLabel: '1 lata',
    isCustom: false,
    nutrients: { calories: 115, protein: 0, carbs: 28, sugar: 27, fat: 0, saturatedFat: 0, fiber: 0, sodium: 100 }
  },

  // LANCHES E OUTROS (10 itens)
  {
    id: 'biscoito-cream-cracker',
    name: 'Biscoito Cream Cracker',
    category: 'snack',
    servingSize: 30,
    servingUnit: 'g',
    servingLabel: '6 unidades',
    isCustom: false,
    nutrients: { calories: 130, protein: 2.5, carbs: 20, sugar: 0.5, fat: 4.5, saturatedFat: 2, fiber: 0.8, sodium: 250 }
  },
  {
    id: 'biscoito-recheado-chocolate',
    name: 'Biscoito Recheado Chocolate',
    category: 'snack',
    servingSize: 30,
    servingUnit: 'g',
    servingLabel: '3 unidades',
    isCustom: false,
    nutrients: { calories: 145, protein: 1.8, carbs: 21, sugar: 11, fat: 6, saturatedFat: 2.8, fiber: 0.6, sodium: 90 }
  },
  {
    id: 'chocolate-ao-leite',
    name: 'Chocolate ao Leite',
    category: 'snack',
    servingSize: 25,
    servingUnit: 'g',
    servingLabel: '4 quadradinhos',
    isCustom: false,
    nutrients: { calories: 135, protein: 1.5, carbs: 14, sugar: 13, fat: 8, saturatedFat: 4.8, fiber: 0.5, sodium: 20 }
  },
  {
    id: 'barra-de-cereal-frutas',
    name: 'Barra de Cereal (Frutas)',
    category: 'snack',
    servingSize: 20,
    servingUnit: 'unit',
    servingLabel: '1 unidade',
    isCustom: false,
    nutrients: { calories: 80, protein: 1, carbs: 15, sugar: 6, fat: 2, saturatedFat: 0.8, fiber: 1.5, sodium: 40 }
  },
  {
    id: 'granola-tradicional',
    name: 'Granola Tradicional',
    category: 'snack',
    servingSize: 40,
    servingUnit: 'g',
    servingLabel: '1/2 xícara',
    isCustom: false,
    nutrients: { calories: 160, protein: 4, carbs: 26, sugar: 10, fat: 5, saturatedFat: 1, fiber: 3, sodium: 25 }
  },
  {
    id: 'pipoca-salgada',
    name: 'Pipoca Salgada',
    category: 'snack',
    servingSize: 20,
    servingUnit: 'g',
    servingLabel: '1 xícara cheia',
    isCustom: false,
    nutrients: { calories: 80, protein: 2, carbs: 12, sugar: 0.1, fat: 3, saturatedFat: 0.5, fiber: 2.5, sodium: 150 }
  },
  {
    id: 'chips-de-batata',
    name: 'Chips de Batata',
    category: 'snack',
    servingSize: 25,
    servingUnit: 'g',
    servingLabel: '1 pacote pequeno',
    isCustom: false,
    nutrients: { calories: 130, protein: 1.5, carbs: 13, sugar: 0.5, fat: 8, saturatedFat: 3, fiber: 1, sodium: 150 }
  },
  {
    id: 'brigadeiro',
    name: 'Brigadeiro',
    category: 'snack',
    servingSize: 20,
    servingUnit: 'unit',
    servingLabel: '1 unidade média',
    isCustom: false,
    nutrients: { calories: 65, protein: 1, carbs: 10, sugar: 9, fat: 2.5, saturatedFat: 1.5, fiber: 0.2, sodium: 15 }
  },
  {
    id: 'pao-de-queijo',
    name: 'Pão de Queijo',
    category: 'snack',
    servingSize: 50,
    servingUnit: 'g',
    servingLabel: '2 unidades médias',
    isCustom: false,
    nutrients: { calories: 135, protein: 2.5, carbs: 15, sugar: 0.5, fat: 7, saturatedFat: 3.5, fiber: 0.5, sodium: 280 }
  },
  {
    id: 'coxinha-de-frango',
    name: 'Coxinha de Frango',
    category: 'snack',
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '1 unidade média',
    isCustom: false,
    nutrients: { calories: 250, protein: 10, carbs: 25, sugar: 1, fat: 12, saturatedFat: 3, fiber: 1.5, sodium: 450 }
  }
];
