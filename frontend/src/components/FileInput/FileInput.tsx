import React from 'react';
import { useRef, useState } from 'react';

interface Props {
  name: string;
  label: string;
  onGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({name,label, onGetFile}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }

    onGetFile(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />

      <div className='gap-2 row align-items-center'>
        <div className='form-group'>
          <label>{label}</label>
          <input
            disabled
            className='form-control'
            placeholder='Upload Image'
            value={fileName}
            onClick={activateInput}
          />
        </div>
        <div>
          <button className="browse btn btn-primary px-4" type="button" onClick={activateInput}><i className="fas fa-image"></i>
            Browse
          </button>
        </div>
      </div>
    </>
  );
};

export default FileInput;