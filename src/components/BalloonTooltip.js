import React, { useState } from 'react';

const BalloonTooltip = ({ children, tooltipText }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-pink-300 text-white text-sm rounded-lg px-3 py-1 shadow-lg whitespace-nowrap z-50">
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-3 h-3 bg-pink-300 rotate-45"></div>
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default BalloonTooltip;
