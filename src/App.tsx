import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import MortgageCalculator from './pages/MortgageCalculator';
import HomeLoanCalculator from './pages/HomeLoanCalculator';
import MortgageAffordabilityCalculator from './pages/MortgageAffordabilityCalculator';
import HomePriceCalculator from './pages/HomePriceCalculator';
import RentVsBuyCalculator from './pages/RentVsBuyCalculator';
import HomeEquityCalculator from './pages/HomeEquityCalculator';
import MortgagePaymentCalculator from './pages/MortgagePaymentCalculator';
import HomeValueCalculator from './pages/HomeValueCalculator';
import PropertyTaxCalculator from './pages/PropertyTaxCalculator';
import RealEstateROICalculator from './pages/RealEstateROICalculator';
import HomeSellingCalculator from './pages/HomeSellingCalculator';
import HomeBuyingCalculator from './pages/HomeBuyingCalculator';

// Title updater component
const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const titles: { [key: string]: string } = {
      '/': 'Casper Real Estate Calculators | Athens, GA',
      '/contact': 'Contact Chris Casper | Athens Real Estate',
      '/mortgage-calculator': 'Mortgage Payment Calculator | Casper Real Estate',
      '/home-loan-calculator': 'Home Loan Calculator | Casper Real Estate',
      '/mortgage-affordability-calculator': 'Mortgage Affordability Calculator | Casper Real Estate',
      '/home-price-calculator': 'Home Price Calculator | Casper Real Estate',
      '/rent-vs-buy-calculator': 'Rent vs Buy Calculator | Casper Real Estate',
      '/home-equity-calculator': 'Home Equity Calculator | Casper Real Estate',
      '/mortgage-payment-calculator': 'Monthly Payment Calculator | Casper Real Estate',
      '/home-value-calculator': 'Home Value Calculator | Casper Real Estate',
      '/property-tax-calculator': 'Property Tax Calculator | Casper Real Estate',
      '/real-estate-roi-calculator': 'Real Estate ROI Calculator | Casper Real Estate',
      '/home-selling-calculator': 'Home Selling Calculator | Casper Real Estate',
      '/home-buying-calculator': 'Home Buying Calculator | Casper Real Estate',
    };

    document.title = titles[location.pathname] || 'Casper Real Estate Calculators | Athens, GA';
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <TitleUpdater />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
            <Route path="/home-loan-calculator" element={<HomeLoanCalculator />} />
            <Route path="/mortgage-affordability-calculator" element={<MortgageAffordabilityCalculator />} />
            <Route path="/home-price-calculator" element={<HomePriceCalculator />} />
            <Route path="/rent-vs-buy-calculator" element={<RentVsBuyCalculator />} />
            <Route path="/home-equity-calculator" element={<HomeEquityCalculator />} />
            <Route path="/mortgage-payment-calculator" element={<MortgagePaymentCalculator />} />
            <Route path="/home-value-calculator" element={<HomeValueCalculator />} />
            <Route path="/property-tax-calculator" element={<PropertyTaxCalculator />} />
            <Route path="/real-estate-roi-calculator" element={<RealEstateROICalculator />} />
            <Route path="/home-selling-calculator" element={<HomeSellingCalculator />} />
            <Route path="/home-buying-calculator" element={<HomeBuyingCalculator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;