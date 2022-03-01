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
      <div className="w-9/12 mt-4 border-t border-gray-400" />
      <p className="mt-4 mb-4 font-bold text-3xl text-huat-40 mb-2">Your tickets:</p>
      {tickets.length > 0 ? (
        <div className="w-auto h-1/2 pr-2 overflow-auto scrollbar">
          <table className="table-auto border-collapsed bg-huat-50 border-4 border-huat-70">
            <thead>
              <tr>
                <th className="border border-huat-80 p-4 text-huat-90 text-3xl">Ticket</th>
                <th className="border border-huat-80 p-4 text-huat-90 text-3xl">Bets</th>
                <th className="border border-huat-80 p-4 text-huat-90 text-3xl">Profit</th>
                <th className="border border-huat-80 p-4 text-huat-90 text-3xl">Cost</th>
                <th className="border border-huat-80 p-4 text-huat-90 text-3xl">Created</th>
                <th className="border border-huat-80 p-4 text-huat-90 text-3xl">Delete</th>
              </tr>
            </thead>
            <tbody>
              {tickets?.map((ticket) => (
                <tr className="text-center">
                  <td className="border border-huat-80 p-4">
                    <div onClick={() => handleImageClick(ticket.filename)} onKeyPress={() => handleImageClick(ticket.filename)} tabIndex={0} role="button">
                      <img width={100} src={`${BACKEND_URL}/${ticket.filename}`} className="hover:cursor-pointer" alt="ticket" />
                    </div>
                  </td>
                  <td className="border border-huat-80 p-4 text-huat-90 text-lg font-bold">
                    {ticket.bets.map((bet, i) => (
                      <p>{i + 1}. {bet}</p>
                    ))}
                  </td>
                  <td className="border border-huat-80 p-4 text-huat-90 text-lg font-bold">
                    ${Intl.NumberFormat('en-US').format(ticket.profit)}
                  </td>
                  <td className="border border-huat-80 p-4 text-huat-90 text-lg font-bold">
                    ${ticket.cost}
                  </td>
                  <td className="border border-huat-80 p-4 text-huat-90 text-lg font-bold">
                    {ticket.created}
                  </td>
                  <td className="border border-huat-80 p-4 text-huat-90 text-lg font-bold">
                    <TrashIcon onClick={() => handleDelete(ticket.filename)} className="h-7 w-7 cursor-pointer hover:scale-150" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <p className="text-huat-10 text-lg font-bold">No tickets saved yet!</p>}

      {modalVisible && <Modal file={curFile} setModalVisible={setModalVisible} />}
    </>
  );
};

export default TicketsTable;
