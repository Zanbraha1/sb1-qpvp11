import React, { useState, useCallback } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CurrencyInput from '../components/CurrencyInput';
import PercentageInput from '../components/PercentageInput';
import YearInput from '../components/YearInput';

const RealEstateROICalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState('300000');
  const [downPayment, setDownPayment] = useState('20');
  const [closingCosts, setClosingCosts] = useState('5000');
  const [repairCosts, setRepairCosts] = useState('10000');
  const [monthlyRent, setMonthlyRent] = useState('2500');
  const [vacancy, setVacancy] = useState('5');
  const [propertyTax, setPropertyTax] = useState('1.2');
  const [insurance, setInsurance] = useState('1200');
  const [maintenance, setMaintenance] = useState('1.5');
  const [propertyManager, setPropertyManager] = useState('10');
  const [appreciation, setAppreciation] = useState('3.5');
  const [holdingPeriod, setHoldingPeriod] = useState('5');
  const [interestRate, setInterestRate] = useState('6.5');

  const calculateROI = useCallback(() => {
    // Initial Investment
    const price = Number(purchasePrice);
    const down = price * (Number(downPayment) / 100);
    const closing = Number(closingCosts);
    const repairs = Number(repairCosts);
    const totalInvestment = down + closing + repairs;

    // Monthly Income
    const potentialRent = Number(monthlyRent);
    const effectiveRent = potentialRent * (1 - Number(vacancy) / 100);
    
    // Monthly Expenses
    const loanAmount = price - down;
    const monthlyRate = Number(interestRate) / 100 / 12;
    const numberOfPayments = 30 * 12; // 30-year fixed
    const monthlyMortgage = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const monthlyTax = (price * (Number(propertyTax) / 100)) / 12;
    const monthlyInsurance = Number(insurance) / 12;
    const monthlyMaintenance = (price * (Number(maintenance) / 100)) / 12;
    const monthlyManager = effectiveRent * (Number(propertyManager) / 100);

    const totalMonthlyExpenses = monthlyMortgage + monthlyTax + monthlyInsurance + 
      monthlyMaintenance + monthlyManager;

    // Monthly Cash Flow
    const monthlyCashFlow = effectiveRent - totalMonthlyExpenses;
    const annualCashFlow = monthlyCashFlow * 12;

    // Appreciation
    const years = Number(holdingPeriod);
    const futureValue = price * Math.pow(1 + Number(appreciation) / 100, years);
    const equityGain = futureValue - price;
    const principalPaid = (monthlyMortgage - (loanAmount * monthlyRate)) * 12 * years;

    // Returns
    const totalReturn = (annualCashFlow * years) + equityGain + principalPaid;
    const roi = (totalReturn / totalInvestment) * 100;
    const cashOnCash = (annualCashFlow / totalInvestment) * 100;
    const capRate = ((effectiveRent * 12 - (totalMonthlyExpenses - monthlyMortgage) * 12) / price) * 100;

    return {
      monthlyRentIncome: effectiveRent.toFixed(0),
      monthlyExpenses: totalMonthlyExpenses.toFixed(0),
      monthlyCashFlow: monthlyCashFlow.toFixed(0),
      annualCashFlow: annualCashFlow.toFixed(0),
      totalInvestment: totalInvestment.toFixed(0),
      projectedValue: futureValue.toFixed(0),
      totalReturn: totalReturn.toFixed(0),
      roi: roi.toFixed(1),
      cashOnCash: cashOnCash.toFixed(1),
      capRate: capRate.toFixed(1),
    };
  }, [
    purchasePrice,
    downPayment,
    closingCosts,
    repairCosts,
    monthlyRent,
    vacancy,
    propertyTax,
    insurance,
    maintenance,
    propertyManager,
    appreciation,
    holdingPeriod,
    interestRate,
  ]);

  const results = calculateROI();

  const blogContent = `
    <h2>Understanding Real Estate ROI in Athens</h2>
    <p>As your local real estate expert, I help investors analyze potential returns on investment properties. This calculator provides a comprehensive analysis of both cash flow and appreciation potential.</p>

    <h2>Key Investment Metrics</h2>
    <ul>
      <li><strong>Cash on Cash Return:</strong> Annual cash flow divided by total investment</li>
      <li><strong>Cap Rate:</strong> Net operating income divided by property value</li>
      <li><strong>Total ROI:</strong> Includes cash flow, appreciation, and equity buildup</li>
      <li><strong>Monthly Cash Flow:</strong> Rental income minus all expenses</li>
    </ul>

    <h2>Athens Market Insights</h2>
    <p>Current investment trends in Athens:</p>
    <ul>
      <li>Strong rental demand from UGA students and faculty</li>
      <li>Growing professional population</li>
      <li>Steady appreciation in key neighborhoods</li>
      <li>Various property types available for investment</li>
    </ul>

    <h2>Investment Considerations</h2>
    <ul>
      <li><strong>Location:</strong> Proximity to UGA, downtown, and employers</li>
      <li><strong>Property Type:</strong> Single-family, multi-family, or student housing</li>
      <li><strong>Management:</strong> Self-manage or professional property management</li>
      <li><strong>Financing:</strong> Various loan options and terms</li>
    </ul>

    <h2>Professional Guidance</h2>
    <p>While this calculator provides estimates, successful real estate investing requires local expertise. I can help you:</p>
    <ul>
      <li>Find properties with good investment potential</li>
      <li>Analyze specific opportunities</li>
      <li>Connect with property managers</li>
      <li>Understand local regulations</li>
      <li>Plan your investment strategy</li>
    </ul>
  `;

  return (
    <CalculatorLayout
      title="Real Estate ROI Calculator"
      description="Calculate potential returns on your real estate investment"
      blogContent={blogContent}
    >
      <div className="space-y-6">
        <div className="bg-navy-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-navy-600 mb-2">Purchase Details</h3>
          <div className="space-y-4">
            <CurrencyInput
              label="Purchase Price"
              value={purchasePrice}
              onChange={setPurchasePrice}
              placeholder="Enter purchase price"
              id="purchase-price"
            />
            <PercentageInput
              label="Down Payment"
              value={downPayment}
              onChange={setDownPayment}
              placeholder="Enter down payment percentage"
              id="down-payment"
            />
            <CurrencyInput
              label="Closing Costs"
              value={closingCosts}
              onChange={setClosingCosts}
              placeholder="Enter closing costs"
              id="closing-costs"
            />
            <CurrencyInput
              label="Repair/Renovation Costs"
              value={repairCosts}
              onChange={setRepairCosts}
              placeholder="Enter repair costs"
              id="repair-costs"
            />
            <PercentageInput
              label="Interest Rate"
              value={interestRate}
              onChange={setInterestRate}
              placeholder="Enter interest rate"
              id="interest-rate"
            />
          </div>
        </div>

        <div className="bg-navy-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-navy-600 mb-2">Rental Income</h3>
          <div className="space-y-4">
            <CurrencyInput
              label="Monthly Rent"
              value={monthlyRent}
              onChange={setMonthlyRent}
              placeholder="Enter monthly rent"
              id="monthly-rent"
            />
            <PercentageInput
              label="Vacancy Rate"
              value={vacancy}
              onChange={setVacancy}
              placeholder="Enter vacancy rate"
              id="vacancy-rate"
            />
          </div>
        </div>

        <div className="bg-navy-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-navy-600 mb-2">Operating Expenses</h3>
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
              placeholder="Enter annual insurance"
              id="insurance"
            />
            <PercentageInput
              label="Maintenance (%)"
              value={maintenance}
              onChange={setMaintenance}
              placeholder="Enter maintenance percentage"
              id="maintenance"
            />
            <PercentageInput
              label="Property Management Fee"
              value={propertyManager}
              onChange={setPropertyManager}
              placeholder="Enter property management fee"
              id="property-manager"
            />
          </div>
        </div>

        <div className="bg-navy-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-navy-600 mb-2">Appreciation</h3>
          <div className="space-y-4">
            <PercentageInput
              label="Annual Appreciation Rate"
              value={appreciation}
              onChange={setAppreciation}
              placeholder="Enter appreciation rate"
              id="appreciation"
            />
            <YearInput
              label="Holding Period"
              value={holdingPeriod}
              onChange={setHoldingPeriod}
              placeholder="Enter holding period in years"
              id="holding-period"
            />
          </div>
        </div>

        <div className="calculator-result">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 border-b border-navy-200 pb-4 mb-4">
              <h3 className="text-xl font-bold text-navy-600">Monthly Cash Flow</h3>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-600">Income</p>
                  <p className="result-value">${Number(results.monthlyRentIncome).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expenses</p>
                  <p className="result-value">${Number(results.monthlyExpenses).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cash Flow</p>
                  <p className="result-value">${Number(results.monthlyCashFlow).toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Investment</h3>
              <p className="result-value">${Number(results.totalInvestment).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Annual Cash Flow</h3>
              <p className="result-value">${Number(results.annualCashFlow).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Projected Value</h3>
              <p className="result-value">${Number(results.projectedValue).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Return</h3>
              <p className="result-value">${Number(results.totalReturn).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Cash on Cash Return</h3>
              <p className="result-value">{results.cashOnCash}%</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Cap Rate</h3>
              <p className="result-value">{results.capRate}%</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default RealEstateROICalculator;