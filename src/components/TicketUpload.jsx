import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import {
  TotoContext, setAddNumberAction, setBetsAction, setDrawNumAction,
  setPrizesAction, setTotalPrizeAction, setWinNumbersAction, setFilenameAction,
} from '../store.jsx';
import ImageInput from './ImageInput.jsx';

axios.defaults.withCredentials = true;
const BACKEND_URL = 'http://localhost:3004';

const TicketUpload = ({ setDisableSave, setSaveMsg }) => {
  const { store, dispatch } = useContext(TotoContext);
  const { file } = store;

  const [errMsg, setErrMsg] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);

  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveMsg('');

    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      const formData = new FormData();
      formData.append('ticket', file);
      const resp = await axios.post(`${BACKEND_URL}/vision`, formData, config);

      console.log(resp);
      setDisableSubmit(true);
      dispatch(setBetsAction(resp.data.bets));
      dispatch(setDrawNumAction(resp.data.draw));
      dispatch(setFilenameAction(resp.data.ticket));
      fileInputRef.current.value = null;

      const promises = [];
      resp.data.bets.forEach((bet) => {
        promises.push(axios.post(`${BACKEND_URL}/bet/check`, { bet, draw: resp.data.draw }));
      });

      const results = await Promise.all(promises);
      const wins = results.map((result) => result.data.prize);
      const totalWin = results.reduce((acc, cur) => acc + cur.data.prize, 0);
      dispatch(setWinNumbersAction(results[0].data.winningNumbers));
      dispatch(setAddNumberAction(results[0].data.additionalNumber));
      dispatch(setPrizesAction(wins));
      dispatch(setTotalPrizeAction(totalWin));
      setDisableSave(false);
    } catch (err) {
      console.error(err.response);
      if (err.response.status === 400) setErrMsg(err.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-3/4 m-auto flex flex-col items-center">
        <span className="block text-indigo-500">Upload ticket:</span>

        <ImageInput
          setErrMsg={setErrMsg}
          setDisableSubmit={setDisableSubmit}
          inputRef={fileInputRef}
        />

        <button className="w-36 mx-auto bg-indigo-700 hover:bg-pink-700 disabled:opacity-50 mt-4 text-white font-bold py-2 px-4 rounded-full" type="submit" value="Upload" disabled={disableSubmit}>Upload</button>
        <span className="text-red-500 font-bold">{errMsg}</span>
      </div>
    </form>
  );
};

export default TicketUpload;
