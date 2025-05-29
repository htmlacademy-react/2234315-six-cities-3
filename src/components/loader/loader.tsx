import { memo } from 'react';
import './loader.css';

function Loader(): JSX.Element {
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
    </div>
  );
}

export default memo(Loader);
