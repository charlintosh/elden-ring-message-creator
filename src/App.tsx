import React, { useState } from "react";
import downloadElementAsPng from "@/utils/downloadElementAsPng";
import MessageCreator from "@/components/MessageCreator/MessageCreator";
import MessagePreview from "@/components/MessagePreview/MessagePreview";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import "./App.scss";

function App() {
  const audioSrc = new URL("./assets/limgrave-day.flac", import.meta.url).href;

  const [lastMessage, setLastMessage] = useState<string | undefined>(undefined);
  const handleClosePreview = () => {
    setLastMessage(undefined);
  };

  const downloadImage = async () => {
    const element = document.getElementById("MessagePreview");
    if (!element) return;

    try {
      await downloadElementAsPng(element);
    } catch (err) {
      console.error("Error downloading image:", err);
    }
  };

  return (
    <div className="App">
      <AudioPlayer src={audioSrc} />
      <div className="GradientLayer" />
      <MessageCreator onMessage={setLastMessage} />
      {lastMessage && (
        <div className="MessagePreviewContainer">
          <MessagePreview
            message={lastMessage}
            onClose={handleClosePreview}
            onDownload={downloadImage}
          />
        </div>
      )}
    </div>
  );
}

export default App;
