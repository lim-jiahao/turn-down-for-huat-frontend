import React, { useState } from 'react';
import { BACKEND_URL } from '../store.jsx';
import '../styles.css';
import Modal from './Modal.jsx';

const TicketsTable = ({ tickets }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [curFile, setCurFile] = useState(null);

  const handleImageClick = (file) => {
    setModalVisible(true);
    setCurFile(file);
  };

  return (
    <>
      <div className="w-auto h-1/2 pr-2 overflow-auto scrollbar">
        <table className="table-auto border-collapsed border border-slate-500">
          <tr>
            <th className="border border-slate-600 p-4">Ticket</th>
            <th className="border border-slate-600 p-4">Bets</th>
            <th className="border border-slate-600 p-4">Profit</th>
            <th className="border border-slate-600 p-4">Cost</th>
            <th className="border border-slate-600 p-4">Created</th>
          </tr>
          {tickets?.map((ticket) => (
            <tr>
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
            </tr>
          ))}
        </table>
      </div>
      {modalVisible && <Modal file={curFile} setModalVisible={setModalVisible} />}
    </>
  );
};

export default TicketsTable;
