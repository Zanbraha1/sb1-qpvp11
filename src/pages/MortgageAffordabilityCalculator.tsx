import React, { useState, useCallback } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CurrencyInput from '../components/CurrencyInput';
import PercentageInput from '../components/PercentageInput';

const MortgageAffordabilityCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState('100000');
  const [monthlyDebts, setMonthlyDebts] = useState('500');
  const [downPayment, setDownPayment] = useState('60000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [propertyTax, setPropertyTax] = useState('1.2');
  const [insurance, setInsurance] = useState('1200');

  const calculateAffordability = useCallback(() => {
    // Monthly income
    const monthlyIncome = Number(annualIncome) / 12;
    
    // Maximum monthly payment (using 28/36 rule)
    const maxFrontEndRatio = 0.28; // 28% of monthly income for housing
    const maxBackEndRatio = 0.36; // 36% of monthly income for total debt
    
    const maxHousingPayment = monthlyIncome * maxFrontEndRatio;
    const maxTotalDebtPayment = monthlyIncome * maxBackEndRatio;
    const availableForHousing = maxTotalDebtPayment - Number(monthlyDebts);
    
    // Use the lower of the two maximums
    const maxMonthlyPayment = Math.min(maxHousingPayment, availableForHousing);
    
    // Calculate max home price
    const monthlyRate = Number(interestRate) / 100 / 12;
    const numberOfPayments = 30 * 12; // Assuming 30-year mortgage
    
    // Monthly tax and insurance
    const monthlyInsurance = Number(insurance) / 12;
    
    // Available for P&I
    const availableForPI = maxMonthlyPayment - monthlyInsurance;
    
    // Calculate max loan amount
    const maxLoanAmount = availableForPI / 
      ((monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1));
    
    // Calculate max home price
    const maxHomePrice = maxLoanAmount + Number(downPayment);
    
    // Calculate monthly payments breakdown
    const actualPI = (maxLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const monthlyTax = (maxHomePrice * (Number(propertyTax) / 100)) / 12;
    
    return {
      maxHomePrice: maxHomePrice.toFixed(0),
      maxLoanAmount: maxLoanAmount.toFixed(0),
      monthlyPayment: maxMonthlyPayment.toFixed(0),
      principalAndInterest: actualPI.toFixed(0),
      propertyTax: monthlyTax.toFixed(0),
      insurance: monthlyInsurance.toFixed(0),
    };
  }, [annualIncome, monthlyDebts, downPayment, interestRate, propertyTax, insurance]);

  const results = calculateAffordability();

  const blogContent = `
    <h2>Understanding Mortgage Affordability</h2>
    <p>As your real estate expert, I know that understanding how much house you can afford is the crucial first step in your home-buying journey. This calculator uses industry-standard debt ratios and your financial information to determine a comfortable home price range for your budget.</p>

    <h2>The 28/36 Rule</h2>
    <p>This calculator uses the industry-standard 28/36 rule:</p>
    <ul>
      <li><strong>28% Rule:</strong> Your monthly mortgage payment should not exceed 28% of your gross monthly income</li>
      <li><strong>36% Rule:</strong> Your total monthly debt payments (including mortgage) should not exceed 36% of your gross monthly income</li>
    </ul>

    <h2>Key Factors Affecting Your Home Affordability</h2>
    <ul>
      <li><strong>Annual Income:</strong> Your gross yearly income before taxes</li>
      <li><strong>Monthly Debts:</strong> Car payments, student loans, credit card minimums, etc.</li>
      <li><strong>Down Payment:</strong> The amount you plan to pay upfront</li>
      <li><strong>Interest Rate:</strong> Current mortgage rates affect your buying power</li>
      <li><strong>Property Taxes:</strong> Varies by location and affects monthly payments</li>
      <li><strong>Insurance:</strong> Required homeowners insurance costs</li>
    </ul>

    <h2>Tips to Increase Your Home Affordability</h2>
    <ul>
      <li>Pay down existing debts to lower your debt-to-income ratio</li>
      <li>Save for a larger down payment</li>
      <li>Improve your credit score to qualify for better interest rates</li>
      <li>Consider areas with lower property tax rates</li>
      <li>Shop around for better insurance rates</li>
    </ul>

    <h2>Professional Guidance</h2>
    <p>While this calculator provides a good starting point, everyone's situation is unique. As your local real estate expert, I can help you understand these numbers in the context of our local market and connect you with trusted lenders who can provide detailed pre-approval information.</p>

    <h2>Next Steps</h2>
    <p>Once you have an idea of your price range:</p>
    <ul>
      <li>Get pre-approved for a mortgage</li>
      <li>Start browsing homes in your price range</li>
      <li>Consider additional costs like maintenance and utilities</li>
      <li>Schedule a consultation to discuss your options</li>
    </ul>
  `;

  return (
    <CalculatorLayout
      title="Mortgage Affordability Calculator"
      description="Find out how much house you can afford based on your income and expenses"
      blogContent={blogContent}
    >
      <div className="space-y-6">
        <CurrencyInput
          label="Annual Income"
          value={annualIncome}
          onChange={setAnnualIncome}
          placeholder="Enter your annual income"
          id="annual-income"
        />
        <CurrencyInput
          label="Monthly Debts"
          value={monthlyDebts}
          onChange={setMonthlyDebts}
          placeholder="Enter your monthly debts"
          id="monthly-debts"
        />
        <CurrencyInput
          label="Down Payment"
          value={downPayment}
          onChange={setDownPayment}
          placeholder="Enter your down payment"
          id="down-payment"
        />
        <PercentageInput
          label="Interest Rate"
          value={interestRate}
          onChange={setInterestRate}
          placeholder="Enter interest rate"
          id="interest-rate"
        />
        <PercentageInput
          label="Property Tax Rate"
          value={propertyTax}
          onChange={setPropertyTax}
          placeholder="Enter annual property tax rate"
          id="property-tax"
        />
        <CurrencyInput
          label="Annual Insurance"
          value={insurance}
          onChange={setInsurance}
          placeholder="Enter annual insurance cost"
          id="insurance"
        />

        <div className="calculator-result">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-navy-600">Maximum Home Price</h3>
              <p className="result-value text-3xl">${Number(results.maxHomePrice).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Maximum Loan Amount</h3>
              <p className="result-value">${Number(results.maxLoanAmount).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Monthly Payment</h3>
              <p className="result-value">${Number(results.monthlyPayment).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Principal & Interest</h3>
              <p className="result-value">${Number(results.principalAndInterest).toLocaleString()}/mo</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Property Tax</h3>
              <p className="result-value">${Number(results.propertyTax).toLocaleString()}/mo</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default MortgageAffordabilityCalculator;