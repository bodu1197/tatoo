import React, { useState } from 'react';
import { KakaoLoginIcon, AppleLoginIcon, LineLoginIcon, GoogleLoginIcon, ChevronLeftIcon, ADMIN_USER, PhotoIcon } from '../constants';
import type { LoggedInUser, ArtistUser, GeneralUser, Artist } from '../types';
import { KOREA_LOCATIONS } from '../constants';
import { compressImage, fileToDataUrl } from '../services/imageCompressor';

type AuthView = 'main' | 'login' | 'signup_general' | 'signup_artist';

interface MyPageProps {
  onLogin: (user: LoggedInUser) => void;
  onSignUp: (user: LoggedInUser) => void;
  artists: Artist[];
}

export const MyPage: React.FC<MyPageProps> = ({ onLogin, onSignUp, artists }) => {
    const [authView, setAuthView] = useState<AuthView>('main');

    const AuthButton = ({ icon, text, onClick, className, textColor = 'text-black' }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-semibold transition-opacity hover:opacity-90 ${className}`}
        >
            <span className="w-6 h-6 mr-3">{icon}</span>
            <span className={`flex-grow text-center ${textColor}`}>{text}</span>
        </button>
    );
    
    const MainView = () => (
        <>
             <h1 className="text-3xl font-bold text-center mb-2">로그인 또는 회원가입</h1>
             <p className="text-gray-400 text-center mb-8">InkSpot에 오신 것을 환영합니다!</p>

            <div className="space-y-3">
                <AuthButton
                    icon={<KakaoLoginIcon className="w-6 h-6 text-black" />}
                    text="카카오로 로그인하기"
                    onClick={() => {}}
                    className="bg-[#FEE500]"
                />
                 <AuthButton
                    icon={<AppleLoginIcon className="w-6 h-6 text-white" />}
                    text="Apple로 로그인하기"
                    onClick={() => {}}
                    className="bg-black text-white"
                    textColor="text-white"
                />
                 <AuthButton
                    icon={<LineLoginIcon className="w-6 h-6 text-white" />}
                    text="라인으로 로그인하기"
                    onClick={() => {}}
                    className="bg-[#06C755] text-white"
                    textColor="text-white"
                />
                 <AuthButton
                    icon={<GoogleLoginIcon className="w-6 h-6 text-gray-700" />}
                    text="Google로 로그인하기"
                    onClick={() => {}}
                    className="bg-white"
                />
            </div>

            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-700"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">또는</span>
                <div className="flex-grow border-t border-gray-700"></div>
            </div>

            <div className="space-y-3">
                 <button onClick={() => setAuthView('signup_general')} className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-4 rounded-lg transition-colors">
                    일반 회원가입
                </button>
                 <button onClick={() => setAuthView('signup_artist')} className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                    아티스트 가입
                </button>
            </div>

            <div className="text-center mt-6">
                <p className="text-sm text-gray-400">
                    이미 계정이 있으신가요?{' '}
                    <button onClick={() => setAuthView('login')} className="font-semibold text-cyan-400 hover:underline">
                        로그인
                    </button>
                </p>
            </div>
        </>
    );

    const EmailForm = ({ isSignUp, isArtist }: { isSignUp: boolean; isArtist?: boolean }) => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [avatarFile, setAvatarFile] = useState<File | null>(null);
        const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
        const [specialty, setSpecialty] = useState('');
        const [province, setProvince] = useState('');
        const [district, setDistrict] = useState('');
        const [whatsapp, setWhatsapp] = useState('');
        const [kakaoTalk, setKakaoTalk] = useState('');
        const [artistType, setArtistType] = useState<'TATTOO' | 'PMU'>('TATTOO');
        const [error, setError] = useState('');
        
        const buttonText = isSignUp ? '가입하기' : '로그인';

        const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setProvince(e.target.value);
            setDistrict(''); // Reset district when province changes
        };

        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (file.size > 10 * 1024 * 1024) { // 10MB size limit
                    setError("File size should not exceed 10MB.");
                    return;
                }
                try {
                    setError("");
                    const compressedBlob = await compressImage(file);
                    const compressedFile = new File([compressedBlob], file.name, {
                        type: 'image/webp',
                        lastModified: Date.now(),
                    });
                    setAvatarFile(compressedFile);
                    if (avatarPreview) {
                        URL.revokeObjectURL(avatarPreview);
                    }
                    setAvatarPreview(URL.createObjectURL(compressedFile));
                } catch (error) {
                    console.error("Error processing image:", error);
                    setError("Failed to process image. Please try another one.");
                }
            }
        };
        
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setError('');
            if (isSignUp) {
                if(isArtist) {
                    if (!avatarFile) {
                        setError("프로필 사진을 업로드해주세요.");
                        return;
                    }
                    const avatarDataUrl = await fileToDataUrl(avatarFile);
                    const expiryDate = new Date();
                    expiryDate.setDate(expiryDate.getDate() + 7);

                    const newArtist: ArtistUser = {
                        id: -1, // Temp ID, will be replaced in App.tsx
                        type: 'artist',
                        name, email, password, avatarUrl: avatarDataUrl, specialty,
                        location: `${province} ${district}`,
                        artistType, whatsapp, kakaoTalk,
                        rating: 0,
                        reviewCount: 0,
                        subscription: {
                            tier: 'PREMIUM',
                            expiryDate: expiryDate.toISOString().split('T')[0] // YYYY-MM-DD
                        },
                        status: 'pending',
                    };
                    onSignUp(newArtist);
                } else {
                    // FIX: Added a temporary 'id' to satisfy the GeneralUser interface. This will be replaced in the App component.
                    const newGeneralUser: GeneralUser = { id: Math.random(), type: 'general', name, email };
                    onSignUp(newGeneralUser);
                }
            } else {
                // Admin Login Check
                if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
                  onLogin(ADMIN_USER);
                  return;
                }

                const foundArtist = artists.find(artist => artist.email === email && artist.password === password);
                if (foundArtist) {
                    if (foundArtist.status !== 'active') {
                        setError('This artist account is not active. It might be pending approval or rejected.');
                        return;
                    }
                    onLogin({
                        ...foundArtist,
                        type: 'artist',
                    });
                } else {
                    setError('Invalid email or password.');
                }
            }
        };
        
        return (
            <div>
                 <button onClick={() => setAuthView('main')} className="flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-6">
                    <ChevronLeftIcon className="w-4 h-4" />
                    뒤로가기
                 </button>
                 <form onSubmit={handleSubmit} className="space-y-4">
                     {isSignUp && (
                         <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="name">이름</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                         </div>
                     )}
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">이메일</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">비밀번호</label>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                     </div>
                     {isSignUp && isArtist && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">아티스트 유형</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center">
                                        <input type="radio" name="artistType" value="TATTOO" checked={artistType === 'TATTOO'} onChange={() => setArtistType('TATTOO')} className="form-radio h-4 w-4 text-cyan-600 bg-gray-700 border-gray-600 focus:ring-cyan-500" />
                                        <span className="ml-2 text-white">타투이스트</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="artistType" value="PMU" checked={artistType === 'PMU'} onChange={() => setArtistType('PMU')} className="form-radio h-4 w-4 text-cyan-600 bg-gray-700 border-gray-600 focus:ring-cyan-500" />
                                        <span className="ml-2 text-white">반영구 아티스트</span>
                                    </label>
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">프로필 사진</label>
                                {avatarPreview && (
                                    <div className="my-2">
                                        <img src={avatarPreview} alt="Avatar Preview" className="w-24 h-24 rounded-full object-cover" />
                                    </div>
                                )}
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" />
                                        <div className="flex text-sm text-gray-400">
                                            <label htmlFor="avatarFile" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-cyan-400 hover:text-cyan-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-cyan-500">
                                                <span>파일 업로드</span>
                                                <input id="avatarFile" name="avatarFile" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" required />
                                            </label>
                                            <p className="pl-1">또는 드래그 앤 드롭</p>
                                        </div>
                                        <p className="text-xs text-gray-500">WEBP, PNG, JPG up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="specialty">전문 분야 (Specialty)</label>
                                <input type="text" id="specialty" value={specialty} onChange={e => setSpecialty(e.target.value)} required placeholder="예: Fine Line & Floral" className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">작업실 위치</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="province-signup" className="sr-only">시/도</label>
                                        <select
                                            id="province-signup"
                                            value={province}
                                            onChange={handleProvinceChange}
                                            required
                                            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        >
                                            <option value="" disabled>시/도 선택</option>
                                            {Object.keys(KOREA_LOCATIONS).map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="district-signup" className="sr-only">시/군/구</label>
                                        <select
                                            id="district-signup"
                                            value={district}
                                            onChange={(e) => setDistrict(e.target.value)}
                                            disabled={!province}
                                            required
                                            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                        >
                                            <option value="" disabled>시/군/구 선택</option>
                                            {province && KOREA_LOCATIONS[province] && KOREA_LOCATIONS[province].map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="whatsapp">WhatsApp 연락처 (URL)</label>
                                <input type="url" id="whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="https://wa.me/..." className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="kakaoTalk">카카오톡 오픈채팅 링크</label>
                                <input type="url" id="kakaoTalk" value={kakaoTalk} onChange={e => setKakaoTalk(e.target.value)} placeholder="https://open.kakao.com/o/..." className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                        </>
                     )}
                     {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                     <div className="pt-4">
                         <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-4 rounded-lg transition-colors">
                            {buttonText}
                         </button>
                     </div>
                 </form>
            </div>
        )
    };
    
    const renderAuthContent = () => {
        switch (authView) {
            case 'login':
                return <EmailForm isSignUp={false} />;
            case 'signup_general':
                return <EmailForm isSignUp={true} isArtist={false} />;
            case 'signup_artist':
                return <EmailForm isSignUp={true} isArtist={true} />;
            case 'main':
            default:
                return <MainView />;
        }
    }
    
    const getHeaderTitle = () => {
        switch (authView) {
            case 'login': return '로그인';
            case 'signup_general': return '일반 회원가입';
            case 'signup_artist': return '아티스트 가입';
            case 'main':
            default: return '로그인 / 회원가입';
        }
    };

    return (
        <div className="animate-fade-in">
             <header className="p-4 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 text-center">
                <h1 className="text-xl font-bold">{getHeaderTitle()}</h1>
            </header>
            <div className="px-4 py-8">
               <div className="w-full max-w-md mx-auto">
                    {renderAuthContent()}
               </div>
            </div>
        </div>
    );
}