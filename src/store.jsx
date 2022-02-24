import React, { useReducer } from 'react';

const SET_WIN_LOSS = 'SET_WIN_LOSS';
const SET_BETS = 'SET_BETS';
const SET_WINNING_NUMBERS = 'SET_WINNING_NUMBERS';
const SET_ADDITIONAL_NUMBER = 'SET_ADDITIONAL_NUMBER';
const SET_PRIZES = 'SET_PRIZES';
const SET_TOTAL_PRIZE = 'SET_TOTAL_PRIZE';
const SET_FILE = 'SET_FILE';
const SET_FILE_NAME = 'SET_FILE_NAME';
const SET_DATE = 'SET_DATE';

export const initialState = {
  bets: [],
  winningNumbers: '',
  additionalNumber: '',
  prizes: [],
  totalPrize: 0,
  winLoss: 0,
  file: null,
  filename: '',
  date: '',
};

export const totoReducer = (state, action) => {
  switch (action.type) {
    case SET_WIN_LOSS:
      return { ...state, winLoss: action.payload.winLoss };
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
    case SET_FILE:
      return { ...state, file: action.payload.file };
    case SET_FILE_NAME:
      return { ...state, filename: action.payload.filename };
    case SET_DATE:
      return { ...state, date: action.payload.date };
    default:
      return state;
  }
};

export const setWinLossAction = (winLoss) => ({
  type: SET_WIN_LOSS,
  payload: { winLoss },
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

export const setFileAction = (file) => ({
  type: SET_FILE,
  payload: { file },
});

export const setFilenameAction = (filename) => ({
  type: SET_FILE_NAME,
  payload: { filename },
});

export const setDateAction = (date) => ({
  type: SET_DATE,
  payload: { date },
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

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:3004';
