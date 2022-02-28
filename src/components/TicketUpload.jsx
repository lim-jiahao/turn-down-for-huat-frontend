import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import {
  TotoContext, setAddNumberAction, setBetsAction,
  setPrizesAction, setTotalPrizeAction, setWinNumbersAction,
  setFilenameAction, setDateAction, BACKEND_URL,
} from '../store.jsx';
import ImageInput from './ImageInput.jsx';

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

      setDisableSubmit(true);
      fileInputRef.current.value = null;

      const promises = [];
      resp.data.bets.forEach((bet) => {
        promises.push(axios.post(`${BACKEND_URL}/bet/check`, { bet, draw: resp.data.draw }));
      });

      const results = await Promise.all(promises);

      dispatch(setBetsAction(resp.data.bets));
      dispatch(setFilenameAction(resp.data.ticket));
      dispatch(setDateAction(resp.data.date));

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
    <form className="w-2/5" onSubmit={handleSubmit}>
      <div className="w-3/5 m-auto flex flex-col items-center">
        <ImageInput
          setErrMsg={setErrMsg}
          setDisableSubmit={setDisableSubmit}
          inputRef={fileInputRef}
        />

        <button className="w-36 mx-auto bg-huat-50 border-2 border-huat-10 hover:bg-huat-80 disabled:opacity-50 disabled:bg-huat-40 mt-4 text-huat-90 font-bold py-2 px-4 rounded-full" type="submit" value="Upload" disabled={disableSubmit}>Upload</button>
        <span className="text-red-500 font-bold">{errMsg}</span>
      </div>
    </form>
  );
};

export default TicketUpload;
