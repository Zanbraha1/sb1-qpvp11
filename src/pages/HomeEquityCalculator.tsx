import React, { useState, useCallback } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CurrencyInput from '../components/CurrencyInput';
import PercentageInput from '../components/PercentageInput';
import YearInput from '../components/YearInput';
import MediaSection from '../components/MediaSection';

const HomeEquityCalculator = () => {
  const [homeValue, setHomeValue] = useState('300000');
  const [mortgageBalance, setMortgageBalance] = useState('240000');
  const [secondMortgage, setSecondMortgage] = useState('0');
  const [helocBalance, setHelocBalance] = useState('0');
  const [appreciation, setAppreciation] = useState('3.5');
  const [monthlyPayment, setMonthlyPayment] = useState('1500');
  const [interestRate, setInterestRate] = useState('6.5');
  const [remainingTerm, setRemainingTerm] = useState('25');

  const calculateEquity = useCallback(() => {
    const currentValue = Number(homeValue);
    const firstMortgage = Number(mortgageBalance);
    const second = Number(secondMortgage);
    const heloc = Number(helocBalance);
    const payment = Number(monthlyPayment);
    const rate = Number(interestRate) / 100 / 12;
    const months = Number(remainingTerm) * 12;
    
    // Calculate current equity
    const totalDebt = firstMortgage + second + heloc;
    const currentEquity = currentValue - totalDebt;
    const equityPercentage = (currentEquity / currentValue) * 100;
    
    // Calculate equity in one year with appreciation
    const futureValue = currentValue * (1 + Number(appreciation) / 100);
    
    // Calculate principal reduction in one year
    const futureBalance = firstMortgage * Math.pow(1 + rate, 12) - 
      payment * ((Math.pow(1 + rate, 12) - 1) / rate);
    const principalReduction = firstMortgage - futureBalance;
    
    // Calculate future equity
    const futureEquity = futureValue - (totalDebt - principalReduction);
    const futureEquityPercentage = (futureEquity / futureValue) * 100;
    
    // Calculate LTV ratio
    const ltvRatio = (totalDebt / currentValue) * 100;
    
    return {
      currentEquity: currentEquity.toFixed(0),
      equityPercentage: equityPercentage.toFixed(1),
      futureEquity: futureEquity.toFixed(0),
      futureEquityPercentage: futureEquityPercentage.toFixed(1),
      principalReduction: principalReduction.toFixed(0),
      appreciationGain: (futureValue - currentValue).toFixed(0),
      ltvRatio: ltvRatio.toFixed(1),
    };
  }, [
    homeValue,
    mortgageBalance,
    secondMortgage,
    helocBalance,
    appreciation,
    monthlyPayment,
    interestRate,
    remainingTerm,
  ]);

  const results = calculateEquity();

  const blogContent = `
    <h2>Understanding Home Equity in Athens</h2>
    <p>As your local real estate expert, I help homeowners understand and leverage their home equity. This calculator helps you track your equity position and project future gains.</p>

    <h2>What is Home Equity?</h2>
    <p>Home equity is the difference between your home's current market value and the amount you owe on your mortgage(s). It represents the portion of your home that you truly "own."</p>

    <h2>Building Equity</h2>
    <p>You can build equity in two main ways:</p>
    <ul>
      <li><strong>Debt Reduction:</strong> Making regular mortgage payments</li>
      <li><strong>Property Appreciation:</strong> Increase in your home's value</li>
    </ul>

    <h2>Using Your Home Equity</h2>
    <p>Common ways to utilize home equity include:</p>
    <ul>
      <li>Home improvements or renovations</li>
      <li>Debt consolidation</li>
      <li>Education expenses</li>
      <li>Emergency funds</li>
      <li>Investment opportunities</li>
    </ul>

    <h2>Athens Market Insights</h2>
    <p>Current trends affecting home equity in Athens:</p>
    <ul>
      <li>Steady appreciation in most neighborhoods</li>
      <li>Strong demand from UGA community</li>
      <li>New development impacts</li>
      <li>Local economic growth</li>
    </ul>

    <h2>Professional Guidance</h2>
    <p>As your local real estate expert, I can help you:</p>
    <ul>
      <li>Understand your current equity position</li>
      <li>Evaluate home equity loan options</li>
      <li>Plan strategic improvements</li>
      <li>Time your real estate decisions</li>
    </ul>
  `;

  return (
    <CalculatorLayout
      title="Home Equity Calculator"
      description="Calculate your current home equity and project future equity growth"
      blogContent={blogContent}
    >
      <div className="space-y-6">
        <div className="bg-navy-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-navy-600 mb-2">Property Value</h3>
          <div className="space-y-4">
            <CurrencyInput
              label="Current Home Value"
              value={homeValue}
              onChange={setHomeValue}
              placeholder="Enter home value"
              id="home-value"
            />
            <PercentageInput
              label="Annual Appreciation Rate"
              value={appreciation}
              onChange={setAppreciation}
              placeholder="Enter appreciation rate"
              id="appreciation-rate"
            />
          </div>
        </div>

        <div className="bg-navy-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-navy-600 mb-2">Mortgage Details</h3>
          <div className="space-y-4">
            <CurrencyInput
              label="First Mortgage Balance"
              value={mortgageBalance}
              onChange={setMortgageBalance}
              placeholder="Enter first mortgage balance"
              id="mortgage-balance"
            />
            <CurrencyInput
              label="Second Mortgage Balance"
              value={secondMortgage}
              onChange={setSecondMortgage}
              placeholder="Enter second mortgage balance"
              id="second-mortgage"
            />
            <CurrencyInput
              label="HELOC Balance"
              value={helocBalance}
              onChange={setHelocBalance}
              placeholder="Enter HELOC balance"
              id="heloc-balance"
            />
          </div>
        </div>

        <div className="bg-navy-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-navy-600 mb-2">Payment Information</h3>
          <div className="space-y-4">
            <CurrencyInput
              label="Monthly Payment (P&I)"
              value={monthlyPayment}
              onChange={setMonthlyPayment}
              placeholder="Enter monthly payment"
              id="monthly-payment"
            />
            <PercentageInput
              label="Interest Rate"
              value={interestRate}
              onChange={setInterestRate}
              placeholder="Enter interest rate"
              id="interest-rate"
            />
            <YearInput
              label="Remaining Term"
              value={remainingTerm}
              onChange={setRemainingTerm}
              placeholder="Enter remaining years"
              id="remaining-term"
            />
          </div>
        </div>

        <div className="calculator-result">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 border-b border-navy-200 pb-4 mb-4">
              <h3 className="text-xl font-bold text-navy-600">Current Equity Position</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-600">Equity Amount</p>
                  <p className="result-value">${Number(results.currentEquity).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Equity Percentage</p>
                  <p className="result-value">{results.equityPercentage}%</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Future Equity (1 Year)</h3>
              <p className="result-value">${Number(results.futureEquity).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Future Equity %</h3>
              <p className="result-value">{results.futureEquityPercentage}%</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Principal Reduction</h3>
              <p className="result-value">${Number(results.principalReduction).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Appreciation Gain</h3>
              <p className="result-value">${Number(results.appreciationGain).toLocaleString()}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-700">Loan-to-Value Ratio</h3>
              <p className="result-value">{results.ltvRatio}%</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <MediaSection
            imageSrc="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
            altText="Modern home exterior representing equity growth"
            position="right"
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default HomeEquityCalculator;