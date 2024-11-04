import React, { useEffect } from 'react';
import './ErrMsg.css';

interface ErrMsgProps {
  message: string;
  onClose: () => void;
  duration?: number; // Optional duration prop
}

const ErrMsg: React.FC<ErrMsgProps> = ({ message, onClose, duration = 8000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration); // Automatically close after duration
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [onClose, duration]);

  return <div className="error-message">Error: {message}. Informeer Rob over het probleem als het blijft aanhouden.</div>;
};

export default ErrMsg;
