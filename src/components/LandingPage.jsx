import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import WinLoss from './WinLoss.jsx';

axios.defaults.withCredentials = true;
const BACKEND_URL = 'http://localhost:3004';

const LandingPage = ({ auth }) => {
  const [file, setFile] = useState(null);
  const [errMsg, setErrMsg] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);

  const [drawNum, setDrawNum] = useState(0);
  const [bets, setBets] = useState([]);
  const [winningNumbers, setWinningNumbers] = useState('');
  const [additionalNumber, setAdditionalNumber] = useState('');
  const [prize, setPrize] = useState([]);
  const [saveMsg, setSaveMsg] = useState('');
  const [winLoss, setWinLoss] = useState(0);

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
      fileInputRef.current.value = null;
    } catch (err) {
      console.error(err.response);
      if (err.response.status === 400) setErrMsg(err.response.data.error);
    }
    // const data = {};
    // try {
    //   const resp = await axios.post(`${BACKEND_URL}/bet/check`, data);
    //   setBets(resp.data.numbers);
    //   setWinningNumbers(resp.data.winningNumbers);
    //   setAdditionalNumber(resp.data.additionalNumber);
    //   setPrize(resp.data.prize);
    // } catch (err) {
    //   console.log(err.response);
    // }
  };

  const handleSave = async () => {
    try {
      const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };
      const data = {
        numbers: bets,
        prize,
      };

      const resp = await axios.post(`${BACKEND_URL}/bet/save`, data, headers);
      if (resp.data.bet) {
        setSaveMsg('Successfully saved!');
        setWinLoss((prev) => prev + Number(resp.data.bet.profit) - 1);
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
              <p>Thu, 17 Feb 2022</p>
            </div>

            <div className="mb-4">
              <p className="text-xl font-bold text-sky-400">Your numbers:</p>
              <p>{bets}</p>
            </div>

            <div className="mb-4">
              <p className="text-xl font-bold text-sky-400">Winning numbers:</p>
              <p>{winningNumbers}</p>
            </div>

            <div className="mb-4">
              <p className="text-xl font-bold text-sky-400">Additional number:</p>
              <p>{additionalNumber}</p>
            </div>

            <div className="mb-4">
              <p className="text-xl font-bold text-sky-400">Prize:</p>
              <p>{prize > 0 ? `You won $${new Intl.NumberFormat('en-US').format(prize)}` : 'You did not win anything'}</p>
            </div>
          </div>

          {auth && (
            <>
              <button type="button" className="w-1/4 bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-4 rounded" onClick={handleSave}>Save</button>
              <p className="text-green-500 font-bold">{saveMsg}</p>
            </>
          )}
        </>
      )}

    </>
  );
};

export default LandingPage;
