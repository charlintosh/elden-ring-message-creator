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

    // Find and hide the actions div
    const actionsDiv = element.querySelector('[data-html2canvas-ignore]') as HTMLElement;
    const originalDisplay = actionsDiv ? actionsDiv.style.display : '';
    
    if (actionsDiv) {
      actionsDiv.style.display = 'none';
    }

    try {
      const canvas = await html2canvas(element);

      const link = document.createElement('a');
      link.download = 'elden-ring-message.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      // Restore the actions div
      if (actionsDiv) {
        actionsDiv.style.display = originalDisplay;
      }
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
