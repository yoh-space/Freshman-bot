// "use client";
// import { useState, useRef, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';

// export default function AIChatBot() {
//   const [messages, setMessages] = useState([
//     { 
//       from: 'ai', 
//       text: '👋 Hi! I am YoIT AI. Ask me any academic question.', 
//       timestamp: new Date().toISOString() 
//     }
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);
//   const searchParams = useSearchParams();
//   const subject = searchParams.get('subject');

//   // Sample quick questions based on subject
//   const quickQuestions = {
//     math: [
//       "Explain quadratic equations",
//       "How to solve linear equations?",
//       "What is calculus?"
//     ],
//     physics: [
//       "Explain Newton's laws",
//       "What is quantum mechanics?",
//       "How does electromagnetism work?"
//     ],
//     chemistry: [
//       "Explain chemical bonding",
//       "What is the periodic table?",
//       "How do chemical reactions work?"
//     ],
//     default: [
//       "Explain this concept in simple terms",
//       "Give me a summary of this topic",
//       "What are the key points to remember?"
//     ]
//   };

//   const getQuickQuestions = () => {
//     if (subject && quickQuestions[subject]) {
//       return quickQuestions[subject];
//     }
//     return quickQuestions.default;
//   };

//   useEffect(() => {
//     scrollToBottom();
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const simulateTyping = async (responseText) => {
//     setIsTyping(true);
//     let displayedText = '';
    
//     for (let i = 0; i < responseText.length; i++) {
//       displayedText += responseText[i];
//       setMessages(prev => {
//         const newMessages = [...prev];
//         newMessages[newMessages.length - 1].text = displayedText;
//         return newMessages;
//       });
//       await new Promise(resolve => setTimeout(resolve, 10 + Math.random() * 10));
//     }
    
//     setIsTyping(false);
//   };

//     const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || loading || isTyping) return;
    
//     const userMsg = input;
//     setMessages(msgs => [...msgs, { 
//       from: 'user', 
//       text: userMsg,
//       timestamp: new Date().toISOString()
//     }]);
//     setInput('');
//     setLoading(true);
    
//     // Add empty AI message that will be filled gradually
//     setMessages(msgs => [...msgs, { 
//       from: 'ai', 
//       text: '',
//       timestamp: new Date().toISOString()
//     }]);
    
//     try {
//       const response = await fetch('/api/telegram/ai-chat', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ 
//           question: userMsg,
//           subject: subject 
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`API request failed with status ${response.status}`);
//       }

//       const data = await response.json();
      
//       if (!data.text) {
//         throw new Error('Empty response from API');
//       }

//       await simulateTyping(data.text);
//     } catch (err) {
//       console.error('Chat error:', err);
//       await simulateTyping("⚠️ Sorry, I'm having trouble connecting. Please check your internet and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuickQuestion = (question) => {
//     setInput(question);
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   };

//   const handleBackToMenu = () => {
//     if (window.Telegram && window.Telegram.WebApp) {
//       window.Telegram.WebApp.close();
//     } else {
//       window.location.href = 'https://t.me/yoh_space'; // fallback
//     }
//   };

//   return (
//     <div className="ai-chat-container">
//       <div className="chat-header">
//         <h2>YoIT AI Assistant</h2>
//         {subject && (
//           <p className="subject-tag">Subject: {subject.replace(/-/g, ' ')}</p>
//         )}
//       </div>
      
//       <div className="messages-container">
//         {messages.map((msg, i) => (
//           <div 
//             key={i} 
//             className={`message ${msg.from}`}
//             data-timestamp={new Date(msg.timestamp).toLocaleTimeString()}
//           >
//             <div className="message-bubble">
//               {msg.text}
//               {msg.from === 'ai' && i === messages.length - 1 && isTyping && (
//                 <span className="typing-indicator">...</span>
//               )}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
      
//       {messages.length <= 1 && (
//         <div className="quick-questions">
//           <h3>Quick Questions:</h3>
//           <div className="quick-questions-grid">
//             {getQuickQuestions().map((question, i) => (
//               <button
//                 key={i}
//                 onClick={() => handleQuickQuestion(question)}
//                 className="quick-question-btn"
//               >
//                 {question}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
      
//       <form onSubmit={sendMessage} className="input-area text-black">
//         <input
//           ref={inputRef}
//           type="text"
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           placeholder="Type your question..."
//           disabled={loading || isTyping}
//           autoFocus
//           className="input-field text-black"
//         />
//         <button 
//           type="submit" 
//           disabled={loading || isTyping || !input.trim()}
//           className="send-button"
//         >
//           {loading || isTyping ? (
//             <span className="spinner"></span>
//           ) : (
//             'Send'
//           )}
//         </button>
//       </form>
      
//       <button onClick={handleBackToMenu} className="back-button">
//         🔙 Back to Menu
//       </button>
      
//       <style jsx>{`
//         .ai-chat-container {
//           display: flex;
//           flex-direction: column;
//           height: 100vh;
//           background: #f7fafd;
//           padding: 16px;
//           max-width: 480px;
//           margin: 0 auto;
//         }
        
//         .chat-header {
//           text-align: center;
//           margin-bottom: 16px;
//         }
        
//         .chat-header h2 {
//           color: #2c3e50;
//           margin: 0;
//           font-size: 1.5rem;
//         }
        
//         .subject-tag {
//           background: #e1f5fe;
//           color: #0288d1;
//           padding: 4px 12px;
//           border-radius: 16px;
//           display: inline-block;
//           margin-top: 8px;
//           font-size: 0.9rem;
//         }
        
//         .messages-container {
//           flex: 1;
//           overflow-y: auto;
//           padding: 8px;
//           margin-bottom: 12px;
//           background: #fff;
//           border-radius: 12px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//         }
        
//         .message {
//           margin: 12px 0;
//           display: flex;
//         }
        
//         .message.user {
//           justify-content: flex-end;
//         }
        
//         .message.ai {
//           justify-content: flex-start;
//         }
        
//         .message-bubble {
//           max-width: 80%;
//           padding: 10px 16px;
//           border-radius: 18px;
//           position: relative;
//           font-size: 1.05em;
//           line-height: 1.4;
//         }
        
//         .user .message-bubble {
//           background: #d1e7ff;
//           color: #0d47a1;
//           border-bottom-right-radius: 4px;
//         }
        
//         .ai .message-bubble {
//           background: #e9fbe5;
//           color: #1b5e20;
//           border-bottom-left-radius: 4px;
//         }
        
//         .typing-indicator {
//           opacity: 0.6;
//           display: inline-block;
//           animation: pulse 1.5s infinite;
//         }
        
//         @keyframes pulse {
//           0%, 100% { opacity: 0.6; }
//           50% { opacity: 1; }
//         }
        
//         .quick-questions {
//           margin: 12px 0;
//           padding: 12px;
//           background: #fff;
//           border-radius: 12px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//         }
        
//         .quick-questions h3 {
//           margin-top: 0;
//           font-size: 1rem;
//           color: #555;
//         }
        
//         .quick-questions-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
//           gap: 8px;
//         }
        
//         .quick-question-btn {
//           background: #e3f2fd;
//           border: none;
//           border-radius: 8px;
//           padding: 8px;
//           font-size: 0.85rem;
//           color: #1565c0;
//           cursor: pointer;
//           transition: background 0.2s;
//           text-align: left;
//         }
        
//         .quick-question-btn:hover {
//           background: #bbdefb;
//         }
        
//         .input-area {
//           display: flex;
//           gap: 8px;
//           margin-bottom: 12px;
//         }
        
//         .input-area input {
//           flex: 1;
//           padding: 12px;
//           border-radius: 24px;
//           border: 1px solid #ccc;
//           font-size: 1em;
//           outline: none;
//           transition: border 0.2s;
//         }
        
//         .input-area input:focus {
//           border-color: #42a5f5;
//         }
        
//         .send-button {
//           padding: 0 20px;
//           border-radius: 24px;
//           background: #0077cc;
//           color: #fff;
//           border: none;
//           font-weight: 600;
//           font-size: 1em;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           min-width: 80px;
//           transition: background 0.2s;
//         }
        
//         .send-button:disabled {
//           background: #90caf9;
//           cursor: not-allowed;
//         }
        
//         .send-button:not(:disabled):hover {
//           background: #005fa3;
//         }
        
//         .spinner {
//           display: inline-block;
//           width: 16px;
//           height: 16px;
//           border: 2px solid rgba(255,255,255,0.3);
//           border-radius: 50%;
//           border-top-color: #fff;
//           animation: spin 1s ease-in-out infinite;
//         }
        
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
        
//         .back-button {
//           background: #eee;
//           border: none;
//           border-radius: 8px;
//           padding: 12px;
//           font-weight: 500;
//           color: #0077cc;
//           cursor: pointer;
//           transition: background 0.2s;
//           width: 100%;
//         }
        
//         .back-button:hover {
//           background: #e0e0e0;
//         }
//       `}</style>
//     </div>
//   );
// }