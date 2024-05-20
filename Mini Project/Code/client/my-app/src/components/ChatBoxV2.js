// import React, { useState } from 'react';
// import axios from 'axios';
// import '../styles/style.css'

// const ChatApp = () => {
// //  const [dataFromExpress, setDataFromExpress] = useState('');
//   const [dataToSend, setDataToSend] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);
//   const [responseData, setResponseData] = useState([]);

//   const sendDataToExpress = () => {
//     const userMessage = { role: "user", content: dataToSend };

//     setChatMessages((prevMessages) => [...prevMessages, userMessage]);

//     axios.post('http://localhost:3500/', [userMessage])
//       .then(response => {
//         setResponseData((prevResponse) => [...prevResponse, { content: response.data }]);
//         setDataToSend('');
//       })
//       .catch(error => console.error('Error sending data:', error));
//   };

//   return (
//     <div>
//       <h1 className='title'>Ask Anything Related to Government Schemes:</h1>
//       <div className='chat-box'>
//         {chatMessages.map((message, index) => (
//           <div className='user-msg' key={index}>
//             <strong>{message.role} :</strong> {message.content}
//             <div className='res-msg'>
//               {responseData[index] && (
//               <div>
//                 <strong>Assistant :</strong>
//                 {responseData[index].content}
//               </div>)}
//             </div>
//           </div>
//         ))}
//         <div className='reply-container'>
//           <input className='text-field'
//         type="text"
//         value={dataToSend}
//         onChange={(e) => setDataToSend(e.target.value)}
//       />
//       <button className='btn' onClick={sendDataToExpress}>Send</button>
//         </div>
        
//       </div>
      
//     </div>
//   );
// };

// export default ChatApp;

// import React, { useState } from 'react';
// import axios from 'axios';
// import ReactMarkdown from 'react-markdown'; // Import react-markdown
// import '../styles/style.css';

// const ChatApp = () => {
//   const [dataToSend, setDataToSend] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);
//   const [responseData, setResponseData] = useState([]);

//   const sendDataToExpress = () => {
//     const userMessage = { role: "user", content: dataToSend };

//     setChatMessages((prevMessages) => [...prevMessages, userMessage]);

//     axios.post('http://localhost:3500/', [userMessage])
//       .then(response => {
//         setResponseData((prevResponse) => [...prevResponse, { content: response.data }]);
//         setDataToSend('');
//       })
//       .catch(error => console.error('Error sending data:', error));
//   };

//   return (
//     <div>
//       <h1 className='title'>Ask Anything Related to Government Schemes:</h1>
//       <div className='chat-box'>
//         {chatMessages.map((message, index) => (
//           <div className='user-msg' key={index}>
//             <strong>{message.role} :</strong> {message.content}
//             <div className='res-msg'>
//               {responseData[index] && (
//               <div>
//                 <strong>Assistant :</strong>
//                 <ReactMarkdown>{responseData[index].content}</ReactMarkdown> {/* Render response data as Markdown */}
//               </div>)}
//             </div>
//           </div>
//         ))}
//         <div className='reply-container'>
//           <input className='text-field'
//             type="text"
//             value={dataToSend}
//             onChange={(e) => setDataToSend(e.target.value)}
//           />
//           <button className='btn' onClick={sendDataToExpress}>Send</button>
//         </div>
        
//       </div>
      
//     </div>
//   );
// };

// export default ChatApp;
import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'; 
import '../styles/style.css';

const ChatApp = () => {
  const [dataToSend, setDataToSend] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const sendDataToExpress = () => {
    const userMessage = { role: "user", content: dataToSend };

    setChatMessages(prevMessages => [...prevMessages, userMessage]);
    setLoading(true); // Set loading to true while waiting for response

    axios.post('http://localhost:3500/', userMessage)
      .then(response => {
        setResponseData(prevResponse => [...prevResponse, { content: response.data }]);
        setDataToSend('');
      })
      .catch(error => console.error('Error sending data:', error))
      .finally(() => setLoading(false)); // Set loading to false when request completes
  };

  return (
    <div>
      <h1 className='title'>Ask Anything Related to Government Schemes:</h1>
      <div className='chat-box'>
        {chatMessages.map((message, index) => (
          <div className='user-msg' key={index}>
            <strong>{message.role} :</strong> {message.content}
            <div className='res-msg'>
              {responseData[index] && (
              <div>
                <strong>Assistant :</strong>
              
                <ReactMarkdown>{responseData[index].content}</ReactMarkdown> 
              </div>)}
            </div>
          </div>
        ))}
         
        <div className='reply-container'>
          <input className='text-field'
            type="text"
            value={dataToSend}
            onChange={(e) => setDataToSend(e.target.value)}
          />
          <button className='btn' onClick={sendDataToExpress}>Send</button>
          {loading && <span>Loading...</span>} {/* Show loading indicator when loading is true */}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;

