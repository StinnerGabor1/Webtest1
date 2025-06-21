import { AnimalPrediction } from '../types';

const animalDatabase: Record<string, Omit<AnimalPrediction, 'confidence'>> = {
  lion: {
    animal: 'Lion',
    description: 'The king of the jungle, known for their majestic mane and powerful roar.',
    habitat: 'African savannas, grasslands, and open woodlands',
    diet: 'Carnivore - primarily large ungulates like zebras, wildebeest, and buffalo',
    funFact: 'A lion\'s roar can be heard from up to 5 miles away!'
  },
  tiger: {
    animal: 'Tiger',
    description: 'The largest cat species, known for their distinctive orange coat with black stripes.',
    habitat: 'Asian forests, grasslands, and mangrove swamps',
    diet: 'Carnivore - deer, wild boar, water buffalo, and other large mammals',
    funFact: 'Each tiger has a unique stripe pattern, like human fingerprints!'
  },
  elephant: {
    animal: 'Elephant',
    description: 'The largest land animal, known for their intelligence and strong family bonds.',
    habitat: 'African and Asian savannas, forests, and grasslands',
    diet: 'Herbivore - grasses, fruits, bark, and roots',
    funFact: 'Elephants can remember other elephants they haven\'t seen for decades!'
  },
  giraffe: {
    animal: 'Giraffe',
    description: 'The tallest animal on Earth, known for their long necks and distinctive spots.',
    habitat: 'African savannas, grasslands, and open woodlands',
    diet: 'Herbivore - primarily acacia leaves and other tree foliage',
    funFact: 'A giraffe\'s tongue can be up to 20 inches long and is dark blue to prevent sunburn!'
  },
  panda: {
    animal: 'Giant Panda',
    description: 'An iconic bear species known for their black and white fur and love of bamboo.',
    habitat: 'Mountain forests of central China',
    diet: 'Herbivore - 99% bamboo, occasionally fish and small mammals',
    funFact: 'Pandas spend 12-16 hours a day eating bamboo!'
  },
  wolf: {
    animal: 'Wolf',
    description: 'Highly intelligent pack hunters and the ancestors of domestic dogs.',
    habitat: 'Forests, tundra, grasslands, and mountains across the Northern Hemisphere',
    diet: 'Carnivore - deer, elk, moose, and smaller mammals',
    funFact: 'Wolves have an incredible sense of smell, 100 times stronger than humans!'
  },
  penguin: {
    animal: 'Penguin',
    description: 'Flightless birds perfectly adapted for life in and around water.',
    habitat: 'Antarctica and other southern hemisphere coastlines',
    diet: 'Carnivore - fish, krill, squid, and other marine animals',
    funFact: 'Emperor penguins can dive up to 1,800 feet deep and hold their breath for 22 minutes!'
  },
  dolphin: {
    animal: 'Dolphin',
    description: 'Highly intelligent marine mammals known for their playful nature and echolocation.',
    habitat: 'Oceans, seas, and some rivers worldwide',
    diet: 'Carnivore - fish, squid, and crustaceans',
    funFact: 'Dolphins have names for each other and can recognize themselves in mirrors!'
  }
};

// Simulate ML prediction with realistic delay and confidence
export const classifyAnimal = async (imageFile: File): Promise<AnimalPrediction> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
  
  // Randomly select an animal (in real app, this would be ML prediction)
  const animals = Object.keys(animalDatabase);
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  const baseData = animalDatabase[randomAnimal];
  
  // Generate realistic confidence score
  const confidence = 0.75 + Math.random() * 0.24; // 75-99%
  
  return {
    ...baseData,
    confidence: Math.round(confidence * 100) / 100
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