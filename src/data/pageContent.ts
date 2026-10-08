import type { ContactTopicId, PaymentMethod } from '../types/store'

interface InfoSection {
  heading: string
  paragraphs: string[]
}

interface InfoPageContent {
  title: string
  description: string
  sections: InfoSection[]
}

interface FaqItem {
  question: string
  answer: string
}

interface SubscriptionPlan {
  id: string
  name: string
  priceInCents: number
  period: string
  benefits: string[]
}

interface ContactTopic {
  title: string
  description: string
  subjects: string[]
  messageLabel: string
}

export const INFO_PAGES: Record<string, InfoPageContent> = {
  sobre: {
    title: 'Sobre nós',
    description: 'Conheça a história e os valores da Econverse.',
    sections: [
      {
        heading: 'Quem somos',
        paragraphs: [
          'A Econverse nasceu para tornar a compra online simples, segura e próxima de quem compra.',
          'Reunimos tecnologia, casa e estilo em uma única loja, com curadoria de produtos e parceiros.',
        ],
      },
      {
        heading: 'No que acreditamos',
        paragraphs: [
          'Transparência em preços e prazos, atendimento humano e respeito aos dados de cada cliente.',
        ],
      },
    ],
  },
  movimento: {
    title: 'Movimento',
    description: 'Ações da Econverse por um consumo mais consciente.',
    sections: [
      {
        heading: 'Embalagens responsáveis',
        paragraphs: ['Usamos embalagens recicláveis e do tamanho certo para cada pedido, reduzindo desperdício.'],
      },
      {
        heading: 'Logística reversa',
        paragraphs: ['Recebemos eletrônicos usados para descarte correto em todos os pontos de coleta parceiros.'],
      },
    ],
  },
  termos: {
    title: 'Termos e condições',
    description: 'Regras de uso da loja e das compras realizadas no site.',
    sections: [
      {
        heading: 'Uso do site',
        paragraphs: ['Ao navegar e comprar na Econverse, você concorda com estes termos e com a política de privacidade.'],
      },
      {
        heading: 'Preços e pagamentos',
        paragraphs: [
          'Os preços podem mudar sem aviso prévio. O valor válido é o exibido no momento da finalização do pedido.',
          'Compras no cartão podem ser parceladas em até 2 vezes sem juros.',
        ],
      },
    ],
  },
  privacidade: {
    title: 'Política de privacidade',
    description: 'Como tratamos as suas informações pessoais.',
    sections: [
      {
        heading: 'Dados armazenados',
        paragraphs: [
          'Nesta versão da loja, carrinho, favoritos, pedidos e cadastro ficam salvos apenas no seu navegador.',
          'Você pode apagar todas essas informações a qualquer momento na página Minha conta.',
        ],
      },
      {
        heading: 'Seus direitos',
        paragraphs: ['Você pode consultar, corrigir ou excluir seus dados quando quiser, conforme a LGPD.'],
      },
    ],
  },
  'troca-e-devolucao': {
    title: 'Troca e devolução',
    description: 'Prazos e condições para trocar ou devolver um produto.',
    sections: [
      {
        heading: 'Arrependimento',
        paragraphs: ['Você tem até 7 dias corridos após o recebimento para desistir da compra, sem custo.'],
      },
      {
        heading: 'Defeito',
        paragraphs: ['Produtos com defeito podem ser trocados em até 30 dias. Fale com o suporte para iniciar o processo.'],
      },
    ],
  },
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Qual é o prazo de entrega?',
    answer: 'O prazo varia de 2 a 7 dias úteis, conforme a sua região. Ele aparece na confirmação do pedido.',
  },
  {
    question: 'O frete é grátis?',
    answer: 'Sim. Todos os produtos da vitrine têm frete grátis para todo o Brasil.',
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer: 'Pix, boleto bancário e cartão de crédito em até 2 vezes sem juros.',
  },
  {
    question: 'Onde vejo meus pedidos?',
    answer: 'Em Meus pedidos, no ícone de caixa do cabeçalho. Lá você vê o resumo e pode comprar novamente.',
  },
  {
    question: 'Meus dados ficam salvos?',
    answer: 'Sim, apenas neste navegador. Você pode apagar tudo pela página Minha conta.',
  },
]

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'mensal',
    name: 'Econverse+ Mensal',
    priceInCents: 1990,
    period: 'por mês',
    benefits: ['Frete expresso grátis', 'Ofertas antecipadas', 'Cancelamento a qualquer momento'],
  },
  {
    id: 'anual',
    name: 'Econverse+ Anual',
    priceInCents: 19990,
    period: 'por ano',
    benefits: ['Tudo do plano mensal', 'Dois meses grátis', 'Cupom de boas-vindas de 10%'],
  },
]

export const CONTACT_TOPICS: Record<ContactTopicId, ContactTopic> = {
  contato: {
    title: 'Fale conosco',
    description: 'Envie sua dúvida, sugestão ou elogio. Respondemos em até 1 dia útil.',
    subjects: ['Dúvida', 'Sugestão', 'Elogio', 'Reclamação'],
    messageLabel: 'Mensagem',
  },
  suporte: {
    title: 'Suporte',
    description: 'Precisa de ajuda com um pedido? Conte o que aconteceu e informe o número do pedido.',
    subjects: ['Pedido atrasado', 'Produto com defeito', 'Troca ou devolução', 'Pagamento'],
    messageLabel: 'Descreva o problema',
  },
  'trabalhe-conosco': {
    title: 'Trabalhe conosco',
    description: 'Quer fazer parte do time? Conte um pouco sobre você e a área de interesse.',
    subjects: ['Tecnologia', 'Atendimento', 'Logística', 'Marketing'],
    messageLabel: 'Fale sobre sua experiência',
  },
}

export const PAYMENT_METHODS: Record<PaymentMethod, string> = {
  pix: 'Pix',
  cartao: 'Cartão de crédito (até 2x sem juros)',
  boleto: 'Boleto bancário',
}
