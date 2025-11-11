import React from 'react';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-gray-800 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 rounded-lg shadow-lg border border-gray-700">
        <p className="label text-base font-semibold text-white">{`${label}`}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.stroke || pld.fill }} className="intro text-sm">
            {`${pld.name}: ${pld.value.toFixed(2)}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
