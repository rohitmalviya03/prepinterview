
import React, { useState, useEffect, useRef } from 'react';

const RecordInterview = () => {
//     const [recording, setRecording] = useState(false);
//   const [audioChunks, setAudioChunks] = useState([]);

//   let mediaRecorder;

//   const startRecording = () => {
//     const constraints = { audio: true };
//     navigator.mediaDevices.getUserMedia(constraints)
//       .then(stream => {
//         mediaRecorder = new MediaRecorder(stream);
//         mediaRecorder.addEventListener("dataavailable", event => {
//           setAudioChunks([...audioChunks, event.data]);
//         });
//         mediaRecorder.start();
//         setRecording(true);
//       })
//       .catch(error => console.error(error));
//   };

//   const stopRecording = () => {
//     mediaRecorder.stop();
//     setRecording(false);
//   };

//   const download = () => {
//     // Create a Blob object from the recorded audio chunks
//     const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    
//     // Create a URL for the Blob object
//     const audioUrl = URL.createObjectURL(audioBlob);
    
//     // Create a download link with the audioUrl and download attributes
//     const downloadLink = document.createElement('a');
//     downloadLink.href = audioUrl;
//     downloadLink.download = 'audio.webm';
    
//     // Add the download link to the document body and click it
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
    
//     // Clean up the download link and audioUrl
//     document.body.removeChild(downloadLink);
//     URL.revokeObjectURL(audioUrl);
//   };

//   useEffect(() => {
//     return () => {
//       mediaRecorder?.stop();
//     };
//   }, []);

//   return (
//     <div>
//       <button onClick={recording ? stopRecording : startRecording}>
//         {recording ? 'Stop Recording' : 'Start Recording'}
//       </button>
//       <button onClick={download} disabled={!audioChunks.length}>
//         Download Audio
//       </button>
//       <button onClick={download} >Audio</button>
//     </div>
//   );


const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (!mediaRecorder) {
      return;
    }

    let chunks = [];

    const handleDataAvailable = (event) => {
      chunks.push(event.data);
    };

    const handleStop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      setAudioUrl(URL.createObjectURL(blob));
    };

    mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
    mediaRecorder.addEventListener('stop', handleStop);

    return () => {
      mediaRecorder.removeEventListener('dataavailable', handleDataAvailable);
      mediaRecorder.removeEventListener('stop', handleStop);
    };
  }, [mediaRecorder]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        setIsRecording(true);
        recorder.start();
      })
      .catch((err) => console.error('Failed to start recording:', err));
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder?.stop();
  };
  

  const downloadAudio = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'recording.webm';
    link.click();
  };

  return (
    <div className='mt-2'>
      <button className='btn btn-primary' onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioUrl && (
        <button className='btn btn-primary m-2' onClick={downloadAudio}>Download Interview Recording</button>
      )}
    </div>
  );
}
  
export default RecordInterview;
