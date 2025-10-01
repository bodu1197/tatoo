export interface Tattoo {
  id: number;
  imageUrl: string;
  artistName: string;
  artistAvatarUrl: string;
  style: string;
  description?: string;
  tags?: string[];
  artistType: 'TATTOO' | 'PMU';
}

export interface Artist {
  id: number;
  name: string;
  avatarUrl: string;
  coverImageUrl?: string;
  bio?: string;
  infoImages?: string[];
  specialty: string;
  rating: number;
  reviewCount: number;
  location: string;
  artistType: 'TATTOO' | 'PMU';
  email?: string;
  password?: string; // In a real app, this would be a hash
  whatsapp?: string;
  kakaoTalk?: string;
  subscription: {
    tier: 'FREE' | 'PREMIUM';
    expiryDate: string | null; // YYYY-MM-DD format
  };
  status: 'pending' | 'active' | 'rejected';
}

export interface Review {
  id: number;
  userName: string;
  userAvatarUrl: string;
  rating: number;
  comment: string;
  tattooImageUrl: string;
  artistName: string;
  tattooId?: number;
}

export interface Event {
  id: number;
  artistName: string;
  title: string;
  imageUrl: string;
  originalPrice: number;
  discountPrice: number;
  startDate: string;
  endDate: string;
  description: string;
  artistType: 'TATTOO' | 'PMU';
}

export interface GeneralUser {
  id: number; // Added for unique identification in chat
  type: 'general';
  name: string;
  email: string;
}

export interface AdminUser {
  id: number;
  type: 'admin';
  name: string;
  email: string;
}

export interface ArtistUser extends Artist {
  type: 'artist';
}

export type LoggedInUser = ArtistUser | GeneralUser | AdminUser;

export type User = LoggedInUser | null;

// Kept for legacy compatibility with static data
export interface Chat {
  id: number;
  participantName: string;
  participantAvatarUrl: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

// Supabase-style chat data structures
export interface ChatRoom {
  id: number;
  participant_ids: number[];
  created_at: string;
  last_message_text?: string;
  last_message_timestamp?: string;
  // In a real app, unread count would be managed per-user in a separate table.
  // For simulation, we can add it here.
  unread_count?: number; 
}

export interface ChatMessage {
  id: number;
  chat_room_id: number;
  sender_id: number;
  content: string;
  created_at: string;
}


export interface AnalyticsDataPoint {
  label: string;
  value: number;
}

export interface Payment {
    id: string;
    artistId: number;
    artistName: string;
    planName: string;
    amount: number;
    paymentDate: string; // YYYY-MM-DD
    newExpiryDate: string;
}

// FIX: Added and exported the Plan interface to be shared.
export interface Plan {
    months: number;
    title: string;
    pricePerMonth: number;
    totalPrice: number;
    discount?: string;
    popular?: boolean;
}

// FIX: Moved View and MyPageView types here to be shared across components.
export type View = 'HOME' | 'ARTISTS' | 'SEARCH' | 'AI_ZONE' | 'EVENTS' | 'MYPAGE' | 'ADMIN' | 'SEARCH_RESULTS' | 'COMPANY' | 'TERMS' | 'PRIVACY' | 'SUPPORT';
export type MyPageView = 'DASHBOARD' | 'EDIT_PROFILE' | 'CHAT_HISTORY' | 'MANAGE_PLAN';
export type AdminView = 'DASHBOARD' | 'APPROVAL' | 'USERS' | 'ANALYTICS' | 'ADS' | 'CONTENT' | 'REVENUE';

export const isArtistPremium = (artist: Artist): boolean => {
    if (artist.subscription.tier !== 'PREMIUM') return false;
    if (!artist.subscription.expiryDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare dates only
    return new Date(artist.subscription.expiryDate) >= today;
};