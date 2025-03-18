import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Privacy Policy
        </h1>
        <div className="mt-6 prose prose-indigo prose-lg text-gray-500">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when using our domain name generation service,
            including search queries and contact information when you communicate with us.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>Provide and improve our domain name generation service</li>
            <li>Respond to your comments and questions</li>
            <li>Send you related information, including confirmations and updates</li>
            <li>Monitor and analyze trends and usage</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">3. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">4. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our service
            and hold certain information to improve and analyze our service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            privacy@domainwizard.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;