import React, { useState } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { PredictionResult } from './components/PredictionResult';
import { ErrorMessage } from './components/ErrorMessage';
import { classifyImage, validateImageFile } from './utils/imageClassifier';
import { UploadState } from './types';
import { Brain, Zap, Sparkles, BookOpen, Calendar, ArrowRight, User, Database } from 'lucide-react';

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

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Bird Migration Patterns with AI",
      excerpt: "Discover how artificial intelligence is revolutionizing our understanding of bird migration patterns and helping conservation efforts worldwide.",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Research"
    },
    {
      id: 2,
      title: "The Future of Wildlife Photography and AI",
      excerpt: "Explore how machine learning is transforming wildlife photography, from automatic species identification to behavior analysis.",
      author: "Mark Thompson",
      date: "2024-01-12",
      readTime: "7 min read",
      image: "https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Technology"
    },
    {
      id: 3,
      title: "Conservation Success Stories: AI in Action",
      excerpt: "Learn about real-world applications where AI-powered bird identification has made a significant impact on conservation efforts.",
      author: "Emily Chen",
      date: "2024-01-10",
      readTime: "6 min read",
      image: "https://images.pexels.com/photos/53581/bald-eagles-bald-eagle-bird-of-prey-adler-53581.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Conservation"
    }
  ];

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

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <a 
              href="species.html" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Database className="w-5 h-5 mr-2" />
              Explore Bird Species
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <a 
              href="blog.html" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Read Our Blog
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-12 relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 rounded-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  Welcome to AI Image Classification
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Experience the power of artificial intelligence with our advanced image classification system. 
                  Simply upload any image and watch as our AI instantly identifies and analyzes what it sees.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Results</h3>
                  <p className="text-gray-600 text-sm">Get classification results in seconds with our optimized AI models</p>
                </div>
                
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Advanced AI</h3>
                  <p className="text-gray-600 text-sm">Powered by state-of-the-art machine learning algorithms</p>
                </div>
                
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">High Accuracy</h3>
                  <p className="text-gray-600 text-sm">Reliable predictions with confidence scores for every classification</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Camera className="w-5 h-5 mr-2" />
                  Start Classifying Images
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
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

        {/* Blog Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-4xl font-bold text-gray-800">Latest from Our Blog</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest insights, research, and developments in AI-powered bird classification
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    
                    <a 
                      href={`blog.html?post=${post.id}`}
                      className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center">
            <a 
              href="blog.html"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              View All Blog Posts
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

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