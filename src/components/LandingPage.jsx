import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import WinLoss from './WinLoss.jsx';

axios.defaults.withCredentials = true;
const BACKEND_URL = 'http://localhost:3004';

const LandingPage = ({ auth }) => {
  const [file, setFile] = useState(null);
  const [errMsg, setErrMsg] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [disableSave, setDisableSave] = useState(true);

  const [drawNum, setDrawNum] = useState(0);
  const [bets, setBets] = useState([]);
  const [winningNumbers, setWinningNumbers] = useState('');
  const [additionalNumber, setAdditionalNumber] = useState('');
  const [prizes, setPrizes] = useState([]);
  const [totalPrize, setTotalPrize] = useState(0);
  const [saveMsg, setSaveMsg] = useState('');
  const [winLoss, setWinLoss] = useState(0);
  const [filename, setFilename] = useState('');

  const fileInputRef = useRef();

  useEffect(() => {
    if (auth) {
      (async () => {
        try {
          const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };
          const resp = await axios.get(`${BACKEND_URL}/ticket/winloss`, headers);
          const { win } = resp.data;
          setWinLoss(win);
        } catch (err) {
          console.error(err.response);
        }
      })();
    }
  }, [auth]);

  const checkType = (curFile) => ['image/png', 'image/jpeg', 'image/gif'].some((type) => curFile.type === type);

  // approx 2MB, if they got meme larger then wtf no
  const checkFileSize = (curFile) => curFile.size <= 2097152;

  const handleFileChange = (e) => {
    const curFile = e.target.files[0];

    if (!curFile) {
      setErrMsg('');
      setFile(null);
      setDisableSubmit(true);
      return;
    }

    const isValidType = checkType(curFile);
    const isValidFileSize = checkFileSize(curFile);

    if (!isValidType || !isValidFileSize) {
      if (!isValidType) setErrMsg('Invalid file type!');
      else setErrMsg('Image too big. Max file size is 2MB.');

      setFile(null);
      setDisableSubmit(true);
      return;
    }
    setFile(curFile);
    setErrMsg('');
    setDisableSubmit(false);
  };

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
      setBets(resp.data.bets);
      setDrawNum(resp.data.draw);
      setFilename(resp.data.ticket);
      fileInputRef.current.value = null;

      const promises = [];
      resp.data.bets.forEach((bet) => {
        promises.push(axios.post(`${BACKEND_URL}/bet/check`, { bet, draw: resp.data.draw }));
      });

      const results = await Promise.all(promises);
      const wins = results.map((result) => result.data.prize);
      const totalWin = results.reduce((acc, cur) => acc + cur.data.prize, 0);
      setWinningNumbers(results[0].data.winningNumbers);
      setAdditionalNumber(results[0].data.additionalNumber);
      setPrizes(wins);
      setTotalPrize(totalWin);
      setDisableSave(false);
    } catch (err) {
      console.error(err.response);
      if (err.response.status === 400) setErrMsg(err.response.data.error);
    }
  };

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
        setSaveMsg('Successfully saved!');
        setWinLoss((prev) => prev + resp.data.winLoss);
        setDisableSave(true);
      }
    } catch (err) {
      console.log(err.response);
      setSaveMsg('An error occured.');
    }
  };

  return (
    <>
      {auth && <WinLoss winLoss={winLoss} />}

      <form onSubmit={handleSubmit}>
        <div className="w-3/4 m-auto flex flex-col items-center">
          <span className="block text-indigo-500">Upload ticket:</span>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} />
          {file && <img className="w-2/5" src={URL.createObjectURL(file)} alt=" preview" /> }
          <button className="w-36 mx-auto bg-indigo-700 hover:bg-pink-700 disabled:opacity-50 mt-4 text-white font-bold py-2 px-4 rounded-full" type="submit" value="Upload" disabled={disableSubmit}>Upload</button>
          <span className="text-red-500 font-bold">{errMsg}</span>
        </div>
      </form>

      {bets.length > 0 && (
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
                  <span>
                    {i + 1}
                    .
                    {' '}
                    {bet}
                    {' '}
                    -
                    {' '}
                  </span>
                  <span className={`font-bold ${prizes[i] > 0 && 'text-green-500'}`}>
                    +$
                    {new Intl.NumberFormat('en-US').format(prizes[i])}
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
      )}

    </>
  );
};

export default LandingPage;
