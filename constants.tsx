
import React from 'react';
import { UserRole, JobStatus } from './types';

export const COLORS = {
  primary: '#2E7D32',
  accent: '#66BB6A',
  dark: '#263238',
  light: '#ECEFF1',
  white: '#FFFFFF',
};

export const INITIAL_USERS = [
  { id: 'u1', name: 'John Customer', email: 'john@example.com', role: UserRole.CUSTOMER },
  { id: 'u2', name: 'Alice Arborist', email: 'alice@treecare.com', role: UserRole.PROVIDER, businessName: 'Alice Tree Services', bio: 'Professional arborist with 10 years of experience in pruning and tree health.', phone: '555-0101' },
  { id: 'u3', name: 'Admin User', email: 'admin@treejobs.com', role: UserRole.ADMIN },
];

export const INITIAL_JOBS = [
  { 
    id: 'j1', 
    customerId: 'u1', 
    title: 'Oak Tree Pruning', 
    description: 'I have a large oak tree that needs thinning and deadwood removed. Branches are hanging over the roof.', 
    location: 'North Suburbs', 
    type: 'Pruning', 
    status: JobStatus.OPEN, 
    createdAt: Date.now() - 86400000 
  },
  { 
    id: 'j2', 
    customerId: 'u1', 
    title: 'Stump Grinding', 
    description: 'Small pine stump needs to be removed from the front garden.', 
    location: 'West side', 
    type: 'Removal', 
    status: JobStatus.OPEN, 
    createdAt: Date.now() - 43200000 
  },
];

export const JOB_TYPES = [
  'Pruning',
  'Removal',
  'Stump Grinding',
  'Health Assessment',
  'Emergency Work',
  'Other'
];
