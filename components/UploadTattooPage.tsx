import React, { useState } from 'react';
import type { ArtistUser, Tattoo } from '../types';
import { ChevronLeftIcon, PhotoIcon } from '../constants';
import { TATTOO_STYLES } from '../constants';
import { compressImage, fileToDataUrl } from '../services/imageCompressor';

interface UploadTattooPageProps {
  artist: ArtistUser;
  onSubmit: (tattooData: Omit<Tattoo, 'id' | 'artistName' | 'artistAvatarUrl' | 'artistType'>) => void;
  onCancel: () => void;
}

export const UploadTattooPage: React.FC<UploadTattooPageProps> = ({ artist, onSubmit, onCancel }) => {
  const [style, setStyle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    if (!style || !imageFile) {
      setError('Please upload an image and select a style.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
        const imageUrl = await fileToDataUrl(imageFile);
        onSubmit({
          imageUrl,
          style,
          description,
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        });
    } catch (err) {
        setError('Failed to process tattoo upload. Please try again.');
        setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <header className="p-4 flex items-center sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Cancel">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto pr-8">새 작품 업로드</h1>
      </header>

      <div className="px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">작품 이미지</label>
            {imagePreview && (
              <div className="my-2">
                <img src={imagePreview} alt="Tattoo Preview" className="w-full h-auto max-h-96 object-contain rounded-lg" />
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

          <div>
            <label htmlFor="style" className="block text-sm font-medium text-gray-300 mb-1">스타일</label>
            <select
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              required
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="" disabled>스타일을 선택하세요</option>
              {TATTOO_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">설명 (선택)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="작품에 대한 설명을 입력해주세요. (예: 팔뚝에 새긴 섬세한 들꽃 부케...)"
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">태그 (선택)</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="쉼표(,)로 구분하여 입력 (예: floral, minimalist, ankle)"
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-lg transition-colors text-lg flex items-center justify-center disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoading ? '업로드 중...' : '작품 업로드하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};