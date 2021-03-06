import React, {
  useState, useEffect, useContext,
} from 'react';
import axios from 'axios';
import {
  setWinLossAction, TotoContext, BACKEND_URL, resetStateAction,
} from '../store.jsx';
import WinLoss from './WinLoss.jsx';
import TicketUpload from './TicketUpload.jsx';
import ResultsOutput from './ResultsOutput.jsx';

const LandingPage = ({ auth }) => {
  const { dispatch } = useContext(TotoContext);

  const [disableSave, setDisableSave] = useState(true);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    if (auth) {
      (async () => {
        try {
          const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };
          const resp = await axios.get(`${BACKEND_URL}/ticket/winloss`, headers);
          const { win } = resp.data;
          dispatch(setWinLossAction(win));
        } catch (err) {
          console.error(err.response);
        }
      })();
    }

    return () => dispatch(resetStateAction());
  }, [auth]);

  return (
    <>
      {auth && <WinLoss />}
      <div className="w-10/12 border-double border-4 border-huat-10 rounded-lg bg-huat-30 p-12 flex flex-column justify-around items-center">
        <TicketUpload setDisableSave={setDisableSave} setSaveMsg={setSaveMsg} />
        <ResultsOutput
          auth={auth}
          disableSave={disableSave}
          saveMsg={saveMsg}
          setDisableSave={setDisableSave}
          setSaveMsg={setSaveMsg}
        />
      </div>
    </>
  );
};

export default LandingPage;
