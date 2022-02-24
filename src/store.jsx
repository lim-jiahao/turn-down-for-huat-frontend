import React, { useReducer } from 'react';

const SET_WIN_LOSS = 'SET_WIN_LOSS';
const SET_DRAW_NUM = 'SET_DRAW_NUM';
const SET_BETS = 'SET_BETS';
const SET_WINNING_NUMBERS = 'SET_WINNING_NUMBERS';
const SET_ADDITIONAL_NUMBER = 'SET_ADDITIONAL_NUMBER';
const SET_PRIZES = 'SET_PRIZES';
const SET_TOTAL_PRIZE = 'SET_TOTAL_PRIZE';

export const initialState = {
  drawNum: 0,
  bets: [],
  winningNumbers: '',
  additionalNumber: '',
  prizes: [],
  totalPrize: 0,
  winLoss: 0,
};

export const totoReducer = (state, action) => {
  switch (action.type) {
    case SET_WIN_LOSS:
      return { ...state, winLoss: action.payload.winLoss };
    case SET_DRAW_NUM:
      return { ...state, drawNum: action.payload.num };
    case SET_BETS:
      return { ...state, bets: action.payload.bets };
    case SET_WINNING_NUMBERS:
      return { ...state, winningNumbers: action.payload.nums };
    case SET_ADDITIONAL_NUMBER:
      return { ...state, additionalNumber: action.payload.num };
    case SET_PRIZES:
      return { ...state, prizes: action.payload.prizes };
    case SET_TOTAL_PRIZE:
      return { ...state, totalPrize: action.payload.prize };
    default:
      return state;
  }
};

export const setWinLossAction = (winLoss) => ({
  type: SET_WIN_LOSS,
  payload: { winLoss },
});

export const setDrawNumAction = (num) => ({
  type: SET_DRAW_NUM,
  payload: { num },
});

export const setBetsAction = (bets) => ({
  type: SET_BETS,
  payload: { bets },
});

export const setWinNumbersAction = (nums) => ({
  type: SET_WINNING_NUMBERS,
  payload: { nums },
});

export const setAddNumberAction = (num) => ({
  type: SET_ADDITIONAL_NUMBER,
  payload: { num },
});

export const setPrizesAction = (prizes) => ({
  type: SET_PRIZES,
  payload: { prizes },
});

export const setTotalPrizeAction = (prize) => ({
  type: SET_TOTAL_PRIZE,
  payload: { prize },
});

export const TotoContext = React.createContext(null);
const { Provider } = TotoContext;

export const TotoProvider = ({ children }) => {
  const [store, dispatch] = useReducer(totoReducer, initialState);

  return (
    <Provider value={{ store, dispatch }}>
      {children}
    </Provider>
  );
};
