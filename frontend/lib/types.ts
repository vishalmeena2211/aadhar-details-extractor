// Define the interface for the ImageUploadSection component props
export interface ImageUploadSectionProps {
    side: 'front' | 'back'
    image: File | null
    onImageUpload: (file: File | null, side: 'front' | 'back') => void
    isLoading: boolean
}

// Define the interface for the ParseButton component props
export interface ParseButtonProps {
    onClick: () => void
    isLoading: boolean
    disabled: boolean
  }

  // Define the props interface for the ResultsDisplay component
export interface ResultsDisplayProps {
    response: string | null;
    isLoading: boolean;
}

  