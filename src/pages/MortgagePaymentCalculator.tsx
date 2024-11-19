import React, { useState, useCallback } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CurrencyInput from '../components/CurrencyInput';
import PercentageInput from '../components/PercentageInput';
import YearInput from '../components/YearInput';

const MortgagePaymentCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [extraPayment, setExtraPayment] = useState('0');
  const [propertyTax, setPropertyTax] = useState('1.2');
  const [insurance, setInsurance] = useState('1200');

  const calculatePayments = useCallback(() => {
    // Convert inputs to numbers
    const principal = Number(loanAmount);
    const monthlyRate = Number(interestRate) / 100 / 12;
    const numberOfPayments = Number(loanTerm) * 12;
    const monthlyExtra = Number(extraPayment);
    
    // Calculate base monthly payment (P&I)
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate additional costs
    const monthlyTax = (principal * (Number(propertyTax) / 100)) / 12;
    const monthlyInsurance = Number(insurance) / 12;

    // Calculate loan payoff with extra payments
    let balance = principal;
    let actualPayments = 0;
    let totalInterest = 0;
    let monthlyWithExtra = monthlyPayment + monthlyExtra;

    while (balance > 0 && actualPayments < numberOfPayments) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyWithExtra - interestPayment;
      
      totalInterest += interestPayment;
      balance -= principalPayment;
      actualPayments++;
      
      if (balance < 0) balance = 0;
    }

    const yearsToPayoff = actualPayments / 12;
    const monthsSaved = numberOfPayments - actualPayments;
    const interestSaved = (monthlyPayment * numberOfPayments) - (principal + totalInterest);

    return {
      monthlyPI: monthlyPayment.toFixed(2),
      monthlyTax: monthlyTax.toFixed(2),
      monthlyInsurance: monthlyInsurance.toFixed(2),
      totalMonthly: (monthlyPayment + monthlyTax + monthlyInsurance).toFixed(2),
      totalWithExtra: (monthlyPayment + monthlyTax + monthlyInsurance + monthlyExtra).toFixed(2),
      yearsToPayoff: yearsToPayoff.toFixed(1),
      monthsSaved: monthsSaved.toFixed(0),
      interestSaved: interestSaved.toFixed(0),
      totalInterest: totalInterest.toFixed(0),
    };
  }, [loanAmount, interestRate, loanTerm, extraPayment, propertyTax, insurance]);

  const results = calculatePayments();

  const blogContent = `
    <h2>Understanding Your Mortgage Payment</h2>
    <p>As your local real estate expert, I help clients understand the components of their mortgage payments. This calculator breaks down your payment and shows how extra payments can save you money over time.</p>

    <h2>Payment Components</h2>
    <ul>
      <li><strong>Principal and Interest (P&I):</strong> The base mortgage payment</li>
      <li><strong>Property Taxes:</strong> Annual taxes divided into monthly payments</li>
      <li><strong>Homeowners Insurance:</strong> Annual premium divided monthly</li>
      <li><strong>Extra Payments:</strong> Optional additional principal payments</li>
    </ul>

    <h2>Benefits of Extra Payments</h2>
    <p>Making extra payments towards your principal can:</p>
    <ul>
      <li>Reduce your loan term significantly</li>
      <li>Save thousands in interest charges</li>
      <li>Build equity faster</li>
      <li>Provide financial flexibility</li>
    </ul>

    <h2>Local Market Insights</h2>
    <p>In the Athens area:</p>
    <ul>
      <li>Property tax rates average around 1.2%</li>
      <li>Insurance costs typically range from $800-$1,500 annually</li>
      <li>Current interest rates vary by credit score and loan type</li>
    </ul>

    <h2>Tips for Lower Payments</h2>
    <ul>
      <li>Make a larger down payment</li>
      <li>Shop for better interest rates</li>
      <li>Consider a longer loan term</li>
      <li>Compare insurance quotes</li>
      <li>Check for tax exemptions</li>
    </ul>

    <h2>Professional Guidance</h2>
    <p>While this calculator provides estimates, I can help you:</p>
    <ul>
      <li>Find the best loan options</li>
      <li>Connect with trusted lenders</li>
      <li>Understand local costs</li>
      <li>Plan your home purchase</li>
    </ul>
  `;

  return (
    <CalculatorLayout
      title="Mortgage Payment Calculator"
      description="Calculate your monthly mortgage payment and see the impact of extra payments"
      blogContent={blogContent}
    >
      <div className="space-y-6">
        <CurrencyInput
          label="Loan Amount"
          value={loanAmount}
          onChange={setLoanAmount}
          placeholder="Enter loan amount"
          id="loan-amount"
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
        <CurrencyInput
          label="Extra Monthly Payment"
          value={extraPayment}
          onChange={setExtraPayment}
          placeholder="Enter extra monthly payment"
          id="extra-payment"
        />
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

        <div className="calculator-result">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 border-b border-navy-200 pb-4 mb-4">
              <h3 className="text-xl font-bold text-navy-600">Monthly Payments</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-600">Base Payment</p>
                  <p className="result-value">${Number(results.totalMonthly).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">With Extra Payment</p>
                  <p className="result-value">${Number(results.totalWithExtra).toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Principal & Interest</h3>
              <p className="result-value">${Number(results.monthlyPI).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Property Tax</h3>
              <p className="result-value">${Number(results.monthlyTax).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Insurance</h3>
              <p className="result-value">${Number(results.monthlyInsurance).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Years to Payoff</h3>
              <p className="result-value">{results.yearsToPayoff} years</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Months Saved</h3>
              <p className="result-value">{results.monthsSaved} months</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Interest Saved</h3>
              <p className="result-value">${Number(results.interestSaved).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default MortgagePaymentCalculator;