import React, { useContext } from 'react';
import { TotoContext, setFileAction } from '../store.jsx';

const ImageInput = ({ setErrMsg, setDisableSubmit, inputRef }) => {
  const { store, dispatch } = useContext(TotoContext);
  const { file } = store;

  const checkType = (curFile) => ['image/png', 'image/jpeg', 'image/gif'].some((type) => curFile.type === type);

  const checkFileSize = (curFile) => curFile.size <= 2097152;

  const handleFileChange = (e) => {
    const curFile = e.target.files[0];

    if (!curFile) {
      setErrMsg('');
      dispatch(setFileAction(null));
      setDisableSubmit(true);
      return;
    }

    const isValidType = checkType(curFile);
    const isValidFileSize = checkFileSize(curFile);

    if (!isValidType || !isValidFileSize) {
      if (!isValidType) setErrMsg('Invalid file type!');
      else setErrMsg('Image too big. Max file size is 2MB.');

      dispatch(setFileAction(null));
      setDisableSubmit(true);
      return;
    }
    dispatch(setFileAction(curFile));
    setErrMsg('');
    setDisableSubmit(false);
  };
  return (
    <>
      <span className="form-label block text-huat-10 text-4xl m-4">Upload ticket:</span>
      <input type="file" className="m-4 form-control block w-full text-sm text-gray-900 bg-gray-50 rounded-2xl border border-solid border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" ref={inputRef} onChange={handleFileChange} />
      {file && (
      <img
        className="w-3/5 m-4"
        src={URL.createObjectURL(file)}
        alt="
      preview"
      />
      ) }
    </>
  );
};

export default ImageInput;
