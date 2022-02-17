import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;
const BACKEND_URL = 'http://localhost:3004';

const LandingPage = ({ auth }) => {
  const numbers = [...Array(50).keys()].slice(1);
  const [numbersChecked, setNumbersChecked] = useState(new Array(49).fill(false));
  const [message, setMessage] = useState('');
  const [selectedNums, setSelectedNums] = useState('');
  const [winningNumbers, setWinningNumbers] = useState('');
  const [additionalNumber, setAdditionalNumber] = useState('');
  const [prize, setPrize] = useState('');
  const [saveMsg, setSaveMsg] = useState('');

  const handleCheck = (index) => {
    setMessage('');
    setSelectedNums('');
    const updatedNumbersChecked = numbersChecked.map((item, i) => {
      if (index !== i) return item;
      if (index === i) {
        const totalChecked = numbersChecked.filter((el) => el).length;
        if (item || (!item && totalChecked < 6)) return !item;
      }
      setMessage('You can only select 6 numbers!');
      return item;
    });
    setNumbersChecked(updatedNumbersChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveMsg('');
    if (numbersChecked.filter((el) => el).length < 6) {
      setMessage('Please select 6 numbers!');
      return;
    }

    const data = { numbersChecked };

    try {
      const resp = await axios.post(`${BACKEND_URL}/bet/check`, data);
      setSelectedNums(resp.data.numbers);
      setWinningNumbers(resp.data.winningNumbers);
      setAdditionalNumber(resp.data.additionalNumber);
      setPrize(resp.data.prize);
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleSave = async () => {
    try {
      const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };
      const data = {
        numbers: selectedNums,
        prize,
      };

      const resp = await axios.post(`${BACKEND_URL}/bet/save`, data, headers);
      if (resp.data.bet) setSaveMsg('Successfully saved!');
    } catch (err) {
      console.log(err.response);
      setSaveMsg('An error occured.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-1/4 m-auto flex flex-col items-center">
          <span className="block text-indigo-500">Numbers:</span>
          <div>
            {numbers.map((number, index) => (
              <label htmlFor={number} className="mr-2">
                <input className="mb-4 mr-1" type="checkbox" value={number} checked={numbersChecked[index]} onChange={() => handleCheck(index)} />
                {number}
              </label>
            ))}
          </div>
          <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-4 rounded" type="submit" value="Check Winnings" />
          <span className="text-red-500 font-bold">{message}</span>
        </div>
      </form>

      {selectedNums && (
        <>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <p className="text-xl font-bold text-sky-400">Draw date:</p>
              <p>Thu, 17 Feb 2022</p>
            </div>

            <div className="mb-4">
              <p className="text-xl font-bold text-sky-400">Your numbers:</p>
              <p>{selectedNums}</p>
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
