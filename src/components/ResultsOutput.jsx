import React, { useContext } from 'react';
import axios from 'axios';
import { TotoContext, setWinLossAction } from '../store.jsx';

axios.defaults.withCredentials = true;
const BACKEND_URL = 'http://localhost:3004';

const ResultsOutput = ({
  auth, disableSave, saveMsg, setDisableSave, setSaveMsg,
}) => {
  const { store, dispatch } = useContext(TotoContext);
  const {
    bets, drawNum, prizes, winningNumbers, additionalNumber,
    totalPrize, filename, winLoss,
  } = store;

  const handleSave = async () => {
    try {
      const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };
      const data = {
        numbers: bets,
        prizes,
        filename,
      };

      const resp = await axios.post(`${BACKEND_URL}/bet/save`, data, headers);
      if (resp.data.bets) {
        dispatch(setWinLossAction(winLoss + resp.data.winLoss));
        setSaveMsg('Successfully saved!');
        setDisableSave(true);
      }
    } catch (err) {
      console.log(err.response);
      setSaveMsg('An error occured.');
    }
  };

  return bets.length > 0 && (
  <>
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">
        <p className="text-xl font-bold text-sky-400">Draw date:</p>
        <p>{drawNum}</p>
      </div>

      <div className="mb-4">
        <p className="text-xl font-bold text-sky-400">Your numbers:</p>
        {bets.map((bet, i) => (
          <div>
            <span>{i + 1}. {bet} </span>
            <span className={`font-bold ${prizes[i] > 0 && 'text-green-500'}`}>
              +${new Intl.NumberFormat('en-US').format(prizes[i])}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <p className="text-xl font-bold text-sky-400">Winning numbers:</p>
        <p>{winningNumbers}</p>
      </div>

      <div className="mb-4">
        <p className="text-xl font-bold text-sky-400">Additional number:</p>
        <p>{additionalNumber}</p>
      </div>

      <div className="mb-4 font-bold text-xl">
        <p className="text-sky-400">Prize:</p>
        <p>{totalPrize > 0 ? `You won $${new Intl.NumberFormat('en-US').format(totalPrize)}!` : 'You did not win anything'}</p>
      </div>
    </div>

    {auth && (
    <>
      <button type="button" className="w-1/4 bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-4 rounded disabled:opacity-50" onClick={handleSave} disabled={disableSave}>Save</button>
      <p className="text-green-500 font-bold">{saveMsg}</p>
    </>
    )}
  </>
  );
};

export default ResultsOutput;
