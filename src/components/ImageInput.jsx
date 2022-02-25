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
      <input type="file" ref={inputRef} onChange={handleFileChange} />
      {file && (
      <img
        className="w-2/5"
        src={URL.createObjectURL(file)}
        alt="
      preview"
      />
      ) }
    </>
  );
};

export default ImageInput;
