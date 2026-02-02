
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  PROVIDER = 'PROVIDER',
  ADMIN = 'ADMIN'
}

export enum JobStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  IN_PROGRESS = 'IN_PROGRESS'
}

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  businessName?: string;
  bio?: string;
  phone?: string;
}

export interface Job {
  id: string;
  customerId: string;
  title: string;
  description: string;
  location: string;
  type: string;
  status: JobStatus;
  createdAt: number;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  jobId: string;
  customerId: string;
  providerId: string;
}

export interface ContactRequest {
  id: string;
  jobId: string;
  providerId: string;
  customerId: string;
  status: RequestStatus;
  timestamp: number;
}
