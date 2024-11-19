import React, { useState, useCallback } from 'react';
import { Calculator } from 'lucide-react';
import CalculatorLayout from '../components/CalculatorLayout';
import CurrencyInput from '../components/CurrencyInput';
import PercentageInput from '../components/PercentageInput';
import YearInput from '../components/YearInput';

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState('300000');
  const [downPayment, setDownPayment] = useState('20');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');

  const calculateMortgage = useCallback(() => {
    const principal = Number(homePrice) * (1 - Number(downPayment) / 100);
    const monthlyRate = Number(interestRate) / 100 / 12;
    const numberOfPayments = Number(loanTerm) * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      downPaymentAmount: (Number(homePrice) * (Number(downPayment) / 100)).toFixed(2),
      loanAmount: principal.toFixed(2),
    };
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const results = calculateMortgage();

  const blogContent = `
    <h2>Understanding Your Mortgage Payments</h2>
    <p>Welcome to our comprehensive Mortgage Calculator! As a real estate professional with years of experience helping families find their dream homes, I understand that calculating your potential mortgage payments is a crucial step in the home-buying process. This calculator helps you estimate your monthly mortgage payments and understand the total cost of your loan.</p>

    <h2>How to Use the Mortgage Calculator</h2>
    <p>Using this calculator is straightforward. Simply input the following information:</p>
    <ul>
      <li><strong>Home Price:</strong> Enter the total purchase price of the home you're interested in.</li>
      <li><strong>Down Payment:</strong> Input your planned down payment as a percentage of the home price.</li>
      <li><strong>Interest Rate:</strong> Enter the annual interest rate offered by your lender.</li>
      <li><strong>Loan Term:</strong> Select the length of your mortgage in years (typically 15 or 30 years).</li>
    </ul>

    <h2>Understanding the Results</h2>
    <p>The calculator provides several key pieces of information:</p>
    <ul>
      <li><strong>Monthly Payment:</strong> Your estimated monthly mortgage payment</li>
      <li><strong>Total Payment:</strong> The total amount you'll pay over the life of the loan</li>
      <li><strong>Total Interest:</strong> The total interest you'll pay over the loan term</li>
      <li><strong>Down Payment Amount:</strong> The actual dollar amount of your down payment</li>
      <li><strong>Loan Amount:</strong> The total amount you'll need to borrow</li>
    </ul>

    <h2>Important Considerations</h2>
    <p>Remember that this calculator provides an estimate of your monthly mortgage payments. The actual amount may vary based on several factors, including:</p>
    <ul>
      <li>Property taxes</li>
      <li>Home insurance</li>
      <li>Private Mortgage Insurance (PMI) if your down payment is less than 20%</li>
      <li>HOA fees</li>
      <li>Closing costs</li>
    </ul>

    <p>As your local real estate expert, I'm here to help you understand these calculations and find the best mortgage option for your situation. Don't hesitate to reach out for a personalized consultation!</p>
  `;

  return (
    <CalculatorLayout
      title="Mortgage Calculator"
      description="Calculate your estimated monthly mortgage payments and total loan costs"
      blogContent={blogContent}
    >
      <div className="space-y-6">
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

        <div className="calculator-result">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Monthly Payment</h3>
              <p className="result-value">${Number(results.monthlyPayment).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Down Payment</h3>
              <p className="result-value">${Number(results.downPaymentAmount).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Loan Amount</h3>
              <p className="result-value">${Number(results.loanAmount).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Interest</h3>
              <p className="result-value">${Number(results.totalInterest).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default MortgageCalculator;