import {type FoodItem } from '../types';

const baseCommonFoods: FoodItem[] = [
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

// TACO 4ª edição: alimentos adicionais por 100 g de parte comestível.
const tacoFoods: FoodItem[] = [
  {
    id: "taco-arroz-integral-cru",
    name: "Arroz, Integral, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 359.7, protein: 7.3, carbs: 77.5, sugar: 0, fat: 1.9, saturatedFat: 0.3, fiber: 4.8, sodium: 1.6 }
  },
  {
    id: "taco-arroz-tipo-1-cru",
    name: "Arroz, tipo 1, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 357.8, protein: 7.2, carbs: 78.8, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 1.6, sodium: 1 }
  },
  {
    id: "taco-arroz-tipo-2-cozido",
    name: "Arroz, tipo 2, Cozido",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 130.1, protein: 2.6, carbs: 28.2, sugar: 0, fat: 0.4, saturatedFat: 0.1, fiber: 1.1, sodium: 2 }
  },
  {
    id: "taco-arroz-tipo-2-cru",
    name: "Arroz, tipo 2, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 358.1, protein: 7.2, carbs: 78.9, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 1.7, sodium: 0.6 }
  },
  {
    id: "taco-biscoito-doce-maisena",
    name: "Biscoito, Doce, Maisena",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 442.8, protein: 8.1, carbs: 75.2, sugar: 0, fat: 12, saturatedFat: 3.9, fiber: 2.1, sodium: 352 }
  },
  {
    id: "taco-biscoito-doce-recheado-com-morango",
    name: "Biscoito, Doce, Recheado com Morango",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 471.2, protein: 5.7, carbs: 71, sugar: 0, fat: 19.6, saturatedFat: 6.1, fiber: 1.5, sodium: 229.8 }
  },
  {
    id: "taco-biscoito-doce-wafer-recheado-de-chocolate",
    name: "Biscoito, Doce, Wafer, Recheado de Chocolate",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 502.5, protein: 5.6, carbs: 67.5, sugar: 0, fat: 24.7, saturatedFat: 6.5, fiber: 1.8, sodium: 137.2 }
  },
  {
    id: "taco-biscoito-doce-wafer-recheado-de-morango",
    name: "Biscoito, Doce, Wafer, Recheado de Morango",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 513.4, protein: 4.5, carbs: 67.4, sugar: 0, fat: 26.4, saturatedFat: 6.7, fiber: 0.8, sodium: 119.9 }
  },
  {
    id: "taco-bolo-mistura-para",
    name: "Bolo, Mistura para",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 418.6, protein: 6.2, carbs: 84.7, sugar: 0, fat: 6.1, saturatedFat: 2.1, fiber: 1.7, sodium: 462.9 }
  },
  {
    id: "taco-bolo-pronto-aipim",
    name: "Bolo, Pronto, Aipim",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 323.9, protein: 4.4, carbs: 47.9, sugar: 0, fat: 12.7, saturatedFat: 5, fiber: 0.7, sodium: 111 }
  },
  {
    id: "taco-bolo-pronto-chocolate",
    name: "Bolo, Pronto, Chocolate",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 410, protein: 6.2, carbs: 54.7, sugar: 0, fat: 18.5, saturatedFat: 5.5, fiber: 1.4, sodium: 283.3 }
  },
  {
    id: "taco-bolo-pronto-coco",
    name: "Bolo, Pronto, Coco",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 333.4, protein: 5.7, carbs: 52.3, sugar: 0, fat: 11.3, saturatedFat: 4.9, fiber: 1.1, sodium: 190.3 }
  },
  {
    id: "taco-bolo-pronto-milho",
    name: "Bolo, Pronto, Milho",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 311.4, protein: 4.8, carbs: 45.1, sugar: 0, fat: 12.4, saturatedFat: 4.5, fiber: 0.7, sodium: 133.8 }
  },
  {
    id: "taco-canjica-branca-crua",
    name: "Canjica, Branca, Crua",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 357.6, protein: 7.2, carbs: 78.1, sugar: 0, fat: 1, saturatedFat: 0.3, fiber: 5.5, sodium: 0.8 }
  },
  {
    id: "taco-canjica-com-leite-integral",
    name: "Canjica, com Leite Integral",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 112.5, protein: 2.4, carbs: 23.6, sugar: 0, fat: 1.2, saturatedFat: 0.6, fiber: 1.2, sodium: 27.6 }
  },
  {
    id: "taco-cereais-milho-flocos-com-sal",
    name: "Cereais, Milho, Flocos, com Sal",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 369.6, protein: 7.3, carbs: 80.8, sugar: 0, fat: 1.6, saturatedFat: 0.5, fiber: 5.3, sodium: 271.7 }
  },
  {
    id: "taco-cereais-milho-flocos-sem-sal",
    name: "Cereais, Milho, Flocos, sem Sal",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 363.3, protein: 6.9, carbs: 80.4, sugar: 0, fat: 1.2, saturatedFat: 0.3, fiber: 1.8, sodium: 31 }
  },
  {
    id: "taco-cereais-mingau-milho-infantil",
    name: "Cereais, Mingau, Milho, Infantil",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 394.4, protein: 6.4, carbs: 87.3, sugar: 0, fat: 1.1, saturatedFat: 0.3, fiber: 3.2, sodium: 399.4 }
  },
  {
    id: "taco-cereais-mistura-para-vitamina-trigo-cevada-e-aveia",
    name: "Cereais, Mistura para Vitamina, Trigo, Cevada e Aveia",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 381.1, protein: 8.9, carbs: 81.6, sugar: 0, fat: 2.1, saturatedFat: 0.5, fiber: 5, sodium: 1163.3 }
  },
  {
    id: "taco-cereal-matinal-milho",
    name: "Cereal Matinal, Milho",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 365.4, protein: 7.2, carbs: 83.8, sugar: 0, fat: 1, saturatedFat: 0.4, fiber: 4.1, sodium: 654.5 }
  },
  {
    id: "taco-cereal-matinal-milho-acucar",
    name: "Cereal Matinal, Milho, Açúcar",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 376.6, protein: 4.7, carbs: 88.8, sugar: 0, fat: 0.7, saturatedFat: 0.2, fiber: 2.1, sodium: 405.3 }
  },
  {
    id: "taco-creme-de-arroz-po",
    name: "Creme de Arroz, Pó",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 386, protein: 7, carbs: 83.9, sugar: 0, fat: 1.2, saturatedFat: 0.4, fiber: 1.1, sodium: 1 }
  },
  {
    id: "taco-creme-de-milho-po",
    name: "Creme de Milho, Pó",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 333, protein: 4.8, carbs: 86.1, sugar: 0, fat: 1.6, saturatedFat: 0.3, fiber: 3.7, sodium: 593.8 }
  },
  {
    id: "taco-curau-milho-verde",
    name: "Curau, Milho Verde",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 78.4, protein: 2.4, carbs: 13.9, sugar: 0, fat: 1.6, saturatedFat: 0.8, fiber: 0.5, sodium: 20.5 }
  },
  {
    id: "taco-curau-milho-verde-mistura-para",
    name: "Curau, Milho Verde, Mistura para",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 402.3, protein: 2.2, carbs: 79.8, sugar: 0, fat: 13.4, saturatedFat: 3, fiber: 2.5, sodium: 222.9 }
  },
  {
    id: "taco-farinha-de-arroz-enriquecida",
    name: "Farinha, de Arroz, Enriquecida",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 363.1, protein: 1.3, carbs: 85.5, sugar: 0, fat: 0.3, saturatedFat: 0.2, fiber: 0.6, sodium: 17.1 }
  },
  {
    id: "taco-farinha-de-centeio-integral",
    name: "Farinha, de Centeio, Integral",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 335.8, protein: 12.5, carbs: 73.3, sugar: 0, fat: 1.8, saturatedFat: 0.3, fiber: 15.5, sodium: 41.4 }
  },
  {
    id: "taco-farinha-de-milho-amarela",
    name: "Farinha, de Milho, Amarela",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 350.6, protein: 7.2, carbs: 79.1, sugar: 0, fat: 1.5, saturatedFat: 0.4, fiber: 5.5, sodium: 44.9 }
  },
  {
    id: "taco-farinha-de-rosca",
    name: "Farinha, de Rosca",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 370.6, protein: 11.4, carbs: 75.8, sugar: 0, fat: 1.5, saturatedFat: 0.6, fiber: 4.8, sodium: 332.5 }
  },
  {
    id: "taco-farinha-de-trigo",
    name: "Farinha, de Trigo",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 360.5, protein: 9.8, carbs: 75.1, sugar: 0, fat: 1.4, saturatedFat: 0.3, fiber: 2.3, sodium: 0.7 }
  },
  {
    id: "taco-farinha-lactea-de-cereais",
    name: "Farinha, Láctea, de Cereais",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 414.9, protein: 11.9, carbs: 77.8, sugar: 0, fat: 5.8, saturatedFat: 3.3, fiber: 1.9, sodium: 125.1 }
  },
  {
    id: "taco-lasanha-massa-fresca-cozida",
    name: "Lasanha, Massa Fresca, Cozida",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 163.8, protein: 5.8, carbs: 32.5, sugar: 0, fat: 1.2, saturatedFat: 0.6, fiber: 1.6, sodium: 206.8 }
  },
  {
    id: "taco-lasanha-massa-fresca-crua",
    name: "Lasanha, Massa Fresca, Crua",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 220.3, protein: 7, carbs: 45.1, sugar: 0, fat: 1.3, saturatedFat: 0.5, fiber: 1.6, sodium: 666.7 }
  },
  {
    id: "taco-macarrao-instantaneo",
    name: "Macarrão, Instantâneo",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 435.9, protein: 8.8, carbs: 62.4, sugar: 0, fat: 17.2, saturatedFat: 0, fiber: 5.6, sodium: 1515.5 }
  },
  {
    id: "taco-macarrao-trigo-cru",
    name: "Macarrão, Trigo, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 371.1, protein: 10, carbs: 77.9, sugar: 0, fat: 1.3, saturatedFat: 0, fiber: 2.9, sodium: 7.2 }
  },
  {
    id: "taco-macarrao-trigo-cru-com-ovos",
    name: "Macarrão, Trigo, Cru, com Ovos",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 370.6, protein: 10.3, carbs: 76.6, sugar: 0, fat: 2, saturatedFat: 0.5, fiber: 2.3, sodium: 14.7 }
  },
  {
    id: "taco-milho-amido-cru",
    name: "Milho, Amido, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 361.4, protein: 0.6, carbs: 87.1, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0.7, sodium: 8.1 }
  },
  {
    id: "taco-milho-fuba-cru",
    name: "Milho, Fubá, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 353.5, protein: 7.2, carbs: 78.9, sugar: 0, fat: 1.9, saturatedFat: 0.4, fiber: 4.7, sodium: 0 }
  },
  {
    id: "taco-milho-verde-cru",
    name: "Milho, Verde, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 138.2, protein: 6.6, carbs: 28.6, sugar: 0, fat: 0.6, saturatedFat: 0.2, fiber: 3.9, sodium: 1.1 }
  },
  {
    id: "taco-milho-verde-enlatado-drenado",
    name: "Milho, Verde, Enlatado, Drenado",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 97.6, protein: 3.2, carbs: 17.1, sugar: 0, fat: 2.4, saturatedFat: 0.6, fiber: 4.6, sodium: 260.3 }
  },
  {
    id: "taco-mingau-tradicional-po",
    name: "Mingau Tradicional, Pó",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 373.4, protein: 0.6, carbs: 89.3, sugar: 0, fat: 0.4, saturatedFat: 0.1, fiber: 0.9, sodium: 14.9 }
  },
  {
    id: "taco-pamonha-barra-para-cozimento-pre-cozida",
    name: "Pamonha, Barra para Cozimento, Pré-Cozida",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 171.2, protein: 2.6, carbs: 30.7, sugar: 0, fat: 4.8, saturatedFat: 0.5, fiber: 2.4, sodium: 132 }
  },
  {
    id: "taco-pao-aveia-forma",
    name: "Pão, Aveia, Forma",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 343.1, protein: 12.3, carbs: 59.6, sugar: 0, fat: 5.7, saturatedFat: 1.1, fiber: 6, sodium: 605.8 }
  },
  {
    id: "taco-pao-de-soja",
    name: "Pão, de Soja",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 308.7, protein: 11.3, carbs: 56.5, sugar: 0, fat: 3.6, saturatedFat: 0.7, fiber: 5.7, sodium: 662.5 }
  },
  {
    id: "taco-pao-gluten-forma",
    name: "Pão, Glúten, Forma",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 253, protein: 12, carbs: 44.1, sugar: 0, fat: 2.7, saturatedFat: 0.5, fiber: 2.5, sodium: 22 }
  },
  {
    id: "taco-pao-milho-forma",
    name: "Pão, Milho, Forma",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 292, protein: 8.3, carbs: 56.4, sugar: 0, fat: 3.1, saturatedFat: 0.6, fiber: 4.3, sodium: 506.6 }
  },
  {
    id: "taco-pao-trigo-sovado",
    name: "Pão, Trigo, Sovado",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 311, protein: 8.4, carbs: 61.5, sugar: 0, fat: 2.8, saturatedFat: 0.8, fiber: 2.4, sodium: 430.8 }
  },
  {
    id: "taco-pastel-de-carne-cru",
    name: "Pastel, de Carne, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 288.7, protein: 10.7, carbs: 42, sugar: 0, fat: 8.8, saturatedFat: 3.7, fiber: 1, sodium: 1309.3 }
  },
  {
    id: "taco-pastel-de-carne-frito",
    name: "Pastel, de Carne, Frito",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 388.4, protein: 10.1, carbs: 43.8, sugar: 0, fat: 20.1, saturatedFat: 4.8, fiber: 1, sodium: 1039.9 }
  },
  {
    id: "taco-pastel-de-queijo-cru",
    name: "Pastel, de Queijo, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 308.5, protein: 9.9, carbs: 45.9, sugar: 0, fat: 9.6, saturatedFat: 0, fiber: 1.1, sodium: 984.6 }
  },
  {
    id: "taco-pastel-de-queijo-frito",
    name: "Pastel, de Queijo, Frito",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 422.1, protein: 8.7, carbs: 48.1, sugar: 0, fat: 22.7, saturatedFat: 0, fiber: 0.9, sodium: 821.4 }
  },
  {
    id: "taco-pastel-massa-crua",
    name: "Pastel, Massa, Crua",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 310.2, protein: 6.9, carbs: 57.4, sugar: 0, fat: 5.5, saturatedFat: 2.1, fiber: 1.4, sodium: 1344.2 }
  },
  {
    id: "taco-pastel-massa-frita",
    name: "Pastel, Massa, Frita",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 569.7, protein: 6, carbs: 49.3, sugar: 0, fat: 40.9, saturatedFat: 6.9, fiber: 1.3, sodium: 1174.7 }
  },
  {
    id: "taco-pipoca-com-oleo-de-soja-sem-sal",
    name: "Pipoca, com Óleo de Soja, sem Sal",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 448.3, protein: 9.9, carbs: 70.3, sugar: 0, fat: 15.9, saturatedFat: 2.4, fiber: 14.3, sodium: 4.3 }
  },
  {
    id: "taco-polenta-pre-cozida",
    name: "Polenta, Pré-Cozida",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 102.7, protein: 2.3, carbs: 23.3, sugar: 0, fat: 0.3, saturatedFat: 0, fiber: 2.4, sodium: 441.9 }
  },
  {
    id: "taco-torrada-pao-frances",
    name: "Torrada, Pão Francês",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 377.4, protein: 10.5, carbs: 74.6, sugar: 0, fat: 3.3, saturatedFat: 0.9, fiber: 3.4, sodium: 829.5 }
  },
  {
    id: "taco-abobora-cabotian-cozida",
    name: "Abóbora, Cabotian, Cozida",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 48, protein: 1.4, carbs: 10.8, sugar: 0, fat: 0.7, saturatedFat: 0.1, fiber: 2.5, sodium: 1.5 }
  },
  {
    id: "taco-abobora-cabotian-crua",
    name: "Abóbora, Cabotian, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 38.6, protein: 1.7, carbs: 8.4, sugar: 0, fat: 0.5, saturatedFat: 0.1, fiber: 2.2, sodium: 0 }
  },
  {
    id: "taco-abobora-menina-brasileira-crua",
    name: "Abóbora, Menina Brasileira, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 13.6, protein: 0.6, carbs: 3.3, sugar: 0, fat: 0, saturatedFat: 0, fiber: 1.2, sodium: 0 }
  },
  {
    id: "taco-abobora-moranga-crua",
    name: "Abóbora, Moranga, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 12.4, protein: 1, carbs: 2.7, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.7, sodium: 0 }
  },
  {
    id: "taco-abobora-moranga-refogada",
    name: "Abóbora, Moranga, Refogada",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 29, protein: 0.4, carbs: 6, sugar: 0, fat: 0.8, saturatedFat: 0.1, fiber: 1.5, sodium: 3 }
  },
  {
    id: "taco-abobora-pescoco-crua",
    name: "Abóbora, Pescoço, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 24.5, protein: 0.7, carbs: 6.1, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.3, sodium: 0.7 }
  },
  {
    id: "taco-abobrinha-italiana-crua",
    name: "Abobrinha, Italiana, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 19.3, protein: 1.1, carbs: 4.3, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.4, sodium: 0 }
  },
  {
    id: "taco-abobrinha-italiana-refogada",
    name: "Abobrinha, Italiana, Refogada",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 24.4, protein: 1.1, carbs: 4.2, sugar: 0, fat: 0.8, saturatedFat: 0.1, fiber: 1.4, sodium: 2.2 }
  },
  {
    id: "taco-abobrinha-paulista-crua",
    name: "Abobrinha, Paulista, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 30.8, protein: 0.6, carbs: 7.9, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.6, sodium: 0.5 }
  },
  {
    id: "taco-acelga-crua",
    name: "Acelga, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 20.9, protein: 1.4, carbs: 4.6, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.1, sodium: 1.2 }
  },
  {
    id: "taco-agriao-cru",
    name: "Agrião, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 16.6, protein: 2.7, carbs: 2.3, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 2.1, sodium: 7.5 }
  },
  {
    id: "taco-aipo-cru",
    name: "Aipo, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 19.1, protein: 0.8, carbs: 4.3, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1, sodium: 9.5 }
  },
  {
    id: "taco-alface-americana-crua",
    name: "Alface, Americana, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 8.8, protein: 0.6, carbs: 1.7, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1, sodium: 7.3 }
  },
  {
    id: "taco-alface-lisa-crua",
    name: "Alface, Lisa, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 13.8, protein: 1.7, carbs: 2.4, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.3, sodium: 4.2 }
  },
  {
    id: "taco-alface-roxa-crua",
    name: "Alface, Roxa, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 12.7, protein: 0.9, carbs: 2.5, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 2, sodium: 7.1 }
  },
  {
    id: "taco-alfavaca-crua",
    name: "Alfavaca, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 29.2, protein: 2.7, carbs: 5.2, sugar: 0, fat: 0.5, saturatedFat: 0.1, fiber: 4.1, sodium: 4.6 }
  },
  {
    id: "taco-alho-cru",
    name: "Alho, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 113.1, protein: 7, carbs: 23.9, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 4.3, sodium: 5.4 }
  },
  {
    id: "taco-alho-poro-cru",
    name: "Alho-Poró, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 31.5, protein: 1.4, carbs: 6.9, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.5, sodium: 1.8 }
  },
  {
    id: "taco-almeirao-cru",
    name: "Almeirão, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 18, protein: 1.8, carbs: 3.3, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 2.6, sodium: 2.4 }
  },
  {
    id: "taco-almeirao-refogado",
    name: "Almeirão, Refogado",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 65.1, protein: 1.7, carbs: 5.7, sugar: 0, fat: 4.8, saturatedFat: 0.8, fiber: 3.4, sodium: 14.5 }
  },
  {
    id: "taco-batata-baroa-cozida",
    name: "Batata, Baroa, Cozida",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 80.1, protein: 0.9, carbs: 18.9, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 1.8, sodium: 2.1 }
  },
  {
    id: "taco-batata-baroa-crua",
    name: "Batata, Baroa, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 101, protein: 1, carbs: 24, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 2.1, sodium: 0 }
  },
  {
    id: "taco-batata-doce-cozida",
    name: "Batata, Doce, Cozida",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 76.8, protein: 0.6, carbs: 18.4, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.2, sodium: 2.7 }
  },
  {
    id: "taco-batata-doce-crua",
    name: "Batata, Doce, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 118.2, protein: 1.3, carbs: 28.2, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.6, sodium: 8.8 }
  },
  {
    id: "taco-batata-frita-tipo-chips-industrializada",
    name: "Batata, Frita, tipo Chips, Industrializada",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 542.7, protein: 5.6, carbs: 51.2, sugar: 0, fat: 36.6, saturatedFat: 12.9, fiber: 2.5, sodium: 607.4 }
  },
  {
    id: "taco-batata-inglesa-crua",
    name: "Batata, Inglesa, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 64.4, protein: 1.8, carbs: 14.7, sugar: 0, fat: 0, saturatedFat: 0, fiber: 1.2, sodium: 0 }
  },
  {
    id: "taco-batata-inglesa-frita",
    name: "Batata, Inglesa, Frita",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 267.2, protein: 5, carbs: 35.6, sugar: 0, fat: 13.1, saturatedFat: 2.1, fiber: 8.1, sodium: 1.9 }
  },
  {
    id: "taco-batata-inglesa-saute",
    name: "Batata, Inglesa, Sauté",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 67.9, protein: 1.3, carbs: 14.1, sugar: 0, fat: 0.9, saturatedFat: 0.3, fiber: 1.4, sodium: 8.2 }
  },
  {
    id: "taco-berinjela-cozida",
    name: "Berinjela, Cozida",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 18.8, protein: 0.7, carbs: 4.5, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.5, sodium: 1.3 }
  },
  {
    id: "taco-berinjela-crua",
    name: "Berinjela, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 19.6, protein: 1.2, carbs: 4.4, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.9, sodium: 0 }
  },
  {
    id: "taco-beterraba-crua",
    name: "Beterraba, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 48.8, protein: 1.9, carbs: 11.1, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 3.4, sodium: 9.7 }
  },
  {
    id: "taco-biscoito-polvilho-doce",
    name: "Biscoito, Polvilho Doce",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 437.5, protein: 1.3, carbs: 80.5, sugar: 0, fat: 12.2, saturatedFat: 2.4, fiber: 1.2, sodium: 97.8 }
  },
  {
    id: "taco-brocolis-cru",
    name: "Brócolis, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 25.5, protein: 3.6, carbs: 4, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 2.9, sodium: 3.3 }
  },
  {
    id: "taco-cara-cozido",
    name: "Cará, Cozido",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 77.6, protein: 1.5, carbs: 18.9, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.6, sodium: 1 }
  },
  {
    id: "taco-cara-cru",
    name: "Cará, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 95.6, protein: 2.3, carbs: 23, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 7.3, sodium: 0 }
  },
  {
    id: "taco-caruru-cru",
    name: "Caruru, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 34, protein: 3.2, carbs: 6, sugar: 0, fat: 0.6, saturatedFat: 0.1, fiber: 4.5, sodium: 13.7 }
  },
  {
    id: "taco-catalonha-crua",
    name: "Catalonha, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 23.9, protein: 1.9, carbs: 4.8, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 2, sodium: 9.4 }
  },
  {
    id: "taco-catalonha-refogada",
    name: "Catalonha, Refogada",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 63.4, protein: 1.9, carbs: 4.8, sugar: 0, fat: 4.8, saturatedFat: 0.7, fiber: 3.6, sodium: 24.7 }
  },
  {
    id: "taco-cebola-crua",
    name: "Cebola, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 39.4, protein: 1.7, carbs: 8.9, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.2, sodium: 0.6 }
  },
  {
    id: "taco-cebolinha-crua",
    name: "Cebolinha, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 19.5, protein: 1.9, carbs: 3.4, sugar: 0, fat: 0.3, saturatedFat: 0, fiber: 3.5, sodium: 1.6 }
  },
  {
    id: "taco-cenoura-cozida",
    name: "Cenoura, Cozida",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 29.9, protein: 0.8, carbs: 6.7, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 2.6, sodium: 7.9 }
  },
  {
    id: "taco-chicoria-crua",
    name: "Chicória, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 13.8, protein: 1.1, carbs: 2.9, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.2, sodium: 13.5 }
  },
  {
    id: "taco-chuchu-cru",
    name: "Chuchu, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 17, protein: 0.7, carbs: 4.1, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.3, sodium: 0 }
  },
  {
    id: "taco-coentro-folhas-desidratadas",
    name: "Coentro, Folhas Desidratadas",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 309.1, protein: 20.9, carbs: 48, sugar: 0, fat: 10.4, saturatedFat: 0, fiber: 37.3, sodium: 18.3 }
  },
  {
    id: "taco-couve-manteiga-crua",
    name: "Couve, Manteiga, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 27.1, protein: 2.9, carbs: 4.3, sugar: 0, fat: 0.5, saturatedFat: 0.1, fiber: 3.1, sodium: 6.2 }
  },
  {
    id: "taco-couve-flor-crua",
    name: "Couve-Flor, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 22.6, protein: 1.9, carbs: 4.5, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 2.4, sodium: 3.4 }
  },
  {
    id: "taco-couve-flor-cozida",
    name: "Couve-Flor, Cozida",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 19.1, protein: 1.2, carbs: 3.9, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 2.1, sodium: 1.8 }
  },
  {
    id: "taco-espinafre-nova-zelandia-cru",
    name: "Espinafre, Nova Zelândia, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 16.1, protein: 2, carbs: 2.6, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 2.1, sodium: 17.1 }
  },
  {
    id: "taco-espinafre-nova-zelandia-refogado",
    name: "Espinafre, Nova Zelândia, Refogado",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 67.3, protein: 2.7, carbs: 4.2, sugar: 0, fat: 5.4, saturatedFat: 0.9, fiber: 2.5, sodium: 47 }
  },
  {
    id: "taco-farinha-de-mandioca-crua",
    name: "Farinha, de Mandioca, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 360.9, protein: 1.6, carbs: 87.9, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 6.4, sodium: 1 }
  },
  {
    id: "taco-farinha-de-mandioca-torrada",
    name: "Farinha, de Mandioca, Torrada",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 365.3, protein: 1.2, carbs: 89.2, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 6.5, sodium: 10.3 }
  },
  {
    id: "taco-farinha-de-puba",
    name: "Farinha, de Puba",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 360.2, protein: 1.6, carbs: 87.3, sugar: 0, fat: 0.5, saturatedFat: 0.2, fiber: 4.2, sodium: 3.6 }
  },
  {
    id: "taco-fecula-de-mandioca",
    name: "Fécula, de Mandioca",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 330.9, protein: 0.5, carbs: 81.1, sugar: 0, fat: 0.3, saturatedFat: 0, fiber: 0.6, sodium: 2.4 }
  },
  {
    id: "taco-feijao-broto-cru",
    name: "Feijão, Broto, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 38.7, protein: 4.2, carbs: 7.8, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2, sodium: 1.8 }
  },
  {
    id: "taco-inhame-cru",
    name: "Inhame, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 96.7, protein: 2.1, carbs: 23.2, sugar: 0, fat: 0.2, saturatedFat: 0.1, fiber: 1.7, sodium: 0 }
  },
  {
    id: "taco-jilo-cru",
    name: "Jiló, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 27.4, protein: 1.4, carbs: 6.2, sugar: 0, fat: 0.2, saturatedFat: 0.1, fiber: 4.8, sodium: 0 }
  },
  {
    id: "taco-jurubeba-crua",
    name: "Jurubeba, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 125.8, protein: 4.4, carbs: 23.1, sugar: 0, fat: 3.9, saturatedFat: 0.5, fiber: 23.9, sodium: 0.8 }
  },
  {
    id: "taco-mandioca-crua",
    name: "Mandioca, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 151.4, protein: 1.1, carbs: 36.2, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 1.9, sodium: 2.1 }
  },
  {
    id: "taco-mandioca-farofa-temperada",
    name: "Mandioca, Farofa, Temperada",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 405.7, protein: 2.1, carbs: 80.3, sugar: 0, fat: 9.1, saturatedFat: 1.9, fiber: 7.8, sodium: 574.5 }
  },
  {
    id: "taco-mandioca-frita",
    name: "Mandioca, Frita",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 300.1, protein: 1.4, carbs: 50.3, sugar: 0, fat: 11.2, saturatedFat: 1.7, fiber: 1.9, sodium: 8.9 }
  },
  {
    id: "taco-manjericao-cru",
    name: "Manjericão, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 21.1, protein: 2, carbs: 3.6, sugar: 0, fat: 0.4, saturatedFat: 0.1, fiber: 3.3, sodium: 3.9 }
  },
  {
    id: "taco-maxixe-cru",
    name: "Maxixe, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 13.7, protein: 1.4, carbs: 2.7, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.2, sodium: 11 }
  },
  {
    id: "taco-mostarda-folha-crua",
    name: "Mostarda, Folha, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 18.1, protein: 2.1, carbs: 3.2, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 1.9, sodium: 2.9 }
  },
  {
    id: "taco-nhoque-batata-cozido",
    name: "Nhoque, Batata, Cozido",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 180.8, protein: 5.9, carbs: 36.8, sugar: 0, fat: 1.9, saturatedFat: 0.6, fiber: 1.8, sodium: 7.1 }
  },
  {
    id: "taco-nabo-cru",
    name: "Nabo, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 18.2, protein: 1.2, carbs: 4.1, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.6, sodium: 2.5 }
  },
  {
    id: "taco-palmito-jucara-em-conserva",
    name: "Palmito, Juçara, em Conserva",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 23.2, protein: 1.8, carbs: 4.3, sugar: 0, fat: 0.4, saturatedFat: 0.1, fiber: 3.1, sodium: 513.8 }
  },
  {
    id: "taco-palmito-pupunha-em-conserva",
    name: "Palmito, Pupunha, em Conserva",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 29.4, protein: 2.5, carbs: 5.5, sugar: 0, fat: 0.5, saturatedFat: 0, fiber: 2.5, sodium: 562.7 }
  },
  {
    id: "taco-pao-de-queijo-cru",
    name: "Pão, de Queijo, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 294.5, protein: 3.6, carbs: 38.5, sugar: 0, fat: 14, saturatedFat: 3.4, fiber: 1, sodium: 405 }
  },
  {
    id: "taco-pimentao-amarelo-cru",
    name: "Pimentão, Amarelo, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 27.9, protein: 1.2, carbs: 6, sugar: 0, fat: 0.4, saturatedFat: 0, fiber: 1.9, sodium: 0 }
  },
  {
    id: "taco-pimentao-verde-cru",
    name: "Pimentão, Verde, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 21.3, protein: 1.1, carbs: 4.9, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.6, sodium: 0 }
  },
  {
    id: "taco-pimentao-vermelho-cru",
    name: "Pimentão, Vermelho, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 23.3, protein: 1, carbs: 5.5, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.6, sodium: 0 }
  },
  {
    id: "taco-polvilho-doce",
    name: "Polvilho, Doce",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 351.2, protein: 0.4, carbs: 86.8, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0.2, sodium: 1.6 }
  },
  {
    id: "taco-quiabo-cru",
    name: "Quiabo, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 29.9, protein: 1.9, carbs: 6.4, sugar: 0, fat: 0.3, saturatedFat: 0, fiber: 4.6, sodium: 0.9 }
  },
  {
    id: "taco-rabanete-cru",
    name: "Rabanete, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 13.7, protein: 1.4, carbs: 2.7, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.2, sodium: 11 }
  },
  {
    id: "taco-repolho-branco-cru",
    name: "Repolho, Branco, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 17.1, protein: 0.9, carbs: 3.9, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.9, sodium: 3.6 }
  },
  {
    id: "taco-repolho-roxo-cru",
    name: "Repolho, Roxo, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 30.9, protein: 1.9, carbs: 7.2, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2, sodium: 2.3 }
  },
  {
    id: "taco-repolho-roxo-refogado",
    name: "Repolho, Roxo, Refogado",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 41.8, protein: 1.8, carbs: 7.6, sugar: 0, fat: 1.2, saturatedFat: 0.2, fiber: 1.8, sodium: 3.4 }
  },
  {
    id: "taco-rucula-crua",
    name: "Rúcula, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 13.1, protein: 1.8, carbs: 2.2, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.7, sodium: 9.4 }
  },
  {
    id: "taco-salsa-crua",
    name: "Salsa, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 33.4, protein: 3.3, carbs: 5.7, sugar: 0, fat: 0.6, saturatedFat: 0.1, fiber: 1.9, sodium: 2.3 }
  },
  {
    id: "taco-seleta-de-legumes-enlatada",
    name: "Seleta de Legumes, Enlatada",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 56.5, protein: 3.4, carbs: 12.7, sugar: 0, fat: 0.4, saturatedFat: 0.1, fiber: 3.1, sodium: 398.1 }
  },
  {
    id: "taco-serralha-crua",
    name: "Serralha, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 30.4, protein: 2.7, carbs: 4.9, sugar: 0, fat: 0.7, saturatedFat: 0.1, fiber: 3.5, sodium: 19.3 }
  },
  {
    id: "taco-taioba-crua",
    name: "Taioba, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 34.2, protein: 2.9, carbs: 5.4, sugar: 0, fat: 0.9, saturatedFat: 0.2, fiber: 4.5, sodium: 1.2 }
  },
  {
    id: "taco-tomate-com-semente-cru",
    name: "Tomate, com Semente, Cru",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 15.3, protein: 1.1, carbs: 3.1, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 1.2, sodium: 1 }
  },
  {
    id: "taco-tomate-extrato",
    name: "Tomate, Extrato",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 60.9, protein: 2.4, carbs: 15, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 2.8, sodium: 497.9 }
  },
  {
    id: "taco-tomate-molho-industrializado",
    name: "Tomate, Molho Industrializado",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 38.4, protein: 1.4, carbs: 7.7, sugar: 0, fat: 0.9, saturatedFat: 0.1, fiber: 3.1, sodium: 418.3 }
  },
  {
    id: "taco-tomate-pure",
    name: "Tomate, Purê",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 27.9, protein: 1.4, carbs: 6.9, sugar: 0, fat: 0, saturatedFat: 0, fiber: 1, sodium: 103.9 }
  },
  {
    id: "taco-vagem-crua",
    name: "Vagem, Crua",
    category: "vegetable",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 24.9, protein: 1.8, carbs: 5.3, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 2.4, sodium: 0 }
  },
  {
    id: "taco-abacaxi-cru",
    name: "Abacaxi, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 48.3, protein: 0.9, carbs: 12.3, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1, sodium: 0 }
  },
  {
    id: "taco-abacaxi-polpa-congelada",
    name: "Abacaxi, Polpa, Congelada",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 30.6, protein: 0.5, carbs: 7.8, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 0.3, sodium: 1.2 }
  },
  {
    id: "taco-abiu-cru",
    name: "Abiu, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 62.4, protein: 0.8, carbs: 14.9, sugar: 0, fat: 0.7, saturatedFat: 0.3, fiber: 1.7, sodium: 0 }
  },
  {
    id: "taco-acai-polpa-com-xarope-de-guarana-e-glucose",
    name: "Açaí, Polpa, com Xarope de Guaraná e Glucose",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 110.3, protein: 0.7, carbs: 21.5, sugar: 0, fat: 3.7, saturatedFat: 0.7, fiber: 1.7, sodium: 15.1 }
  },
  {
    id: "taco-acai-polpa-congelada",
    name: "Açaí, Polpa, Congelada",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 58, protein: 0.8, carbs: 6.2, sugar: 0, fat: 3.9, saturatedFat: 0.7, fiber: 2.6, sodium: 5.2 }
  },
  {
    id: "taco-acerola-crua",
    name: "Acerola, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 33.5, protein: 0.9, carbs: 8, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 1.5, sodium: 0 }
  },
  {
    id: "taco-acerola-polpa-congelada",
    name: "Acerola, Polpa, Congelada",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 21.9, protein: 0.6, carbs: 5.5, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0.7, sodium: 1.3 }
  },
  {
    id: "taco-ameixa-calda-enlatada",
    name: "Ameixa, Calda, Enlatada",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 182.8, protein: 0.4, carbs: 46.9, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0.5, sodium: 2.7 }
  },
  {
    id: "taco-ameixa-crua",
    name: "Ameixa, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 52.5, protein: 0.8, carbs: 13.9, sugar: 0, fat: 0, saturatedFat: 0, fiber: 2.4, sodium: 0 }
  },
  {
    id: "taco-ameixa-em-calda-enlatada-drenada",
    name: "Ameixa, em Calda, Enlatada, Drenada",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 177.4, protein: 1, carbs: 47.7, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 4.5, sodium: 2.8 }
  },
  {
    id: "taco-atemoia-crua",
    name: "Atemóia, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 97, protein: 1, carbs: 25.3, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 2.1, sodium: 0.8 }
  },
  {
    id: "taco-banana-da-terra-crua",
    name: "Banana, da Terra, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 128, protein: 1.4, carbs: 33.7, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 1.5, sodium: 0 }
  },
  {
    id: "taco-banana-doce-em-barra",
    name: "Banana, Doce em Barra",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 280.1, protein: 2.2, carbs: 75.7, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 3.8, sodium: 9.9 }
  },
  {
    id: "taco-banana-figo-crua",
    name: "Banana, Figo, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 105.1, protein: 1.1, carbs: 27.8, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.8, sodium: 0 }
  },
  {
    id: "taco-banana-maca-crua",
    name: "Banana, Maçã, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 86.8, protein: 1.8, carbs: 22.3, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.6, sodium: 0 }
  },
  {
    id: "taco-banana-ouro-crua",
    name: "Banana, Ouro, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 112.4, protein: 1.5, carbs: 29.3, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 2, sodium: 0 }
  },
  {
    id: "taco-banana-pacova-crua",
    name: "Banana, Pacova, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 77.9, protein: 1.2, carbs: 20.3, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2, sodium: 0.9 }
  },
  {
    id: "taco-banana-prata-crua",
    name: "Banana, Prata, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 98.2, protein: 1.3, carbs: 26, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2, sodium: 0 }
  },
  {
    id: "taco-cacau-cru",
    name: "Cacau, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 74.3, protein: 1, carbs: 19.4, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.2, sodium: 0.7 }
  },
  {
    id: "taco-caja-manga-cru",
    name: "Cajá-Manga, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 45.6, protein: 1.3, carbs: 11.4, sugar: 0, fat: 0, saturatedFat: 0, fiber: 2.6, sodium: 1.4 }
  },
  {
    id: "taco-caja-polpa-congelada",
    name: "Cajá, Polpa, Congelada",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 26.3, protein: 0.6, carbs: 6.4, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 1.4, sodium: 6.9 }
  },
  {
    id: "taco-caju-cru",
    name: "Caju, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 43.1, protein: 1, carbs: 10.3, sugar: 0, fat: 0.3, saturatedFat: 0, fiber: 1.7, sodium: 3 }
  },
  {
    id: "taco-caju-polpa-congelada",
    name: "Caju, Polpa, Congelada",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 36.6, protein: 0.5, carbs: 9.4, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 0.8, sodium: 4.2 }
  },
  {
    id: "taco-caju-suco-concentrado-envasado",
    name: "Caju, Suco Concentrado, Envasado",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 45.1, protein: 0.4, carbs: 10.7, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 0.6, sodium: 45 }
  },
  {
    id: "taco-caqui-chocolate-cru",
    name: "Caqui, Chocolate, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 71.4, protein: 0.4, carbs: 19.3, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 6.5, sodium: 2.2 }
  },
  {
    id: "taco-carambola-crua",
    name: "Carambola, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 45.7, protein: 0.9, carbs: 11.5, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 2, sodium: 4.1 }
  },
  {
    id: "taco-ciriguela-crua",
    name: "Ciriguela, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 75.6, protein: 1.4, carbs: 18.9, sugar: 0, fat: 0.4, saturatedFat: 0.2, fiber: 3.9, sodium: 1.7 }
  },
  {
    id: "taco-cupuacu-cru",
    name: "Cupuaçu, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 49.4, protein: 1.2, carbs: 10.4, sugar: 0, fat: 1, saturatedFat: 0.4, fiber: 3.1, sodium: 3.2 }
  },
  {
    id: "taco-cupuacu-polpa-congelada",
    name: "Cupuaçu, Polpa, Congelada",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 48.8, protein: 0.8, carbs: 11.4, sugar: 0, fat: 0.6, saturatedFat: 0.3, fiber: 1.6, sodium: 0.7 }
  },
  {
    id: "taco-figo-cru",
    name: "Figo, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 41.4, protein: 1, carbs: 10.2, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 1.8, sodium: 0 }
  },
  {
    id: "taco-figo-enlatado-em-calda",
    name: "Figo, Enlatado, em Calda",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 184.4, protein: 0.6, carbs: 50.3, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2, sodium: 6.9 }
  },
  {
    id: "taco-fruta-pao-crua",
    name: "Fruta-Pão, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 67, protein: 1.1, carbs: 17.2, sugar: 0, fat: 0.2, saturatedFat: 0.1, fiber: 5.5, sodium: 0.8 }
  },
  {
    id: "taco-goiaba-branca-com-casca-crua",
    name: "Goiaba, Branca, com Casca, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 51.7, protein: 0.9, carbs: 12.4, sugar: 0, fat: 0.5, saturatedFat: 0.1, fiber: 6.3, sodium: 0 }
  },
  {
    id: "taco-goiaba-doce-em-pasta",
    name: "Goiaba, Doce em Pasta",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 269, protein: 0.6, carbs: 74.1, sugar: 0, fat: 0, saturatedFat: 0, fiber: 3.7, sodium: 3.7 }
  },
  {
    id: "taco-goiaba-doce-cascao",
    name: "Goiaba, Doce, Cascão",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 285.6, protein: 0.4, carbs: 78.7, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 4.4, sodium: 11 }
  },
  {
    id: "taco-goiaba-vermelha-com-casca-crua",
    name: "Goiaba, Vermelha, com Casca, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 54.2, protein: 1.1, carbs: 13, sugar: 0, fat: 0.4, saturatedFat: 0.1, fiber: 6.2, sodium: 0 }
  },
  {
    id: "taco-graviola-crua",
    name: "Graviola, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 61.6, protein: 0.8, carbs: 15.8, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 1.9, sodium: 4.2 }
  },
  {
    id: "taco-graviola-polpa-congelada",
    name: "Graviola, Polpa, Congelada",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 38.3, protein: 0.6, carbs: 9.8, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.2, sodium: 3 }
  },
  {
    id: "taco-jabuticaba-crua",
    name: "Jabuticaba, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 58.1, protein: 0.6, carbs: 15.3, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.3, sodium: 0 }
  },
  {
    id: "taco-jaca-crua",
    name: "Jaca, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 87.9, protein: 1.4, carbs: 22.5, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 2.4, sodium: 1.8 }
  },
  {
    id: "taco-jambo-cru",
    name: "Jambo, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 26.9, protein: 0.9, carbs: 6.5, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 5.1, sodium: 21.7 }
  },
  {
    id: "taco-jamelao-cru",
    name: "Jamelão, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 41, protein: 0.5, carbs: 10.6, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.8, sodium: 1.4 }
  },
  {
    id: "taco-laranja-baia-crua",
    name: "Laranja, Baía, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 45.4, protein: 1, carbs: 11.5, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.1, sodium: 0 }
  },
  {
    id: "taco-laranja-baia-suco",
    name: "Laranja, Baía, Suco",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 36.6, protein: 0.7, carbs: 8.7, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-laranja-da-terra-crua",
    name: "Laranja, da Terra, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 51.5, protein: 1.1, carbs: 12.9, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 4, sodium: 0.8 }
  },
  {
    id: "taco-laranja-da-terra-suco",
    name: "Laranja, da Terra, Suco",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 41, protein: 0.7, carbs: 9.6, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1, sodium: 0 }
  },
  {
    id: "taco-laranja-lima-crua",
    name: "Laranja, Lima, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 45.7, protein: 1.1, carbs: 11.5, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.8, sodium: 1.1 }
  },
  {
    id: "taco-laranja-lima-suco",
    name: "Laranja, Lima, Suco",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 39.3, protein: 0.7, carbs: 9.2, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 0.4, sodium: 0 }
  },
  {
    id: "taco-laranja-pera-suco",
    name: "Laranja, Pêra, Suco",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 32.7, protein: 0.7, carbs: 7.6, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-laranja-valencia-crua",
    name: "Laranja, Valência, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 46.1, protein: 0.8, carbs: 11.7, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 1.7, sodium: 0.6 }
  },
  {
    id: "taco-laranja-valencia-suco",
    name: "Laranja, Valência, Suco",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 36.2, protein: 0.5, carbs: 8.6, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 0.4, sodium: 0 }
  },
  {
    id: "taco-limao-cravo-suco",
    name: "Limão, Cravo, Suco",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 14.1, protein: 0.3, carbs: 5.2, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-limao-galego-suco",
    name: "Limão, Galego, Suco",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 22.2, protein: 0.6, carbs: 7.3, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-limao-tahiti-cru",
    name: "Limão, Tahiti, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 31.8, protein: 0.9, carbs: 11.1, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.2, sodium: 1.2 }
  },
  {
    id: "taco-maca-argentina-com-casca-crua",
    name: "Maçã, Argentina, com Casca, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 62.5, protein: 0.2, carbs: 16.6, sugar: 0, fat: 0.2, saturatedFat: 0.1, fiber: 2, sodium: 1.3 }
  },
  {
    id: "taco-macauba-crua",
    name: "Macaúba, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 404.3, protein: 2.1, carbs: 13.9, sugar: 0, fat: 40.7, saturatedFat: 7.1, fiber: 13.4, sodium: 0.7 }
  },
  {
    id: "taco-mamao-doce-em-calda-drenado",
    name: "Mamão, Doce em Calda, Drenado",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 195.6, protein: 0.2, carbs: 54, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.3, sodium: 2.9 }
  },
  {
    id: "taco-mamao-formosa-cru",
    name: "Mamão, Formosa, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 45.3, protein: 0.8, carbs: 11.6, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.8, sodium: 3.3 }
  },
  {
    id: "taco-mamao-verde-doce-em-calda-drenado",
    name: "Mamão Verde, Doce em Calda, Drenado",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 209.4, protein: 0.3, carbs: 57.6, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.2, sodium: 4.7 }
  },
  {
    id: "taco-manga-haden-crua",
    name: "Manga, Haden, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 63.5, protein: 0.4, carbs: 16.7, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 1.6, sodium: 0.6 }
  },
  {
    id: "taco-manga-polpa-congelada",
    name: "Manga, Polpa, Congelada",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 48.3, protein: 0.4, carbs: 12.5, sugar: 0, fat: 0.2, saturatedFat: 0.1, fiber: 1.1, sodium: 6.7 }
  },
  {
    id: "taco-manga-tommy-atkins-crua",
    name: "Manga, Tommy Atkins, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 50.7, protein: 0.9, carbs: 12.8, sugar: 0, fat: 0.2, saturatedFat: 0.1, fiber: 2.1, sodium: 0 }
  },
  {
    id: "taco-maracuja-cru",
    name: "Maracujá, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 68.4, protein: 2, carbs: 12.3, sugar: 0, fat: 2.1, saturatedFat: 0.2, fiber: 1.1, sodium: 1.6 }
  },
  {
    id: "taco-maracuja-polpa-congelada",
    name: "Maracujá, Polpa, Congelada",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 38.8, protein: 0.8, carbs: 9.6, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 0.5, sodium: 8.1 }
  },
  {
    id: "taco-maracuja-suco-concentrado-envasado",
    name: "Maracujá, Suco Concentrado, Envasado",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 42, protein: 0.8, carbs: 9.6, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 0.4, sodium: 21.7 }
  },
  {
    id: "taco-melao-cru",
    name: "Melão, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 29.4, protein: 0.7, carbs: 7.5, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0.2, sodium: 11.2 }
  },
  {
    id: "taco-mexerica-murcote-crua",
    name: "Mexerica, Murcote, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 57.6, protein: 0.9, carbs: 14.9, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 3.1, sodium: 1.2 }
  },
  {
    id: "taco-mexerica-rio-crua",
    name: "Mexerica, Rio, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 36.9, protein: 0.7, carbs: 9.3, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 2.7, sodium: 1.8 }
  },
  {
    id: "taco-nespera-crua",
    name: "Nêspera, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 42.5, protein: 0.3, carbs: 11.5, sugar: 0, fat: 0, saturatedFat: 0, fiber: 3, sodium: 0 }
  },
  {
    id: "taco-pequi-cru",
    name: "Pequi, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 205, protein: 2.3, carbs: 13, sugar: 0, fat: 18, saturatedFat: 0, fiber: 19, sodium: 0 }
  },
  {
    id: "taco-pera-park-crua",
    name: "Pêra, Park, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 60.6, protein: 0.2, carbs: 16.1, sugar: 0, fat: 0.2, saturatedFat: 0.1, fiber: 3, sodium: 1 }
  },
  {
    id: "taco-pera-williams-crua",
    name: "Pêra, Williams, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 53.3, protein: 0.6, carbs: 14, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 3, sodium: 0 }
  },
  {
    id: "taco-pessego-aurora-cru",
    name: "Pêssego, Aurora, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 36.3, protein: 0.8, carbs: 9.3, sugar: 0, fat: 0, saturatedFat: 0, fiber: 1.4, sodium: 0 }
  },
  {
    id: "taco-pessego-enlatado-em-calda",
    name: "Pêssego, Enlatado, em Calda",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 63.1, protein: 0.7, carbs: 16.9, sugar: 0, fat: 0, saturatedFat: 0, fiber: 1, sodium: 3.2 }
  },
  {
    id: "taco-pinha-crua",
    name: "Pinha, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 88.5, protein: 1.5, carbs: 22.4, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 3.4, sodium: 1.3 }
  },
  {
    id: "taco-pitanga-crua",
    name: "Pitanga, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 41.4, protein: 0.9, carbs: 10.2, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 3.2, sodium: 1.7 }
  },
  {
    id: "taco-pitanga-polpa-congelada",
    name: "Pitanga, Polpa, Congelada",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 19.1, protein: 0.3, carbs: 4.8, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 0.7, sodium: 5 }
  },
  {
    id: "taco-roma-crua",
    name: "Romã, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 55.7, protein: 0.4, carbs: 15.1, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0.4, sodium: 0.6 }
  },
  {
    id: "taco-tamarindo-cru",
    name: "Tamarindo, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 275.7, protein: 3.2, carbs: 72.5, sugar: 0, fat: 0.5, saturatedFat: 0.1, fiber: 6.4, sodium: 0.4 }
  },
  {
    id: "taco-tangerina-ponca-crua",
    name: "Tangerina, Poncã, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 37.8, protein: 0.8, carbs: 9.6, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 0.9, sodium: 0 }
  },
  {
    id: "taco-tangerina-ponca-suco",
    name: "Tangerina, Poncã, Suco",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 36.1, protein: 0.5, carbs: 8.8, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-tucuma-cru",
    name: "Tucumã, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 262, protein: 2.1, carbs: 26.5, sugar: 0, fat: 19.1, saturatedFat: 4.7, fiber: 12.7, sodium: 3.9 }
  },
  {
    id: "taco-umbu-cru",
    name: "Umbu, Cru",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 37, protein: 0.8, carbs: 9.4, sugar: 0, fat: 0, saturatedFat: 0, fiber: 2, sodium: 0 }
  },
  {
    id: "taco-umbu-polpa-congelada",
    name: "Umbu, Polpa, Congelada",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 33.9, protein: 0.5, carbs: 8.8, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 1.3, sodium: 5.8 }
  },
  {
    id: "taco-uva-rubi-crua",
    name: "Uva, Rubi, Crua",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 49.1, protein: 0.6, carbs: 12.7, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 0.9, sodium: 7.9 }
  },
  {
    id: "taco-uva-suco-concentrado-envasado",
    name: "Uva, Suco Concentrado, Envasado",
    category: "fruit",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 57.7, protein: 0, carbs: 14.7, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0.2, sodium: 9.6 }
  },
  {
    id: "taco-azeite-de-dende",
    name: "Azeite, de Dendê",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 884, protein: 0, carbs: 0, sugar: 0, fat: 100, saturatedFat: 43.1, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-manteiga-sem-sal",
    name: "Manteiga, sem Sal",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 757.5, protein: 0.4, carbs: 0, sugar: 0, fat: 86, saturatedFat: 51.5, fiber: 0, sodium: 3.8 }
  },
  {
    id: "taco-margarina-com-oleo-hidrogenado-com-sal-65-de-lipideos",
    name: "Margarina, com Óleo Hidrogenado, com Sal (65% de Lipídeos)",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 596.1, protein: 0, carbs: 0, sugar: 0, fat: 67.4, saturatedFat: 14.9, fiber: 0, sodium: 894 }
  },
  {
    id: "taco-margarina-com-oleo-hidrogenado-sem-sal-80-de-lipideos",
    name: "Margarina, com Óleo Hidrogenado, sem Sal (80% de Lipídeos)",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 722.5, protein: 0, carbs: 0, sugar: 0, fat: 81.7, saturatedFat: 0, fiber: 0, sodium: 77.9 }
  },
  {
    id: "taco-margarina-com-oleo-interesterificado-com-sal-65-de-lipideos",
    name: "Margarina, com Óleo Interesterificado, com Sal (65%de Lipídeos)",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 594.5, protein: 0, carbs: 0, sugar: 0, fat: 67.2, saturatedFat: 21.9, fiber: 0, sodium: 560.8 }
  },
  {
    id: "taco-margarina-com-oleo-interesterificado-sem-sal-65-de-lipideos",
    name: "Margarina, com Óleo Interesterificado, sem Sal (65% de Lipídeos)",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 593.1, protein: 0, carbs: 0, sugar: 0, fat: 67.1, saturatedFat: 20.9, fiber: 0, sodium: 33.2 }
  },
  {
    id: "taco-oleo-de-babacu",
    name: "Óleo, de Babaçu",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 884, protein: 0, carbs: 0, sugar: 0, fat: 100, saturatedFat: 50.9, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-oleo-de-canola",
    name: "Óleo, de Canola",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 884, protein: 0, carbs: 0, sugar: 0, fat: 100, saturatedFat: 7.9, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-oleo-de-girassol",
    name: "Óleo, de Girassol",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 884, protein: 0, carbs: 0, sugar: 0, fat: 100, saturatedFat: 10.8, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-oleo-de-milho",
    name: "Óleo, de Milho",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 884, protein: 0, carbs: 0, sugar: 0, fat: 100, saturatedFat: 15.2, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-oleo-de-pequi",
    name: "Óleo, de Pequi",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 884, protein: 0, carbs: 0, sugar: 0, fat: 100, saturatedFat: 39.9, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-abadejo-file-congelado-assado",
    name: "Abadejo, Filé, Congelado, Assado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 111.6, protein: 23.5, carbs: 0, sugar: 0, fat: 1.2, saturatedFat: 0.6, fiber: 0, sodium: 334.4 }
  },
  {
    id: "taco-abadejo-file-congelado-cozido",
    name: "Abadejo, Filé, Congelado,cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 91.1, protein: 19.3, carbs: 0, sugar: 0, fat: 0.9, saturatedFat: 0.4, fiber: 0, sodium: 189.3 }
  },
  {
    id: "taco-abadejo-file-congelado-cru",
    name: "Abadejo, Filé, Congelado, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 59.1, protein: 13.1, carbs: 0, sugar: 0, fat: 0.4, saturatedFat: 0.1, fiber: 0, sodium: 78.5 }
  },
  {
    id: "taco-abadejo-file-congelado-grelhado",
    name: "Abadejo, Filé, Congelado, Grelhado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 129.6, protein: 27.6, carbs: 0, sugar: 0, fat: 1.3, saturatedFat: 0.6, fiber: 0, sodium: 305.1 }
  },
  {
    id: "taco-atum-conserva-em-oleo",
    name: "Atum, Conserva em Óleo",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 165.9, protein: 26.2, carbs: 0, sugar: 0, fat: 6, saturatedFat: 1, fiber: 0, sodium: 362.1 }
  },
  {
    id: "taco-atum-fresco-cru",
    name: "Atum, Fresco, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 117.5, protein: 25.7, carbs: 0, sugar: 0, fat: 0.9, saturatedFat: 0.5, fiber: 0, sodium: 30.3 }
  },
  {
    id: "taco-bacalhau-salgado-cru",
    name: "Bacalhau, Salgado, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 135.9, protein: 29, carbs: 0, sugar: 0, fat: 1.3, saturatedFat: 0.6, fiber: 0, sodium: 13585.1 }
  },
  {
    id: "taco-bacalhau-salgado-refogado",
    name: "Bacalhau, Salgado, Refogado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 139.7, protein: 24, carbs: 1.2, sugar: 0, fat: 3.6, saturatedFat: 0.9, fiber: 0, sodium: 1256.3 }
  },
  {
    id: "taco-cacao-posta-com-farinha-de-trigo-frita",
    name: "Cação, Posta, com Farinha de Trigo, Frita",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 208.3, protein: 25, carbs: 3.1, sugar: 0, fat: 10, saturatedFat: 1.5, fiber: 0.5, sodium: 160 }
  },
  {
    id: "taco-cacao-posta-cozida",
    name: "Cação, Posta, Cozida",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 116, protein: 25.6, carbs: 0, sugar: 0, fat: 0.7, saturatedFat: 0.2, fiber: 0, sodium: 114.9 }
  },
  {
    id: "taco-cacao-posta-crua",
    name: "Cação, Posta, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 83.3, protein: 17.9, carbs: 0, sugar: 0, fat: 0.8, saturatedFat: 0.1, fiber: 0, sodium: 176 }
  },
  {
    id: "taco-camarao-rio-grande-grande-cru",
    name: "Camarão, Rio Grande, Grande, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 47.2, protein: 10, carbs: 0, sugar: 0, fat: 0.5, saturatedFat: 0.1, fiber: 0, sodium: 201.1 }
  },
  {
    id: "taco-camarao-sete-barbas-sem-cabeca-com-casca-frito",
    name: "Camarão, Sete Barbas, sem Cabeça, com Casca, Frito",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 231.2, protein: 18.4, carbs: 2.9, sugar: 0, fat: 15.6, saturatedFat: 2.5, fiber: 0, sodium: 99.1 }
  },
  {
    id: "taco-caranguejo-cozido",
    name: "Caranguejo, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 82.7, protein: 18.5, carbs: 0, sugar: 0, fat: 0.4, saturatedFat: 0.2, fiber: 0, sodium: 360.1 }
  },
  {
    id: "taco-corimba-cru",
    name: "Corimba, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 128.2, protein: 17.4, carbs: 0, sugar: 0, fat: 6, saturatedFat: 2.5, fiber: 0, sodium: 47 }
  },
  {
    id: "taco-corimbata-assado",
    name: "Corimbatá, Assado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 261.5, protein: 19.9, carbs: 0, sugar: 0, fat: 19.6, saturatedFat: 4.8, fiber: 0, sodium: 40.4 }
  },
  {
    id: "taco-corimbata-cozido",
    name: "Corimbatá, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 238.7, protein: 20.1, carbs: 0, sugar: 0, fat: 16.9, saturatedFat: 4.5, fiber: 0, sodium: 37.2 }
  },
  {
    id: "taco-corvina-de-agua-doce-crua",
    name: "Corvina de Água Doce, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 101, protein: 18.9, carbs: 0, sugar: 0, fat: 2.2, saturatedFat: 1.2, fiber: 0, sodium: 45.1 }
  },
  {
    id: "taco-corvina-do-mar-crua",
    name: "Corvina do Mar, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 94, protein: 18.6, carbs: 0, sugar: 0, fat: 1.6, saturatedFat: 0.7, fiber: 0, sodium: 68 }
  },
  {
    id: "taco-corvina-grande-assada",
    name: "Corvina Grande, Assada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 146.5, protein: 26.8, carbs: 0, sugar: 0, fat: 3.6, saturatedFat: 1.5, fiber: 0, sodium: 85.4 }
  },
  {
    id: "taco-corvina-grande-cozida",
    name: "Corvina Grande, Cozida",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 100.1, protein: 23.4, carbs: 0, sugar: 0, fat: 2.6, saturatedFat: 0.7, fiber: 0, sodium: 68.4 }
  },
  {
    id: "taco-dourada-de-agua-doce-fresca",
    name: "Dourada de Água Doce, Fresca",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 131.2, protein: 18.8, carbs: 0, sugar: 0, fat: 5.6, saturatedFat: 3, fiber: 0, sodium: 40.3 }
  },
  {
    id: "taco-lambari-congelado-cru",
    name: "Lambari, Congelado, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 130.8, protein: 16.8, carbs: 0, sugar: 0, fat: 6.5, saturatedFat: 2, fiber: 0, sodium: 47.9 }
  },
  {
    id: "taco-lambari-congelado-frito",
    name: "Lambari, Congelado, Frito",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 326.9, protein: 28.4, carbs: 0, sugar: 0, fat: 22.8, saturatedFat: 5.5, fiber: 0, sodium: 64.6 }
  },
  {
    id: "taco-lambari-fresco-cru",
    name: "Lambari, Fresco, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 151.6, protein: 15.7, carbs: 0, sugar: 0, fat: 9.4, saturatedFat: 3.4, fiber: 0, sodium: 41.1 }
  },
  {
    id: "taco-manjuba-com-farinha-de-trigo-frita",
    name: "Manjuba, com Farinha de Trigo, Frita",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 343.6, protein: 23.4, carbs: 10.2, sugar: 0, fat: 22.6, saturatedFat: 5.5, fiber: 0.4, sodium: 36.5 }
  },
  {
    id: "taco-manjuba-frita",
    name: "Manjuba, Frita",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 349.3, protein: 30.1, carbs: 0, sugar: 0, fat: 24.5, saturatedFat: 5.3, fiber: 0, sodium: 40.6 }
  },
  {
    id: "taco-merluza-file-assado",
    name: "Merluza, Filé, Assado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 121.9, protein: 26.6, carbs: 0, sugar: 0, fat: 0.9, saturatedFat: 0.2, fiber: 0, sodium: 119.9 }
  },
  {
    id: "taco-merluza-file-cru",
    name: "Merluza, Filé, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 89.1, protein: 16.6, carbs: 0, sugar: 0, fat: 2, saturatedFat: 0.9, fiber: 0, sodium: 79.5 }
  },
  {
    id: "taco-merluza-file-frito",
    name: "Merluza, Filé, Frito",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 191.6, protein: 26.9, carbs: 0, sugar: 0, fat: 8.5, saturatedFat: 1.4, fiber: 0, sodium: 90 }
  },
  {
    id: "taco-pescada-branca-crua",
    name: "Pescada, Branca, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 110.9, protein: 16.3, carbs: 0, sugar: 0, fat: 4.6, saturatedFat: 0.8, fiber: 0, sodium: 76.2 }
  },
  {
    id: "taco-pescada-branca-frita",
    name: "Pescada, Branca, Frita",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 223, protein: 27.4, carbs: 0, sugar: 0, fat: 11.8, saturatedFat: 2.3, fiber: 0, sodium: 107.2 }
  },
  {
    id: "taco-pescada-file-com-farinha-de-trigo-frito",
    name: "Pescada, Filé, com Farinha de Trigo, Frito",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 283.4, protein: 21.4, carbs: 5, sugar: 0, fat: 19.1, saturatedFat: 2.2, fiber: 0, sodium: 90.5 }
  },
  {
    id: "taco-pescada-file-cru",
    name: "Pescada, Filé, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 107.2, protein: 16.6, carbs: 0, sugar: 0, fat: 4, saturatedFat: 0.9, fiber: 0, sodium: 77.5 }
  },
  {
    id: "taco-pescada-file-frito",
    name: "Pescada, Filé, Frito",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 154.3, protein: 28.6, carbs: 0, sugar: 0, fat: 3.6, saturatedFat: 1, fiber: 0, sodium: 114.9 }
  },
  {
    id: "taco-pescada-file-molho-escabeche",
    name: "Pescada, Filé, Molho Escabeche",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 142, protein: 11.8, carbs: 5, sugar: 0, fat: 8, saturatedFat: 1.3, fiber: 0.8, sodium: 51.3 }
  },
  {
    id: "taco-pescadinha-crua",
    name: "Pescadinha, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 76.4, protein: 15.5, carbs: 0, sugar: 0, fat: 1.1, saturatedFat: 0.3, fiber: 0, sodium: 120.3 }
  },
  {
    id: "taco-pintado-assado",
    name: "Pintado, Assado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 191.6, protein: 36.5, carbs: 0, sugar: 0, fat: 4, saturatedFat: 1.8, fiber: 0, sodium: 81 }
  },
  {
    id: "taco-pintado-cru",
    name: "Pintado, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 91.1, protein: 18.6, carbs: 0, sugar: 0, fat: 1.3, saturatedFat: 0.6, fiber: 0, sodium: 43.3 }
  },
  {
    id: "taco-pintado-grelhado",
    name: "Pintado, Grelhado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 152.2, protein: 30.8, carbs: 0, sugar: 0, fat: 2.3, saturatedFat: 1.1, fiber: 0, sodium: 53.1 }
  },
  {
    id: "taco-porquinho-cru",
    name: "Porquinho, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 93, protein: 20.5, carbs: 0, sugar: 0, fat: 0.6, saturatedFat: 0.4, fiber: 0, sodium: 66.7 }
  },
  {
    id: "taco-salmao-file-com-pele-fresco-grelhado",
    name: "Salmão, Filé, com Pele, Fresco, Grelhado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 228.7, protein: 23.9, carbs: 0, sugar: 0, fat: 14, saturatedFat: 3.1, fiber: 0, sodium: 85.1 }
  },
  {
    id: "taco-salmao-sem-pele-fresco-cru",
    name: "Salmão, sem Pele, Fresco, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 169.8, protein: 19.3, carbs: 0, sugar: 0, fat: 9.7, saturatedFat: 2.5, fiber: 0, sodium: 64.2 }
  },
  {
    id: "taco-salmao-sem-pele-fresco-grelhado",
    name: "Salmão, sem Pele, Fresco, Grelhado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 242.7, protein: 26.1, carbs: 0, sugar: 0, fat: 14.5, saturatedFat: 3.6, fiber: 0, sodium: 95.8 }
  },
  {
    id: "taco-sardinha-assada",
    name: "Sardinha, Assada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 164.4, protein: 32.2, carbs: 0, sugar: 0, fat: 3, saturatedFat: 1.7, fiber: 0, sodium: 74.5 }
  },
  {
    id: "taco-sardinha-conserva-em-oleo",
    name: "Sardinha, Conserva em Óleo",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 285, protein: 15.9, carbs: 0, sugar: 0, fat: 24, saturatedFat: 4.1, fiber: 0, sodium: 665.8 }
  },
  {
    id: "taco-sardinha-frita",
    name: "Sardinha, Frita",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 257, protein: 33.4, carbs: 0, sugar: 0, fat: 12.7, saturatedFat: 2.6, fiber: 0, sodium: 60.1 }
  },
  {
    id: "taco-sardinha-inteira-crua",
    name: "Sardinha, Inteira, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 113.9, protein: 21.1, carbs: 0, sugar: 0, fat: 2.6, saturatedFat: 1.7, fiber: 0, sodium: 60.4 }
  },
  {
    id: "taco-tucunare-file-congelado-cru",
    name: "Tucunaré, Filé, Congelado, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 87.7, protein: 18, carbs: 0, sugar: 0, fat: 1.2, saturatedFat: 0.6, fiber: 0, sodium: 56.6 }
  },
  {
    id: "taco-apresuntado",
    name: "Apresuntado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 128.9, protein: 13.4, carbs: 2.9, sugar: 0, fat: 6.7, saturatedFat: 1.9, fiber: 0, sodium: 942.9 }
  },
  {
    id: "taco-caldo-de-carne-tablete",
    name: "Caldo de Carne, Tablete",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 240.6, protein: 7.8, carbs: 15.1, sugar: 0, fat: 16.6, saturatedFat: 7.8, fiber: 0.6, sodium: 22179.7 }
  },
  {
    id: "taco-caldo-de-galinha-tablete",
    name: "Caldo de Galinha, Tablete",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 251.4, protein: 6.3, carbs: 10.6, sugar: 0, fat: 20.4, saturatedFat: 9.4, fiber: 11.8, sodium: 22299.9 }
  },
  {
    id: "taco-carne-bovina-acem-moido-cozido",
    name: "Carne, Bovina, Acém, Moído, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 212.4, protein: 26.7, carbs: 0, sugar: 0, fat: 10.9, saturatedFat: 4.8, fiber: 0, sodium: 52.4 }
  },
  {
    id: "taco-carne-bovina-acem-moido-cru",
    name: "Carne, Bovina, Acém, Moído, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 136.6, protein: 19.4, carbs: 0, sugar: 0, fat: 5.9, saturatedFat: 2.7, fiber: 0, sodium: 48.6 }
  },
  {
    id: "taco-carne-bovina-acem-sem-gordura-cozido",
    name: "Carne, Bovina, Acém, sem Gordura, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 214.6, protein: 27.3, carbs: 0, sugar: 0, fat: 10.9, saturatedFat: 5.5, fiber: 0, sodium: 56.2 }
  },
  {
    id: "taco-carne-bovina-acem-sem-gordura-cru",
    name: "Carne, Bovina, Acém, sem Gordura, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 144, protein: 20.8, carbs: 0, sugar: 0, fat: 6.1, saturatedFat: 2.8, fiber: 0, sodium: 49.8 }
  },
  {
    id: "taco-carne-bovina-almondegas-cruas",
    name: "Carne, Bovina, Almôndegas, Cruas",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 189.3, protein: 12.3, carbs: 9.8, sugar: 0, fat: 11.2, saturatedFat: 3.9, fiber: 0, sodium: 621.3 }
  },
  {
    id: "taco-carne-bovina-almondegas-fritas",
    name: "Carne, Bovina, Almôndegas, Fritas",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 271.8, protein: 18.2, carbs: 14.3, sugar: 0, fat: 15.8, saturatedFat: 4.2, fiber: 0, sodium: 1030.3 }
  },
  {
    id: "taco-carne-bovina-bucho-cozido",
    name: "Carne, Bovina, Bucho, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 133, protein: 21.6, carbs: 0, sugar: 0, fat: 4.5, saturatedFat: 2.4, fiber: 0, sodium: 38.2 }
  },
  {
    id: "taco-carne-bovina-bucho-cru",
    name: "Carne, Bovina, Bucho, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 137.3, protein: 20.5, carbs: 0, sugar: 0, fat: 5.5, saturatedFat: 3.3, fiber: 0, sodium: 45 }
  },
  {
    id: "taco-carne-bovina-capa-de-contra-file-com-gordura-crua",
    name: "Carne, Bovina, Capa de Contra-Filé, com Gordura, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 216.9, protein: 19.2, carbs: 0, sugar: 0, fat: 15, saturatedFat: 6.9, fiber: 0, sodium: 57.5 }
  },
  {
    id: "taco-carne-bovina-capa-de-contra-file-com-gordura-grelhada",
    name: "Carne, Bovina, Capa de Contra-Filé, com Gordura, Grelhada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 311.7, protein: 30.7, carbs: 0, sugar: 0, fat: 20, saturatedFat: 8.8, fiber: 0, sodium: 80.5 }
  },
  {
    id: "taco-carne-bovina-capa-de-contra-file-sem-gordura-crua",
    name: "Carne, Bovina, Capa de Contra-Filé, sem Gordura, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 131.1, protein: 21.5, carbs: 0, sugar: 0, fat: 4.3, saturatedFat: 1.9, fiber: 0, sodium: 79.2 }
  },
  {
    id: "taco-carne-bovina-capa-de-contra-file-sem-gordura-grelhada",
    name: "Carne, Bovina, Capa de Contra-Filé, sem Gordura, Grelhada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 239.4, protein: 35.1, carbs: 0, sugar: 0, fat: 9.9, saturatedFat: 4.3, fiber: 0, sodium: 82.8 }
  },
  {
    id: "taco-carne-bovina-charque-cozido",
    name: "Carne, Bovina, Charque, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 262.8, protein: 36.4, carbs: 0, sugar: 0, fat: 11.9, saturatedFat: 4.8, fiber: 0, sodium: 1442.7 }
  },
  {
    id: "taco-carne-bovina-charque-cru",
    name: "Carne, Bovina, Charque, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 248.9, protein: 22.7, carbs: 0, sugar: 0, fat: 16.8, saturatedFat: 8.7, fiber: 0, sodium: 5875 }
  },
  {
    id: "taco-carne-bovina-contra-file-a-milanesa",
    name: "Carne, Bovina, Contra-Filé, À Milanesa",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 351.6, protein: 20.6, carbs: 12.2, sugar: 0, fat: 24, saturatedFat: 7.2, fiber: 0.4, sodium: 77.1 }
  },
  {
    id: "taco-carne-bovina-contra-file-de-costela-cru",
    name: "Carne, Bovina, Contra-Filé de Costela, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 202.4, protein: 19.8, carbs: 0, sugar: 0, fat: 13.1, saturatedFat: 6.7, fiber: 0, sodium: 38.5 }
  },
  {
    id: "taco-carne-bovina-contra-file-de-costela-grelhado",
    name: "Carne, Bovina, Contra-Filé de Costela, Grelhado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 274.9, protein: 29.9, carbs: 0, sugar: 0, fat: 16.3, saturatedFat: 8.8, fiber: 0, sodium: 50.9 }
  },
  {
    id: "taco-carne-bovina-contra-file-com-gordura-cru",
    name: "Carne, Bovina, Contra-Filé, com Gordura, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 205.9, protein: 21.1, carbs: 0, sugar: 0, fat: 12.8, saturatedFat: 5.6, fiber: 0, sodium: 44.1 }
  },
  {
    id: "taco-carne-bovina-contra-file-com-gordura-grelhado",
    name: "Carne, Bovina, Contra-Filé, com Gordura, Grelhado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 278.1, protein: 32.4, carbs: 0, sugar: 0, fat: 15.5, saturatedFat: 7.4, fiber: 0, sodium: 57.1 }
  },
  {
    id: "taco-carne-bovina-contra-file-sem-gordura-cru",
    name: "Carne, Bovina, Contra-Filé, sem Gordura, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 156.6, protein: 24, carbs: 0, sugar: 0, fat: 6, saturatedFat: 2.7, fiber: 0, sodium: 52.9 }
  },
  {
    id: "taco-carne-bovina-contra-file-sem-gordura-grelhado",
    name: "Carne, Bovina, Contra-Filé, sem Gordura, Grelhado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 193.7, protein: 35.9, carbs: 0, sugar: 0, fat: 4.5, saturatedFat: 2, fiber: 0, sodium: 57.5 }
  },
  {
    id: "taco-carne-bovina-costela-assada",
    name: "Carne, Bovina, Costela, Assada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 373, protein: 28.8, carbs: 0, sugar: 0, fat: 27.7, saturatedFat: 11.8, fiber: 0, sodium: 91.9 }
  },
  {
    id: "taco-carne-bovina-costela-crua",
    name: "Carne, Bovina, Costela, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 357.7, protein: 16.7, carbs: 0, sugar: 0, fat: 31.8, saturatedFat: 14.9, fiber: 0, sodium: 70 }
  },
  {
    id: "taco-carne-bovina-coxao-duro-sem-gordura-cozido",
    name: "Carne, Bovina, Coxão Duro, sem Gordura, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 216.6, protein: 31.9, carbs: 0, sugar: 0, fat: 8.9, saturatedFat: 3.5, fiber: 0, sodium: 41.1 }
  },
  {
    id: "taco-carne-bovina-coxao-duro-sem-gordura-cru",
    name: "Carne, Bovina, Coxão Duro, sem Gordura, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 148, protein: 21.5, carbs: 0, sugar: 0, fat: 6.2, saturatedFat: 2.9, fiber: 0, sodium: 48.5 }
  },
  {
    id: "taco-carne-bovina-coxao-mole-sem-gordura-cozido",
    name: "Carne, Bovina, Coxão Mole, sem Gordura, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 218.7, protein: 32.4, carbs: 0, sugar: 0, fat: 8.9, saturatedFat: 4.3, fiber: 0, sodium: 43.5 }
  },
  {
    id: "taco-carne-bovina-coxao-mole-sem-gordura-cru",
    name: "Carne, Bovina, Coxão Mole, sem Gordura, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 169.1, protein: 21.2, carbs: 0, sugar: 0, fat: 8.7, saturatedFat: 3.9, fiber: 0, sodium: 60.5 }
  },
  {
    id: "taco-carne-bovina-cupim-assado",
    name: "Carne, Bovina, Cupim, Assado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 330.1, protein: 28.6, carbs: 0, sugar: 0, fat: 23, saturatedFat: 5.5, fiber: 0, sodium: 71.6 }
  },
  {
    id: "taco-carne-bovina-cupim-cru",
    name: "Carne, Bovina, Cupim, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 221.4, protein: 19.5, carbs: 0, sugar: 0, fat: 15.3, saturatedFat: 6.8, fiber: 0, sodium: 46.9 }
  },
  {
    id: "taco-carne-bovina-figado-cru",
    name: "Carne, Bovina, Fígado, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 141, protein: 20.7, carbs: 1.1, sugar: 0, fat: 5.4, saturatedFat: 2.8, fiber: 0, sodium: 75.9 }
  },
  {
    id: "taco-carne-bovina-figado-grelhado",
    name: "Carne, Bovina, Fígado, Grelhado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 225, protein: 29.9, carbs: 4.2, sugar: 0, fat: 9, saturatedFat: 4.7, fiber: 0, sodium: 82.2 }
  },
  {
    id: "taco-carne-bovina-file-mingnon-sem-gordura-cru",
    name: "Carne, Bovina, Filé Mingnon, sem Gordura, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 142.9, protein: 21.6, carbs: 0, sugar: 0, fat: 5.6, saturatedFat: 2.9, fiber: 0, sodium: 48.9 }
  },
  {
    id: "taco-carne-bovina-file-mingnon-sem-gordura-grelhado",
    name: "Carne, Bovina, Filé Mingnon, sem Gordura, Grelhado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 219.7, protein: 32.8, carbs: 0, sugar: 0, fat: 8.8, saturatedFat: 4.5, fiber: 0, sodium: 57.9 }
  },
  {
    id: "taco-carne-bovina-flanco-sem-gordura-cozido",
    name: "Carne, Bovina, Flanco, sem Gordura, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 195.6, protein: 29.4, carbs: 0, sugar: 0, fat: 7.8, saturatedFat: 3.9, fiber: 0, sodium: 41.7 }
  },
  {
    id: "taco-carne-bovina-flanco-sem-gordura-cru",
    name: "Carne, Bovina, Flanco, sem Gordura, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 141.5, protein: 20, carbs: 0, sugar: 0, fat: 6.2, saturatedFat: 3.1, fiber: 0, sodium: 54.2 }
  },
  {
    id: "taco-carne-bovina-fraldinha-com-gordura-cozida",
    name: "Carne, Bovina, Fraldinha, com Gordura, Cozida",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 338.4, protein: 24.2, carbs: 0, sugar: 0, fat: 26, saturatedFat: 12.1, fiber: 0, sodium: 38.8 }
  },
  {
    id: "taco-carne-bovina-fraldinha-com-gordura-crua",
    name: "Carne, Bovina, Fraldinha, com Gordura, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 220.7, protein: 17.6, carbs: 0, sugar: 0, fat: 16.1, saturatedFat: 7.3, fiber: 0, sodium: 51.2 }
  },
  {
    id: "taco-carne-bovina-lagarto-cozido",
    name: "Carne, Bovina, Lagarto, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 222.5, protein: 32.9, carbs: 0, sugar: 0, fat: 9.1, saturatedFat: 3.9, fiber: 0, sodium: 47.5 }
  },
  {
    id: "taco-carne-bovina-lagarto-cru",
    name: "Carne, Bovina, Lagarto, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 134.9, protein: 20.5, carbs: 0, sugar: 0, fat: 5.2, saturatedFat: 2.3, fiber: 0, sodium: 53.6 }
  },
  {
    id: "taco-carne-bovina-lingua-cozida",
    name: "Carne, Bovina, Língua, Cozida",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 314.9, protein: 21.4, carbs: 0, sugar: 0, fat: 24.8, saturatedFat: 11.2, fiber: 0, sodium: 59.1 }
  },
  {
    id: "taco-carne-bovina-lingua-crua",
    name: "Carne, Bovina, Língua, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 215.2, protein: 17.1, carbs: 0, sugar: 0, fat: 15.8, saturatedFat: 6.8, fiber: 0, sodium: 73 }
  },
  {
    id: "taco-carne-bovina-maminha-crua",
    name: "Carne, Bovina, Maminha, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 152.8, protein: 20.9, carbs: 0, sugar: 0, fat: 7, saturatedFat: 3.1, fiber: 0, sodium: 37.4 }
  },
  {
    id: "taco-carne-bovina-maminha-grelhada",
    name: "Carne, Bovina, Maminha, Grelhada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 153.1, protein: 30.7, carbs: 0, sugar: 0, fat: 2.4, saturatedFat: 9.7, fiber: 0, sodium: 58.1 }
  },
  {
    id: "taco-carne-bovina-miolo-de-alcatra-sem-gordura-cru",
    name: "Carne, Bovina, Miolo de Alcatra, sem Gordura, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 162.9, protein: 21.6, carbs: 0, sugar: 0, fat: 7.8, saturatedFat: 3.4, fiber: 0, sodium: 43.1 }
  },
  {
    id: "taco-carne-bovina-miolo-de-alcatra-sem-gordura-grelhado",
    name: "Carne, Bovina, Miolo de Alcatra, sem Gordura, Grelhado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 241.4, protein: 31.9, carbs: 0, sugar: 0, fat: 11.6, saturatedFat: 5.1, fiber: 0, sodium: 51.6 }
  },
  {
    id: "taco-carne-bovina-musculo-sem-gordura-cozido",
    name: "Carne, Bovina, Músculo, sem Gordura, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 193.8, protein: 31.2, carbs: 0, sugar: 0, fat: 6.7, saturatedFat: 2.9, fiber: 0, sodium: 61.8 }
  },
  {
    id: "taco-carne-bovina-musculo-sem-gordura-cru",
    name: "Carne, Bovina, Músculo, sem Gordura, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 141.6, protein: 21.6, carbs: 0, sugar: 0, fat: 5.5, saturatedFat: 2.2, fiber: 0, sodium: 66.1 }
  },
  {
    id: "taco-carne-bovina-paleta-com-gordura-crua",
    name: "Carne, Bovina, Paleta, com Gordura, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 158.7, protein: 21.4, carbs: 0, sugar: 0, fat: 7.5, saturatedFat: 3.5, fiber: 0, sodium: 64.9 }
  },
  {
    id: "taco-carne-bovina-paleta-sem-gordura-cozida",
    name: "Carne, Bovina, Paleta, sem Gordura, Cozida",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 193.7, protein: 29.7, carbs: 0, sugar: 0, fat: 7.4, saturatedFat: 3.4, fiber: 0, sodium: 57.6 }
  },
  {
    id: "taco-carne-bovina-paleta-sem-gordura-crua",
    name: "Carne, Bovina, Paleta, sem Gordura, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 140.9, protein: 21, carbs: 0, sugar: 0, fat: 5.7, saturatedFat: 2.7, fiber: 0, sodium: 65.9 }
  },
  {
    id: "taco-carne-bovina-patinho-sem-gordura-cru",
    name: "Carne, Bovina, Patinho, sem Gordura, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 133.5, protein: 21.7, carbs: 0, sugar: 0, fat: 4.5, saturatedFat: 2, fiber: 0, sodium: 49.1 }
  },
  {
    id: "taco-carne-bovina-peito-sem-gordura-cozido",
    name: "Carne, Bovina, Peito, sem Gordura, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 338.5, protein: 22.2, carbs: 0, sugar: 0, fat: 27, saturatedFat: 11.7, fiber: 0, sodium: 55.7 }
  },
  {
    id: "taco-carne-bovina-peito-sem-gordura-cru",
    name: "Carne, Bovina, Peito, sem Gordura, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 259.3, protein: 17.6, carbs: 0, sugar: 0, fat: 20.4, saturatedFat: 8.2, fiber: 0, sodium: 63.8 }
  },
  {
    id: "taco-carne-bovina-picanha-com-gordura-crua",
    name: "Carne, Bovina, Picanha, com Gordura, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 212.9, protein: 18.8, carbs: 0, sugar: 0, fat: 14.7, saturatedFat: 6.1, fiber: 0, sodium: 37.6 }
  },
  {
    id: "taco-carne-bovina-picanha-com-gordura-grelhada",
    name: "Carne, Bovina, Picanha, com Gordura, Grelhada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 288.8, protein: 26.4, carbs: 0, sugar: 0, fat: 19.5, saturatedFat: 7.9, fiber: 0, sodium: 60 }
  },
  {
    id: "taco-carne-bovina-picanha-sem-gordura-crua",
    name: "Carne, Bovina, Picanha, sem Gordura, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 133.5, protein: 21.2, carbs: 0, sugar: 0, fat: 4.7, saturatedFat: 2, fiber: 0, sodium: 61.1 }
  },
  {
    id: "taco-carne-bovina-picanha-sem-gordura-grelhada",
    name: "Carne, Bovina, Picanha, sem Gordura, Grelhada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 238.5, protein: 31.9, carbs: 0, sugar: 0, fat: 11.3, saturatedFat: 4.5, fiber: 0, sodium: 60.7 }
  },
  {
    id: "taco-carne-bovina-seca-cozida",
    name: "Carne, Bovina, Seca, Cozida",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 312.8, protein: 26.9, carbs: 0, sugar: 0, fat: 21.9, saturatedFat: 10.5, fiber: 0, sodium: 1943.2 }
  },
  {
    id: "taco-carne-bovina-seca-crua",
    name: "Carne, Bovina, Seca, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 312.7, protein: 19.7, carbs: 0, sugar: 0, fat: 25.4, saturatedFat: 8.7, fiber: 0, sodium: 4439.6 }
  },
  {
    id: "taco-croquete-de-carne-cru",
    name: "Croquete, de Carne, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 245.8, protein: 12, carbs: 13.9, sugar: 0, fat: 15.6, saturatedFat: 0, fiber: 0, sodium: 710.6 }
  },
  {
    id: "taco-croquete-de-carne-frito",
    name: "Croquete, de Carne, Frito",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 346.7, protein: 16.9, carbs: 18.1, sugar: 0, fat: 22.7, saturatedFat: 5.1, fiber: 0, sodium: 916.4 }
  },
  {
    id: "taco-empada-de-frango-pre-cozida-assada",
    name: "Empada de Frango, Pré-Cozida, Assada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 358.2, protein: 6.9, carbs: 47.5, sugar: 0, fat: 15.6, saturatedFat: 0, fiber: 2.2, sodium: 524.9 }
  },
  {
    id: "taco-empada-de-frango-pre-cozida",
    name: "Empada, de Frango, Pré-Cozida",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 377.5, protein: 7.3, carbs: 35.5, sugar: 0, fat: 22.9, saturatedFat: 5.4, fiber: 2.2, sodium: 770.7 }
  },
  {
    id: "taco-frango-asa-com-pele-crua",
    name: "Frango, Asa, com Pele, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 213.2, protein: 18.1, carbs: 0, sugar: 0, fat: 15.1, saturatedFat: 4.4, fiber: 0, sodium: 96.3 }
  },
  {
    id: "taco-frango-caipira-inteiro-com-pele-cozido",
    name: "Frango, Caipira, Inteiro, com Pele, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 242.9, protein: 23.9, carbs: 0, sugar: 0, fat: 15.6, saturatedFat: 4.4, fiber: 0, sodium: 56.1 }
  },
  {
    id: "taco-frango-caipira-inteiro-sem-pele-cozido",
    name: "Frango, Caipira, Inteiro, sem Pele, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 195.8, protein: 29.6, carbs: 0, sugar: 0, fat: 7.7, saturatedFat: 2.2, fiber: 0, sodium: 53.2 }
  },
  {
    id: "taco-frango-coracao-cru",
    name: "Frango, Coração, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 221.5, protein: 12.6, carbs: 0, sugar: 0, fat: 18.6, saturatedFat: 4.9, fiber: 0, sodium: 95.1 }
  },
  {
    id: "taco-frango-coracao-grelhado",
    name: "Frango, Coração, Grelhado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 207.3, protein: 22.4, carbs: 0.6, sugar: 0, fat: 12.1, saturatedFat: 3.5, fiber: 0, sodium: 128.2 }
  },
  {
    id: "taco-frango-coxa-com-pele-assada",
    name: "Frango, Coxa, com Pele, Assada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 215.1, protein: 28.5, carbs: 0.1, sugar: 0, fat: 10.4, saturatedFat: 3.1, fiber: 0, sodium: 94.8 }
  },
  {
    id: "taco-frango-coxa-com-pele-crua",
    name: "Frango, Coxa, com Pele, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 161.5, protein: 17.1, carbs: 0, sugar: 0, fat: 9.8, saturatedFat: 3, fiber: 0, sodium: 95 }
  },
  {
    id: "taco-frango-coxa-sem-pele-cozida",
    name: "Frango, Coxa, sem Pele, Cozida",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 167.4, protein: 26.9, carbs: 0, sugar: 0, fat: 5.8, saturatedFat: 2, fiber: 0, sodium: 64.3 }
  },
  {
    id: "taco-frango-coxa-sem-pele-crua",
    name: "Frango, Coxa, sem Pele, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 119.9, protein: 17.8, carbs: 0, sugar: 0, fat: 4.9, saturatedFat: 1.6, fiber: 0, sodium: 98.4 }
  },
  {
    id: "taco-frango-figado-cru",
    name: "Frango, Fígado, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 106.5, protein: 17.6, carbs: 0, sugar: 0, fat: 3.5, saturatedFat: 1.3, fiber: 0, sodium: 82.4 }
  },
  {
    id: "taco-frango-file-a-milanesa",
    name: "Frango, Filé, À Milanesa",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 220.9, protein: 28.5, carbs: 7.5, sugar: 0, fat: 7.8, saturatedFat: 1.6, fiber: 1.1, sodium: 122.3 }
  },
  {
    id: "taco-frango-inteiro-com-pele-cru",
    name: "Frango, Inteiro, com Pele, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 226.3, protein: 16.4, carbs: 0, sugar: 0, fat: 17.3, saturatedFat: 5.2, fiber: 0, sodium: 62.9 }
  },
  {
    id: "taco-frango-inteiro-sem-pele-assado",
    name: "Frango, Inteiro, sem Pele, Assado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 187.3, protein: 28, carbs: 0, sugar: 0, fat: 7.5, saturatedFat: 2.1, fiber: 0, sodium: 70.3 }
  },
  {
    id: "taco-frango-inteiro-sem-pele-cozido",
    name: "Frango, Inteiro, sem Pele, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 170.4, protein: 25, carbs: 0, sugar: 0, fat: 7.1, saturatedFat: 2.2, fiber: 0, sodium: 50.9 }
  },
  {
    id: "taco-frango-inteiro-sem-pele-cru",
    name: "Frango, Inteiro, sem Pele, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 129.1, protein: 20.6, carbs: 0, sugar: 0, fat: 4.6, saturatedFat: 1.4, fiber: 0, sodium: 73 }
  },
  {
    id: "taco-frango-peito-com-pele-assado",
    name: "Frango, Peito, com Pele, Assado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 211.7, protein: 33.4, carbs: 0, sugar: 0, fat: 7.6, saturatedFat: 2.2, fiber: 0, sodium: 55.7 }
  },
  {
    id: "taco-frango-peito-com-pele-cru",
    name: "Frango, Peito, com Pele, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 149.5, protein: 20.8, carbs: 0, sugar: 0, fat: 6.7, saturatedFat: 2.2, fiber: 0, sodium: 62.3 }
  },
  {
    id: "taco-frango-peito-sem-pele-cozido",
    name: "Frango, Peito, sem Pele, Cozido",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 162.9, protein: 31.5, carbs: 0, sugar: 0, fat: 3.2, saturatedFat: 1.1, fiber: 0, sodium: 36.2 }
  },
  {
    id: "taco-frango-peito-sem-pele-cru",
    name: "Frango, Peito, sem Pele, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 119.2, protein: 21.5, carbs: 0, sugar: 0, fat: 3, saturatedFat: 1.1, fiber: 0, sodium: 56.1 }
  },
  {
    id: "taco-frango-sobrecoxa-com-pele-assada",
    name: "Frango, Sobrecoxa, com Pele, Assada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 259.6, protein: 28.7, carbs: 0, sugar: 0, fat: 15.2, saturatedFat: 4.2, fiber: 0, sodium: 95.9 }
  },
  {
    id: "taco-frango-sobrecoxa-com-pele-crua",
    name: "Frango, Sobrecoxa, com Pele, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 254.5, protein: 15.5, carbs: 0, sugar: 0, fat: 20.9, saturatedFat: 6.5, fiber: 0, sodium: 68.3 }
  },
  {
    id: "taco-frango-sobrecoxa-sem-pele-assada",
    name: "Frango, Sobrecoxa, sem Pele, Assada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 232.9, protein: 29.2, carbs: 0, sugar: 0, fat: 12, saturatedFat: 3.3, fiber: 0, sodium: 106.1 }
  },
  {
    id: "taco-frango-sobrecoxa-sem-pele-crua",
    name: "Frango, Sobrecoxa, sem Pele, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 161.8, protein: 17.6, carbs: 0, sugar: 0, fat: 9.6, saturatedFat: 3, fiber: 0, sodium: 79.7 }
  },
  {
    id: "taco-hamburguer-bovino-cru",
    name: "Hambúrguer, Bovino, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 214.8, protein: 13.2, carbs: 4.2, sugar: 0, fat: 16.2, saturatedFat: 5.7, fiber: 0, sodium: 869.5 }
  },
  {
    id: "taco-hamburguer-bovino-frito",
    name: "Hambúrguer, Bovino, Frito",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 258.3, protein: 20, carbs: 6.3, sugar: 0, fat: 17, saturatedFat: 5.9, fiber: 0, sodium: 1251.8 }
  },
  {
    id: "taco-hamburguer-bovino-grelhado",
    name: "Hambúrguer, Bovino, Grelhado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 209.8, protein: 13.2, carbs: 11.3, sugar: 0, fat: 12.4, saturatedFat: 5.1, fiber: 0, sodium: 1090.3 }
  },
  {
    id: "taco-linguica-frango-crua",
    name: "Lingüiça, Frango, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 218.1, protein: 14.2, carbs: 0, sugar: 0, fat: 17.4, saturatedFat: 5.2, fiber: 0, sodium: 1125.8 }
  },
  {
    id: "taco-linguica-frango-frita",
    name: "Lingüiça, Frango, Frita",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 245.5, protein: 18.3, carbs: 0, sugar: 0, fat: 18.5, saturatedFat: 5, fiber: 0, sodium: 1373.9 }
  },
  {
    id: "taco-linguica-frango-grelhada",
    name: "Lingüiça, Frango, Grelhada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 243.7, protein: 18.2, carbs: 0, sugar: 0, fat: 18.4, saturatedFat: 4.7, fiber: 0, sodium: 1351.5 }
  },
  {
    id: "taco-linguica-porco-crua",
    name: "Lingüiça, Porco, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 227.2, protein: 16.1, carbs: 0, sugar: 0, fat: 17.6, saturatedFat: 4, fiber: 0, sodium: 1175.7 }
  },
  {
    id: "taco-linguica-porco-frita",
    name: "Lingüiça, Porco, Frita",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 279.5, protein: 20.5, carbs: 0, sugar: 0, fat: 21.3, saturatedFat: 6.5, fiber: 0, sodium: 1431.6 }
  },
  {
    id: "taco-linguica-porco-grelhada",
    name: "Lingüiça, Porco, Grelhada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 296.5, protein: 23.2, carbs: 0, sugar: 0, fat: 21.9, saturatedFat: 7, fiber: 0, sodium: 1455.9 }
  },
  {
    id: "taco-mortadela",
    name: "Mortadela",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 268.8, protein: 12, carbs: 5.8, sugar: 0, fat: 21.6, saturatedFat: 6.1, fiber: 0, sodium: 1212.2 }
  },
  {
    id: "taco-peru-congelado-assado",
    name: "Peru, Congelado, Assado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 163.1, protein: 26.2, carbs: 0, sugar: 0, fat: 5.7, saturatedFat: 1.6, fiber: 0, sodium: 627.9 }
  },
  {
    id: "taco-peru-congelado-cru",
    name: "Peru, Congelado, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 93.7, protein: 18.1, carbs: 0, sugar: 0, fat: 1.8, saturatedFat: 0.4, fiber: 0, sodium: 710.7 }
  },
  {
    id: "taco-porco-bisteca-crua",
    name: "Porco, Bisteca, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 164.1, protein: 21.5, carbs: 0, sugar: 0, fat: 8, saturatedFat: 3.5, fiber: 0, sodium: 54.3 }
  },
  {
    id: "taco-porco-bisteca-frita",
    name: "Porco, Bisteca, Frita",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 311.2, protein: 33.7, carbs: 0, sugar: 0, fat: 18.5, saturatedFat: 6, fiber: 0, sodium: 63 }
  },
  {
    id: "taco-porco-bisteca-grelhada",
    name: "Porco, Bisteca, Grelhada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 280.1, protein: 28.9, carbs: 0, sugar: 0, fat: 17.4, saturatedFat: 7.5, fiber: 0, sodium: 51.4 }
  },
  {
    id: "taco-porco-costela-assada",
    name: "Porco, Costela, Assada",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 402.2, protein: 30.2, carbs: 0, sugar: 0, fat: 30.3, saturatedFat: 11.8, fiber: 0, sodium: 62.7 }
  },
  {
    id: "taco-porco-costela-crua",
    name: "Porco, Costela, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 255.6, protein: 18, carbs: 0, sugar: 0, fat: 19.8, saturatedFat: 7.4, fiber: 0, sodium: 88 }
  },
  {
    id: "taco-porco-lombo-assado",
    name: "Porco, Lombo, Assado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 210.2, protein: 35.7, carbs: 0, sugar: 0, fat: 6.4, saturatedFat: 2.6, fiber: 0, sodium: 38.9 }
  },
  {
    id: "taco-porco-lombo-cru",
    name: "Porco, Lombo, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 175.6, protein: 22.6, carbs: 0, sugar: 0, fat: 8.8, saturatedFat: 3.3, fiber: 0, sodium: 53.1 }
  },
  {
    id: "taco-porco-orelha-salgada-crua",
    name: "Porco, Orelha, Salgada, Crua",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 258.5, protein: 18.5, carbs: 0, sugar: 0, fat: 19.9, saturatedFat: 7.3, fiber: 0, sodium: 615.6 }
  },
  {
    id: "taco-porco-pernil-assado",
    name: "Porco, Pernil, Assado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 262.3, protein: 32.1, carbs: 0, sugar: 0, fat: 13.9, saturatedFat: 4.8, fiber: 0, sodium: 62.4 }
  },
  {
    id: "taco-porco-pernil-cru",
    name: "Porco, Pernil, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 186.1, protein: 20.1, carbs: 0, sugar: 0, fat: 11.1, saturatedFat: 4.2, fiber: 0, sodium: 101.9 }
  },
  {
    id: "taco-porco-rabo-salgado-cru",
    name: "Porco, Rabo, Salgado, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 377.4, protein: 15.6, carbs: 0, sugar: 0, fat: 34.5, saturatedFat: 11.6, fiber: 0, sodium: 1157.7 }
  },
  {
    id: "taco-presunto-com-capa-de-gordura",
    name: "Presunto, com Capa de Gordura",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 127.8, protein: 14.4, carbs: 1.4, sugar: 0, fat: 6.8, saturatedFat: 1.9, fiber: 0, sodium: 1020.8 }
  },
  {
    id: "taco-presunto-sem-capa-de-gordura",
    name: "Presunto, sem Capa de Gordura",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 93.7, protein: 14.3, carbs: 2.1, sugar: 0, fat: 2.7, saturatedFat: 0.9, fiber: 0, sodium: 1039.2 }
  },
  {
    id: "taco-quibe-assado",
    name: "Quibe, Assado",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 136.2, protein: 14.6, carbs: 12.9, sugar: 0, fat: 2.7, saturatedFat: 1.2, fiber: 1.9, sodium: 39.9 }
  },
  {
    id: "taco-quibe-cru",
    name: "Quibe, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 109.5, protein: 12.4, carbs: 10.8, sugar: 0, fat: 1.7, saturatedFat: 0.6, fiber: 1.6, sodium: 38.8 }
  },
  {
    id: "taco-quibe-frito",
    name: "Quibe, Frito",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 253.8, protein: 14.9, carbs: 12.3, sugar: 0, fat: 15.8, saturatedFat: 4.6, fiber: 0, sodium: 835.8 }
  },
  {
    id: "taco-salame",
    name: "Salame",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 397.8, protein: 25.8, carbs: 2.9, sugar: 0, fat: 30.6, saturatedFat: 9.6, fiber: 0, sodium: 1574.2 }
  },
  {
    id: "taco-toucinho-cru",
    name: "Toucinho, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 592.5, protein: 11.5, carbs: 0, sugar: 0, fat: 60.3, saturatedFat: 17.7, fiber: 0, sodium: 49.6 }
  },
  {
    id: "taco-toucinho-frito",
    name: "Toucinho, Frito",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 696.6, protein: 27.3, carbs: 0, sugar: 0, fat: 64.3, saturatedFat: 20, fiber: 0, sodium: 124.9 }
  },
  {
    id: "taco-bebida-lactea-pessego",
    name: "Bebida Láctea, Pêssego",
    category: "dairy",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 55.2, protein: 2.1, carbs: 7.6, sugar: 0, fat: 1.9, saturatedFat: 1.1, fiber: 0.3, sodium: 46.3 }
  },
  {
    id: "taco-iogurte-natural-desnatado",
    name: "Iogurte, Natural, Desnatado",
    category: "dairy",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 41.5, protein: 3.8, carbs: 5.8, sugar: 0, fat: 0.3, saturatedFat: 0.2, fiber: 0, sodium: 59.6 }
  },
  {
    id: "taco-iogurte-sabor-abacaxi",
    name: "Iogurte, Sabor Abacaxi",
    category: "dairy",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-iogurte-sabor-morango",
    name: "Iogurte, Sabor Morango",
    category: "dairy",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 69.6, protein: 2.7, carbs: 9.7, sugar: 0, fat: 2.3, saturatedFat: 1.4, fiber: 0.2, sodium: 37.7 }
  },
  {
    id: "taco-iogurte-sabor-pessego",
    name: "Iogurte, Sabor Pêssego",
    category: "dairy",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 67.8, protein: 2.5, carbs: 9.4, sugar: 0, fat: 2.3, saturatedFat: 1.4, fiber: 0.7, sodium: 37 }
  },
  {
    id: "taco-leite-condensado",
    name: "Leite, Condensado",
    category: "dairy",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 312.6, protein: 7.7, carbs: 57, sugar: 0, fat: 6.7, saturatedFat: 4.2, fiber: 0, sodium: 93.8 }
  },
  {
    id: "taco-leite-de-cabra",
    name: "Leite, de Cabra",
    category: "dairy",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 66.4, protein: 3.1, carbs: 5.2, sugar: 0, fat: 3.8, saturatedFat: 2.4, fiber: 0, sodium: 73.9 }
  },
  {
    id: "taco-leite-de-vaca-desnatado-po",
    name: "Leite, de Vaca, Desnatado, Pó",
    category: "dairy",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 361.6, protein: 34.7, carbs: 53, sugar: 0, fat: 0.9, saturatedFat: 0.6, fiber: 0, sodium: 431.7 }
  },
  {
    id: "taco-leite-de-vaca-desnatado-uht",
    name: "Leite, de Vaca, Desnatado, Uht",
    category: "dairy",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 51.1 }
  },
  {
    id: "taco-leite-de-vaca-integral-po",
    name: "Leite, de Vaca, Integral, Pó",
    category: "dairy",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 496.7, protein: 25.4, carbs: 39.2, sugar: 0, fat: 26.9, saturatedFat: 16.3, fiber: 0, sodium: 323.2 }
  },
  {
    id: "taco-queijo-minas-meia-cura",
    name: "Queijo, Minas, Meia Cura",
    category: "dairy",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 320.7, protein: 21.2, carbs: 3.6, sugar: 0, fat: 24.6, saturatedFat: 13.2, fiber: 0, sodium: 501.2 }
  },
  {
    id: "taco-queijo-parmesao",
    name: "Queijo, Parmesão",
    category: "dairy",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 453, protein: 35.6, carbs: 1.7, sugar: 0, fat: 33.5, saturatedFat: 19.7, fiber: 0, sodium: 1844.1 }
  },
  {
    id: "taco-queijo-pasteurizado",
    name: "Queijo, Pasteurizado",
    category: "dairy",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 303.1, protein: 9.4, carbs: 5.7, sugar: 0, fat: 27.4, saturatedFat: 15.9, fiber: 0, sodium: 780.4 }
  },
  {
    id: "taco-queijo-petit-suisse-morango",
    name: "Queijo, Petit Suisse, Morango",
    category: "dairy",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 121.1, protein: 5.8, carbs: 18.5, sugar: 0, fat: 2.8, saturatedFat: 1.6, fiber: 0, sodium: 412.5 }
  },
  {
    id: "taco-queijo-prato",
    name: "Queijo, Prato",
    category: "dairy",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 359.9, protein: 22.7, carbs: 1.9, sugar: 0, fat: 29.1, saturatedFat: 16.3, fiber: 0, sodium: 579.8 }
  },
  {
    id: "taco-bebida-isotonica-sabores-variados",
    name: "Bebida Isotônica, Sabores Variados",
    category: "beverage",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 25.6, protein: 0, carbs: 6.4, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 44.1 }
  },
  {
    id: "taco-cafe-infusao-10",
    name: "Café, Infusão 10%",
    category: "beverage",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 9.1, protein: 0.7, carbs: 1.5, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 0, sodium: 1 }
  },
  {
    id: "taco-cana-aguardente-1",
    name: "Cana, Aguardente 1",
    category: "beverage",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 215.7, protein: 0, carbs: 0, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 3.1 }
  },
  {
    id: "taco-cana-caldo-de",
    name: "Cana, Caldo de",
    category: "beverage",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 65.3, protein: 0, carbs: 18.2, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0.1, sodium: 0 }
  },
  {
    id: "taco-cha-erva-doce-infusao-5",
    name: "Chá, Erva-Doce, Infusão 5%",
    category: "beverage",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 1.4, protein: 0, carbs: 0.4, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0.6 }
  },
  {
    id: "taco-cha-mate-infusao-5",
    name: "Chá, Mate, Infusão 5%",
    category: "beverage",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 2.7, protein: 0, carbs: 0.6, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-cha-preto-infusao-5",
    name: "Chá, Preto, Infusão 5%",
    category: "beverage",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 2.2, protein: 0, carbs: 0.6, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-refrigerante-tipo-agua-tonica",
    name: "Refrigerante, tipo Água Tônica",
    category: "beverage",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 30.8, protein: 0, carbs: 8, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 8.3 }
  },
  {
    id: "taco-refrigerante-tipo-guarana",
    name: "Refrigerante, tipo Guaraná",
    category: "beverage",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 38.7, protein: 0, carbs: 10, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 9 }
  },
  {
    id: "taco-refrigerante-tipo-laranja",
    name: "Refrigerante, tipo Laranja",
    category: "beverage",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 45.6, protein: 0, carbs: 11.8, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 9.3 }
  },
  {
    id: "taco-refrigerante-tipo-limao",
    name: "Refrigerante, tipo Limão",
    category: "beverage",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 39.7, protein: 0, carbs: 10.3, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 8.8 }
  },
  {
    id: "taco-omelete-de-queijo",
    name: "Omelete, de Queijo",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 268, protein: 15.6, carbs: 0.4, sugar: 0, fat: 22, saturatedFat: 6.4, fiber: 0, sodium: 216.1 }
  },
  {
    id: "taco-ovo-de-codorna-inteiro-cru",
    name: "Ovo, de Codorna, Inteiro, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 176.9, protein: 13.7, carbs: 0.8, sugar: 0, fat: 12.7, saturatedFat: 8.9, fiber: 0, sodium: 129 }
  },
  {
    id: "taco-ovo-de-galinha-clara-cozida-10minutos",
    name: "Ovo, de Galinha, Clara, cozida/10minutos",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 59.4, protein: 13.4, carbs: 0, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 0, sodium: 180.5 }
  },
  {
    id: "taco-ovo-de-galinha-gema-cozida-10minutos",
    name: "Ovo, de Galinha, Gema, cozida/10minutos",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 352.7, protein: 15.9, carbs: 1.6, sugar: 0, fat: 30.8, saturatedFat: 9.2, fiber: 0, sodium: 44.9 }
  },
  {
    id: "taco-ovo-de-galinha-inteiro-cru",
    name: "Ovo, de Galinha, Inteiro, Cru",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 143.1, protein: 13, carbs: 1.6, sugar: 0, fat: 8.9, saturatedFat: 2.6, fiber: 0, sodium: 167.9 }
  },
  {
    id: "taco-ovo-de-galinha-inteiro-frito",
    name: "Ovo, de Galinha, Inteiro, Frito",
    category: "protein",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 240.2, protein: 15.6, carbs: 1.2, sugar: 0, fat: 18.6, saturatedFat: 4.1, fiber: 0, sodium: 166.1 }
  },
  {
    id: "taco-achocolatado-po",
    name: "Achocolatado, Pó",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 401, protein: 4.2, carbs: 91.2, sugar: 0, fat: 2.2, saturatedFat: 1.1, fiber: 3.9, sodium: 64.8 }
  },
  {
    id: "taco-acucar-cristal",
    name: "Açúcar, Cristal",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 386.8, protein: 0.3, carbs: 99.6, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-acucar-mascavo",
    name: "Açúcar, Mascavo",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 368.6, protein: 0.8, carbs: 94.5, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 0, sodium: 25.2 }
  },
  {
    id: "taco-acucar-refinado",
    name: "Açúcar, Refinado",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 386.6, protein: 0.3, carbs: 99.5, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 12.2 }
  },
  {
    id: "taco-chocolate-ao-leite-com-castanha-do-brasil",
    name: "Chocolate, ao Leite, com Castanha do Pará",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 558.9, protein: 7.4, carbs: 55.4, sugar: 0, fat: 34.2, saturatedFat: 14.1, fiber: 2.5, sodium: 64 }
  },
  {
    id: "taco-chocolate-ao-leite-dietetico",
    name: "Chocolate, ao Leite, Dietético",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 556.8, protein: 6.9, carbs: 56.3, sugar: 0, fat: 33.8, saturatedFat: 19.2, fiber: 2.8, sodium: 84.7 }
  },
  {
    id: "taco-chocolate-meio-amargo",
    name: "Chocolate, Meio Amargo",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 474.9, protein: 4.9, carbs: 62.4, sugar: 0, fat: 29.9, saturatedFat: 13.1, fiber: 4.9, sodium: 8.9 }
  },
  {
    id: "taco-cocada-branca",
    name: "Cocada Branca",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 448.8, protein: 1.1, carbs: 81.4, sugar: 0, fat: 13.6, saturatedFat: 8.4, fiber: 3.6, sodium: 29 }
  },
  {
    id: "taco-doce-de-abobora-cremoso",
    name: "Doce, de Abóbora, Cremoso",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 198.9, protein: 0.9, carbs: 54.6, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 2.3, sodium: 0 }
  },
  {
    id: "taco-doce-de-leite-cremoso",
    name: "Doce, de Leite, Cremoso",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 306.3, protein: 5.5, carbs: 59.5, sugar: 0, fat: 6, saturatedFat: 1.3, fiber: 0, sodium: 120.1 }
  },
  {
    id: "taco-geleia-mocoto-natural",
    name: "Geléia, Mocotó, Natural",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 106.1, protein: 2.1, carbs: 24.2, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 0, sodium: 42.7 }
  },
  {
    id: "taco-glicose-de-milho",
    name: "Glicose de Milho",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 292.1, protein: 0, carbs: 79.4, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 58.9 }
  },
  {
    id: "taco-maria-mole",
    name: "Maria Mole",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 301.2, protein: 3.8, carbs: 73.6, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 0.7, sodium: 15.3 }
  },
  {
    id: "taco-maria-mole-coco-queimado",
    name: "Maria Mole, Coco Queimado",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 306.6, protein: 3.9, carbs: 75.1, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 0.6, sodium: 14.3 }
  },
  {
    id: "taco-marmelada",
    name: "Marmelada",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 257.2, protein: 0.4, carbs: 70.8, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 4.1, sodium: 10.9 }
  },
  {
    id: "taco-mel-de-abelha",
    name: "Mel, de Abelha",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 309.2, protein: 0, carbs: 84, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 6 }
  },
  {
    id: "taco-melado",
    name: "Melado",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 296.5, protein: 0, carbs: 76.6, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 4 }
  },
  {
    id: "taco-quindim",
    name: "Quindim",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 411.3, protein: 4.7, carbs: 46.3, sugar: 0, fat: 24.4, saturatedFat: 11.3, fiber: 3.2, sodium: 27.4 }
  },
  {
    id: "taco-rapadura",
    name: "Rapadura",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 352, protein: 1, carbs: 90.8, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 0, sodium: 21.7 }
  },
  {
    id: "taco-cafe-po-torrado",
    name: "Café, Pó, Torrado",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 418.6, protein: 14.7, carbs: 65.8, sugar: 0, fat: 11.9, saturatedFat: 5.3, fiber: 51.2, sodium: 1.1 }
  },
  {
    id: "taco-capuccino-po",
    name: "Capuccino, Pó",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 417.4, protein: 11.3, carbs: 73.6, sugar: 0, fat: 8.6, saturatedFat: 4, fiber: 2.4, sodium: 382.3 }
  },
  {
    id: "taco-fermento-em-po-quimico",
    name: "Fermento em Pó, Químico",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 89.7, protein: 0.5, carbs: 43.9, sugar: 0, fat: 0.1, saturatedFat: 0, fiber: 0, sodium: 10052.4 }
  },
  {
    id: "taco-fermento-biologico-levedura-tablete",
    name: "Fermento, Biológico, Levedura, Tablete",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 89.8, protein: 17, carbs: 7.7, sugar: 0, fat: 1.5, saturatedFat: 0, fiber: 4.2, sodium: 39.6 }
  },
  {
    id: "taco-gelatina-sabores-variados-po",
    name: "Gelatina, Sabores Variados, Pó",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 380.2, protein: 8.9, carbs: 89.2, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 234.9 }
  },
  {
    id: "taco-sal-dietetico",
    name: "Sal, Dietético",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 23431.5 }
  },
  {
    id: "taco-sal-grosso",
    name: "Sal, Grosso",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 39943.2 }
  },
  {
    id: "taco-shoyu",
    name: "Shoyu",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 60.9, protein: 3.3, carbs: 11.6, sugar: 0, fat: 0.3, saturatedFat: 0, fiber: 0, sodium: 5024.2 }
  },
  {
    id: "taco-tempero-a-base-de-sal",
    name: "Tempero a Base de Sal",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 21.3, protein: 2.7, carbs: 2.1, sugar: 0, fat: 0.3, saturatedFat: 0, fiber: 0.6, sodium: 32560 }
  },
  {
    id: "taco-azeitona-preta-conserva",
    name: "Azeitona, Preta, Conserva",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 194.2, protein: 1.2, carbs: 5.5, sugar: 0, fat: 20.3, saturatedFat: 3.5, fiber: 4.6, sodium: 1566.7 }
  },
  {
    id: "taco-azeitona-verde-conserva",
    name: "Azeitona, Verde, Conserva",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 136.9, protein: 0.9, carbs: 4.1, sugar: 0, fat: 14.2, saturatedFat: 2.3, fiber: 3.8, sodium: 1347.2 }
  },
  {
    id: "taco-chantilly-spray-com-gordura-vegetal",
    name: "Chantilly, Spray, com Gordura Vegetal",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 315, protein: 0.5, carbs: 16.9, sugar: 0, fat: 27.3, saturatedFat: 25.9, fiber: 0, sodium: 109.7 }
  },
  {
    id: "taco-leite-de-coco",
    name: "Leite, de Coco",
    category: "snack",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 166.2, protein: 1, carbs: 2.2, sugar: 0, fat: 18.4, saturatedFat: 15.6, fiber: 0.7, sodium: 44.3 }
  },
  {
    id: "taco-acaraje",
    name: "Acarajé",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 289.2, protein: 8.3, carbs: 19.1, sugar: 0, fat: 19.9, saturatedFat: 9.1, fiber: 9.4, sodium: 304.9 }
  },
  {
    id: "taco-arroz-carreteiro",
    name: "Arroz Carreteiro",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 153.8, protein: 10.8, carbs: 11.6, sugar: 0, fat: 7.1, saturatedFat: 3.2, fiber: 1.5, sodium: 1621.7 }
  },
  {
    id: "taco-baiao-de-dois-arroz-e-feijao-de-corda",
    name: "Baião de Dois, Arroz e Feijão-de-Corda",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 135.7, protein: 6.2, carbs: 20.4, sugar: 0, fat: 3.2, saturatedFat: 0.6, fiber: 5.1, sodium: 93.3 }
  },
  {
    id: "taco-barreado",
    name: "Barreado",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 165, protein: 18.3, carbs: 0.2, sugar: 0, fat: 9.5, saturatedFat: 3.3, fiber: 0.1, sodium: 47.6 }
  },
  {
    id: "taco-bife-a-cavalo-com-contra-file",
    name: "Bife À Cavalo, com Contra Filé",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 291.2, protein: 23.7, carbs: 0, sugar: 0, fat: 21.1, saturatedFat: 7.9, fiber: 0, sodium: 82.9 }
  },
  {
    id: "taco-bolinho-de-arroz",
    name: "Bolinho de Arroz",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 273.5, protein: 8, carbs: 41.7, sugar: 0, fat: 8.3, saturatedFat: 1.8, fiber: 2.7, sodium: 58.9 }
  },
  {
    id: "taco-camarao-a-baiana",
    name: "Camarão À Baiana",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 100.8, protein: 7.9, carbs: 3.2, sugar: 0, fat: 6, saturatedFat: 1.6, fiber: 0.4, sodium: 84.8 }
  },
  {
    id: "taco-charuto-de-repolho",
    name: "Charuto, de Repolho",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 78.2, protein: 6.8, carbs: 10.1, sugar: 0, fat: 1.1, saturatedFat: 0.5, fiber: 1.5, sodium: 12.1 }
  },
  {
    id: "taco-cuscuz-paulista",
    name: "Cuscuz, Paulista",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 142.1, protein: 2.6, carbs: 22.5, sugar: 0, fat: 4.6, saturatedFat: 1.8, fiber: 2.4, sodium: 235.7 }
  },
  {
    id: "taco-cuxa-molho",
    name: "Cuxá, Molho",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 80.1, protein: 5.6, carbs: 5.7, sugar: 0, fat: 3.6, saturatedFat: 0.6, fiber: 3, sodium: 1344.3 }
  },
  {
    id: "taco-dobradinha",
    name: "Dobradinha",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 124.5, protein: 19.8, carbs: 0, sugar: 0, fat: 4.4, saturatedFat: 2.5, fiber: 0, sodium: 28.8 }
  },
  {
    id: "taco-estrogonofe-de-carne",
    name: "Estrogonofe de Carne",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 173.1, protein: 15, carbs: 3, sugar: 0, fat: 10.8, saturatedFat: 5.3, fiber: 0, sodium: 122.8 }
  },
  {
    id: "taco-estrogonofe-de-frango",
    name: "Estrogonofe de Frango",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 156.8, protein: 17.6, carbs: 2.6, sugar: 0, fat: 8, saturatedFat: 3.7, fiber: 0, sodium: 99.5 }
  },
  {
    id: "taco-feijao-tropeiro-mineiro",
    name: "Feijão Tropeiro Mineiro",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 151.6, protein: 10.2, carbs: 19.6, sugar: 0, fat: 6.8, saturatedFat: 2.2, fiber: 3.6, sodium: 365.1 }
  },
  {
    id: "taco-l",
    name: "L",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 116.9, protein: 8.7, carbs: 11.6, sugar: 0, fat: 6.5, saturatedFat: 1.9, fiber: 5.1, sodium: 278.2 }
  },
  {
    id: "taco-frango-com-acafrao",
    name: "Frango, com Açafrão",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 112.8, protein: 9.7, carbs: 4.1, sugar: 0, fat: 6.2, saturatedFat: 1.6, fiber: 0.2, sodium: 28.8 }
  },
  {
    id: "taco-macarrao-molho-bolognesa",
    name: "Macarrão, Molho Bolognesa",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 119.5, protein: 4.9, carbs: 22.5, sugar: 0, fat: 0.9, saturatedFat: 0.3, fiber: 0.8, sodium: 8.9 }
  },
  {
    id: "taco-manicoba",
    name: "Maniçoba",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 134.2, protein: 10, carbs: 3.4, sugar: 0, fat: 8.7, saturatedFat: 2.9, fiber: 2.2, sodium: 406.7 }
  },
  {
    id: "taco-quibebe",
    name: "Quibebe",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 86.3, protein: 8.6, carbs: 6.6, sugar: 0, fat: 2.7, saturatedFat: 1, fiber: 1.7, sodium: 246.6 }
  },
  {
    id: "taco-salada-de-legumes-com-maionese",
    name: "Salada, de Legumes, com Maionese",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 96.1, protein: 1.1, carbs: 8.9, sugar: 0, fat: 7, saturatedFat: 1.1, fiber: 2.2, sodium: 228.4 }
  },
  {
    id: "taco-salada-de-legumes-cozida-no-vapor",
    name: "Salada, de Legumes, Cozida no Vapor",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 35.4, protein: 2, carbs: 7.1, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 2.5, sodium: 2.5 }
  },
  {
    id: "taco-salpicao-de-frango",
    name: "Salpicão, de Frango",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 147.9, protein: 13.9, carbs: 4.6, sugar: 0, fat: 7.8, saturatedFat: 1.3, fiber: 0.4, sodium: 248.3 }
  },
  {
    id: "taco-sarapatel",
    name: "Sarapatel",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 123, protein: 18.5, carbs: 1.1, sugar: 0, fat: 4.4, saturatedFat: 1.4, fiber: 0, sodium: 215.6 }
  },
  {
    id: "taco-tabule",
    name: "Tabule",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 57.5, protein: 2, carbs: 10.6, sugar: 0, fat: 1.2, saturatedFat: 0.2, fiber: 2.1, sodium: 1.2 }
  },
  {
    id: "taco-tacaca",
    name: "Tacacá",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 46.9, protein: 7, carbs: 3.4, sugar: 0, fat: 0.4, saturatedFat: 0.2, fiber: 0.2, sodium: 1349.1 }
  },
  {
    id: "taco-tapioca-com-manteiga",
    name: "Tapioca, com Manteiga",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 347.8, protein: 0.1, carbs: 63.6, sugar: 0, fat: 10.9, saturatedFat: 6, fiber: 0, sodium: 157.5 }
  },
  {
    id: "taco-tucupi-com-pimenta-de-cheiro",
    name: "Tucupi, com Pimenta-de-Cheiro",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 27.2, protein: 2.1, carbs: 4.7, sugar: 0, fat: 0.3, saturatedFat: 0.1, fiber: 0.2, sodium: 5.1 }
  },
  {
    id: "taco-vaca-atolada",
    name: "Vaca Atolada",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 144.9, protein: 5.1, carbs: 10.1, sugar: 0, fat: 9.3, saturatedFat: 4.1, fiber: 2.3, sodium: 25.6 }
  },
  {
    id: "taco-vatapa",
    name: "Vatapá",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 254.9, protein: 6, carbs: 9.7, sugar: 0, fat: 23.2, saturatedFat: 7.5, fiber: 1.7, sodium: 879.9 }
  },
  {
    id: "taco-virado-a-paulista",
    name: "Virado À Paulista",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 306.9, protein: 10.2, carbs: 14.1, sugar: 0, fat: 25.6, saturatedFat: 8.3, fiber: 2.2, sodium: 345.5 }
  },
  {
    id: "taco-yakisoba",
    name: "Yakisoba",
    category: "other",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 112.8, protein: 7.5, carbs: 18.3, sugar: 0, fat: 2.6, saturatedFat: 0.6, fiber: 1.1, sodium: 793.8 }
  },
  {
    id: "taco-amendoim-grao-cru",
    name: "Amendoim, Grão, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 544.1, protein: 27.2, carbs: 20.3, sugar: 0, fat: 43.9, saturatedFat: 8.7, fiber: 8, sodium: 0 }
  },
  {
    id: "taco-ervilha-em-vagem",
    name: "Ervilha, em Vagem",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 88.1, protein: 7.5, carbs: 14.2, sugar: 0, fat: 0.5, saturatedFat: 0, fiber: 9.7, sodium: 0 }
  },
  {
    id: "taco-ervilha-enlatada-drenada",
    name: "Ervilha, Enlatada, Drenada",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 73.8, protein: 4.6, carbs: 13.4, sugar: 0, fat: 0.4, saturatedFat: 0.1, fiber: 5.1, sodium: 372.1 }
  },
  {
    id: "taco-feijao-carioca-cru",
    name: "Feijão, Carioca, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 329, protein: 20, carbs: 61.2, sugar: 0, fat: 1.3, saturatedFat: 0.2, fiber: 18.4, sodium: 0 }
  },
  {
    id: "taco-feijao-fradinho-cozido",
    name: "Feijão, Fradinho, Cozido",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 78, protein: 5.1, carbs: 13.5, sugar: 0, fat: 0.6, saturatedFat: 0.2, fiber: 7.5, sodium: 1 }
  },
  {
    id: "taco-feijao-fradinho-cru",
    name: "Feijão, Fradinho, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 339.2, protein: 20.2, carbs: 61.2, sugar: 0, fat: 2.4, saturatedFat: 0.7, fiber: 23.6, sodium: 10.3 }
  },
  {
    id: "taco-feijao-jalo-cozido",
    name: "Feijão, Jalo, Cozido",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 92.7, protein: 6.1, carbs: 16.5, sugar: 0, fat: 0.5, saturatedFat: 0.1, fiber: 13.9, sodium: 0.5 }
  },
  {
    id: "taco-feijao-jalo-cru",
    name: "Feijão, Jalo, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 327.9, protein: 20.1, carbs: 61.5, sugar: 0, fat: 0.9, saturatedFat: 0.3, fiber: 30.3, sodium: 24.6 }
  },
  {
    id: "taco-feijao-preto-cru",
    name: "Feijão, Preto, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 323.6, protein: 21.3, carbs: 58.8, sugar: 0, fat: 1.2, saturatedFat: 0.2, fiber: 21.8, sodium: 0 }
  },
  {
    id: "taco-feijao-rajado-cozido",
    name: "Feijão, Rajado, Cozido",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 84.7, protein: 5.5, carbs: 15.3, sugar: 0, fat: 0.4, saturatedFat: 0.1, fiber: 9.3, sodium: 0.7 }
  },
  {
    id: "taco-feijao-rajado-cru",
    name: "Feijão, Rajado, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 325.8, protein: 17.3, carbs: 62.9, sugar: 0, fat: 1.2, saturatedFat: 0.4, fiber: 24, sodium: 13.7 }
  },
  {
    id: "taco-feijao-rosinha-cozido",
    name: "Feijão, Rosinha, Cozido",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 67.9, protein: 4.5, carbs: 11.8, sugar: 0, fat: 0.5, saturatedFat: 0.2, fiber: 4.8, sodium: 2.1 }
  },
  {
    id: "taco-feijao-rosinha-cru",
    name: "Feijão, Rosinha, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 337, protein: 20.9, carbs: 62.2, sugar: 0, fat: 1.3, saturatedFat: 0.6, fiber: 20.6, sodium: 24.1 }
  },
  {
    id: "taco-feijao-roxo-cozido",
    name: "Feijão, Roxo, Cozido",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 76.9, protein: 5.7, carbs: 12.9, sugar: 0, fat: 0.5, saturatedFat: 0.1, fiber: 11.5, sodium: 1.5 }
  },
  {
    id: "taco-feijao-roxo-cru",
    name: "Feijão, Roxo, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 331.4, protein: 22.2, carbs: 60, sugar: 0, fat: 1.2, saturatedFat: 0.3, fiber: 33.8, sodium: 9.8 }
  },
  {
    id: "taco-grao-de-bico-cru",
    name: "Grão-de-Bico, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 354.7, protein: 21.2, carbs: 57.9, sugar: 0, fat: 5.4, saturatedFat: 0.9, fiber: 12.4, sodium: 5.2 }
  },
  {
    id: "taco-guandu-cru",
    name: "Guandu, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 344.1, protein: 19, carbs: 64, sugar: 0, fat: 2.1, saturatedFat: 0.6, fiber: 21.3, sodium: 1.6 }
  },
  {
    id: "taco-lentilha-cozida",
    name: "Lentilha, Cozida",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 92.6, protein: 6.3, carbs: 16.3, sugar: 0, fat: 0.5, saturatedFat: 0.1, fiber: 7.9, sodium: 1.2 }
  },
  {
    id: "taco-lentilha-crua",
    name: "Lentilha, Crua",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 339.1, protein: 23.2, carbs: 62, sugar: 0, fat: 0.8, saturatedFat: 0.1, fiber: 16.9, sodium: 0 }
  },
  {
    id: "taco-pacoca-amendoim",
    name: "Paçoca, Amendoim",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 486.9, protein: 16, carbs: 52.4, sugar: 0, fat: 26.1, saturatedFat: 4.1, fiber: 7.3, sodium: 166.8 }
  },
  {
    id: "taco-pe-de-moleque-amendoim",
    name: "Pé-de-Moleque, Amendoim",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 503.2, protein: 13.2, carbs: 54.7, sugar: 0, fat: 28, saturatedFat: 5.1, fiber: 3.4, sodium: 16.3 }
  },
  {
    id: "taco-soja-farinha",
    name: "Soja, Farinha",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 404, protein: 36, carbs: 38.4, sugar: 0, fat: 14.6, saturatedFat: 0, fiber: 20.2, sodium: 5.8 }
  },
  {
    id: "taco-soja-extrato-soluvel-natural-fluido",
    name: "Soja, Extrato Solúvel, Natural, Fluido",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 39.1, protein: 2.4, carbs: 4.3, sugar: 0, fat: 1.6, saturatedFat: 0.2, fiber: 0.4, sodium: 56.5 }
  },
  {
    id: "taco-soja-extrato-soluvel-po",
    name: "Soja, Extrato Solúvel, Pó",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 458.9, protein: 35.7, carbs: 28.5, sugar: 0, fat: 26.2, saturatedFat: 3.3, fiber: 7.3, sodium: 83.5 }
  },
  {
    id: "taco-soja-queijo-tofu",
    name: "Soja, Queijo (tofu)",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 64.5, protein: 6.6, carbs: 2.1, sugar: 0, fat: 4, saturatedFat: 0.4, fiber: 0.8, sodium: 1.2 }
  },
  {
    id: "taco-tremoco-cru",
    name: "Tremoço, Cru",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 381.3, protein: 33.6, carbs: 43.8, sugar: 0, fat: 10.3, saturatedFat: 1.2, fiber: 32.3, sodium: 3.3 }
  },
  {
    id: "taco-tremoco-em-conserva",
    name: "Tremoço, em Conserva",
    category: "grain",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 120.6, protein: 11.1, carbs: 12.4, sugar: 0, fat: 3.8, saturatedFat: 0.4, fiber: 14.4, sodium: 1808.8 }
  },
  {
    id: "taco-amendoa-torrada-salgada",
    name: "Amêndoa, Torrada, Salgada",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 580.7, protein: 18.6, carbs: 29.5, sugar: 0, fat: 47.3, saturatedFat: 4.8, fiber: 11.6, sodium: 278.5 }
  },
  {
    id: "taco-castanha-de-caju-torrada-salgada",
    name: "Castanha-de-Caju, Torrada, Salgada",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 570.2, protein: 18.5, carbs: 29.1, sugar: 0, fat: 46.3, saturatedFat: 7.7, fiber: 3.7, sodium: 125 }
  },
  {
    id: "taco-castanha-do-brasil-crua",
    name: "Castanha-do-Brasil, Crua",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 643, protein: 14.5, carbs: 15.1, sugar: 0, fat: 63.5, saturatedFat: 15.3, fiber: 7.9, sodium: 0.7 }
  },
  {
    id: "taco-coco-cru",
    name: "Coco, Cru",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 406.5, protein: 3.7, carbs: 10.4, sugar: 0, fat: 42, saturatedFat: 30, fiber: 5.4, sodium: 15.3 }
  },
  {
    id: "taco-coco-verde-cru",
    name: "Coco, Verde, Cru",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0, saturatedFat: 3.1, fiber: 0, sodium: 0 }
  },
  {
    id: "taco-farinha-de-mesocarpo-de-babacu-crua",
    name: "Farinha, de Mesocarpo de Babaçu, Crua",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 328.8, protein: 1.4, carbs: 79.2, sugar: 0, fat: 0.2, saturatedFat: 0, fiber: 17.9, sodium: 12.5 }
  },
  {
    id: "taco-gergelim-semente",
    name: "Gergelim, Semente",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 583.5, protein: 21.2, carbs: 21.6, sugar: 0, fat: 50.4, saturatedFat: 7.8, fiber: 11.9, sodium: 2.6 }
  },
  {
    id: "taco-linhaca-semente",
    name: "Linhaça, Semente",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 495.1, protein: 14.1, carbs: 43.3, sugar: 0, fat: 32.3, saturatedFat: 4.2, fiber: 33.5, sodium: 8.7 }
  },
  {
    id: "taco-pinhao-cozido",
    name: "Pinhão, Cozido",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 174.4, protein: 3, carbs: 43.9, sugar: 0, fat: 0.7, saturatedFat: 0.3, fiber: 15.6, sodium: 0.9 }
  },
  {
    id: "taco-pupunha-cozida",
    name: "Pupunha, Cozida",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 218.5, protein: 2.5, carbs: 29.6, sugar: 0, fat: 12.8, saturatedFat: 3.1, fiber: 4.3, sodium: 0.9 }
  },
  {
    id: "taco-noz-crua",
    name: "Noz, Crua",
    category: "fat",
    servingSize: 100,
    servingUnit: 'g',
    servingLabel: '100 g',
    isCustom: false,
    nutrients: { calories: 620.1, protein: 14, carbs: 18.4, sugar: 0, fat: 59.4, saturatedFat: 5.6, fiber: 7.2, sodium: 4.6 }
  }
];

export const commonFoods: FoodItem[] = [...baseCommonFoods, ...tacoFoods];
