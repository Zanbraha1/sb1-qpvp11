import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Calculator, Home, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Mortgage Calculator', path: '/mortgage-calculator' },
    { name: 'Home Loan Calculator', path: '/home-loan-calculator' },
    { name: 'Mortgage Affordability', path: '/mortgage-affordability-calculator' },
    { name: 'Home Price Calculator', path: '/home-price-calculator' },
    { name: 'Rent vs. Buy', path: '/rent-vs-buy-calculator' },
    { name: 'Home Equity', path: '/home-equity-calculator' },
    { name: 'Mortgage Payment', path: '/mortgage-payment-calculator' },
    { name: 'Home Value', path: '/home-value-calculator' },
    { name: 'Property Tax', path: '/property-tax-calculator' },
    { name: 'Real Estate ROI', path: '/real-estate-roi-calculator' },
    { name: 'Home Selling', path: '/home-selling-calculator' },
    { name: 'Home Buying', path: '/home-buying-calculator' },
  ];

  return (
    <nav className="bg-navy-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Calculator className="h-8 w-8" />
              <span className="font-bold text-xl">Casper Real Estate Calculators</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-gray-300 px-3 py-2 rounded-md">
              <Home className="h-5 w-5" />
            </Link>
            <div className="relative group">
              <button className="hover:text-gray-300 px-3 py-2 rounded-md">
                Calculators
              </button>
              <div className="absolute z-50 left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Link to="/contact" className="hover:text-gray-300 px-3 py-2 rounded-md flex items-center">
              <Phone className="h-5 w-5 mr-1" />
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-gray-300 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;