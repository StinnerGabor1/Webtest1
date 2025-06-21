import React, { useRef } from 'react';
import { Upload, Image as ImageIcon, X, Camera } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isDragging: boolean;
  onDragStateChange: (isDragging: boolean) => void;
  imagePreview: string | null;
  onClearImage: () => void;
  isProcessing: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  isDragging,
  onDragStateChange,
  imagePreview,
  onClearImage,
  isProcessing
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDragStateChange(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDragStateChange(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDragStateChange(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onImageSelect(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageSelect(files[0]);
    }
  };

  const handleClick = () => {
    if (!isProcessing) {
      fileInputRef.current?.click();
    }
  };

  if (imagePreview) {
    return (
      <div className="relative group max-w-md mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          {!isProcessing && (
            <button
              onClick={onClearImage}
              className="absolute top-4 right-4 p-2.5 bg-white/95 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
        {isProcessing && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-3xl flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-blue-600 font-semibold text-lg">Analyzing Image...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer group ${
          isDragging
            ? 'border-blue-500 bg-blue-50 scale-105 shadow-xl'
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-lg'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className={`transition-all duration-300 ${isDragging ? 'scale-110' : 'group-hover:scale-105'}`}>
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            {isDragging ? (
              <ImageIcon className="w-10 h-10 text-white animate-bounce" />
            ) : (
              <Camera className="w-10 h-10 text-white" />
            )}
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {isDragging ? 'Drop your image here!' : 'Upload Image to Classify'}
          </h3>
          
          <p className="text-gray-600 mb-4 leading-relaxed">
            Drag and drop your image here, or click to browse your files
          </p>
          
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </div>
          
          <div className="text-sm text-gray-500 mt-4 space-y-1">
            <p>Supports JPEG, PNG, WebP</p>
            <p>Maximum file size: 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );
};