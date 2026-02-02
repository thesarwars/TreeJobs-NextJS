
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Message, Chat } from '../types';
import { suggestArboristMessage } from '../services/geminiService';

interface MessagingUIProps {
  chatId: string;
}

const MessagingUI: React.FC<MessagingUIProps> = ({ chatId }) => {
  const { user } = useAuth();
  const { messages, addMessage, chats, jobs } = useData();
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const chat = chats.find(c => c.id === chatId);
  const job = chat ? jobs.find(j => j.id === chat.jobId) : null;
  const chatMessages = messages.filter(m => m.chatId === chatId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSend = () => {
    if (!inputText.trim() || !user) return;
    addMessage(chatId, user.id, inputText);
    setInputText('');
  };

  const handleAISuggestion = async () => {
    if (!job) return;
    setIsGenerating(true);
    const suggestion = await suggestArboristMessage(job.title, job.description);
    setInputText(suggestion || '');
    setIsGenerating(false);
  };

  if (!chat || !job) return <div>Chat not found</div>;

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-dark p-4 text-white flex justify-between items-center">
        <div>
          <h3 className="font-bold">{job.title}</h3>
          <p className="text-xs opacity-75">Chatting with {user?.id === chat.customerId ? 'Provider' : 'Customer'}</p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50"
      >
        {chatMessages.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            No messages yet. Start the conversation!
          </div>
        ) : (
          chatMessages.map(msg => (
            <div 
              key={msg.id}
              className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                  msg.senderId === user?.id 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white text-dark border border-gray-200 rounded-tl-none'
                }`}
              >
                {msg.text}
                <div className={`text-[10px] mt-1 opacity-60 ${msg.senderId === user?.id ? 'text-right' : 'text-left'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        {user?.role === 'PROVIDER' && chatMessages.length === 0 && (
          <button 
            onClick={handleAISuggestion}
            disabled={isGenerating}
            className="mb-2 text-xs text-primary font-bold hover:underline flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {isGenerating ? 'AI Thinking...' : 'Suggest an intro message'}
          </button>
        )}
        <div className="flex space-x-2">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button 
            onClick={handleSend}
            className="bg-primary text-white p-2 rounded-lg hover:bg-opacity-90 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagingUI;
