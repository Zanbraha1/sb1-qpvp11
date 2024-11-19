import React from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

const HomeBuyingCalculator = () => {
  return (
    <CalculatorLayout
      title="Home Buying Calculator"
      description="Coming Soon"
      blogContent=""
    >
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700">Coming Soon</h2>
        <p className="text-gray-600 mt-4">This calculator is under development.</p>
      </div>
    </CalculatorLayout>
  );
};

export default HomeBuyingCalculator;