import React, { useState } from 'react';
import { Search, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { generateDomainSuggestions } from '../utils/domainGenerator';

const ExampleCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

interface DomainSuggestion {
  name: string;
  tld: string;
  available: boolean;
  price?: number;
  renewPrice?: number;
}

const Home = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<DomainSuggestion[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    if (!trimmedInput) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError('');
    setSuggestions([]);
    
    try {
      const results = await generateDomainSuggestions(trimmedInput);
      if (results.length === 0) {
        setError('No domain suggestions found. Please try a different search term.');
      } else {
        setSuggestions(results);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate domain suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Find Your Perfect Domain Name
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Enter your brand, niche, or website theme to generate creative domain suggestions powered by AI.
        </p>
      </div>

      <div className="mt-10">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex shadow-sm rounded-md">
            <div className="relative flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300 h-12"
                placeholder="Enter your brand name, niche, or website theme (e.g., 'tech blog', 'fitness coaching')"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="relative -ml-px inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Names
                </>
              )}
            </button>
          </div>
        </form>
        
        {error && (
          <div className="mt-4 text-red-600 text-center">{error}</div>
        )}

        {suggestions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Domain Suggestions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-lg font-medium">
                        {suggestion.name}{suggestion.tld}
                      </div>
                      <div className="text-sm text-gray-500">
                        {suggestion.available ? (
                          <span className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Available
                          </span>
                        ) : (
                          <span className="flex items-center text-red-600">
                            <XCircle className="h-4 w-4 mr-1" />
                            Taken
                          </span>
                        )}
                      </div>
                    </div>
                    {suggestion.available && suggestion.price && (
                      <div className="text-right">
                        <div className="text-indigo-600 font-semibold">
                          ${suggestion.price}/yr
                        </div>
                        <div className="text-sm text-gray-500">
                          Renews at ${suggestion.renewPrice}/yr
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Example Use Cases</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ExampleCard
            title="Tech Startup"
            description="Input: 'AI software automation' → Result: techautomate.ai, smartflow.tech"
          />
          <ExampleCard
            title="Food Blog"
            description="Input: 'healthy recipes cooking' → Result: healthykitchen.com, freshplate.co"
          />
          <ExampleCard
            title="Fitness Business"
            description="Input: 'personal training fitness' → Result: fitjourney.com, stronglife.fit"
          />
        </div>
      </div>

      <div className="mt-16 bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">How It Works</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
              <span className="text-indigo-600 font-bold">1</span>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Enter Your Details</h3>
            <p className="mt-2 text-gray-500">Describe your brand, niche, or website theme</p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
              <span className="text-indigo-600 font-bold">2</span>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">AI Generation</h3>
            <p className="mt-2 text-gray-500">Our AI analyzes your input and generates creative domains</p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
              <span className="text-indigo-600 font-bold">3</span>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Choose Your Domain</h3>
            <p className="mt-2 text-gray-500">Select from multiple unique and available domain suggestions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;