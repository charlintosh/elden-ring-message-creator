import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import MessageCreator from '@/components/MessageCreator/MessageCreator';
import MessagePreview from '@/components/MessagePreview/MessagePreview';
import './App.scss';

function App() {

  const [lastMessage, updateLastMessage] = useState<string | undefined>(undefined);
  const handleClosePreview = () => {
    updateLastMessage(undefined);
  }

  const downloadImage = async () => {
    const element = document.getElementById('MessagePreview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element);

      const link = document.createElement('a');
      link.download = 'elden-ring-message.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
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
