export interface PredictionResult {
  prediction: string;
  probability: number;
  imageUrl: string;
}

export interface UploadState {
  isDragging: boolean;
  isProcessing: boolean;
  error: string | null;
  imagePreview: string | null;
  result: PredictionResult | null;
}