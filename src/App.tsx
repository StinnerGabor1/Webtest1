import React, { useState } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { PredictionResult } from './components/PredictionResult';
import { ErrorMessage } from './components/ErrorMessage';
import { classifyImage, validateImageFile } from './utils/imageClassifier';
import { UploadState } from './types';
import { Brain, Zap, Sparkles } from 'lucide-react';

function App() {
  const [uploadState, setUploadState] = useState<UploadState>({
    isDragging: false,
    isProcessing: false,
    error: null,
    imagePreview: null,
    result: null
  });

  const handleImageSelect = async (file: File) => {
    // Validate file
    const validationError = validateImageFile(file);
    if (validationError) {
      setUploadState(prev => ({ ...prev, error: validationError }));
      return;
    }

    // Clear any existing errors and set preview
    const imageUrl = URL.createObjectURL(file);
    setUploadState(prev => ({
      ...prev,
      error: null,
      imagePreview: imageUrl,
      isProcessing: true,
      result: null
    }));

    try {
      // Classify the image
      const result = await classifyImage(file);
      setUploadState(prev => ({
        ...prev,
        result,
        isProcessing: false
      }));
    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        error: 'Failed to classify image. Please try again.',
        isProcessing: false
      }));
    }
  };

  const handleDragStateChange = (isDragging: boolean) => {
    setUploadState(prev => ({ ...prev, isDragging }));
  };

  const handleClearImage = () => {
    if (uploadState.imagePreview) {
      URL.revokeObjectURL(uploadState.imagePreview);
    }
    setUploadState({
      isDragging: false,
      isProcessing: false,
      error: null,
      imagePreview: null,
      result: null
    });
  };

  const handleCloseError = () => {
    setUploadState(prev => ({ ...prev, error: null }));
  };

  const handleReset = () => {
    if (uploadState.result?.imageUrl) {
      URL.revokeObjectURL(uploadState.result.imageUrl);
    }
    handleClearImage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Image Classifier
            <Sparkles className="inline-block w-10 h-10 text-yellow-500 ml-4" />
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Upload any image and discover what's in it using our advanced AI-powered classification technology
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
              <Zap className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Lightning Fast</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
              <Brain className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">AI Powered</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
              <Sparkles className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">High Accuracy</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {uploadState.error && (
          <ErrorMessage 
            message={uploadState.error} 
            onClose={handleCloseError}
          />
        )}

        {/* Main Content */}
        {uploadState.result ? (
          <PredictionResult
            result={uploadState.result}
            onReset={handleReset}
          />
        ) : (
          <ImageUpload
            onImageSelect={handleImageSelect}
            isDragging={uploadState.isDragging}
            onDragStateChange={handleDragStateChange}
            imagePreview={uploadState.imagePreview}
            onClearImage={handleClearImage}
            isProcessing={uploadState.isProcessing}
          />
        )}

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full shadow-md">
            <span className="text-gray-600">Powered by advanced machine learning</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-600">Built with React & TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;