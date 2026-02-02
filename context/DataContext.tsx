"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, Message, Chat, ContactRequest, JobStatus, RequestStatus } from '../types';
import { INITIAL_JOBS } from '../constants';

interface DataContextType {
  jobs: Job[];
  chats: Chat[];
  messages: Message[];
  contactRequests: ContactRequest[];
  addJob: (job: Omit<Job, 'id' | 'createdAt'>) => void;
  closeJob: (id: string) => void;
  deleteJob: (id: string) => void;
  addMessage: (chatId: string, senderId: string, text: string) => void;
  getOrCreateChat: (jobId: string, customerId: string, providerId: string) => string;
  requestContact: (jobId: string, providerId: string, customerId: string) => void;
  updateRequestStatus: (requestId: string, status: RequestStatus) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);

  const [chats, setChats] = useState<Chat[]>([]);

  const [messages, setMessages] = useState<Message[]>([]);

  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedJobs = window.localStorage.getItem('tj_jobs');
    const savedChats = window.localStorage.getItem('tj_chats');
    const savedMessages = window.localStorage.getItem('tj_messages');
    const savedRequests = window.localStorage.getItem('tj_requests');

    if (savedJobs) setJobs(JSON.parse(savedJobs));
    if (savedChats) setChats(JSON.parse(savedChats));
    if (savedMessages) setMessages(JSON.parse(savedMessages));
    if (savedRequests) setContactRequests(JSON.parse(savedRequests));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('tj_jobs', JSON.stringify(jobs));
  }, [jobs]);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('tj_chats', JSON.stringify(chats));
  }, [chats]);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('tj_messages', JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('tj_requests', JSON.stringify(contactRequests));
  }, [contactRequests]);

  const addJob = (jobData: Omit<Job, 'id' | 'createdAt'>) => {
    const newJob: Job = {
      ...jobData,
      id: `j${Date.now()}`,
      createdAt: Date.now()
    };
    setJobs([newJob, ...jobs]);
  };

  const closeJob = (id: string) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: JobStatus.CLOSED } : j));
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  const getOrCreateChat = (jobId: string, customerId: string, providerId: string) => {
    const existing = chats.find(c => c.jobId === jobId && c.customerId === customerId && c.providerId === providerId);
    if (existing) return existing.id;

    const newChat: Chat = { id: `c${Date.now()}`, jobId, customerId, providerId };
    setChats([...chats, newChat]);
    return newChat.id;
  };

  const addMessage = (chatId: string, senderId: string, text: string) => {
    const newMessage: Message = { id: `m${Date.now()}`, chatId, senderId, text, timestamp: Date.now() };
    setMessages([...messages, newMessage]);
  };

  const requestContact = (jobId: string, providerId: string, customerId: string) => {
    if (contactRequests.some(r => r.jobId === jobId && r.providerId === providerId)) return;
    const newReq: ContactRequest = {
      id: `r${Date.now()}`,
      jobId,
      providerId,
      customerId,
      status: RequestStatus.PENDING,
      timestamp: Date.now()
    };
    setContactRequests([...contactRequests, newReq]);
  };

  const updateRequestStatus = (requestId: string, status: RequestStatus) => {
    setContactRequests(contactRequests.map(r => r.id === requestId ? { ...r, status } : r));
  };

  return (
    <DataContext.Provider value={{ 
      jobs, chats, messages, contactRequests, 
      addJob, closeJob, deleteJob, addMessage, getOrCreateChat, requestContact, updateRequestStatus 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
