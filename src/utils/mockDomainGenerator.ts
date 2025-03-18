interface DomainSuggestion {
  name: string;
  tld: string;
  available: boolean;
  price?: number;
}

const commonTlds = ['.com', '.net', '.org', '.io', '.co', '.app', '.tech', '.ai'];

function generateVariations(input: string): string[] {
  const words = input.toLowerCase().split(/\s+/);
  const variations: string[] = [];
  
  // Original combination
  variations.push(words.join(''));
  
  // Remove vowels
  variations.push(words.join('').replace(/[aeiou]/g, ''));
  
  // Add prefixes/suffixes
  variations.push('get' + words.join(''));
  variations.push('my' + words.join(''));
  variations.push(words.join('') + 'hub');
  variations.push(words.join('') + 'pro');
  
  // Combine first letters
  if (words.length > 1) {
    variations.push(words.map(word => word[0]).join(''));
  }
  
  // Take first word + last word
  if (words.length > 1) {
    variations.push(words[0] + words[words.length - 1]);
  }

  return [...new Set(variations)];
}

export async function generateDomainSuggestions(input: string): Promise<DomainSuggestion[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const variations = generateVariations(input);
  const suggestions: DomainSuggestion[] = [];
  
  variations.forEach(name => {
    // Randomly select 2-3 TLDs for each variation
    const selectedTlds = commonTlds
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 2) + 2);
    
    selectedTlds.forEach(tld => {
      suggestions.push({
        name,
        tld,
        available: Math.random() > 0.3, // 70% chance of being available
        price: Math.floor(Math.random() * 20) + 10 // Random price between 10-30
      });
    });
  });
  
  return suggestions;
}