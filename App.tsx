
import React, { useState, useMemo, lazy, Suspense, useEffect, useRef } from 'react';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './components/HomePage';
import { TATTOOS as INITIAL_TATTOOS, ARTISTS as INITIAL_ARTISTS, REVIEWS, EVENTS, PAYMENTS, WhatsAppIcon, KakaoTalkIcon, ChatBubbleIcon, CHAT_ROOMS as INITIAL_CHAT_ROOMS, MESSAGES as INITIAL_MESSAGES, SAMPLE_USER } from './constants';
import type { Tattoo, Event, User, LoggedInUser, Review, ArtistUser, View, MyPageView, Payment, Plan, ChatRoom, ChatMessage } from './types';
import { Footer } from './components/Footer';

// Lazy load page components for code splitting and faster initial loads
const ArtistProfilePage = lazy(() => import('./components/ArtistProfilePage').then(module => ({ default: module.ArtistProfilePage })));
const TattooDetailPage = lazy(() => import('./components/TattooDetailPage').then(module => ({ default: module.TattooDetailPage })));
const EventDetailPage = lazy(() => import('./components/EventDetailPage').then(module => ({ default: module.EventDetailPage })));
const ArtistSearchPage = lazy(() => import('./components/ArtistSearchPage').then(module => ({ default: module.ArtistSearchPage })));
const TattooSearchPage = lazy(() => import('./components/TattooSearchPage').then(module => ({ default: module.TattooSearchPage })));
const EventListPage = lazy(() => import('./components/EventListPage').then(module => ({ default: module.EventListPage })));
const CreateEventPage = lazy(() => import('./components/CreateEventPage').then(module => ({ default: module.CreateEventPage })));
const MyPage = lazy(() => import('./components/MyPage').then(module => ({ default: module.MyPage })));
const ArtistDashboardPage = lazy(() => import('./components/ArtistDashboardPage').then(module => ({ default: module.ArtistDashboardPage })));
const GeneralUserDashboardPage = lazy(() => import('./components/GeneralUserDashboardPage').then(module => ({ default: module.GeneralUserDashboardPage })));
const EditProfilePage = lazy(() => import('./components/EditProfilePage').then(module => ({ default: module.EditProfilePage })));
const ChatListPage = lazy(() => import('./components/ChatHistoryPage').then(module => ({ default: module.ChatHistoryPage })));
const ChatPage = lazy(() => import('./components/ChatPage').then(module => ({ default: module.ChatPage })));
const PlanPage = lazy(() => import('./components/PlanPage').then(module => ({ default: module.PlanPage })));
const AdminPage = lazy(() => import('./components/admin/AdminPage').then(module => ({ default: module.AdminPage })));
const SearchResultsPage = lazy(() => import('./components/SearchResultsPage').then(module => ({ default: module.SearchResultsPage })));
const CompanyPage = lazy(() => import('./components/CompanyPage').then(module => ({ default: module.CompanyPage })));
const TermsPage = lazy(() => import('./components/TermsPage').then(module => ({ default: module.TermsPage })));
const PrivacyPage = lazy(() => import('./components/PrivacyPage').then(module => ({ default: module.PrivacyPage })));
const SupportPage = lazy(() => import('./components/SupportPage').then(module => ({ default: module.SupportPage })));
const AIZonePage = lazy(() => import('./components/AIZonePage').then(module => ({ default: module.AIZonePage })));
const UploadTattooPage = lazy(() => import('./components/UploadTattooPage').then(module => ({ default: module.UploadTattooPage })));

const LoadingComponent = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-900">
    <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-cyan-400"></div>
  </div>
);

const ArtistProfileFooter = ({ artist, onStartChat }: { artist: ArtistUser; onStartChat: (artistId: number) => void; }) => (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 z-40">
      <div className="max-w-[720px] mx-auto flex items-stretch justify-around gap-2 p-2 sm:gap-3 sm:p-3">
        {artist.whatsapp ? (
          <a
            href={artist.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-2 sm:px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <span className="whitespace-nowrap">WhatsApp</span>
          </a>
        ) : (
          <button
            disabled
            className="flex-1 bg-gray-600 text-gray-400 font-bold py-3 px-2 sm:px-4 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed text-sm"
          >
            <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <span className="whitespace-nowrap">WhatsApp</span>
          </button>
        )}
        {artist.kakaoTalk ? (
          <a
            href={artist.kakaoTalk}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-2 sm:px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <KakaoTalkIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <span className="whitespace-nowrap">카카오톡</span>
          </a>
        ) : (
          <button
            disabled
            className="flex-1 bg-gray-600 text-gray-400 font-bold py-3 px-2 sm:px-4 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed text-sm"
          >
            <KakaoTalkIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <span className="whitespace-nowrap">카카오톡</span>
          </button>
        )}
        <button onClick={() => onStartChat(artist.id)} className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-2 sm:px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
          <ChatBubbleIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
          <span className="whitespace-nowrap">채팅하기</span>
        </button>
      </div>
    </footer>
);

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('HOME');
  const [previousView, setPreviousView] = useState<View | null>(null);
  const [myPageView, setMyPageView] = useState<MyPageView>('DASHBOARD');
  const [searchQuery, setSearchQuery] = useState('');

  const [allArtists, setAllArtists] = useState<ArtistUser[]>(INITIAL_ARTISTS);
  const [allTattoos, setAllTattoos] = useState<Tattoo[]>(INITIAL_TATTOOS);
  const [selectedArtist, setSelectedArtist] = useState<ArtistUser | null>(null);
  const [selectedTattoo, setSelectedTattoo] = useState<Tattoo | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [allEvents, setAllEvents] = useState<Event[]>(EVENTS);
  const [allReviews, setAllReviews] = useState<Review[]>(REVIEWS);
  const [allPayments, setAllPayments] = useState<Payment[]>(PAYMENTS);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [isUploadingTattoo, setIsUploadingTattoo] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(SAMPLE_USER);
  const [likedTattoos, setLikedTattoos] = useState<Set<number>>(new Set());
  const [likedArtists, setLikedArtists] = useState<Set<number>>(new Set());

  // --- CHAT STATE ---
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(INITIAL_CHAT_ROOMS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [activeChatRoomId, setActiveChatRoomId] = useState<number | null>(null);
  // --- END CHAT STATE ---

  // --- NOTIFICATION STATE & REFS ---
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const notificationAudioRef = useRef<HTMLAudioElement | null>(null);
  if (!notificationAudioRef.current) {
    // A simple, short ping sound as a base64 data URL to avoid external file dependencies.
    const audioSrc = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT19AAAAA//8CAP/e//4D/xABDEO8B/P/4//8A//4A/wEA/wD/AP8A5wD3AP8A8gD3AP8A7wD3AP8A7gD3AP8A7QD3AP8A6wD3AP8A6AD3AP8A5wD3AP8A5gD3AP8A5AD3AP8A4wD3AP8A4AD3AP8A3wD3AP8A3QD3AP8A2gD3AP8A2AD3AP8A1QD3AP8A0wD3AP8A0AD3AP8A/wD/';
    notificationAudioRef.current = new Audio(audioSrc);
  }
  // --- END NOTIFICATION STATE ---
  
  // --- NOTIFICATION EFFECTS ---
  // Request notification permission on component mount.
  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          setNotificationPermission(permission);
        });
      } else {
        setNotificationPermission(Notification.permission);
      }
    }
  }, []);

  // Effect to capture the first user interaction to allow audio playback due to browser autoplay policies.
  useEffect(() => {
    const onFirstInteraction = () => {
        setHasUserInteracted(true);
        // Clean up listeners once interaction is detected
        window.removeEventListener('click', onFirstInteraction);
        window.removeEventListener('keydown', onFirstInteraction);
        window.removeEventListener('touchstart', onFirstInteraction);
    };

    // Listen for common interaction events
    window.addEventListener('click', onFirstInteraction);
    window.addEventListener('keydown', onFirstInteraction);
    window.addEventListener('touchstart', onFirstInteraction);

    return () => {
        window.removeEventListener('click', onFirstInteraction);
        window.removeEventListener('keydown', onFirstInteraction);
        window.removeEventListener('touchstart', onFirstInteraction);
    };
  }, []); // Empty dependency array ensures this runs only once on mount.

  // Simulate an artist replying to the user's message to test notifications.
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    // Trigger only if the last message was from the current logged-in user.
    if (lastMessage && currentUser && lastMessage.sender_id === currentUser.id) {
      const timer = setTimeout(() => {
        const room = chatRooms.find(r => r.id === lastMessage.chat_room_id);
        if (!room) return;
        const artistId = room.participant_ids.find(id => id !== currentUser.id);
        if (!artistId) return;

        const autoReply: ChatMessage = {
          id: Math.random(),
          chat_room_id: room.id,
          sender_id: artistId,
          content: '네, 확인했습니다. 잠시만 기다려주세요!',
          created_at: new Date().toISOString(),
        };
        setMessages(prev => [...prev, autoReply]);
        // Also update the chat room's last message for the list view.
        setChatRooms(prev => prev.map(r => 
            r.id === room.id 
                ? { ...r, last_message_text: autoReply.content, last_message_timestamp: autoReply.created_at } 
                : r
        ));
      }, 2500); // Reply after 2.5 seconds
      return () => clearTimeout(timer);
    }
  }, [messages, currentUser, chatRooms]);
  
  // Handle incoming messages and trigger notifications.
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    // Ensure there is a message, a logged-in user, and the message is NOT from the current user.
    if (!lastMessage || !currentUser || lastMessage.sender_id === currentUser.id) {
      return;
    }
    // Do not notify if the user is already viewing the chat room where the message arrived.
    if (activeChatRoomId === lastMessage.chat_room_id) {
      return;
    }

    const sender = allArtists.find(a => a.id === lastMessage.sender_id);
    if (!sender) return;

    const title = `${sender.name}님으로부터 새 메시지`;
    const options = {
      body: lastMessage.content,
      icon: sender.avatarUrl,
      tag: `chat-message-${lastMessage.chat_room_id}`, // Groups notifications by chat room
    };

    // Play sound for all new messages, but only after the user has interacted with the page.
    if (hasUserInteracted) {
      notificationAudioRef.current?.play().catch(e => console.error("Error playing sound:", e));
    }
    
    // Show a system notification only if permission is granted and the tab is in the background.
    if (notificationPermission === 'granted' && document.hidden) {
      const notification = new Notification(title, options);
      // When the notification is clicked, focus the window and navigate to the chat.
      notification.onclick = () => {
        window.focus();
        handleNavigate('MYPAGE');
        setMyPageView('CHAT_HISTORY');
        handleSelectChat(lastMessage.chat_room_id);
      };
    }
  }, [messages, currentUser, activeChatRoomId, notificationPermission, allArtists, hasUserInteracted]);
  // --- END NOTIFICATION EFFECTS ---


  const handleLogin = (user: LoggedInUser) => {
    setCurrentUser(user);
    if (user.type === 'admin') {
      setActiveView('ADMIN');
    } else {
      setActiveView('MYPAGE');
      setMyPageView('DASHBOARD');
    }
  };
  
  const handleSignUp = (newUser: LoggedInUser) => {
    if (newUser.type === 'artist') {
      const newArtistWithId = { ...newUser, id: allArtists.length + Math.random() };
      setAllArtists(prev => [newArtistWithId, ...prev]);
      alert('Artist registration submitted. Your profile will be visible after admin approval.');
      setActiveView('HOME');
    } else {
      // For general user, assign a temporary ID
      const userWithId = { ...newUser, id: Math.random() * 1000 };
      setCurrentUser(userWithId);
      setActiveView('MYPAGE');
      setMyPageView('DASHBOARD');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('HOME');
  };
  
  const handleShowEditProfile = () => setMyPageView('EDIT_PROFILE');
  const handleShowChatHistory = () => setMyPageView('CHAT_HISTORY');
  const handleShowManagePlan = () => setMyPageView('MANAGE_PLAN');
  const handleBackToDashboard = () => setMyPageView('DASHBOARD');
  
  const handleSaveProfile = (updatedUser: LoggedInUser) => {
    if (!currentUser) return;
    
    setCurrentUser(updatedUser);

    if (updatedUser.type === 'artist') {
        setAllArtists(prev => prev.map(a => a.id === updatedUser.id ? updatedUser : a));
    }
    
    setMyPageView('DASHBOARD');
  };

  const handlePurchasePlan = (plan: Plan) => {
    if (currentUser?.type !== 'artist') return;
    const today = new Date();
    const currentArtist = allArtists.find(a => a.id === currentUser.id);
    if (!currentArtist) return;
    const currentExpiry = currentArtist.subscription.expiryDate ? new Date(currentArtist.subscription.expiryDate) : null;
    const startDate = (currentExpiry && currentExpiry > today) ? currentExpiry : today;
    const newExpiryDate = new Date(startDate);
    newExpiryDate.setMonth(newExpiryDate.getMonth() + plan.months);
    const newExpiryDateString = newExpiryDate.toISOString().split('T')[0];
    const todayString = today.toISOString().split('T')[0];
    const newSubscription = { tier: 'PREMIUM' as 'PREMIUM', expiryDate: newExpiryDateString };
    const updatedArtists = allArtists.map(artist => artist.id === currentUser.id ? { ...artist, subscription: newSubscription } : artist);
    setAllArtists(updatedArtists);
    const updatedCurrentUser = { ...currentUser, subscription: newSubscription };
    setCurrentUser(updatedCurrentUser as User);
    const newPayment: Payment = { id: `pay_${Date.now()}`, artistId: currentUser.id, artistName: currentUser.name, planName: plan.title, amount: plan.totalPrice, paymentDate: todayString, newExpiryDate: newExpiryDateString };
    setAllPayments(prev => [newPayment, ...prev]);
    setMyPageView('DASHBOARD');
  };

  // --- CHAT HANDLERS ---
  const handleStartChat = (artistId: number) => {
    if (!currentUser) {
      alert('채팅을 시작하려면 로그인해주세요.');
      setActiveView('MYPAGE');
      return;
    }
    if (currentUser.id === artistId) {
      alert('자기 자신과는 채팅할 수 없습니다.');
      return;
    }

    // Supabase logic simulation: Find or create a chat room.
    let room = chatRooms.find(r => 
        r.participant_ids.includes(currentUser.id) && r.participant_ids.includes(artistId)
    );

    if (!room) {
        const newRoom: ChatRoom = {
            id: Math.random(),
            participant_ids: [currentUser.id, artistId],
            created_at: new Date().toISOString(),
        };
        setChatRooms(prev => [newRoom, ...prev]);
        room = newRoom;
    }

    setActiveChatRoomId(room.id);
  };

  const handleSendMessage = (chatRoomId: number, content: string) => {
    if (!currentUser) return;

    // Supabase logic simulation: Insert a new message.
    const newMessage: ChatMessage = {
      id: Math.random(),
      chat_room_id: chatRoomId,
      sender_id: currentUser.id,
      content,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);

    // Also update the chat room's last message for the list view
    setChatRooms(prev => prev.map(room => 
        room.id === chatRoomId 
            ? { ...room, last_message_text: content, last_message_timestamp: newMessage.created_at } 
            : room
    ));
  };

  const handleSelectChat = (roomId: number) => {
      setActiveChatRoomId(roomId);
  };

  const handleCloseChat = () => {
      setActiveChatRoomId(null);
  };
  // --- END CHAT HANDLERS ---

  const handleApproveArtist = (artistId: number) => {
    setAllArtists(prevArtists => prevArtists.map(artist => artist.id === artistId ? { ...artist, status: 'active' } : artist));
  };

  const handleRejectArtist = (artistId: number) => {
     setAllArtists(prevArtists => prevArtists.map(artist => artist.id === artistId ? { ...artist, status: 'rejected' } : artist));
  };
  
  const handleSetArtistSubscription = (artistId: number, days: number | null) => {
    setAllArtists(prevArtists => prevArtists.map(artist => {
        if (artist.id === artistId) {
            if (days === null) { return { ...artist, subscription: { tier: 'FREE', expiryDate: null } }; }
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + days);
            return { ...artist, subscription: { tier: 'PREMIUM', expiryDate: expiryDate.toISOString().split('T')[0] } };
        }
        return artist;
    }));
  };

  const handleDeleteTattoo = (tattooId: number) => setAllTattoos(prev => prev.filter(t => t.id !== tattooId));
  const handleDeleteEvent = (eventId: number) => setAllEvents(prev => prev.filter(e => e.id !== eventId));
  const handleDeleteReview = (reviewId: number) => setAllReviews(prev => prev.filter(r => r.id !== reviewId));

  const handleTattooClick = (tattoo: Tattoo) => setSelectedTattoo(tattoo);
  const handleEventClick = (event: Event) => setSelectedEvent(event);

  const handleArtistClick = (artist: ArtistUser) => {
    setSelectedTattoo(null);
    setSelectedArtist(artist);
  }

  const handleBack = () => {
      setSelectedTattoo(null);
      setSelectedArtist(null);
      setSelectedEvent(null);
      setIsCreatingEvent(false);
      setIsUploadingTattoo(false);
      setMyPageView('DASHBOARD');
      if (activeView === 'SEARCH_RESULTS') setActiveView('HOME');
  }
  
  const handleBackToArtist = () => setSelectedEvent(null);
  
  const handleViewProfile = (artist: ArtistUser) => handleArtistClick(artist);

  const handleNavigate = (view: View) => {
    setSelectedArtist(null);
    setSelectedTattoo(null);
    setSelectedEvent(null);
    setIsCreatingEvent(false);
    setIsUploadingTattoo(false);
    setMyPageView('DASHBOARD');
    setSearchQuery('');
    setPreviousView(null);
    setActiveView(view);
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setActiveView('SEARCH_RESULTS');
    setSelectedArtist(null);
    setSelectedTattoo(null);
    setSelectedEvent(null);
  };
  
  const handleFooterLink = (view: View) => {
    if (!['COMPANY', 'TERMS', 'PRIVACY', 'SUPPORT'].includes(activeView)) {
        setPreviousView(activeView);
    }
    setActiveView(view);
  };

  const handleBackToPreviousView = () => {
      if (previousView) {
          setActiveView(previousView);
          setPreviousView(null);
      } else {
          setActiveView('HOME');
      }
  };

  const handleOpenCreateEventForm = () => setIsCreatingEvent(true);
  const handleCloseCreateEventForm = () => setIsCreatingEvent(false);
  const handleOpenUploadTattooForm = () => setIsUploadingTattoo(true);
  const handleCloseUploadTattooForm = () => setIsUploadingTattoo(false);
  
  const handleUploadTattoo = (newTattooData: Omit<Tattoo, 'id' | 'artistName' | 'artistAvatarUrl' | 'artistType'>) => {
    if (currentUser?.type !== 'artist') return;
    const newTattoo: Tattoo = {
      id: allTattoos.length + Math.random(),
      artistName: currentUser.name,
      artistAvatarUrl: currentUser.avatarUrl,
      artistType: currentUser.artistType,
      ...newTattooData
    };
    setAllTattoos(prevTattoos => [newTattoo, ...prevTattoos]);
    setIsUploadingTattoo(false);
};

  const handleEventSubmit = (newEventData: Omit<Event, 'id' | 'artistName'>) => {
    if (currentUser?.type !== 'artist') return;
    const newEvent: Event = { id: allEvents.length + Math.random(), artistName: currentUser.name, ...newEventData };
    setAllEvents(prevEvents => [newEvent, ...prevEvents]);
    setIsCreatingEvent(false);
  };

  const handleReviewSubmit = (tattooId: number, rating: number, comment: string, reviewImageDataUrl: string | null) => {
    if (!currentUser) return;
    const originalTattooImage = allTattoos.find(t => t.id === tattooId)?.imageUrl || '';
    const newReview: Review = {
      id: allReviews.length + Math.random(),
      tattooId,
      userName: currentUser.name,
      userAvatarUrl: currentUser.type === 'artist' ? (currentUser as ArtistUser).avatarUrl : 'https://picsum.photos/100/100?random=99',
      rating,
      comment,
      tattooImageUrl: reviewImageDataUrl || originalTattooImage,
      artistName: allTattoos.find(t => t.id === tattooId)?.artistName || ''
    };
    setAllReviews(prevReviews => [newReview, ...prevReviews]);
  };

  const handleToggleLike = (tattooId: number) => {
    setLikedTattoos(prevLiked => {
      const newLiked = new Set(prevLiked);
      if (newLiked.has(tattooId)) newLiked.delete(tattooId);
      else newLiked.add(tattooId);
      return newLiked;
    });
  };
  
  const handleToggleLikeArtist = (artistId: number) => {
    setLikedArtists(prevLiked => {
      const newLiked = new Set(prevLiked);
      if (newLiked.has(artistId)) newLiked.delete(artistId);
      else newLiked.add(artistId);
      return newLiked;
    });
  };

  const activeArtists = useMemo(() => allArtists.filter(a => a.status === 'active'), [allArtists]);
  const artistTattoos = useMemo(() => selectedArtist ? allTattoos.filter(t => t.artistName === selectedArtist.name) : [], [selectedArtist, allTattoos]);
  const artistReviews = useMemo(() => selectedArtist ? allReviews.filter(r => r.artistName === selectedArtist.name) : [], [selectedArtist, allReviews]);
  const artistEvents = useMemo(() => selectedArtist ? allEvents.filter(e => e.artistName === selectedArtist.name) : [], [selectedArtist, allEvents]);
  const currentTattooArtist = useMemo(() => selectedTattoo ? activeArtists.find(a => a.name === selectedTattoo.artistName) || null : null, [selectedTattoo, activeArtists]);
  const artistTattoosForDetailPage = useMemo(() => (currentTattooArtist && selectedTattoo) ? allTattoos.filter(t => t.artistName === currentTattooArtist.name && t.id !== selectedTattoo.id) : [], [currentTattooArtist, selectedTattoo, allTattoos]);
  const eventArtist = useMemo(() => selectedEvent ? activeArtists.find(a => a.name === selectedEvent.artistName) || null : null, [selectedEvent, activeArtists]);
  const tattooReviews = useMemo(() => selectedTattoo ? allReviews.filter(r => r.tattooId === selectedTattoo.id) : [], [selectedTattoo, allReviews]);
  
  const likedTattoosData = useMemo(() => allTattoos.filter(t => likedTattoos.has(t.id)), [likedTattoos, allTattoos]);
  const likedArtistsData = useMemo(() => activeArtists.filter(a => likedArtists.has(a.id)), [likedArtists, activeArtists]);

  const loggedInArtistData = useMemo(() => {
    if (currentUser?.type !== 'artist') return null;
    const name = currentUser.name;
    const artistDetails = allArtists.find(a => a.name === name);
    if (!artistDetails) return null;
    return { artist: artistDetails, events: allEvents.filter(e => e.artistName === name), reviews: allReviews.filter(r => r.artistName === name), tattoos: allTattoos.filter(t => t.artistName === name) };
  }, [currentUser, allEvents, allReviews, allTattoos, allArtists]);

  const renderMyPageContent = () => {
    if (!currentUser) return <MyPage onLogin={handleLogin} onSignUp={handleSignUp} artists={allArtists} />;
    switch(myPageView) {
      case 'EDIT_PROFILE': return <EditProfilePage user={currentUser} onSave={handleSaveProfile} onCancel={handleBackToDashboard} />;
      case 'CHAT_HISTORY': 
          const userChatRooms = chatRooms.filter(r => r.participant_ids.includes(currentUser.id));
          return <ChatListPage 
                    chatRooms={userChatRooms} 
                    messages={messages} 
                    currentUser={currentUser} 
                    allArtists={allArtists}
                    onSelectChat={handleSelectChat}
                    onBack={handleBackToDashboard} 
                 />;
      case 'MANAGE_PLAN': if (currentUser.type === 'artist') return <PlanPage artist={currentUser} onPurchase={handlePurchasePlan} onBack={handleBackToDashboard} />; return null;
      case 'DASHBOARD': default:
        if (currentUser.type === 'artist' && loggedInArtistData) return <ArtistDashboardPage artist={loggedInArtistData.artist} stats={{ events: loggedInArtistData.events.length, reviews: loggedInArtistData.reviews.length, tattoos: loggedInArtistData.tattoos.length }} events={loggedInArtistData.events} likedArtists={likedArtistsData} likedTattoos={likedTattoosData} onLogout={handleLogout} onCreateEvent={handleOpenCreateEventForm} onUploadTattoo={handleOpenUploadTattooForm} onViewProfile={() => handleViewProfile(loggedInArtistData.artist)} onEditProfile={handleShowEditProfile} onShowChats={handleShowChatHistory} onManagePlan={handleShowManagePlan} onArtistClick={handleArtistClick} onTattooClick={handleTattooClick} />;
        if (currentUser.type === 'general') return <GeneralUserDashboardPage user={currentUser} likedArtists={likedArtistsData} likedTattoos={likedTattoosData} onLogout={handleLogout} onEditProfile={handleShowEditProfile} onShowChats={handleShowChatHistory} onArtistClick={handleArtistClick} onTattooClick={handleTattooClick} />;
        return null;
    }
  };
  
  const renderPageContent = () => {
    if (isUploadingTattoo && currentUser?.type === 'artist') {
      return <UploadTattooPage artist={currentUser} onSubmit={handleUploadTattoo} onCancel={handleCloseUploadTattooForm} />;
    }
    if (isCreatingEvent && currentUser?.type === 'artist') {
      const artistDetails = allArtists.find(a => a.name === currentUser.name);
      if (!artistDetails) return <p>Error: Artist details not found.</p>;
      return <CreateEventPage artist={artistDetails} onSubmit={handleEventSubmit} onCancel={handleCloseCreateEventForm} />;
    }
    if (selectedEvent && eventArtist) return <EventDetailPage event={selectedEvent} artist={eventArtist} onBack={handleBackToArtist} onArtistClick={handleArtistClick} />;
    if (selectedTattoo && currentTattooArtist) return <TattooDetailPage tattoo={selectedTattoo} artist={currentTattooArtist} otherTattoos={artistTattoosForDetailPage} reviews={tattooReviews} onBack={handleBack} onTattooClick={handleTattooClick} onArtistClick={handleArtistClick} onReviewSubmit={handleReviewSubmit} currentUser={currentUser} likedTattoos={likedTattoos} onToggleLike={handleToggleLike} />;
    if (selectedArtist) return <ArtistProfilePage artist={selectedArtist} tattoos={artistTattoos} reviews={artistReviews} events={artistEvents} onBack={handleBack} onTattooClick={handleTattooClick} onEventClick={handleEventClick} onOpenCreateEventForm={handleOpenCreateEventForm} currentUser={currentUser} isLiked={likedArtists.has(selectedArtist.id)} onToggleLike={handleToggleLikeArtist} />;

    switch(activeView) {
        case 'ARTISTS': return <ArtistSearchPage artists={activeArtists} onArtistClick={handleArtistClick} likedArtists={likedArtists} onToggleLikeArtist={handleToggleLikeArtist} />;
        case 'EVENTS': return <EventListPage events={allEvents} artists={activeArtists} onEventClick={handleEventClick} />;
        case 'SEARCH': return <TattooSearchPage tattoos={allTattoos} artists={activeArtists} onTattooClick={handleTattooClick} />;
        case 'AI_ZONE': return <AIZonePage tattoos={allTattoos} />;
        case 'SEARCH_RESULTS': return <SearchResultsPage query={searchQuery} artists={activeArtists} tattoos={allTattoos} events={allEvents} onArtistClick={handleArtistClick} onTattooClick={handleTattooClick} onEventClick={handleEventClick} onBack={handleBack} likedArtists={likedArtists} onToggleLikeArtist={handleToggleLikeArtist} />;
        case 'MYPAGE': return renderMyPageContent();
        case 'COMPANY': return <CompanyPage onBack={handleBackToPreviousView} />;
        case 'TERMS': return <TermsPage onBack={handleBackToPreviousView} />;
        case 'PRIVACY': return <PrivacyPage onBack={handleBackToPreviousView} />;
        case 'SUPPORT': return <SupportPage onBack={handleBackToPreviousView} />;
        // FIX: The prop 'onToggleLikeArtist' was passed an undefined variable. It has been corrected to pass the 'handleToggleLikeArtist' function instead.
        case 'HOME': default: return <HomePage artists={activeArtists} tattoos={allTattoos} onTattooClick={handleTattooClick} onArtistClick={handleArtistClick} onSearchSubmit={handleSearchSubmit} currentUser={currentUser} likedArtistsData={likedArtistsData} likedTattoosData={likedTattoosData} likedArtists={likedArtists} onToggleLikeArtist={handleToggleLikeArtist} />;
    }
  }

  const activeChatRoom = useMemo(() => {
    if (!activeChatRoomId || !currentUser) return null;
    return chatRooms.find(r => r.id === activeChatRoomId);
  }, [activeChatRoomId, currentUser, chatRooms]);

  if (activeChatRoom && currentUser) {
      const chatMessages = messages.filter(m => m.chat_room_id === activeChatRoomId);
      return (
        <Suspense fallback={<LoadingComponent />}>
            <ChatPage 
                chatRoom={activeChatRoom}
                messages={chatMessages}
                currentUser={currentUser}
                allArtists={allArtists}
                onSendMessage={handleSendMessage}
                onBack={handleCloseChat}
            />
        </Suspense>
      );
  }

  if (currentUser?.type === 'admin') {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <AdminPage allArtists={allArtists} allTattoos={allTattoos} allEvents={allEvents} allReviews={allReviews} allPayments={allPayments} pendingArtists={allArtists.filter(a => a.status === 'pending')} onApprove={handleApproveArtist} onReject={handleRejectArtist} onSetSubscription={handleSetArtistSubscription} onDeleteTattoo={handleDeleteTattoo} onDeleteEvent={handleDeleteEvent} onDeleteReview={handleDeleteReview} onLogout={handleLogout} />
      </Suspense>
    );
  }

  const showFooter = !selectedArtist && !activeChatRoomId;
  const showBottomNav = !selectedArtist && !activeChatRoomId;
  
  const MainContent = () => (
     <main className={`${selectedArtist ? 'pb-24' : ''}`}>
        <Suspense fallback={<LoadingComponent />}>
          {renderPageContent()}
        </Suspense>
        {showFooter && <Footer onNavigate={handleFooterLink} />}
      </main>
  );

  return (
    <div className="max-w-[720px] mx-auto bg-gray-900 min-h-screen">
      <MainContent />
      {selectedArtist && <ArtistProfileFooter artist={selectedArtist} onStartChat={handleStartChat} />}
      {showBottomNav && <BottomNav activeView={activeView} onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;
