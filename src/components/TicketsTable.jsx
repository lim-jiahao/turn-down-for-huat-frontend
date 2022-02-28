import { TrashIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../store.jsx';
import '../styles.css';
import Modal from './Modal.jsx';

const TicketsTable = ({ tickets, setTickets }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [curFile, setCurFile] = useState(null);

  const handleImageClick = (file) => {
    setModalVisible(true);
    setCurFile(file);
  };

  const handleDelete = async (filename) => {
    try {
      const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };
      await axios.delete(`${BACKEND_URL}/ticket/${filename}`, headers);
      const ticketsCopy = [...tickets].filter((ticket) => ticket.filename !== filename);
      setTickets(ticketsCopy);
    } catch (err) {
      console.error(err.response);
    }
  };

  return (
    <>
      <p className="font-bold text-xl mb-2">Your tickets:</p>
      {tickets.length > 0 ? (
        <div className="w-auto h-1/2 pr-2 overflow-auto scrollbar">
          <table className="table-auto border-collapsed border border-slate-500">
            <thead>
              <tr>
                <th className="border border-slate-600 p-4">Ticket</th>
                <th className="border border-slate-600 p-4">Bets</th>
                <th className="border border-slate-600 p-4">Profit</th>
                <th className="border border-slate-600 p-4">Cost</th>
                <th className="border border-slate-600 p-4">Created</th>
                <th className="border border-slate-600 p-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              {tickets?.map((ticket) => (
                <tr className="text-center">
                  <td className="border border-slate-600 p-4">
                    <div onClick={() => handleImageClick(ticket.filename)} onKeyPress={() => handleImageClick(ticket.filename)} tabIndex={0} role="button">
                      <img width={100} src={`${BACKEND_URL}/${ticket.filename}`} className="hover:cursor-pointer" alt="ticket" />
                    </div>
                  </td>
                  <td className="border border-slate-600 p-4">
                    {ticket.bets.map((bet, i) => (
                      <p>{i + 1}. {bet}</p>
                    ))}
                  </td>
                  <td className="border border-slate-600 p-4">
                    ${Intl.NumberFormat('en-US').format(ticket.profit)}
                  </td>
                  <td className="border border-slate-600 p-4">
                    ${ticket.cost}
                  </td>
                  <td className="border border-slate-600 p-4">
                    {ticket.created}
                  </td>
                  <td className="border border-slate-600 p-4">
                    <TrashIcon onClick={() => handleDelete(ticket.filename)} className="h-5 w-5 cursor-pointer hover:scale-150" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <p>No tickets saved yet!</p>}

      {modalVisible && <Modal file={curFile} setModalVisible={setModalVisible} />}
    </>
  );
};

export default TicketsTable;
