/**
 * Mock data for API responses
 */
import { ListItem, ListResponse } from '../models/interfaces';

/**
 * Mock patient data for list page
 */
export const MOCK_PATIENTS_DATA: ListResponse = {
  page: 1,
  per_page: 12,
  total: 12,
  total_pages: 1,
  data: [
    {
      id: 1,
      name: 'John Smith',
      first_name: 'John',
      last_name: 'Smith',
      email: 'john.smith@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      description: 'Patient ID: 1001 - Heart condition',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      first_name: 'Sarah',
      last_name: 'Johnson',
      email: 'sarah.johnson@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      description: 'Patient ID: 1002 - Diabetes type 2',
    },
    {
      id: 3,
      name: 'Michael Williams',
      first_name: 'Michael',
      last_name: 'Williams',
      email: 'michael.williams@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      description: 'Patient ID: 1003 - Hypertension',
    },
    {
      id: 4,
      name: 'Emily Brown',
      first_name: 'Emily',
      last_name: 'Brown',
      email: 'emily.brown@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      description: 'Patient ID: 1004 - Asthma',
    },
    {
      id: 5,
      name: 'David Jones',
      first_name: 'David',
      last_name: 'Jones',
      email: 'david.jones@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      description: 'Patient ID: 1005 - Arthritis',
    },
    {
      id: 6,
      name: 'Lisa Garcia',
      first_name: 'Lisa',
      last_name: 'Garcia',
      email: 'lisa.garcia@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      description: 'Patient ID: 1006 - Migraine',
    },
    {
      id: 7,
      name: 'Robert Miller',
      first_name: 'Robert',
      last_name: 'Miller',
      email: 'robert.miller@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
      description: 'Patient ID: 1007 - Lower back pain',
    },
    {
      id: 8,
      name: 'Jennifer Davis',
      first_name: 'Jennifer',
      last_name: 'Davis',
      email: 'jennifer.davis@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
      description: 'Patient ID: 1008 - Anxiety disorder',
    },
    {
      id: 9,
      name: 'Thomas Rodriguez',
      first_name: 'Thomas',
      last_name: 'Rodriguez',
      email: 'thomas.rodriguez@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
      description: 'Patient ID: 1009 - Insomnia',
    },
    {
      id: 10,
      name: 'Maria Martinez',
      first_name: 'Maria',
      last_name: 'Martinez',
      email: 'maria.martinez@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
      description: 'Patient ID: 1010 - Depression',
    },
    {
      id: 11,
      name: 'James Anderson',
      first_name: 'James',
      last_name: 'Anderson',
      email: 'james.anderson@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
      description: 'Patient ID: 1011 - COPD',
    },
    {
      id: 12,
      name: 'Patricia Taylor',
      first_name: 'Patricia',
      last_name: 'Taylor',
      email: 'patricia.taylor@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      description: 'Patient ID: 1012 - Osteoporosis',
    }
  ]
};

/**
 * Mock patient details data
 */
export const MOCK_PATIENT_DETAILS = {
  id: 1,
  first_name: 'John',
  last_name: 'Smith',
  email: 'john.smith@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  age: 45,
  gender: 'Male',
  blood_type: 'O+',
  height: '5\'10"',
  weight: '180 lbs',
  address: '123 Main St, Anytown, CA 12345',
  phone: '(555) 123-4567',
  emergency_contact: 'Mary Smith (Wife) - (555) 987-6543',
  medical_conditions: [
    'Hypertension',
    'Type 2 Diabetes',
    'High Cholesterol'
  ],
  medications: [
    {
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      purpose: 'Blood pressure management'
    },
    {
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      purpose: 'Diabetes management'
    },
    {
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily at bedtime',
      purpose: 'Cholesterol management'
    }
  ],
  allergies: ['Penicillin', 'Shellfish'],
  recent_vitals: {
    blood_pressure: '128/82',
    heart_rate: '72 bpm',
    temperature: '98.6°F',
    oxygen_level: '98%',
    last_checked: '2025-11-28'
  },
  upcoming_appointments: [
    {
      date: '2025-12-15',
      time: '10:30 AM',
      doctor: 'Dr. Sarah Johnson',
      purpose: 'General Checkup'
    },
    {
      date: '2026-01-10',
      time: '2:15 PM',
      doctor: 'Dr. Robert Chen',
      purpose: 'Diabetes Follow-up'
    }
  ]
};
