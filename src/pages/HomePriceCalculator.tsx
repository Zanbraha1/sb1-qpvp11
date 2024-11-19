import React, { useState, useCallback } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import CurrencyInput from '../components/CurrencyInput';
import PercentageInput from '../components/PercentageInput';

const HomePriceCalculator = () => {
  const [squareFootage, setSquareFootage] = useState('2000');
  const [pricePerSqFt, setPricePerSqFt] = useState('200');
  const [lotSize, setLotSize] = useState('0.25');
  const [landValue, setLandValue] = useState('100000');
  const [condition, setCondition] = useState('100');
  const [upgrades, setUpgrades] = useState('25000');

  const calculateHomePrice = useCallback(() => {
    // Base calculation from square footage
    const basePrice = Number(squareFootage) * Number(pricePerSqFt);
    
    // Add land value
    const totalLandValue = Number(landValue) * Number(lotSize);
    
    // Adjust for condition (100% is normal, below reduces value, above increases)
    const conditionMultiplier = Number(condition) / 100;
    
    // Calculate total
    const baseTotal = basePrice * conditionMultiplier;
    const totalPrice = baseTotal + totalLandValue + Number(upgrades);
    
    // Calculate breakdown
    const structureValue = baseTotal;
    const upgradesValue = Number(upgrades);
    const pricePerAcre = Number(landValue);
    
    return {
      totalPrice: totalPrice.toFixed(0),
      structureValue: structureValue.toFixed(0),
      landValue: totalLandValue.toFixed(0),
      upgradesValue: upgradesValue.toFixed(0),
      pricePerAcre: pricePerAcre.toFixed(0),
    };
  }, [squareFootage, pricePerSqFt, lotSize, landValue, condition, upgrades]);

  const results = calculateHomePrice();

  const blogContent = `
    <h2>Understanding Home Price Calculations in Athens</h2>
    <p>As a local real estate expert, I often help clients understand how various factors influence home prices in the Athens area. This calculator provides a framework for estimating a home's potential value based on key characteristics.</p>

    <h2>Key Factors in Home Pricing</h2>
    <ul>
      <li><strong>Square Footage:</strong> The total living area is a primary factor in determining base value</li>
      <li><strong>Price per Square Foot:</strong> Varies by neighborhood and style (typically $150-$250 in Athens)</li>
      <li><strong>Lot Size:</strong> Land value is significant, especially in desirable areas</li>
      <li><strong>Property Condition:</strong> Affects value relative to similar properties</li>
      <li><strong>Recent Upgrades:</strong> Can significantly impact market value</li>
    </ul>

    <h2>Athens Market Insights</h2>
    <p>Current trends in the Athens real estate market:</p>
    <ul>
      <li>Average price per square foot ranges by neighborhood</li>
      <li>Land values vary significantly by location</li>
      <li>Premium for updated properties</li>
      <li>Impact of proximity to UGA campus</li>
      <li>Influence of school districts on value</li>
    </ul>

    <h2>Understanding the Results</h2>
    <p>The calculator breaks down value into components:</p>
    <ul>
      <li><strong>Structure Value:</strong> Based on size and condition</li>
      <li><strong>Land Value:</strong> Based on lot size and location</li>
      <li><strong>Upgrades Value:</strong> Recent improvements</li>
      <li><strong>Total Price:</strong> Combined estimated value</li>
    </ul>

    <h2>Professional Guidance</h2>
    <p>While this calculator provides a general estimate, many other factors influence a home's actual market value. As your local real estate expert, I can provide:</p>
    <ul>
      <li>Detailed comparative market analysis</li>
      <li>Neighborhood-specific insights</li>
      <li>Current market trend analysis</li>
      <li>Professional value assessment</li>
    </ul>
  `;

  return (
    <CalculatorLayout
      title="Home Price Calculator"
      description="Estimate a home's value based on size, location, and condition"
      blogContent={blogContent}
    >
      <div className="space-y-6">
        <CurrencyInput
          label="Price per Square Foot"
          value={pricePerSqFt}
          onChange={setPricePerSqFt}
          placeholder="Enter price per square foot"
          id="price-per-sqft"
        />
        <CurrencyInput
          label="Square Footage"
          value={squareFootage}
          onChange={setSquareFootage}
          placeholder="Enter square footage"
          id="square-footage"
        />
        <CurrencyInput
          label="Lot Size (acres)"
          value={lotSize}
          onChange={setLotSize}
          placeholder="Enter lot size in acres"
          id="lot-size"
        />
        <CurrencyInput
          label="Land Value per Acre"
          value={landValue}
          onChange={setLandValue}
          placeholder="Enter land value per acre"
          id="land-value"
        />
        <PercentageInput
          label="Condition Rating"
          value={condition}
          onChange={setCondition}
          placeholder="Enter condition percentage"
          id="condition"
        />
        <CurrencyInput
          label="Recent Upgrades Value"
          value={upgrades}
          onChange={setUpgrades}
          placeholder="Enter value of recent upgrades"
          id="upgrades"
        />

        <div className="calculator-result">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-navy-600">Estimated Total Value</h3>
              <p className="result-value text-3xl">${Number(results.totalPrice).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Structure Value</h3>
              <p className="result-value">${Number(results.structureValue).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Land Value</h3>
              <p className="result-value">${Number(results.landValue).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Upgrades Value</h3>
              <p className="result-value">${Number(results.upgradesValue).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Price per Acre</h3>
              <p className="result-value">${Number(results.pricePerAcre).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default HomePriceCalculator;