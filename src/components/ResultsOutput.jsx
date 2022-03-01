import React, { useContext } from 'react';
import axios from 'axios';
import { TotoContext, setWinLossAction, BACKEND_URL } from '../store.jsx';

const ResultsOutput = ({
  auth, disableSave, saveMsg, setDisableSave, setSaveMsg,
}) => {
  const { store, dispatch } = useContext(TotoContext);
  const {
    bets, prizes, winningNumbers, additionalNumber,
    totalPrize, filename, winLoss, date,
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
    <div className="w-2/5 flex flex-col items-center text-center">
      <div className="mb-4">
        <p className="text-3xl font-bold text-huat-90">Draw date:</p>
        <p className="text-lg font-bold text-huat-80">{date}</p>
      </div>

      <div className="mb-4">
        <p className="text-3xl font-bold text-huat-90">Your numbers:</p>
        {bets.map((bet, i) => (
          <div className="leading-loose ml-10 flex self-start text-lg font-bold text-huat-80">
            <span>{i + 1}. {bet} </span>
            <span className={`ml-6 font-bold ${prizes[i] > 0 ? 'text-green-500' : 'text-stone-900'}`}>
              +${new Intl.NumberFormat('en-US').format(prizes[i])}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <p className="text-3xl font-bold text-huat-90">Winning numbers:</p>
        <p className="text-lg font-bold text-huat-80">{winningNumbers}</p>
      </div>

      <div className="mb-4">
        <p className="text-3xl font-bold text-huat-90">Additional number:</p>
        <p className="text-lg font-bold text-huat-80">{additionalNumber}</p>
      </div>

      <div className="mb-4 font-bold text-2xl">
        <p className="text-3xl text-huat-90">Prize:</p>
        <p className={`ml-6 font-bold ${totalPrize > 0 ? 'text-green-500' : 'text-stone-900'}`}>{totalPrize > 0 ? `You won $${new Intl.NumberFormat('en-US').format(totalPrize)}!` : 'You did not win anything'}</p>
      </div>
      {auth && (
      <div>
        <button type="button" className="w-full mx-auto bg-huat-50 border-2 border-huat-10 hover:bg-huat-80 disabled:opacity-50 disabled:bg-huat-40 mt-4 text-huat-90 font-bold py-2 px-4 rounded-full" onClick={handleSave} disabled={disableSave}>Save</button>
        <p className="text-huat-10 font-bold">{saveMsg}</p>
      </div>
      )}
    </div>

  );
};

export default ResultsOutput;
