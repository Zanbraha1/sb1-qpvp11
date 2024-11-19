import React, { useState, useCallback } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CurrencyInput from '../components/CurrencyInput';
import PercentageInput from '../components/PercentageInput';
import YearInput from '../components/YearInput';

const HomeLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [propertyTax, setPropertyTax] = useState('1.2');
  const [insurance, setInsurance] = useState('1200');
  const [pmi, setPmi] = useState('0.5');
  const [downPaymentPercent, setDownPaymentPercent] = useState('20');

  const calculateLoan = useCallback(() => {
    const principal = Number(loanAmount) * (1 - Number(downPaymentPercent) / 100);
    const monthlyRate = Number(interestRate) / 100 / 12;
    const numberOfPayments = Number(loanTerm) * 12;

    // Calculate base monthly payment (P&I)
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate additional costs
    const monthlyPropertyTax = (Number(loanAmount) * (Number(propertyTax) / 100)) / 12;
    const monthlyInsurance = Number(insurance) / 12;
    const monthlyPMI = Number(downPaymentPercent) < 20 ? (principal * (Number(pmi) / 100)) / 12 : 0;

    const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyInsurance + monthlyPMI;
    const totalPayment = totalMonthlyPayment * numberOfPayments;
    const totalInterest = (monthlyPayment * numberOfPayments) - principal;

    return {
      principalAndInterest: monthlyPayment.toFixed(2),
      propertyTaxPayment: monthlyPropertyTax.toFixed(2),
      insurancePayment: monthlyInsurance.toFixed(2),
      pmiPayment: monthlyPMI.toFixed(2),
      totalMonthly: totalMonthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    };
  }, [loanAmount, interestRate, loanTerm, propertyTax, insurance, pmi, downPaymentPercent]);

  const results = calculateLoan();

  const blogContent = `
    <h2>Understanding Home Loan Calculations</h2>
    <p>As a real estate professional, I often see clients overwhelmed by the various components of a home loan. This comprehensive calculator helps you understand not just your principal and interest payments, but all the additional costs that make up your total monthly payment.</p>

    <h2>Components of Your Home Loan Payment</h2>
    <ul>
      <li><strong>Principal and Interest (P&I):</strong> The base payment that goes toward your loan balance and interest charges.</li>
      <li><strong>Property Taxes:</strong> Annual taxes assessed by your local government, typically paid monthly as part of your mortgage payment.</li>
      <li><strong>Homeowners Insurance:</strong> Required coverage to protect your property, usually paid monthly with your mortgage.</li>
      <li><strong>Private Mortgage Insurance (PMI):</strong> Required if your down payment is less than 20%, protecting the lender against default.</li>
    </ul>

    <h2>How to Use This Calculator</h2>
    <p>To get the most accurate estimate of your home loan payments:</p>
    <ul>
      <li>Enter your desired loan amount</li>
      <li>Input the current interest rate you've been quoted</li>
      <li>Select your preferred loan term (typically 15 or 30 years)</li>
      <li>Add your local property tax rate (check your county assessor's website)</li>
      <li>Include estimated annual insurance costs</li>
      <li>If applicable, add PMI rate (typically 0.5% to 1% annually)</li>
    </ul>

    <h2>Tips for Lower Payments</h2>
    <p>Here are some strategies to reduce your monthly payment:</p>
    <ul>
      <li>Make a larger down payment to avoid PMI</li>
      <li>Shop around for better interest rates</li>
      <li>Consider a longer loan term (though you'll pay more in total interest)</li>
      <li>Look for properties in areas with lower property tax rates</li>
      <li>Compare insurance quotes from multiple providers</li>
    </ul>

    <h2>Professional Guidance</h2>
    <p>While this calculator provides valuable estimates, every home purchase is unique. As your local real estate expert, I can help you understand these numbers in the context of your specific situation and connect you with trusted lenders who can offer competitive rates.</p>
  `;

  return (
    <CalculatorLayout
      title="Home Loan Calculator"
      description="Calculate your total monthly payment including taxes, insurance, and PMI"
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
          label="Down Payment"
          value={downPaymentPercent}
          onChange={setDownPaymentPercent}
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
        <PercentageInput
          label="PMI Rate"
          value={pmi}
          onChange={setPmi}
          placeholder="Enter PMI rate"
          id="pmi-rate"
        />

        <div className="calculator-result">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Principal & Interest</h3>
              <p className="result-value">${Number(results.principalAndInterest).toLocaleString()}/mo</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Property Tax</h3>
              <p className="result-value">${Number(results.propertyTaxPayment).toLocaleString()}/mo</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Insurance</h3>
              <p className="result-value">${Number(results.insurancePayment).toLocaleString()}/mo</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">PMI</h3>
              <p className="result-value">${Number(results.pmiPayment).toLocaleString()}/mo</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-navy-600">Total Monthly Payment</h3>
              <p className="result-value text-3xl">${Number(results.totalMonthly).toLocaleString()}/mo</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default HomeLoanCalculator;