import { PredictionResult } from '../types';

// Mock classification results for demonstration
const mockPredictions = [
  { prediction: 'cat', probability: 94 },
  { prediction: 'dog', probability: 87 },
  { prediction: 'bird', probability: 91 },
  { prediction: 'horse', probability: 83 },
  { prediction: 'elephant', probability: 96 },
  { prediction: 'lion', probability: 89 },
  { prediction: 'tiger', probability: 92 },
  { prediction: 'bear', probability: 85 },
  { prediction: 'rabbit', probability: 78 },
  { prediction: 'deer', probability: 81 }
];

// Simulate image classification with realistic delay
export const classifyImage = async (imageFile: File): Promise<PredictionResult> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1500));
  
  // Create image URL for display
  const imageUrl = URL.createObjectURL(imageFile);
  
  // Randomly select a prediction (in real app, this would be actual ML prediction)
  const randomPrediction = mockPredictions[Math.floor(Math.random() * mockPredictions.length)];
  
  // Add some randomness to the probability
  const probability = Math.max(60, randomPrediction.probability + Math.floor(Math.random() * 10) - 5);
  
  return {
    prediction: randomPrediction.prediction,
    probability,
    imageUrl
  };
};

export const validateImageFile = (file: File): string | null => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    return 'Please upload a valid image file (JPEG, PNG, or WebP)';
  }
  
  if (file.size > maxSize) {
    return 'Image size must be less than 10MB';
  }
  
  return null;
};