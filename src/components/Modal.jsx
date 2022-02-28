import '../styles.css';
import React from 'react';
import { XCircleIcon } from '@heroicons/react/outline';

import { BACKEND_URL } from '../store.jsx';

const Modal = ({ file, setModalVisible }) => (
  <div className="modal-container w-screen h-screen bg-stone-900/75">
    <div className="modal">
      <button className="modal-close" type="button" onClick={() => setModalVisible(false)}>
        <XCircleIcon className="h-6 w-6 mr-1" />
      </button>
      <img className="h-full m-auto" src={`${BACKEND_URL}/${file}`} alt="ticket" />
    </div>
  </div>
);

export default Modal;
