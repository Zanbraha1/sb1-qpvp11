import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  Home as HomeIcon,
  DollarSign,
  PiggyBank,
  Building,
  TrendingUp,
} from 'lucide-react';

const calculatorCategories = [
  {
    title: 'Mortgage Calculators',
    description: 'Calculate monthly payments, affordability, and loan terms',
    icon: Calculator,
    links: [
      { name: 'Mortgage Calculator', path: '/mortgage-calculator' },
      { name: 'Home Loan Calculator', path: '/home-loan-calculator' },
      { name: 'Mortgage Payment Calculator', path: '/mortgage-payment-calculator' },
      { name: 'Mortgage Affordability Calculator', path: '/mortgage-affordability-calculator' },
    ],
  },
  {
    title: 'Home Value Tools',
    description: 'Estimate property values and equity',
    icon: HomeIcon,
    links: [
      { name: 'Home Value Calculator', path: '/home-value-calculator' },
      { name: 'Home Price Calculator', path: '/home-price-calculator' },
      { name: 'Home Equity Calculator', path: '/home-equity-calculator' },
      { name: 'Property Tax Calculator', path: '/property-tax-calculator' },
    ],
  },
  {
    title: 'Investment Analysis',
    description: 'Analyze real estate investments and returns',
    icon: TrendingUp,
    links: [
      { name: 'Real Estate ROI Calculator', path: '/real-estate-roi-calculator' },
      { name: 'Rent vs. Buy Calculator', path: '/rent-vs-buy-calculator' },
    ],
  },
  {
    title: 'Transaction Tools',
    description: 'Plan your home purchase or sale',
    icon: DollarSign,
    links: [
      { name: 'Home Buying Calculator', path: '/home-buying-calculator' },
      { name: 'Home Selling Calculator', path: '/home-selling-calculator' },
    ],
  },
];

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div 
        className="bg-navy-600 text-white relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Casper Real Estate Calculators
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Professional tools to help you make informed real estate decisions in the Athens, GA area
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.athensgahomesales.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-navy-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105 duration-200"
              >
                Book a FREE Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {calculatorCategories.map((category) => (
            <div
              key={category.title}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <category.icon className="h-8 w-8 text-navy-600 mr-3" />
                <h2 className="text-2xl font-semibold text-navy-600">
                  {category.title}
                </h2>
              </div>
              <p className="text-gray-600 mb-6">{category.description}</p>
              <ul className="space-y-3">
                {category.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-navy-600 hover:text-navy-800 flex items-center group"
                    >
                      <span className="mr-2 transform group-hover:translate-x-1 transition-transform">→</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Modern home exterior"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-navy-600 mb-6">
                About Chris Casper
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Following in the footsteps of my grandfather, Dave Casper, I'm committed to providing
                the same level of exceptional service that made him a trusted name in Oakwood real estate.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Growing up in Oakwood, GA, watching my grandfather help families find their dream homes, 
                I learned the value of integrity, hard work, and putting clients first. Now, I'm excited 
                to carry on that legacy and assist you with all your real estate needs in the Athens area.
              </p>
              <a
                href="https://www.athensgahomesales.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-navy-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-navy-700 transition-colors transform hover:scale-105 duration-200"
              >
                Learn More About Me
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-4">
              Why Choose Our Calculators?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Make informed decisions with our professional-grade real estate calculators
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="bg-navy-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calculator className="h-8 w-8 text-navy-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-600 mb-4">Accurate Calculations</h3>
              <p className="text-gray-600">
                Our calculators use industry-standard formulas to provide accurate estimates for your real estate decisions.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="bg-navy-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="h-8 w-8 text-navy-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-600 mb-4">Local Market Insights</h3>
              <p className="text-gray-600">
                Calculations tailored to the Athens, GA market conditions and property values.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="bg-navy-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <PiggyBank className="h-8 w-8 text-navy-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-600 mb-4">Smart Planning</h3>
              <p className="text-gray-600">
                Plan your real estate investments with confidence using our comprehensive tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;