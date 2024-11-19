import React, { useState, useCallback } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CurrencyInput from '../components/CurrencyInput';
import PercentageInput from '../components/PercentageInput';

const PropertyTaxCalculator = () => {
  const [homeValue, setHomeValue] = useState('300000');
  const [taxRate, setTaxRate] = useState('1.2');
  const [exemptions, setExemptions] = useState('0');
  const [assessmentRatio, setAssessmentRatio] = useState('40');

  const calculatePropertyTax = useCallback(() => {
    // Convert inputs to numbers
    const value = Number(homeValue);
    const rate = Number(taxRate);
    const exempt = Number(exemptions);
    const ratio = Number(assessmentRatio) / 100;

    // Calculate assessed value (40% of fair market value in Georgia)
    const assessedValue = value * ratio;

    // Subtract exemptions
    const taxableValue = Math.max(assessedValue - exempt, 0);

    // Calculate annual tax (rate is per $100 of assessed value)
    const annualTax = (taxableValue * (rate / 100));

    // Calculate monthly tax
    const monthlyTax = annualTax / 12;

    // Calculate effective tax rate
    const effectiveRate = (annualTax / value) * 100;

    return {
      assessedValue: assessedValue.toFixed(0),
      taxableValue: taxableValue.toFixed(0),
      annualTax: annualTax.toFixed(0),
      monthlyTax: monthlyTax.toFixed(0),
      effectiveRate: effectiveRate.toFixed(2),
    };
  }, [homeValue, taxRate, exemptions, assessmentRatio]);

  const results = calculatePropertyTax();

  const blogContent = `
    <h2>Understanding Property Taxes in Georgia</h2>
    <p>As a real estate professional in Athens, GA, I often help clients understand their potential property tax obligations. Property taxes are a significant part of homeownership costs and vary by location and property value.</p>

    <h2>How Georgia Property Taxes Work</h2>
    <p>Georgia's property tax system has several key components:</p>
    <ul>
      <li><strong>Assessment Ratio:</strong> In Georgia, residential property is taxed at 40% of its fair market value. This means if your home is worth $200,000, the assessed value would be $80,000.</li>
      <li><strong>Millage Rate:</strong> Property tax rates are expressed in mills, with one mill representing $1 of tax for every $1,000 of assessed value.</li>
      <li><strong>Homestead Exemptions:</strong> Georgia offers various exemptions that can reduce your property's taxable value, particularly for primary residences.</li>
    </ul>

    <h2>Athens-Clarke County Property Tax Information</h2>
    <p>For 2023, Athens-Clarke County's millage rate is approximately 12.95 mills (1.295%). However, total property tax rates can vary depending on:</p>
    <ul>
      <li>School district taxes</li>
      <li>Special service district assessments</li>
      <li>State taxes</li>
      <li>Other local taxes and fees</li>
    </ul>

    <h2>Available Exemptions</h2>
    <p>Several property tax exemptions are available to Georgia homeowners:</p>
    <ul>
      <li><strong>Standard Homestead Exemption:</strong> Available for primary residences</li>
      <li><strong>Senior Citizen Exemptions:</strong> Additional benefits for homeowners 65 and older</li>
      <li><strong>Disabled Veteran Exemption:</strong> Special exemptions for disabled veterans</li>
      <li><strong>Floating Homestead Exemption:</strong> Helps protect against rising assessments</li>
    </ul>

    <h2>Tips for Managing Property Taxes</h2>
    <ul>
      <li>Apply for all eligible exemptions</li>
      <li>Review your assessment annually</li>
      <li>Appeal if you believe your assessment is incorrect</li>
      <li>Budget monthly for annual tax payments</li>
      <li>Consider tax rates when choosing a location</li>
    </ul>

    <h2>Professional Guidance</h2>
    <p>While this calculator provides estimates, property taxes can be complex. As your local real estate expert, I can help you understand:</p>
    <ul>
      <li>Specific tax rates for different areas</li>
      <li>Available exemptions you might qualify for</li>
      <li>How to appeal assessments if needed</li>
      <li>Impact of taxes on your total housing costs</li>
    </ul>
  `;

  return (
    <CalculatorLayout
      title="Property Tax Calculator"
      description="Calculate your estimated property taxes in Georgia"
      blogContent={blogContent}
    >
      <div className="space-y-6">
        <CurrencyInput
          label="Home Value"
          value={homeValue}
          onChange={setHomeValue}
          placeholder="Enter home value"
          id="home-value"
        />
        <PercentageInput
          label="Tax Rate"
          value={taxRate}
          onChange={setTaxRate}
          placeholder="Enter tax rate"
          id="tax-rate"
        />
        <CurrencyInput
          label="Exemptions"
          value={exemptions}
          onChange={setExemptions}
          placeholder="Enter exemption amount"
          id="exemptions"
        />
        <PercentageInput
          label="Assessment Ratio"
          value={assessmentRatio}
          onChange={setAssessmentRatio}
          placeholder="Enter assessment ratio"
          id="assessment-ratio"
        />

        <div className="calculator-result">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Assessed Value</h3>
              <p className="result-value">${Number(results.assessedValue).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Taxable Value</h3>
              <p className="result-value">${Number(results.taxableValue).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Annual Tax</h3>
              <p className="result-value">${Number(results.annualTax).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Monthly Tax</h3>
              <p className="result-value">${Number(results.monthlyTax).toLocaleString()}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-700">Effective Tax Rate</h3>
              <p className="result-value">{results.effectiveRate}%</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default PropertyTaxCalculator;