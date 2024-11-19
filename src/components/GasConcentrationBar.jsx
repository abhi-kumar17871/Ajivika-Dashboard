import React from "react";

const GasConcentrationBar = ({ concentration }) => {
  let barColor = "";

  if (concentration <= 50) {
    barColor = "bg-green-500"; // Green for <= 50%
  } else if (concentration <= 75) {
    barColor = "bg-orange-500"; // Orange for <= 75%
  } else {
    barColor = "bg-red-500"; // Red for > 75%
  }

  return (
    <div className="w-full">
      <div className="w-full bg-gray-300 rounded-md h-6 relative">
        {/* Gas concentration bar */}
        <div
          className={`h-full rounded-md ${barColor} transition-all duration-300`}
          style={{ width: `${concentration}%` }}
        ></div>

        {/* Labels for Good, Bad, Lethal */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between text-sm font-bold text-gray-700">
          <div>|</div>
          <div className="w-1/2 flex justify-center">Good</div>
          <div>|</div>
          <div className="w-1/4 flex justify-center">Bad</div>
          <div>|</div>
          <div className="w-1/4 flex justify-center">Lethal</div>
          <div>|</div>
        </div>
      </div>
    </div>
  );
};

export default GasConcentrationBar;
