import React, { useEffect } from 'react';
import { useFile} from '../FileContext/FileContext';
import './Emulator.css';

const Emulator = () => {
  const { file } = useFile();

  const iframeSrc = `/src/components/Emulator/index.html?romFile=${encodeURIComponent(file.name)}`;

  return (
    <div className='emulator-wrapper'>
      <iframe className='emulator-frame' title="Emulator" src={iframeSrc} />
    </div>
  );
  
}

export default Emulator;
