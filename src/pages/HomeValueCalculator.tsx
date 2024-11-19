import React, { useState, useCallback } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CurrencyInput from '../components/CurrencyInput';
import PercentageInput from '../components/PercentageInput';
import YearInput from '../components/YearInput';

const HomeValueCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState('300000');
  const [purchaseYear, setPurchaseYear] = useState('5');
  const [annualAppreciation, setAnnualAppreciation] = useState('3.5');
  const [improvements, setImprovements] = useState('25000');
  const [marketAdjustment, setMarketAdjustment] = useState('5');
  const [locationScore, setLocationScore] = useState('100');

  const calculateHomeValue = useCallback(() => {
    // Base appreciation calculation
    const years = Number(purchaseYear);
    const basePrice = Number(purchasePrice);
    const appreciationRate = Number(annualAppreciation) / 100;
    
    // Calculate appreciated value
    const appreciatedValue = basePrice * Math.pow(1 + appreciationRate, years);
    
    // Add improvements
    const totalImprovements = Number(improvements);
    
    // Apply market adjustment
    const marketFactor = 1 + (Number(marketAdjustment) / 100);
    
    // Apply location score (100% is neutral)
    const locationFactor = Number(locationScore) / 100;
    
    // Calculate final value
    const estimatedValue = (appreciatedValue + totalImprovements) * marketFactor * locationFactor;
    
    // Calculate value components
    const appreciationGain = appreciatedValue - basePrice;
    const marketAdjustmentValue = ((appreciatedValue + totalImprovements) * (marketFactor - 1));
    const locationAdjustment = ((appreciatedValue + totalImprovements) * marketFactor * (locationFactor - 1));
    
    return {
      estimatedValue: estimatedValue.toFixed(0),
      appreciationGain: appreciationGain.toFixed(0),
      improvementsValue: totalImprovements.toFixed(0),
      marketAdjustment: marketAdjustmentValue.toFixed(0),
      locationImpact: locationAdjustment.toFixed(0),
    };
  }, [purchasePrice, purchaseYear, annualAppreciation, improvements, marketAdjustment, locationScore]);

  const results = calculateHomeValue();

  const blogContent = `
    <h2>Understanding Home Value Growth in Athens</h2>
    <p>As your local real estate expert, I help clients understand how their home's value changes over time. This calculator considers multiple factors that influence property values in our area.</p>

    <h2>Key Value Factors in Athens</h2>
    <ul>
      <li><strong>Historical Appreciation:</strong> Athens has seen steady appreciation, typically 3-4% annually</li>
      <li><strong>Location Impact:</strong> Proximity to UGA, downtown, and major employers</li>
      <li><strong>Market Conditions:</strong> Current supply/demand dynamics</li>
      <li><strong>Property Improvements:</strong> Impact of renovations and updates</li>
    </ul>

    <h2>Current Market Trends</h2>
    <p>Athens real estate market highlights:</p>
    <ul>
      <li>Strong demand in neighborhoods near UGA</li>
      <li>Growing interest in Five Points and Normaltown areas</li>
      <li>Impact of new developments and infrastructure</li>
      <li>Influence of Athens' growing tech and business sectors</li>
    </ul>

    <h2>Location Considerations</h2>
    <p>Location factors that affect home values in Athens:</p>
    <ul>
      <li>School district quality</li>
      <li>Distance to downtown and UGA</li>
      <li>Access to major employers</li>
      <li>Neighborhood amenities</li>
      <li>Future development plans</li>
    </ul>

    <h2>Professional Guidance</h2>
    <p>While this calculator provides estimates, many factors influence actual market value. As your local expert, I can help you:</p>
    <ul>
      <li>Analyze recent comparable sales</li>
      <li>Evaluate neighborhood trends</li>
      <li>Assess improvement impact</li>
      <li>Plan strategic updates</li>
      <li>Time your sale or purchase optimally</li>
    </ul>
  `;

  return (
    <CalculatorLayout
      title="Home Value Calculator"
      description="Estimate your home's current value based on purchase price, improvements, and market conditions"
      blogContent={blogContent}
    >
      <div className="space-y-6">
        <CurrencyInput
          label="Purchase Price"
          value={purchasePrice}
          onChange={setPurchasePrice}
          placeholder="Enter original purchase price"
          id="purchase-price"
        />
        <YearInput
          label="Years Since Purchase"
          value={purchaseYear}
          onChange={setPurchaseYear}
          placeholder="Enter years owned"
          id="purchase-year"
        />
        <PercentageInput
          label="Annual Appreciation Rate"
          value={annualAppreciation}
          onChange={setAnnualAppreciation}
          placeholder="Enter annual appreciation rate"
          id="appreciation-rate"
        />
        <CurrencyInput
          label="Improvements Value"
          value={improvements}
          onChange={setImprovements}
          placeholder="Enter value of improvements"
          id="improvements"
        />
        <PercentageInput
          label="Market Adjustment"
          value={marketAdjustment}
          onChange={setMarketAdjustment}
          placeholder="Enter market adjustment"
          id="market-adjustment"
        />
        <PercentageInput
          label="Location Score"
          value={locationScore}
          onChange={setLocationScore}
          placeholder="Enter location score"
          id="location-score"
        />

        <div className="calculator-result">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-navy-600">Estimated Current Value</h3>
              <p className="result-value text-3xl">${Number(results.estimatedValue).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Appreciation Gain</h3>
              <p className="result-value">${Number(results.appreciationGain).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Improvements Value</h3>
              <p className="result-value">${Number(results.improvementsValue).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Market Impact</h3>
              <p className="result-value">${Number(results.marketAdjustment).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Location Impact</h3>
              <p className="result-value">${Number(results.locationImpact).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default HomeValueCalculator;