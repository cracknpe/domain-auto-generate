import React, { useState } from 'react';
import { Search, Sparkles, CheckCircle, XCircle, Flame, Shield, Clock, CreditCard, ArrowRight, Star, DollarSign, Zap } from 'lucide-react';
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

const LoadingAnimation = () => {
  const steps = [
    "Consulting AI wizard 🧙‍♂️",
    "Exploring domain space 🚀",
    "Checking availability 🔍",
    "Filtering best matches ⭐",
    "Preparing results 📝"
  ];

  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="space-y-4">
          <div className="h-2 bg-gray-200 rounded">
            <div
                className="h-full bg-indigo-600 rounded transition-all duration-500 ease-in-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="min-h-[60px] flex items-center justify-center">
            <p className="text-lg text-gray-700 text-center animate-fade-in">
              {steps[currentStep]}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="animate-bounce">
              <Sparkles className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>
  );
};

const DomainCard = ({ suggestion }: { suggestion: DomainSuggestion }) => {
  const isSpecialTLD = ['.com', '.net', '.org'].includes(suggestion.tld);
  const fullDomain = `${suggestion.name}${suggestion.tld}`;
  const domainLink = isSpecialTLD
      ? 'https://www.shareasale.com/r.cfm?b=2565835&u=4427351&m=155350'
      : `https://www.namesilo.com/domain/search-domains/?query=${fullDomain}`;

  return (
      <a
          href={domainLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`block bg-white rounded-lg shadow-md p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${isSpecialTLD && suggestion.available ? 'border-2 border-red-500' : ''}`}
          onClick={() => {
            try {
              if (window.gtag) {
                window.gtag('event', 'domain_click', {
                  'event_category': 'affiliate',
                  'event_label': fullDomain,
                  'value': isSpecialTLD ? 1 : 0
                });
              }
            } catch (e) {
              console.error('Analytics error:', e);
            }
          }}
      >
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <div className="text-lg font-medium">
                {fullDomain}
              </div>
              {isSpecialTLD && suggestion.available && (
                  <div className="relative">
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                    <div className="flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-md">
                      <Flame className="h-4 w-4 mr-1.5 animate-pulse" />
                      Hot Sale!
                    </div>
                  </div>
              )}
            </div>
            <div className="text-sm text-gray-500 mt-1">
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
            {isSpecialTLD && suggestion.available && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="h-4 w-4 mr-1.5 text-green-600" />
                    Free Privacy Protection
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1.5 text-blue-600" />
                    Instant Setup
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CreditCard className="h-4 w-4 mr-1.5 text-purple-600" />
                    Money Back Guarantee
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-1.5 text-yellow-500" />
                    Premium Support
                  </div>
                </div>
            )}
          </div>
          {suggestion.available && (
              <div className="text-right">
                <div className="text-indigo-600 font-semibold">
                  {isSpecialTLD ? (
                      <div className="flex flex-col items-end">
                        <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium mb-1">
                          Best Value!
                        </div>
                        <span className="text-sm line-through text-gray-400">${suggestion.price}/yr</span>
                        <span className="text-xl font-bold text-red-600 animate-pulse">$4.95/yr</span>
                        <span className="text-xs text-red-500 font-medium">Limited Time!</span>
                        <div className="text-xs text-gray-500 mt-1">Save ${(suggestion.price - 4.95).toFixed(2)}!</div>
                        <button className="mt-2 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md group">
                          Register Now
                          <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                  ) : (
                      <div>
                        <span>${suggestion.price}/yr</span>
                        {suggestion.renewPrice && (
                            <div className="text-sm text-gray-500">
                              Renews at ${suggestion.renewPrice}/yr
                            </div>
                        )}
                        <button className="mt-2 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all duration-300">
                          Check Availability
                        </button>
                      </div>
                  )}
                </div>
              </div>
          )}
        </div>
      </a>
  );
};

const AffiliateBenefits = () => (
    <div className="mt-12 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
        Why Register Through DomainWizard?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 mx-auto">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-center">Exclusive Deals</h3>
          <p className="text-gray-600 text-center">Access to special pricing and promotional offers not available elsewhere</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 mx-auto">
            <Zap className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-center">Smart Suggestions</h3>
          <p className="text-gray-600 text-center">AI-powered domain recommendations tailored to your needs</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 mx-auto">
            <Star className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-center">Premium Support</h3>
          <p className="text-gray-600 text-center">Expert guidance and support throughout your domain registration</p>
        </div>
      </div>
    </div>
);

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
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm font-semibold animate-pulse">
            🔥 Limited Time Offer: Premium Domains from $4.95/yr + Free Bonuses
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Find Your Perfect Domain Name
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Enter your brand, niche, or website theme to discover available domains at unbeatable prices.
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
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Generating...
                    </>
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

          {loading && <LoadingAnimation />}

          {suggestions.length > 0 && !loading && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Domain Suggestions</h2>
                <p className="text-center text-gray-600 mb-6">Click on any domain to check availability and register</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestions.map((suggestion, index) => (
                      <DomainCard key={index} suggestion={suggestion} />
                  ))}
                </div>
              </div>
          )}
        </div>

        <AffiliateBenefits />

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