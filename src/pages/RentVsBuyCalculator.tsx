import React, { useState, useCallback } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CurrencyInput from '../components/CurrencyInput';
import PercentageInput from '../components/PercentageInput';
import YearInput from '../components/YearInput';

const RentVsBuyCalculator = () => {
  const [homePrice, setHomePrice] = useState('300000');
  const [downPayment, setDownPayment] = useState('20');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [propertyTax, setPropertyTax] = useState('1.2');
  const [insurance, setInsurance] = useState('1200');
  const [maintenance, setMaintenance] = useState('1.5');
  const [monthlyRent, setMonthlyRent] = useState('1800');
  const [rentIncrease, setRentIncrease] = useState('3');
  const [homeAppreciation, setHomeAppreciation] = useState('3.5');
  const [timeframe, setTimeframe] = useState('7');

  const calculateComparison = useCallback(() => {
    // Buying calculations
    const principal = Number(homePrice) * (1 - Number(downPayment) / 100);
    const monthlyRate = Number(interestRate) / 100 / 12;
    const numberOfPayments = Number(loanTerm) * 12;
    
    // Monthly mortgage payment
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    // Additional monthly costs
    const monthlyTax = (Number(homePrice) * (Number(propertyTax) / 100)) / 12;
    const monthlyInsurance = Number(insurance) / 12;
    const monthlyMaintenance = (Number(homePrice) * (Number(maintenance) / 100)) / 12;
    
    const totalMonthlyBuying = monthlyPayment + monthlyTax + monthlyInsurance + monthlyMaintenance;
    
    // Calculate costs over timeframe
    const years = Number(timeframe);
    let totalBuyingCost = 0;
    let totalRentCost = 0;
    let currentRent = Number(monthlyRent);
    let homeValue = Number(homePrice);
    const downPaymentAmount = Number(homePrice) * (Number(downPayment) / 100);
    
    for (let year = 1; year <= years; year++) {
      // Buying costs for the year
      totalBuyingCost += totalMonthlyBuying * 12;
      
      // Renting costs for the year
      totalRentCost += currentRent * 12;
      
      // Increase rent for next year
      currentRent *= (1 + Number(rentIncrease) / 100);
      
      // Increase home value for next year
      homeValue *= (1 + Number(homeAppreciation) / 100);
    }
    
    // Add down payment to buying costs
    totalBuyingCost += downPaymentAmount;
    
    // Subtract home value appreciation from buying costs
    const equity = homeValue - Number(homePrice);
    totalBuyingCost -= equity;
    
    // Calculate monthly averages
    const avgMonthlyBuying = totalBuyingCost / (years * 12);
    const avgMonthlyRenting = totalRentCost / (years * 12);
    
    return {
      totalBuyingCost: totalBuyingCost.toFixed(0),
      totalRentingCost: totalRentCost.toFixed(0),
      monthlyBuying: totalMonthlyBuying.toFixed(0),
      avgMonthlyBuying: avgMonthlyBuying.toFixed(0),
      avgMonthlyRenting: avgMonthlyRenting.toFixed(0),
      equity: equity.toFixed(0),
      finalHomeValue: homeValue.toFixed(0),
    };
  }, [
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTax,
    insurance,
    maintenance,
    monthlyRent,
    rentIncrease,
    homeAppreciation,
    timeframe,
  ]);

  const results = calculateComparison();

  const blogContent = `
    <h2>Rent vs. Buy in Athens: Making the Right Choice</h2>
    <p>As your local real estate expert, I often help clients weigh the financial implications of renting versus buying in Athens. This calculator helps you compare the long-term costs and benefits of each option.</p>

    <h2>Current Athens Market Insights</h2>
    <ul>
      <li><strong>Rental Market:</strong> Average rents range from $1,200 to $2,500 depending on location and size</li>
      <li><strong>Home Prices:</strong> Median home prices vary by neighborhood, typically $200,000 to $500,000</li>
      <li><strong>Market Trends:</strong> Steady appreciation in both rental rates and home values</li>
      <li><strong>Student Impact:</strong> UGA's presence creates strong rental demand</li>
    </ul>

    <h2>Key Factors to Consider</h2>
    <ul>
      <li><strong>Time Horizon:</strong> How long you plan to stay in Athens</li>
      <li><strong>Market Conditions:</strong> Current interest rates and home prices</li>
      <li><strong>Tax Benefits:</strong> Mortgage interest and property tax deductions</li>
      <li><strong>Maintenance Costs:</strong> Ongoing expenses of homeownership</li>
      <li><strong>Appreciation:</strong> Potential for building equity</li>
    </ul>

    <h2>Benefits of Buying</h2>
    <ul>
      <li>Build equity over time</li>
      <li>Stable monthly payments</li>
      <li>Tax advantages</li>
      <li>Freedom to modify your home</li>
      <li>Protection against rent increases</li>
    </ul>

    <h2>Benefits of Renting</h2>
    <ul>
      <li>Lower upfront costs</li>
      <li>More flexibility to move</li>
      <li>No maintenance responsibilities</li>
      <li>Predictable monthly costs</li>
      <li>Less financial risk</li>
    </ul>

    <h2>Professional Guidance</h2>
    <p>While this calculator provides valuable insights, many personal factors influence the rent vs. buy decision. As your local real estate expert, I can help you:</p>
    <ul>
      <li>Analyze your specific situation</li>
      <li>Explore available properties</li>
      <li>Understand local market trends</li>
      <li>Connect with trusted lenders</li>
      <li>Make an informed decision</li>
    </ul>
  `;

  return (
    <CalculatorLayout
      title="Rent vs Buy Calculator"
      description="Compare the costs of renting versus buying a home in Athens"
      blogContent={blogContent}
    >
      <div className="space-y-6">
        <div className="bg-navy-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-navy-600 mb-2">Purchase Details</h3>
          <div className="space-y-4">
            <CurrencyInput
              label="Home Price"
              value={homePrice}
              onChange={setHomePrice}
              placeholder="Enter home price"
              id="home-price"
            />
            <PercentageInput
              label="Down Payment"
              value={downPayment}
              onChange={setDownPayment}
              placeholder="Enter down payment percentage"
              id="down-payment"
            />
            <PercentageInput
              label="Interest Rate"
              value={interestRate}
              onChange={setInterestRate}
              placeholder="Enter interest rate"
              id="interest-rate"
            />
            <YearInput
              label="Loan Term"
              value={loanTerm}
              onChange={setLoanTerm}
              placeholder="Enter loan term in years"
              id="loan-term"
            />
          </div>
        </div>

        <div className="bg-navy-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-navy-600 mb-2">Additional Costs</h3>
          <div className="space-y-4">
            <PercentageInput
              label="Property Tax Rate"
              value={propertyTax}
              onChange={setPropertyTax}
              placeholder="Enter property tax rate"
              id="property-tax"
            />
            <CurrencyInput
              label="Annual Insurance"
              value={insurance}
              onChange={setInsurance}
              placeholder="Enter annual insurance cost"
              id="insurance"
            />
            <PercentageInput
              label="Annual Maintenance"
              value={maintenance}
              onChange={setMaintenance}
              placeholder="Enter maintenance percentage"
              id="maintenance"
            />
          </div>
        </div>

        <div className="bg-navy-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-navy-600 mb-2">Rental Comparison</h3>
          <div className="space-y-4">
            <CurrencyInput
              label="Monthly Rent"
              value={monthlyRent}
              onChange={setMonthlyRent}
              placeholder="Enter monthly rent"
              id="monthly-rent"
            />
            <PercentageInput
              label="Annual Rent Increase"
              value={rentIncrease}
              onChange={setRentIncrease}
              placeholder="Enter annual rent increase"
              id="rent-increase"
            />
          </div>
        </div>

        <div className="bg-navy-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-navy-600 mb-2">Market Conditions</h3>
          <div className="space-y-4">
            <PercentageInput
              label="Home Appreciation Rate"
              value={homeAppreciation}
              onChange={setHomeAppreciation}
              placeholder="Enter annual appreciation rate"
              id="home-appreciation"
            />
            <YearInput
              label="Time Frame"
              value={timeframe}
              onChange={setTimeframe}
              placeholder="Enter time frame in years"
              id="timeframe"
            />
          </div>
        </div>

        <div className="calculator-result">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 border-b border-navy-200 pb-4 mb-4">
              <h3 className="text-xl font-bold text-navy-600">Monthly Costs</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-600">Buying</p>
                  <p className="result-value">${Number(results.monthlyBuying).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Renting</p>
                  <p className="result-value">${Number(monthlyRent).toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Buying Cost</h3>
              <p className="result-value">${Number(results.totalBuyingCost).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Renting Cost</h3>
              <p className="result-value">${Number(results.totalRentingCost).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Built Equity</h3>
              <p className="result-value">${Number(results.equity).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Final Home Value</h3>
              <p className="result-value">${Number(results.finalHomeValue).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default RentVsBuyCalculator;