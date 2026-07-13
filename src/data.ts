import type { StoreData } from './types';

export const storeData: StoreData = {
  name: 'Pitts Burger',
  tagline: 'Os melhores hambúrgueres artesanais de Natal com tradição e sabor real',
  description: 'Desde 1984 servindo o burger mais querido da cidade. Ingredientes frescos, molho especial e o sabor inconfundível que você só encontra na nossa matriz em Lagoa Nova.',
  aboutText: 'O Pitts Burger é um ícone da gastronomia potiguar. Nascido em Natal, conquistamos gerações com a filosofia de fazer hambúrgueres de verdade: carne grelhada de forma perfeita, vegetais colhidos no dia e o lendário molho especial que é o segredo do nosso sucesso. Nossa matriz na Prudente de Morais é o ponto de encontro preferido das famílias de Lagoa Nova.',
  aboutImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1200',
  phone: '(84) 4008-4000',
  phoneFormatted: '8440084000',
  whatsappNumber: '558440084000',
  whatsappMessage: 'Olá! Gostaria de fazer um pedido de hambúrguer para delivery ou consultar o cardápio do dia.',
  address: 'Av. Prudente de Morais, 4636 - Lagoa Nova, Natal - RN, 59020-400',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.176461937965!2d-35.2131976!3d-5.8159187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b301a2f64627d7%3A0xe54e6fa16b0b2304!2sAv.%20Prudente%20de%20Morais%2C%204636%20-%20Lagoa%20Nova%2C%20Natal%20-%20RN%2C%2059020-400!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr',
  googleMapsDirectionsUrl: 'https://maps.app.goo.gl/u1XvXQ5V9c7s6b6C9',
  businessHours: {
    weekdays: 'Segunda a Quinta: 17:00 às 23:00',
    saturday: 'Sexta a Domingo: 17:00 às 01:00',
    sunday: 'Domingo: 17:00 às 23:30',
  },
  colors: {
    primaryHex: '#dc2626', // Vermelho Pitts
    accentHex: '#fbbf24',  // Amarelo Mostarda
  },
  typography: {
    displayFontFamily: 'Lilita One',
    bodyFontFamily: 'Poppins',
    importUrl: 'https://fonts.googleapis.com/css2?family=Lilita+One&family=Poppins:wght@300;400;500;600;700&display=swap',
  },
  features: [
    {
      title: 'Carne Grelhada na Hora',
      description: 'Blend bovino 100% fresco, preparado na grelha para manter a suculência.',
      iconName: 'Flame',
    },
    {
      title: 'Entrega Rápida e Quente',
      description: 'Logística própria de entregas para garantir que o seu lanche chegue rápido.',
      iconName: 'Timer',
    },
    {
      title: 'Receitas Clássicas',
      description: 'O sabor tradicional do molho secreto Pitts e combinações desde 1984.',
      iconName: 'Utensils',
    },
  ],
  products: [
    {
      id: 'prod-1',
      name: 'Pitts Salada Clássico',
      description: 'Blend bovino de 120g grelhado, queijo derretido, alface fresca, tomate, cebola roxa e o clássico molho Pitts no pão com gergelim.',
      price: 'R$ 24,90',
      iconName: 'Utensils',
      imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prod-2',
      name: 'Super Pitts Especial',
      description: 'Dois blends suculentos de 120g, fatias de bacon crocante, ovo na chapa, queijo cheddar duplo e maionese artesanal no pão brioche.',
      price: 'R$ 36,90',
      iconName: 'Utensils',
      imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prod-3',
      name: 'Batata Frita Pitts & Milkshake',
      description: 'Nossas clássicas batatas fritas onduladas super crocantes acompanhadas por um generoso milkshake de 500ml sabor Ovomaltine.',
      price: 'R$ 19,90',
      iconName: 'Pizza',
      imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=600',
    },
  ],
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
};
