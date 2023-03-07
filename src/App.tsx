import React, { useState } from 'react';
import MessageCreator from '@/components/MessageCreator/MessageCreator';
import MessagePreview from '@/components/MessagePreview/MessagePreview';
import './App.scss';

function App() {

  const [lastMessage, updateLastMessage] = useState<string | undefined>(undefined);
  const handleClosePreview = () => {
    updateLastMessage(undefined);
  }

  const downloadImage = () => {
      // TODO: ADD FUNCTIONALITY
  };

  return (
    <div className='App'>
      <div className='GradientLayer'/>
      <MessageCreator onMessage={updateLastMessage}/>
      {lastMessage &&
        <div className='MessagePreviewContainer'>
          <MessagePreview message={lastMessage} onClose={handleClosePreview} onDownload={downloadImage}/>
        </div>
      }
    </div>
  );
}

export default App;
