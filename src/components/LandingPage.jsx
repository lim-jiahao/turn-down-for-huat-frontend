import React, {
  useState, useEffect, useContext,
} from 'react';
import axios from 'axios';
import { setWinLossAction, TotoContext } from '../store.jsx';
import WinLoss from './WinLoss.jsx';
import TicketUpload from './TicketUpload.jsx';
import ResultsOutput from './ResultsOutput.jsx';

axios.defaults.withCredentials = true;
const BACKEND_URL = 'http://localhost:3004';

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
  }, [auth]);

  return (
    <>
      {auth && <WinLoss />}
      <TicketUpload setDisableSave={setDisableSave} setSaveMsg={setSaveMsg} />
      <ResultsOutput
        auth={auth}
        disableSave={disableSave}
        saveMsg={saveMsg}
        setDisableSave={setDisableSave}
        setSaveMsg={setSaveMsg}
      />
    </>
  );
};

export default LandingPage;
