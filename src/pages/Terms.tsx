import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Terms of Service
        </h1>
        <div className="mt-6 prose prose-indigo prose-lg text-gray-500">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Acceptance of Terms</h2>
          <p>
            By accessing and using DomainWizard, you accept and agree to be bound by the terms
            and provision of this agreement.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">2. Description of Service</h2>
          <p>
            DomainWizard provides an AI-powered domain name generation service. We do not
            guarantee the availability of suggested domain names for registration.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">3. User Conduct</h2>
          <p>
            You agree to use our service only for lawful purposes and in accordance with
            these Terms of Service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">4. Intellectual Property</h2>
          <p>
            The service and its original content, features, and functionality are owned by
            DomainWizard and are protected by international copyright, trademark, patent,
            trade secret, and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">5. Limitation of Liability</h2>
          <p>
            DomainWizard shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of our service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision
            is material, we will provide at least 30 days' notice prior to any new terms
            taking effect.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">7. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
            terms@domainwizard.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;