import React, { useState, useEffect } from 'react';
import type { LoggedInUser, ArtistUser } from '../types';
import { ChevronLeftIcon, PhotoIcon, XMarkIcon } from '../constants';
import { KOREA_LOCATIONS } from '../constants';
import { compressImage, fileToDataUrl } from '../services/imageCompressor';

interface EditProfilePageProps {
  user: LoggedInUser;
  onSave: (updatedUser: LoggedInUser) => void;
  onCancel: () => void;
}

export const EditProfilePage: React.FC<EditProfilePageProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState(user);
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const isArtist = formData.type === 'artist';
  
  const initialLocation = isArtist ? (formData as ArtistUser).location.split(' ') : ['', ''];
  const [province, setProvince] = useState(initialLocation[0] || '');
  const [district, setDistrict] = useState(initialLocation.slice(1).join(' ') || '');
  
  useEffect(() => {
    if (isArtist) {
      setFormData(prev => ({ ...prev, location: `${province} ${district}`.trim() }));
    }
  }, [province, district, isArtist]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProvince(e.target.value);
    setDistrict('');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          if (file.size > 10 * 1024 * 1024) {
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
              setNewAvatarFile(compressedFile);
              
              if (formData.type === 'artist') {
                  const previewUrl = URL.createObjectURL(compressedFile);
                  setFormData(prev => ({ ...prev, avatarUrl: previewUrl }));
              }
          } catch (error) {
              console.error("Error processing image:", error);
              setError("Failed to process image. Please try another one.");
          }
      }
  };

  const handleRemoveInfoImage = (indexToRemove: number) => {
    if (formData.type !== 'artist') return;
    setFormData(prev => {
      const artistData = prev as ArtistUser;
      const updatedImages = artistData.infoImages?.filter((_, index) => index !== indexToRemove) || [];
      return { ...artistData, infoImages: updatedImages };
    });
  };

  const handleInfoImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData.type !== 'artist') return;
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
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
        const imageDataUrl = await fileToDataUrl(compressedFile);
        setFormData(prev => {
          const artistData = prev as ArtistUser;
          const currentImages = artistData.infoImages || [];
          return { ...artistData, infoImages: [...currentImages, imageDataUrl] };
        });
      } catch (error) {
        console.error("Error processing info image:", error);
        setError("Failed to process image. Please try another one.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalUserData = { ...formData };
    if (newAvatarFile && finalUserData.type === 'artist') {
        const avatarDataUrl = await fileToDataUrl(newAvatarFile);
        finalUserData = { ...finalUserData, avatarUrl: avatarDataUrl };
    }
    onSave(finalUserData);
  };
  
  const InputField = ({ id, label, type = 'text', required = true, placeholder = '' }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <input
        type={type}
        id={id}
        value={formData[id] || ''}
        onChange={handleInputChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>
  );

  return (
    <div className="animate-fade-in">
      <header className="p-4 flex items-center sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Cancel">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto pr-8">프로필 수정</h1>
      </header>

      <div className="px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField id="name" label="이름" placeholder="홍길동" />
          <InputField id="email" label="이메일" type="email" placeholder="user@example.com" />
          
          {isArtist && (
             <>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">프로필 사진</label>
                    {(formData as ArtistUser).avatarUrl && (
                        <div className="my-2">
                            <img src={(formData as ArtistUser).avatarUrl} alt="Avatar Preview" className="w-24 h-24 rounded-full object-cover" />
                        </div>
                    )}
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" />
                            <div className="flex text-sm text-gray-400">
                                <label htmlFor="avatarFile" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-cyan-400 hover:text-cyan-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-cyan-500">
                                    <span>사진 변경</span>
                                    <input id="avatarFile" name="avatarFile" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
                                </label>
                                <p className="pl-1">또는 드래그 앤 드롭</p>
                            </div>
                            <p className="text-xs text-gray-500">WEBP, PNG, JPG up to 10MB</p>
                        </div>
                    </div>
                </div>

                <InputField id="specialty" label="전문 분야" placeholder="예: Fine Line & Floral" />

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">작업실 위치</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="province-edit" className="sr-only">시/도</label>
                            <select
                                id="province-edit"
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
                            <label htmlFor="district-edit" className="sr-only">시/군/구</label>
                            <select
                                id="district-edit"
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
                
                <InputField id="whatsapp" label="WhatsApp 연락처 (URL)" type="url" placeholder="https://wa.me/..." required={false} />
                <InputField id="kakaoTalk" label="카카오톡 오픈채팅 링크" type="url" placeholder="https://open.kakao.com/o/..." required={false} />
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">자기소개 (Bio)</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={(formData as ArtistUser).bio || ''}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="자신과 작업 스타일에 대해 소개해주세요."
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">소개 사진 관리</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                        {(formData as ArtistUser).infoImages?.map((img, index) => (
                        <div key={index} className="relative group">
                            <img src={img} alt={`Info image ${index + 1}`} className="w-full h-full object-cover rounded-lg aspect-square" />
                            <button
                            type="button"
                            onClick={() => handleRemoveInfoImage(index)}
                            className="absolute top-1 right-1 bg-black/60 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label={`Remove image ${index + 1}`}
                            >
                            <XMarkIcon className="w-4 h-4" />
                            </button>
                        </div>
                        ))}
                    </div>

                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" />
                        <div className="flex text-sm text-gray-400">
                            <label htmlFor="infoImageFile" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-cyan-400 hover:text-cyan-300 focus-within:outline-none">
                            <span>사진 추가</span>
                            <input id="infoImageFile" name="infoImageFile" type="file" className="sr-only" onChange={handleInfoImageFileChange} accept="image/png, image/jpeg, image/webp" />
                            </label>
                        </div>
                        <p className="text-xs text-gray-500">WEBP, PNG, JPG up to 10MB</p>
                        </div>
                    </div>
                </div>
             </>
          )}

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div className="pt-4">
            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-lg transition-colors text-lg">
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};