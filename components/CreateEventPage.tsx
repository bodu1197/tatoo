import React, { useState } from 'react';
import type { Artist, Event } from '../types';
import { ChevronLeftIcon, PhotoIcon } from '../constants';
import { compressImage, fileToDataUrl } from '../services/imageCompressor';

interface CreateEventPageProps {
  artist: Artist;
  onSubmit: (eventData: Omit<Event, 'id' | 'artistName'>) => void;
  onCancel: () => void;
}

export const CreateEventPage: React.FC<CreateEventPageProps> = ({ artist, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

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
          setImageFile(compressedFile);
          if (imagePreview) {
              URL.revokeObjectURL(imagePreview);
          }
          setImagePreview(URL.createObjectURL(compressedFile));
      } catch (error) {
          console.error("Error processing image:", error);
          setError("Failed to process image. Please try another one.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageFile || !originalPrice || !discountPrice || !startDate || !endDate || !description) {
      alert('Please fill out all fields.');
      return;
    }
    const imageUrl = await fileToDataUrl(imageFile);
    onSubmit({
      title,
      imageUrl,
      originalPrice: Number(originalPrice),
      discountPrice: Number(discountPrice),
      startDate,
      endDate,
      description,
      artistType: artist.artistType,
    });
  };

  const InputField = ({ id, label, type = 'text', value, onChange, required = true, placeholder = '' }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
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
        <h1 className="text-xl font-bold mx-auto pr-8">Create New Event</h1>
      </header>

      <div className="px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField id="title" label="이벤트 제목" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예: 가을 플래시 할인 이벤트" />
          
          <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">대표 이미지</label>
              {imagePreview && (
                  <div className="my-2">
                      <img src={imagePreview} alt="Event Preview" className="w-full h-auto max-h-64 object-contain rounded-lg" />
                  </div>
              )}
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" />
                      <div className="flex text-sm text-gray-400">
                          <label htmlFor="imageFile" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-cyan-400 hover:text-cyan-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-cyan-500">
                              <span>파일 업로드</span>
                              <input id="imageFile" name="imageFile" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" required />
                          </label>
                          <p className="pl-1">또는 드래그 앤 드롭</p>
                      </div>
                      <p className="text-xs text-gray-500">WEBP, PNG, JPG up to 10MB</p>
                  </div>
              </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <InputField id="originalPrice" label="정가 (원)" type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="300000" />
            <InputField id="discountPrice" label="할인가 (원)" type="number" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} placeholder="200000" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField id="startDate" label="이벤트 시작일" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <InputField id="endDate" label="이벤트 종료일" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">상세 설명</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={6}
              placeholder="이벤트에 대한 자세한 내용을 입력해주세요."
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div className="pt-4">
            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-lg transition-colors text-lg">
              이벤트 게시하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
