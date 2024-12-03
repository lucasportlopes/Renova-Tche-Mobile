export enum DonationCategory {
  APPLIANCES = 'Eletrodomésticos',
  CONSTRUCTION = 'Materiais de construção',
  OTHER = 'Outros'
}

export interface Donation {
  id: number;
  donorPhoto: string;
  donorName: string;
  itemName: string;
  itemAmount: number;
  photos: string[];
  address: string;
  status: DonationStatus;
  category: DonationCategory; // Nova propriedade
}

export enum DonationStatus {
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED'
}

const DonationsMock: Donation[] = [
  {
    id: 1,
    donorPhoto: 'https://randomuser.me/api/portraits/women/14.jpg',
    donorName: 'Maria',
    itemName: 'Panela',
    itemAmount: 1,
    photos: ['https://t4.ftcdn.net/jpg/02/33/56/39/360_F_233563961_kE9T55F8EoBCKpKuXnrXTV1bIgQIve7W.jpg', 'https://oxfordporcelanas.vteximg.com.br/arquivos/ids/183871-1000-1000/138751_Wok_01.jpg?v=638442904266470000', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8QLVaWyKXMGkOWa8LcFbn7OXahVEGwz1V6w&s', 'https://images.tcdn.com.br/img/img_prod/1130862/panela_de_ceramica_buffet_duo_28cm_2500ml_chocolate_3622_1_75110bf9dea80eda15c9c010192320f5.jpg', 'https://images.tcdn.com.br/img/img_prod/1143137/panela_parmegiana_alca_de_ferro_e_tampa_de_vidro_13x29cm_3l_525_1_fa9a9d6f7b940e68411afc4d8949b62b.jpg'],
    address: 'Rua Falsa 1234',
    status: DonationStatus.OPEN,
    category: DonationCategory.APPLIANCES
  },
  {
    id: 2,
    donorPhoto: 'https://randomuser.me/api/portraits/men/2.jpg',
    donorName: 'João',
    itemName: 'Tijolo',
    itemAmount: 100,
    photos: ['https://d5gag3xtge2og.cloudfront.net/producao/34360658/G/blocos_18.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0opE-XZ8sqta6K_9pKX2C5UdnmPX4g7-YIg&s', 'https://caculacentermat.com.br/upload/product/Zx1N08Mb1VoLj5NAq4jFqFLh7egxrMttzShBKovG.jpeg' ],
    address: 'Av Padre Cacique 891',
    status: DonationStatus.OPEN,
    category: DonationCategory.CONSTRUCTION

  },
  {
    id: 3,
    donorPhoto: 'https://randomuser.me/api/portraits/men/3.jpg',
    donorName: 'Pedro',
    itemName: 'Fogão',
    itemAmount: 100,
    photos: ['https://imgs.casasbahia.com.br/55056727/1g.jpg', 'https://a-static.mlcdn.com.br/800x560/fogao-de-piso-esmaltec-4-bocas-bali-4111/magazineluiza/236594000/3a0951df487cddcce368d55ad8438464.jpg' ],
    address: 'Av Padre Cacique 891',
    status: DonationStatus.OPEN,
    category: DonationCategory.APPLIANCES
  },
  {
    id: 4,
    donorPhoto: 'https://randomuser.me/api/portraits/men/4.jpg',
    donorName: 'Ronaldo',
    itemName: 'Telha',
    itemAmount: 100,
    photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0tV7fK9fqShYKSnCac14dAIjyf_899PLIjw&s', 'https://telhanorte.vtexassets.com/arquivos/ids/1234903/1402951.jpg?v=637957654629930000', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9TasrMLbQv5QaV-dm15tLfNA3mKh8kS0Tig&s' ],
    address: 'Av Padre Cacique 891',
    status: DonationStatus.OPEN,
    category: DonationCategory.CONSTRUCTION
  },
]

export default DonationsMock;

export const DonationsPhotosMock: string[] = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0tV7fK9fqShYKSnCac14dAIjyf_899PLIjw&s',
  'https://images.tcdn.com.br/img/img_prod/1143137/panela_parmegiana_alca_de_ferro_e_tampa_de_vidro_13x29cm_3l_525_1_fa9a9d6f7b940e68411afc4d8949b62b.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9TasrMLbQv5QaV-dm15tLfNA3mKh8kS0Tig&s',
  'https://telhanorte.vtexassets.com/arquivos/ids/1234903/1402951.jpg?v=637957654629930000',
  'https://imgs.casasbahia.com.br/55056727/1g.jpg',
  'https://d5gag3xtge2og.cloudfront.net/producao/34360658/G/blocos_18.jpg',
  'https://a-static.mlcdn.com.br/800x560/fogao-de-piso-esmaltec-4-bocas-bali-4111/magazineluiza/236594000/3a0951df487cddcce368d55ad8438464.jpg',
  'https://images.tcdn.com.br/img/img_prod/1130862/panela_de_ceramica_buffet_duo_28cm_2500ml_chocolate_3622_1_75110bf9dea80eda15c9c010192320f5.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0opE-XZ8sqta6K_9pKX2C5UdnmPX4g7-YIg&s',
]