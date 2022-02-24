import React, { useContext } from 'react';
import { TotoContext } from '../store.jsx';

const WinLoss = () => {
  const { store } = useContext(TotoContext);
  const { winLoss } = store;

  return (
    <div className="mb-3">
      Your net win/loss is
      {' '}
      <span className={winLoss > 0 ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>
        $
        {Intl.NumberFormat('en-US').format(winLoss)}
      </span>
    </div>
  ); };

export default WinLoss;
