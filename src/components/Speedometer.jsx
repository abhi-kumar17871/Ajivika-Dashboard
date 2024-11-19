import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";

const Speedometer = ({ value, label, maxValue }) => {
  return (
    <div>
      <ReactSpeedometer 
        maxValue={maxValue}  // Adjust according to your sensor range
        value={ value || 0}  // Default to 0 if no value
        currentValueText={label}
        needleColor="red"
        startColor="green"
        endColor="red"
        segments={10}
        textColor="#000000"
      />
    </div>
  );
};

export default Speedometer;