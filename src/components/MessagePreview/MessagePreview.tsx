import React, { FC } from 'react';
import TarnishedButton from '@/components/TarnishedButton/TarnishedButton';
import styles from './MessagePreview.module.scss';

interface MessagePreviewProps {
  message: string;
  onClose: () => void;
  onDownload: () => void;
}

const MessagePreview: FC<MessagePreviewProps> = ({ message, onClose, onDownload }) => {
  return (<div className={styles.MessagePreview} id='MessagePreview'>
    <p>
      {message}
    </p>
    <div className={styles.MessagePreview_actions}>
      <TarnishedButton onClick={onDownload}> Descargar </TarnishedButton>
      <TarnishedButton onClick={onClose}> Cerrar </TarnishedButton>
    </div>
  </div>);
};

export default MessagePreview;
