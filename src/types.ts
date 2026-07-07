/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  studyLevel: string;
  preferredIntake: string;
  message?: string;
  status: 'Received' | 'Assigned' | 'Reviewing' | 'Approved';
  dateSubmitted: string;
  type: 'Inquiry' | 'Consultation' | 'Scholarship' | 'Visa';
}

export interface Destination {
  id: string;
  name: string;
  code: string;
  universitiesCount: string;
  tuitionEstimate: string;
  image: string;
  flag: string;
  popularCities: string[];
  visaProcessingTime: string;
  workOpportunities: string;
}

export interface Course {
  id: string;
  name: string;
  category: string;
  careerPaths: string[];
  growthRate: string;
  avgSalary: string;
  popularDestinations: string[];
}

export interface Scholarship {
  id: string;
  title: string;
  type: 'Fully Funded' | 'Partial' | 'Government' | 'University';
  destination: string;
  eligibility: string;
  deadline: string;
  amount: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  portrait: string;
  destination: string;
  university: string;
  course: string;
  quote: string;
  videoThumbPlaceholder: string;
}
