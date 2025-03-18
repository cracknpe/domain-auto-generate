import React from 'react';
import { Shield, Zap, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          About DomainWizard
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Helping businesses find their perfect online identity through AI-powered domain suggestions.
        </p>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-indigo-600">
              <Zap className="h-full w-full" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">Lightning Fast</h3>
            <p className="mt-2 text-base text-gray-500">
              Get instant domain suggestions powered by advanced AI technology.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-indigo-600">
              <Shield className="h-full w-full" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">Reliable Results</h3>
            <p className="mt-2 text-base text-gray-500">
              Our AI ensures all suggested domains are meaningful and brandable.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-indigo-600">
              <Globe className="h-full w-full" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">Global Support</h3>
            <p className="mt-2 text-base text-gray-500">
              Supporting multiple TLDs and international domain suggestions.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Our Mission</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                At DomainWizard, we're committed to simplifying the domain name search process. 
                Our AI-powered platform helps businesses and individuals find the perfect domain 
                name that reflects their brand identity and resonates with their audience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;