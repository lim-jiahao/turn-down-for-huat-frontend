import React, { useContext } from 'react';
import { TotoContext } from '../store.jsx';

const WinLoss = () => {
  const { store } = useContext(TotoContext);
  const { winLoss } = store;

  return (
    <div className="mb-3 p-5">
      <span className="text-2xl text-huat-90">Your net win/loss is:</span>
      {' '}
      <span className={winLoss > 0 ? 'text-green-500 font-bold text-6xl' : 'text-red-500 font-bold text-6xl'}>
        {winLoss >= 0 ? '$' : '-$'}
        {Intl.NumberFormat('en-US').format(Math.abs(winLoss))}
      </span>
    </div>
  ); };

export default WinLoss;
