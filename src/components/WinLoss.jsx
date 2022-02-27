import React from 'react';

const WinLoss = ({ winLoss }) => (
  <div className="p-5">
    <span className="text-2xl text-huat-90">Your net win/loss is:</span>
    {' '}
    <span className={winLoss > 0 ? 'text-green-500 font-bold text-6xl' : 'text-red-500 font-bold'}>
      $
      {Intl.NumberFormat('en-US').format(winLoss)}
    </span>
  </div>
);

export default WinLoss;
