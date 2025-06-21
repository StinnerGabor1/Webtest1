import React from 'react';
import { PredictionResult as PredictionType } from '../types';
import { CheckCircle, BarChart3, ArrowLeft, Sparkles } from 'lucide-react';

interface PredictionResultProps {
  result: PredictionType;
  onReset: () => void;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({
  result,
  onReset
}) => {
  const getConfidenceColor = (probability: number) => {
    if (probability >= 80) return 'text-emerald-600';
    if (probability >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getConfidenceLabel = (probability: number) => {
    if (probability >= 80) return 'High Confidence';
    if (probability >= 60) return 'Medium Confidence';
    return 'Low Confidence';
  };

  const getConfidenceBg = (probability: number) => {
    if (probability >= 80) return 'bg-emerald-100 text-emerald-700';
    if (probability >= 60) return 'bg-yellow-100 text-yellow-700';
    return 'bg-orange-100 text-orange-700';
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-500 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">Classification Complete</h2>
        </div>
        <p className="text-gray-600 text-lg">Here's what our AI detected in your image</p>
      </div>

      {/* Main Result Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="lg:flex">
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="relative">
              <img
                src={result.imageUrl}
                alt="Classified image"
                className="w-full h-80 lg:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
          
          {/* Content */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="h-full flex flex-col justify-center text-center lg:text-left">
              {/* Prediction Label */}
              <div className="mb-8">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Prediction</span>
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 capitalize">
                  {result.prediction}
                </h3>
              </div>

              {/* Confidence Score */}
              <div className="mb-8">
                <div className="flex items-center justify-center lg:justify-start mb-3">
                  <BarChart3 className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Confidence</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <span className={`text-3xl font-bold ${getConfidenceColor(result.probability)}`}>
                    {result.probability}%
                  </span>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getConfidenceBg(result.probability)}`}>
                    {getConfidenceLabel(result.probability)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      result.probability >= 80 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                      result.probability >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                      'bg-gradient-to-r from-orange-500 to-orange-600'
                    }`}
                    style={{ width: `${result.probability}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onReset}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full lg:w-auto"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Classify Another Image
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Card */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
        <div className="text-center">
          <h4 className="text-xl font-semibold text-gray-800 mb-3">How it works</h4>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Our advanced machine learning model analyzes your image using deep neural networks 
            trained on millions of images to provide accurate classifications with confidence scores.
          </p>
        </div>
      </div>
    </div>
  );
};