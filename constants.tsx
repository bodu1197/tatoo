import React from 'react';
import { Tattoo, Artist, Review, Event, Chat, AdminUser, AnalyticsDataPoint, ArtistUser, Payment, ChatRoom, ChatMessage, GeneralUser } from './types';

export const ADMIN_USER: AdminUser & { password: string } = {
  id: 0,
  type: 'admin',
  name: 'Admin',
  email: 'admin@inkspot.com',
  password: 'adminpassword',
};

// For demonstration purposes, a sample general user who is logged in.
export const SAMPLE_USER: GeneralUser = {
  id: 101,
  type: 'general',
  name: 'Chris P.',
  email: 'chris@example.com',
};

export const TATTOOS: Tattoo[] = [
  { id: 1, imageUrl: 'https://picsum.photos/400/500?random=11', artistName: 'Luna Ink', artistAvatarUrl: 'https://picsum.photos/100/100?random=21', style: 'Fine Line', description: 'A delicate wildflower bouquet on the ankle, symbolizing growth and natural beauty.', tags: ['floral', 'minimalist', 'ankle'], artistType: 'TATTOO' },
  { id: 2, imageUrl: 'https://picsum.photos/400/500?random=12', artistName: 'Rexo', artistAvatarUrl: 'https://picsum.photos/100/100?random=22', style: 'Japanese', description: 'A powerful koi fish swimming upstream, representing perseverance and strength. Full back piece with vibrant colors.', tags: ['koi', 'irezumi', 'backpiece'], artistType: 'TATTOO' },
  { id: 3, imageUrl: 'https://picsum.photos/400/500?random=13', artistName: 'Aria Page', artistAvatarUrl: 'https://picsum.photos/100/100?random=23', style: 'Blackwork', description: 'An intricate mandala pattern on the forearm, composed of bold lines and geometric shapes.', tags: ['mandala', 'geometric', 'forearm'], artistType: 'TATTOO' },
  { id: 4, imageUrl: 'https://picsum.photos/400/500?random=14', artistName: 'Vex', artistAvatarUrl: 'https://picsum.photos/100/100?random=24', style: 'Neo-Traditional', description: 'A majestic stag with ornate, jeweled antlers. Features bold outlines and a rich color palette.', tags: ['animal', 'neotrad', 'chest'], artistType: 'TATTOO' },
  { id: 5, imageUrl: 'https://picsum.photos/400/500?random=15', artistName: 'Luna Ink', artistAvatarUrl: 'https://picsum.photos/100/100?random=21', style: 'Watercolor', description: 'A vibrant hummingbird in mid-flight, with splashes of color that mimic a watercolor painting.', tags: ['bird', 'watercolor', 'shoulder'], artistType: 'TATTOO' },
  { id: 6, imageUrl: 'https://picsum.photos/400/500?random=16', artistName: 'Rexo', artistAvatarUrl: 'https://picsum.photos/100/100?random=22', style: 'Geometric', description: 'A sacred geometry design on the sternum, featuring interlocking shapes and dotwork.', tags: ['sacred-geometry', 'dotwork', 'sternum'], artistType: 'TATTOO' },
  { id: 7, imageUrl: 'https://picsum.photos/400/500?random=17', artistName: 'Aria Page', artistAvatarUrl: 'https://picsum.photos/100/100?random=23', style: 'Realism', description: 'A hyper-realistic portrait of a lion, capturing intense emotion and detail in its eyes. Black and grey.', tags: ['lion', 'realism', 'bicep'], artistType: 'TATTOO' },
  { id: 8, imageUrl: 'https://picsum.photos/400/500?random=18', artistName: 'Vex', artistAvatarUrl: 'https://picsum.photos/100/100?random=24', style: 'Tribal', description: 'A classic Polynesian-inspired tribal band wrapping around the upper arm, with bold, flowing patterns.', tags: ['tribal', 'polynesian', 'armband'], artistType: 'TATTOO' },
  { id: 9, imageUrl: 'https://picsum.photos/400/500?random=19', artistName: 'Sienna Brows', artistAvatarUrl: 'https://picsum.photos/100/100?random=25', style: '눈썹', description: '자연스러운 엠보 기법으로 한올 한올 그린 듯한 눈썹.', tags: ['eyebrows', 'microblading', 'natural'], artistType: 'PMU' },
  { id: 10, imageUrl: 'https://picsum.photos/400/500?random=20', artistName: 'Sienna Brows', artistAvatarUrl: 'https://picsum.photos/100/100?random=25', style: '아이라인', description: '또렷하고 선명한 눈매를 위한 점막 아이라인.', tags: ['eyeliner', 'permanent-makeup'], artistType: 'PMU' },
];

// FIX: Changed type from Artist[] to ArtistUser[] and added 'type: "artist"' to each object.
export const ARTISTS: ArtistUser[] = [
  { id: 1, type: 'artist', name: 'Luna Ink', avatarUrl: 'https://picsum.photos/200/200?random=21', coverImageUrl: 'https://picsum.photos/800/400?random=61', bio: '10년 이상의 경력을 가진 Luna는 신체의 자연스러운 선과 흐르는 섬세하고 복잡한 디자인을 전문으로 합니다.\n\n그녀의 스튜디오는 예술과 피부가 만나는 고요한 공간입니다. 모든 타투는 개인적인 여정이라고 믿으며, 고객의 비전을 현실로 만들기 위해 긴밀하게 협력합니다.', infoImages: ['https://picsum.photos/600/400?random=71', 'https://picsum.photos/600/400?random=72'], specialty: 'Fine Line & Floral', rating: 4.9, reviewCount: 182, location: '서울특별시 강남구', artistType: 'TATTOO', email: 'artist@inkspot.com', password: 'password123', whatsapp: 'https://wa.me/821012345678', kakaoTalk: 'https://open.kakao.com/o/sExample', subscription: { tier: 'PREMIUM', expiryDate: '2099-12-31' }, status: 'active' },
  { id: 2, type: 'artist', name: 'Rexo', avatarUrl: 'https://picsum.photos/200/200?random=22', coverImageUrl: 'https://picsum.photos/800/400?random=62', bio: '전통 이레즈미의 대가 Rexo는 대담한 선과 생생한 색상으로 신화적인 이야기를 엮어냅니다.\n\n그의 작품은 힘, 명예, 그리고 인내라는 주제를 탐구하며, 각 작품은 착용자의 정신을 담은 걸작입니다.', infoImages: ['https://picsum.photos/600/400?random=73'], specialty: 'Japanese & Irezumi', rating: 4.8, reviewCount: 231, location: '부산광역시 해운대구', artistType: 'TATTOO', whatsapp: 'https://wa.me/821087654321', subscription: { tier: 'FREE', expiryDate: null }, status: 'active' },
  { id: 3, type: 'artist', name: 'Aria Page', avatarUrl: 'https://picsum.photos/200/200?random=23', coverImageUrl: 'https://picsum.photos/800/400?random=63', bio: 'Aria는 블랙워크와 기하학적 타투의 경계를 넓히는 비전 있는 아티스트입니다.\n\n그녀의 디자인은 복잡한 패턴과 완벽한 대칭이 특징이며, 고대 상징과 현대 미학에서 영감을 얻습니다.', infoImages: ['https://picsum.photos/600/400?random=74'], specialty: 'Blackwork & Geometric', rating: 5.0, reviewCount: 98, location: '서울특별시 마포구', artistType: 'TATTOO', kakaoTalk: 'https://open.kakao.com/o/sExample2', subscription: { tier: 'FREE', expiryDate: null }, status: 'active' },
  { id: 4, type: 'artist', name: 'Vex', avatarUrl: 'https://picsum.photos/200/200?random=24', coverImageUrl: 'https://picsum.photos/800/400?random=64', bio: '네오 트래디셔널 전문가인 Vex는 고전적인 타투 모티프에 현대적인 감각을 더합니다.\n\n그의 포트폴리오는 풍부한 색상, 굵은 윤곽선, 그리고 장식적인 디테일이 돋보이는 생동감 넘치는 작품들로 가득합니다.', infoImages: ['https://picsum.photos/600/400?random=75'], specialty: 'Neo-Traditional', rating: 4.9, reviewCount: 150, location: '경기도 수원시 팔달구', artistType: 'TATTOO', subscription: { tier: 'FREE', expiryDate: null }, status: 'active' },
  { id: 5, type: 'artist', name: 'Sienna Brows', avatarUrl: 'https://picsum.photos/200/200?random=25', coverImageUrl: 'https://picsum.photos/800/400?random=65', bio: 'Sienna는 타고난 아름다움을 반영구 화장으로 강조하는 데 열정을 쏟습니다.\n\n정밀함과 예술적인 안목으로 고객 개개인의 얼굴 특징에 맞는 완벽한 눈썹과 아이라인을 디자인합니다.', infoImages: ['https://picsum.photos/600/400?random=76'], specialty: '자연 눈썹 & 아이라인', rating: 4.9, reviewCount: 312, location: '서울특별시 강남구', artistType: 'PMU', kakaoTalk: 'https://open.kakao.com/o/sExample3', subscription: { tier: 'FREE', expiryDate: null }, status: 'active' },
];

export const EVENTS: Event[] = [
  {
    id: 1,
    artistName: 'Luna Ink',
    title: 'Autumn Floral Flash Event',
    imageUrl: 'https://picsum.photos/600/600?random=51',
    originalPrice: 300000,
    discountPrice: 200000,
    startDate: '2024-10-01',
    endDate: '2024-10-31',
    description: 'Embrace the autumn season with our special floral flash event. Choose from a variety of pre-drawn, delicate floral designs at a special discounted rate. Perfect for a first tattoo or a new addition to your collection. All designs are unique and will only be tattooed once.',
    artistType: 'TATTOO'
  },
  {
    id: 2,
    artistName: 'Luna Ink',
    title: 'Minimalist Wonders Discount',
    imageUrl: 'https://picsum.photos/600/600?random=52',
    originalPrice: 150000,
    discountPrice: 100000,
    startDate: '2024-11-01',
    endDate: '2024-11-15',
    description: 'For two weeks only, get any minimalist design (under 5cm) for a fixed price. This is a great opportunity to get that tiny tattoo you\'ve always wanted. Bring your own idea or choose from my available flash sheets.',
    artistType: 'TATTOO'
  },
   {
    id: 3,
    artistName: 'Aria Page',
    title: 'Geometric & Blackwork Sale',
    imageUrl: 'https://picsum.photos/600/600?random=53',
    originalPrice: 500000,
    discountPrice: 350000,
    startDate: '2024-09-20',
    endDate: '2024-10-20',
    description: 'Book a full-day session for a large-scale geometric or blackwork piece and receive a 30% discount. Let\'s create something bold and breathtaking together. Consultation is required before booking.',
    artistType: 'TATTOO'
  },
  {
    id: 4,
    artistName: 'Sienna Brows',
    title: '여름맞이 반영구 할인 이벤트',
    imageUrl: 'https://picsum.photos/600/600?random=54',
    originalPrice: 250000,
    discountPrice: 180000,
    startDate: '2024-07-01',
    endDate: '2024-07-31',
    description: '여름 휴가 시즌을 맞아 자연스러운 눈썹과 아이라인으로 민낯 자신감을 찾아보세요! 7월 한 달간 특별 할인가로 진행됩니다.',
    artistType: 'PMU'
  },
];

export const PAYMENTS: Payment[] = [
    { id: 'pay_1', artistId: 2, artistName: 'Rexo', planName: '1개월 플랜', amount: 30000, paymentDate: '2024-05-15', newExpiryDate: '2024-06-15' },
    { id: 'pay_2', artistId: 3, artistName: 'Aria Page', planName: '3개월 플랜', amount: 81000, paymentDate: '2024-06-01', newExpiryDate: '2024-09-01' },
    { id: 'pay_3', artistId: 4, artistName: 'Vex', planName: '1개월 플랜', amount: 30000, paymentDate: '2024-06-20', newExpiryDate: '2024-07-20' },
    { id: 'pay_4', artistId: 2, artistName: 'Rexo', planName: '1개월 플랜', amount: 30000, paymentDate: '2024-06-16', newExpiryDate: '2024-07-16' },
];

export const CHATS: Chat[] = [
  {
    id: 1,
    participantName: 'Luna Ink',
    participantAvatarUrl: 'https://picsum.photos/100/100?random=21',
    lastMessage: '네, 예약 가능합니다! 언제쯤 방문하시겠어요?',
    timestamp: '2시간 전',
    unreadCount: 1,
  },
  {
    id: 2,
    participantName: 'Aria Page',
    participantAvatarUrl: 'https://picsum.photos/100/100?random=23',
    lastMessage: '디자인 상담은 이번 주 금요일 오후에 가능해요.',
    timestamp: '어제',
    unreadCount: 0,
  },
  {
    id: 3,
    participantName: 'Rexo',
    participantAvatarUrl: 'https://picsum.photos/100/100?random=22',
    lastMessage: '도안 확인 부탁드립니다.',
    timestamp: '3일 전',
    unreadCount: 0,
  },
];

export const CHAT_ROOMS: ChatRoom[] = [
  { id: 1001, participant_ids: [101, 1], created_at: '2024-07-21T10:00:00Z', last_message_text: '네, 예약 가능합니다! 언제쯤 방문하시겠어요?', last_message_timestamp: '2024-07-22T14:30:00Z', unread_count: 1 },
  { id: 1002, participant_ids: [101, 3], created_at: '2024-07-20T11:00:00Z', last_message_text: '디자인 상담은 이번 주 금요일 오후에 가능해요.', last_message_timestamp: '2024-07-21T18:00:00Z', unread_count: 0 },
];

export const MESSAGES: ChatMessage[] = [
    { id: 2001, chat_room_id: 1001, sender_id: 101, content: '안녕하세요, 팔뚝에 있는 들꽃 타투 문의드려요.', created_at: '2024-07-22T14:28:00Z' },
    { id: 2002, chat_room_id: 1001, sender_id: 1, content: '네, 안녕하세요! 어떤 스타일로 생각하고 계신가요?', created_at: '2024-07-22T14:29:00Z' },
    { id: 2003, chat_room_id: 1001, sender_id: 1, content: '네, 예약 가능합니다! 언제쯤 방문하시겠어요?', created_at: '2024-07-22T14:30:00Z' },
    { id: 2004, chat_room_id: 1002, sender_id: 101, content: '기하학적인 사자 디자인으로 상담받고 싶습니다.', created_at: '2024-07-21T17:59:00Z' },
    { id: 2005, chat_room_id: 1002, sender_id: 3, content: '디자인 상담은 이번 주 금요일 오후에 가능해요.', created_at: '2024-07-21T18:00:00Z' },
];

export const KOREA_LOCATIONS: { [key: string]: string[] } = {
  '서울특별시': ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
  '부산광역시': ['강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'],
  '경기도': ['수원시 장안구', '수원시 권선구', '수원시 팔달구', '수원시 영통구', '성남시 수정구', '성남시 중원구', '성남시 분당구', '고양시 덕양구', '고양시 일산동구', '고양시 일산서구', '용인시 처인구', '용인시 기흥구', '용인시 수지구', '부천시', '안산시 상록구', '안산시 단원구', '안양시 만안구', '안양시 동안구'],
  '인천광역시': ['계양구', '미추홀구', '남동구', '동구', '부평구', '서구', '연수구', '중구', '강화군', '옹진군'],
  '대구광역시': ['남구', '달서구', '동구', '북구', '서구', '수성구', '중구', '달성군'],
  '광주광역시': ['광산구', '남구', '동구', '북구', '서구'],
  '대전광역시': ['대덕구', '동구', '서구', '유성구', '중구'],
  '울산광역시': ['남구', '동구', '북구', '중구', '울주군'],
};

export const TATTOO_STYLES: string[] = [
  'Fine Line', 'Japanese', 'Blackwork', 'Neo-Traditional', 'Watercolor', 'Geometric', 'Realism', 'Tribal', 'Minimalist'
];

export const PMU_STYLES: string[] = [
  '눈썹', '아이라인', '입술', '헤어라인'
];

export const REVIEWS: Review[] = [
  { id: 1, tattooId: 1, userName: 'Alex R.', userAvatarUrl: 'https://picsum.photos/100/100?random=31', rating: 5, comment: 'Luna was incredible! She brought my idea to life better than I could have imagined. So gentle and professional.', tattooImageUrl: 'https://picsum.photos/300/200?random=41', artistName: 'Luna Ink' },
  { id: 2, tattooId: 2, userName: 'Jessie M.', userAvatarUrl: 'https://picsum.photos/100/100?random=32', rating: 5, comment: 'Rexo is a true master of Japanese style. The detail in my sleeve is breathtaking. Worth every penny and the wait.', tattooImageUrl: 'https://picsum.photos/300/200?random=42', artistName: 'Rexo' },
  { id: 3, tattooId: 3, userName: 'Sam K.', userAvatarUrl: 'https://picsum.photos/100/100?random=33', rating: 5, comment: 'Aria is a genius with linework. The studio was clean, and she made the whole process comfortable and exciting.', tattooImageUrl: 'https://picsum.photos/300/200?random=43', artistName: 'Aria Page' },
  { id: 4, tattooId: 4, userName: 'Mike L.', userAvatarUrl: 'https://picsum.photos/100/100?random=34', rating: 5, comment: 'A fantastic experience from start to finish. Vex is a true professional and his neo-traditional work is top-notch.', tattooImageUrl: 'https://picsum.photos/300/200?random=44', artistName: 'Vex' },
  { id: 5, tattooId: 9, userName: 'Yuna K.', userAvatarUrl: 'https://picsum.photos/100/100?random=35', rating: 5, comment: '시에나님 덕분에 아침 화장 시간이 엄청 줄었어요! 눈썹 모양도 너무 자연스럽고 예쁘게 잘 잡아주셨어요. 완전 추천합니다!', tattooImageUrl: 'https://picsum.photos/300/200?random=45', artistName: 'Sienna Brows' },
];

export const ANALYTICS_DATA: { [key: string]: AnalyticsDataPoint[] } = {
  hourly: Array.from({ length: 24 }, (_, i) => ({ label: `${i}:00`, value: Math.floor(Math.random() * 50) + 10 })),
  daily: Array.from({ length: 30 }, (_, i) => ({ label: `Day ${i + 1}`, value: Math.floor(Math.random() * 500) + 100 })),
  monthly: [
    { label: 'Jan', value: 12030 }, { label: 'Feb', value: 15234 }, { label: 'Mar', value: 17895 },
    { label: 'Apr', value: 16432 }, { label: 'May', value: 19876 }, { label: 'Jun', value: 22103 },
    { label: 'Jul', value: 21567 }, { label: 'Aug', value: 23010 }, { label: 'Sep', value: 20123 },
    { label: 'Oct', value: 18945 }, { label: 'Nov', value: 20567 }, { label: 'Dec', value: 25234 },
  ],
  yearly: [
    { label: '2021', value: 150234 }, { label: '2022', value: 180567 },
    { label: '2023', value: 240123 }, { label: '2024', value: 280543 },
  ],
};

// FIX: Define a common interface for icon props and use React.FC to correctly type icon components.
interface IconProps {
    className: string;
}

export const StarIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434L10.788 3.21z" clipRule="evenodd" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);

export const TattooIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 0 0 5.252m0-5.252a3 3 0 0 1 0 5.252m0-5.252v5.252m0-5.252a3 3 0 0 0-2.122 5.252m2.122-5.252a3 3 0 0 1 2.122 5.252m0 0a3.002 3.002 0 0 0 3.65 1.482.998.998 0 0 0 .65-.979V9.75a.998.998 0 0 0-.65-.979A3.002 3.002 0 0 0 9.97 13.5m0 0a4.495 4.495 0 0 0-4.425 2.256C4.878 17.083 3.75 18.44 3.75 20.25a2.25 2.25 0 0 0 4.5 0c0-1.81-1.128-3.167-1.975-4.494m10.025-4.494a4.5 4.5 0 0 1 4.425 2.256c.847 1.327 1.975 2.684 1.975 4.494a2.25 2.25 0 0 1-4.5 0c0-1.81 1.128-3.167 1.975-4.494m-1.425 0a3.002 3.002 0 0 1-3.65 1.482.998.998 0 0 1-.65-.979V9.75a.998.998 0 0 1 .65-.979A3.002 3.002 0 0 1 18.03 13.5" />
    </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
    </svg>
);

export const UserGroupIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962c.513-.513.513-1.348 0-1.86l-2.034-2.034c-.513-.513-1.348-.513-1.86 0l-2.034 2.034c-.513.513-.513 1.348 0 1.86l2.034 2.034c.513.513 1.348.513 1.86 0l2.034-2.034M12 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-7.53 4.53a9.043 9.043 0 0 1 12.727 0M12 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const MagnifyingGlassIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);

export const UserCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

export const MapPinIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);

export const SolidHeartIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);

export const ShareIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.186 2.25 2.25 0 0 0-3.933 2.186Z" />
    </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.05 4.94A10 10 0 0 0 12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.59 1.37 5.04L2 22l5.04-1.37C8.41 21.5 10.15 22 12 22h.01c5.52 0 10-4.48 10-9.99a9.96 9.96 0 0 0-2.96-7.07zM12 20.15c-1.49 0-2.9-.4-4.14-1.11l-.3-.18-3.08.81.82-3.02-.2-.31A8.2 8.2 0 0 1 3.85 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8.15-8 8.15zM16.56 13.99c-.18-.09-1.06-.52-1.22-.58-.17-.06-.29-.09-.42.09-.13.18-.46.58-.57.7-.1.12-.21.13-.39.04-.18-.09-1.26-.46-2.4-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.08-.57.09-.1.21-.26.31-.39.1-.12.13-.21.2-.36.06-.14 0-.28-.05-.37-.05-.09-.42-1.01-.57-1.38-.15-.36-.3-.31-.42-.31h-.3c-.12 0-.31.04-.47.22-.17.18-.65.64-.65 1.57 0 .92.67 1.81.76 1.95.09.14 1.32 2.06 3.2 2.88.45.19.8.3.98.38.3.13.58.11.79-.08.24-.2.65-.78.74-.92.09-.14.09-.27 0-.36l-.18-.27z" />
    </svg>
);

export const KakaoTalkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M2 3.5C2 2.67 2.67 2 3.5 2h17c.83 0 1.5.67 1.5 1.5V15.5c0 .83-.67 1.5-1.5 1.5h-5.5l-4 4v-4H3.5C2.67 17 2 16.33 2 15.5V3.5z" />
    </svg>
);

export const ChatBubbleIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a.75.75 0 0 1-1.06 0l-3.72-3.72A2.25 2.25 0 0 1 9 17.25v-4.286c0-.97.616-1.813 1.5-2.097m6.75 0a4.5 4.5 0 0 0-7.5 0" />
    </svg>
);

export const XMarkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>
);

export const PhotoIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const FacebookIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export const PinterestIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.084-.336-.14-1.12-.032-1.62.108-.492.68-2.88.68-2.88s-.176-.352-.176-.872c0-.813.472-1.422 1.06-1.422.5 0 .736.375.736.822 0 .5-.32 1.25-.484 1.944-.136.578.296 1.05.872 1.05.992 0 1.768-1.24 1.768-3.054 0-1.536-1.016-2.652-2.3-2.652-1.616 0-2.552 1.21-2.552 2.446 0 .47.16.98.376 1.282.072.102.084.18.06.282-.024.12-.084.336-.12.492-.024.12-.084.18-.176.156-1.004-.372-1.632-1.572-1.632-2.784 0-2.148 1.572-4.044 4.584-4.044 2.412 0 4.224 1.74 4.224 3.864 0 2.454-1.356 4.35-3.216 4.35-.636 0-1.236-.324-1.44-.708 0 0-.324 1.284-.408 1.62-.12.516-.48.972-.708 1.32.96.324 2.004.504 3.096.504 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
);

export const FunnelIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3 8.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3 12.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" />
    </svg>
);

export const CalendarDaysIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M12 12.75h.008v.008H12v-.008Z" />
    </svg>
);

export const TagIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
    </svg>
);

export const PlusCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const KakaoLoginIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 5.58 2 10.01c0 2.65 1.55 4.98 3.86 6.26L4.5 22l3.86-2.31c1.12.35 2.3.54 3.53.54 5.52 0 10-3.58 10-7.99C22 5.58 17.52 2 12 2z" />
    </svg>
);

export const AppleLoginIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.182 14.332c-.75.882-1.782 1.632-3.083 1.632-1.301 0-2.148-.73-3.218-2.18-.944-1.28-1.765-3.3-1.07-5.06.74-1.87 2.304-2.92 3.99-2.92.83 0 1.9.36 2.76.99-.1.02-.12.02-3.08.97-.13.04-1.25.4-1.25 1.95 0 1.34.8 1.83 1.05 1.95l.02.01c2.14.73 3.48-.36 3.73-.55-.13.19-.07.29-.07.31.22.42.34.87.34 1.34 0 .59-.22 1.25-.63 1.88zm-5.08-9.06c.92-.01 2.01.59 2.59 1.34-.69.51-1.63.88-2.61.88-1.09 0-2.03-.51-2.64-1.23-.05.02.49.03 1.15.03.88-.02 1.43-.02 1.51-.02z" />
  </svg>
);

export const LineLoginIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.5,2H3.5A1.5,1.5,0,0,0,2,3.5v17A1.5,1.5,0,0,0,3.5,22h17A1.5,1.5,0,0,0,22,20.5V3.5A1.5,1.5,0,0,0,20.5,2ZM9,17H6V8h3Zm2.5-9H14v9H11.5ZM18,17H15V12.5a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5V17H10.5V8H13v.9A2.6,2.6,0,0,1,15.5,8c1.9,0,2.5,1.3,2.5,3Z"/>
    </svg>
);

export const GoogleLoginIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.35 11.1h-9.2v2.8h5.4c-.2 1.2-1.2 2.8-3.1 2.8-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2c1.1 0 1.9.4 2.3 1l2.1-2.1c-1.4-1.3-3.2-2.1-5.4-2.1-4.4 0-8 3.6-8 8s3.6 8 8 8c4.6 0 7.7-3.2 7.7-7.8 0-.5-.1-.9-.2-1.3z" />
  </svg>
);

export const PencilSquareIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 4.811 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

export const EyeIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const Cog6ToothIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.26.713.53.992l.89.89c.432.432.432 1.131 0 1.563l-.89.89c-.27.279-.467.618-.53.992l-.213 1.281c-.09.543-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.26-.713-.53-.992l-.89-.89c-.432-.432-.432-1.131 0 1.563l.89.89c.27-.279.467-.618-.53-.992l.213-1.281Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a.75.75 0 0 1-1.06 0l-3.72-3.72A2.25 2.25 0 0 1 9 17.25v-4.286c0-.97.616-1.813 1.5-2.097m6.75 0a4.5 4.5 0 0 0-7.5 0" />
    </svg>
);

export const PaperAirplaneIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
);

export const CrownIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M17 6a3 3 0 01-3 3h-1.625a.75.75 0 01-.564-.233l-1.406-1.875a.75.75 0 00-1.125 0L7.875 8.767a.75.75 0 01-.564.233H5.625a3 3 0 01-2.248-5.025l1.08-1.235A.75.75 0 015 2.25h10a.75.75 0 01.543.255l1.08 1.235A3 3 0 0117 6zM5.625 10a2.25 2.25 0 00-2.248 2.023l.08 1.328a.75.75 0 00.742.699h12.5a.75.75 0 00.742-.699l.08-1.328A2.25 2.25 0 0014.375 10h-8.75z" clipRule="evenodd" />
    </svg>
);

export const CreditCardIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3.375m-3.375 0h3.375m-3.375 0h3.375m9.75 0h-9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const ChartBarIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-2.253M15 19.128v-3.863M15 19.128A9.337 9.337 0 0 1 12 21a9.337 9.337 0 0 1-3-5.372M9 19.128v-3.863M9 19.128A9.337 9.337 0 0 0 12 21a9.337 9.337 0 0 0 3-5.372m0-3.863a3.375 3.375 0 0 0-3-3.375m-3 3.375a3.375 3.375 0 0 1 3-3.375M9 15.265A9.337 9.337 0 0 1 12 21a9.337 9.337 0 0 1 3-5.735M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const UserPlusIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
    </svg>
);

export const MegaphoneIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 3.34a1.5 1.5 0 0 1 3.32 0l.942 3.14a1.5 1.5 0 0 0 1.415 1.057l3.298-.01a1.5 1.5 0 0 1 1.5 1.5v5.376a1.5 1.5 0 0 1-.66 1.258l-4.32 2.88a1.5 1.5 0 0 1-1.68 0l-4.32-2.88a1.5 1.5 0 0 1-.66-1.258V9.027a1.5 1.5 0 0 0 1.415-1.057l.942-3.14zM4.5 16.5l.23-1.03a1.5 1.5 0 0 1 1.44-1.04h.28a1.5 1.5 0 0 1 1.44 1.04l.23 1.03m-3.62 0a1.5 1.5 0 0 0-1.44 1.04l-.16.72a1.5 1.5 0 0 0 1.44 1.96h.32a1.5 1.5 0 0 0 1.44-1.96l-.16-.72a1.5 1.5 0 0 0-1.44-1.04h-.04z" />
    </svg>
);

export const DocumentDuplicateIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375m7.5-10.375a9.06 9.06 0 0 1 1.5.124" />
    </svg>
);

export const CurrencyWonIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5h7.5m-7.5 3h7.5m-7.5 3h7.5m3-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-6.75 10.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Zm3.75 0a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Z" />
    </svg>
);

export const ClipboardIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 0 1-2.25 2.25H9.75A2.25 2.25 0 0 1 7.5 4.5v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
  </svg>
);