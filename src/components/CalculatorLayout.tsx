import React, { ReactNode } from 'react';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  blogContent: string;
}

const getBackgroundImage = (title: string) => {
  const images = {
    'Mortgage Calculator': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    'Home Loan Calculator': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    'Mortgage Affordability Calculator': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    'Home Price Calculator': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    'Rent vs Buy Calculator': 'https://images.unsplash.com/photo-1560518883-b2275537fde2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    'Home Equity Calculator': 'https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    'Mortgage Payment Calculator': 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    'Home Value Calculator': 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    'Property Tax Calculator': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    'Real Estate ROI Calculator': 'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    'Home Selling Calculator': 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    'Home Buying Calculator': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
  };
  
  return images[title as keyof typeof images] || images['Mortgage Calculator'];
};

const CalculatorLayout = ({ title, description, children, blogContent }: CalculatorLayoutProps) => {
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="bg-navy-600 text-white relative py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url("${getBackgroundImage(title)}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-xl text-gray-200">{description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-xl p-8">
            {children}
          </div>

          <div className="prose max-w-none">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: blogContent }} />
              
              {/* CTA Section */}
              <div className="mt-8 p-6 bg-navy-50 rounded-lg border border-navy-100">
                <h3 className="text-xl font-semibold text-navy-600 mb-4">Need Professional Guidance?</h3>
                <p className="text-gray-600 mb-4">
                  Get personalized advice for your specific situation. Schedule a free consultation today.
                </p>
                <a
                  href="https://www.athensgahomesales.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-navy-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-700 transition-colors"
                >
                  Book a Free Consultation
                </a>
              </div>

              {/* Brokerage Information */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <p className="font-semibold">Mark Mahaffey and Associates Real Estate</p>
                  <p>1671 Meriweather Drive, Suite 101-B</p>
                  <p>Watkinsville, GA 30677</p>
                  <p className="mt-2">
                    <a href="tel:706-543-3008" className="text-navy-600 hover:text-navy-700">
                      706.543.3008
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorLayout;