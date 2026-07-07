/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Destination, Course, Scholarship, BlogPost, Testimonial } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'canada',
    name: 'Canada',
    code: 'CA',
    universitiesCount: '90+ Universities',
    tuitionEstimate: 'CAD 18,000 - 35,000/year',
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=600',
    flag: '🇨🇦',
    popularCities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
    visaProcessingTime: '8 - 12 weeks',
    workOpportunities: 'Post-Graduation Work Permit (PGWP) up to 3 years'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    code: 'GB',
    universitiesCount: '130+ Universities',
    tuitionEstimate: '£12,000 - 24,000/year',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&q=80&w=600',
    flag: '🇬🇧',
    popularCities: ['London', 'Manchester', 'Birmingham', 'Edinburgh'],
    visaProcessingTime: '3 - 4 weeks',
    workOpportunities: 'Graduate Route Visa - 2 years stay back work permit'
  },
  {
    id: 'usa',
    name: 'United States',
    code: 'US',
    universitiesCount: '150+ Top Colleges',
    tuitionEstimate: '$20,000 - 45,000/year',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=600',
    flag: '🇺🇸',
    popularCities: ['New York', 'Boston', 'Los Angeles', 'Chicago'],
    visaProcessingTime: '4 - 6 weeks',
    workOpportunities: 'STEM OPT up to 36 months postgraduate extension'
  },
  {
    id: 'australia',
    name: 'Australia',
    code: 'AU',
    universitiesCount: '40+ Universities',
    tuitionEstimate: 'AUD 22,000 - 40,000/year',
    image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80&w=600',
    flag: '🇦🇺',
    popularCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
    visaProcessingTime: '6 - 10 weeks',
    workOpportunities: 'Temporary Graduate Visa up to 4 years post-study'
  },
  {
    id: 'ireland',
    name: 'Ireland',
    code: 'IE',
    universitiesCount: '25+ Universities',
    tuitionEstimate: '€10,000 - 22,000/year',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80&w=600',
    flag: '🇮🇪',
    popularCities: ['Dublin', 'Cork', 'Galway', 'Limerick'],
    visaProcessingTime: '4 - 8 weeks',
    workOpportunities: 'Third Level Graduate Scheme - 2 years post-study'
  },
  {
    id: 'germany',
    name: 'Germany',
    code: 'DE',
    universitiesCount: '80+ Universities',
    tuitionEstimate: '€0 (Free Tuition in Public) - €3,000/year administration fees',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=600',
    flag: '🇩🇪',
    popularCities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg'],
    visaProcessingTime: '8 - 12 weeks',
    workOpportunities: '18-month job-seeking visa post-graduation'
  },
  {
    id: 'france',
    name: 'France',
    code: 'FR',
    universitiesCount: '40+ Grand Écoles',
    tuitionEstimate: '€2,770 - 3,770/year (Public Universities)',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600',
    flag: '🇫🇷',
    popularCities: ['Paris', 'Lyon', 'Marseille', 'Toulouse'],
    visaProcessingTime: '3 - 6 weeks',
    workOpportunities: 'Temporary Resident Permit (APS) up to 1 year'
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    code: 'NL',
    universitiesCount: '15+ Research Universities',
    tuitionEstimate: '€8,000 - 18,000/year',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
    flag: '🇳🇱',
    popularCities: ['Amsterdam', 'Rotterdam', 'Utrecht', 'The Hague'],
    visaProcessingTime: '2 - 4 weeks',
    workOpportunities: 'Orientation Year (Zoekjaar) - 1 year search visa'
  }
];

export const COURSES: Course[] = [
  { id: '1', name: 'Master of Science in Nursing (MSN)', category: 'Nursing', careerPaths: ['Clinical Nurse Specialist', 'Nurse Practitioner', 'Healthcare Administrator'], growthRate: '+45%', avgSalary: '$98,000/yr', popularDestinations: ['UK', 'Canada', 'USA'] },
  { id: '2', name: 'BSc Adult Nursing', category: 'Nursing', careerPaths: ['Registered Nurse', 'Health Visitor', 'Theatre Nurse'], growthRate: '+38%', avgSalary: '£35,000/yr', popularDestinations: ['UK', 'Ireland'] },
  { id: '3', name: 'Master of Public Health (MPH)', category: 'Public Health', careerPaths: ['Epidemiologist', 'Public Health Officer', 'Biostatistician'], growthRate: '+24%', avgSalary: '$76,000/yr', popularDestinations: ['USA', 'Canada', 'Australia'] },
  { id: '4', name: 'Master of Business Administration (MBA)', category: 'Business', careerPaths: ['Management Consultant', 'Investment Banker', 'Strategic Director'], growthRate: '+15%', avgSalary: '$115,000/yr', popularDestinations: ['USA', 'UK', 'Netherlands'] },
  { id: '5', name: 'MSc in Accounting & Finance', category: 'Accounting', careerPaths: ['Chartered Accountant', 'Financial Analyst', 'Forensic Auditor'], growthRate: '+18%', avgSalary: '£48,000/yr', popularDestinations: ['UK', 'Canada', 'Ireland'] },
  { id: '6', name: 'MSc Computer Science (Advanced AI)', category: 'Computer Science', careerPaths: ['Machine Learning Engineer', 'Systems Architect', 'Lead Developer'], growthRate: '+52%', avgSalary: '$120,000/yr', popularDestinations: ['USA', 'Germany', 'Australia'] },
  { id: '7', name: 'BSc Computer Science', category: 'Computer Science', careerPaths: ['Software Engineer', 'Systems Analyst', 'Database Manager'], growthRate: '+40%', avgSalary: '$85,000/yr', popularDestinations: ['Canada', 'Germany', 'UK'] },
  { id: '8', name: 'MSc Business Analytics & Big Data', category: 'Data Analytics', careerPaths: ['Data Scientist', 'Business Intelligence Developer', 'Risk Analyst'], growthRate: '+48%', avgSalary: '€55,000/yr', popularDestinations: ['Ireland', 'Germany', 'Netherlands'] },
  { id: '9', name: 'MSc Cybersecurity and Information Security', category: 'Cybersecurity', careerPaths: ['Information Security Analyst', 'Penetration Tester', 'Chief Information Security Officer'], growthRate: '+55%', avgSalary: '$105,000/yr', popularDestinations: ['USA', 'Australia', 'Canada'] },
  { id: '10', name: 'MSc Mechanical / Structural Engineering', category: 'Engineering', careerPaths: ['Project Engineer', 'Structural Consultant', 'Operations Manager'], growthRate: '+20%', avgSalary: '€62,000/yr', popularDestinations: ['Germany', 'Canada', 'Australia'] },
  { id: '11', name: 'Master of Public Health & Global Health Policy', category: 'Public Health', careerPaths: ['Policy Evaluator', 'NGO Regional Consultant', 'CDC Liaison'], growthRate: '+28%', avgSalary: '$82,000/yr', popularDestinations: ['Canada', 'UK'] },
  { id: '12', name: 'Master of International Law & Human Rights (LLM)', category: 'Law', careerPaths: ['Legal Advisor', 'Human Rights Advocate', 'International Consultant'], growthRate: '+12%', avgSalary: '£55,000/yr', popularDestinations: ['UK', 'France', 'Netherlands'] },
  { id: '13', name: 'Master of Medical Sciences / Biomedical Research', category: 'Medicine', careerPaths: ['Research Scientist', 'Lab Director', 'Biotech Executive'], growthRate: '+30%', avgSalary: '$90,000/yr', popularDestinations: ['USA', 'Germany', 'Ireland'] },
  { id: '14', name: 'Master of Education (M.Ed) in Educational Leadership', category: 'Education', careerPaths: ['School Principal', 'Curriculum Developer', 'Academic Consultant'], growthRate: '+16%', avgSalary: 'CAD 74,000/yr', popularDestinations: ['Canada', 'Australia'] }
];

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'sch1',
    title: 'Commonwealth Shared Scholarships',
    type: 'Fully Funded',
    destination: 'United Kingdom',
    eligibility: 'Nigerian citizens with a First Class or Second Class Upper Bachelor degree in relevant developmental subjects. WAEC Result required.',
    deadline: 'December 15, 2026',
    amount: '100% Tuition + Living Stipend + Economy Flights',
    description: 'Special initiative between UK Foreign Commonwealth Office and UK Universities for developmental Master studies.'
  },
  {
    id: 'sch2',
    title: 'Mastercard Foundation Scholars Program',
    type: 'Fully Funded',
    destination: 'Canada / USA',
    eligibility: 'Academically talented West African students with leadership potential. Must prove financial need.',
    deadline: 'February 10, 2027',
    amount: 'Full tuition, accommodation, flights, medical cover, and monthly stipend',
    description: 'Prestigious scholarship focusing on developing future leaders in African communities.'
  },
  {
    id: 'sch3',
    title: 'DAAD Scholarships for Development-Related Postgraduate Courses',
    type: 'Fully Funded',
    destination: 'Germany',
    eligibility: 'Graduates with at least two years of professional experience in development-related sectors.',
    deadline: 'October 31, 2026',
    amount: 'Tuition Waiver + €934/month stipend + health insurance + travel allowance',
    description: 'Promotes training of specialists from developing nations.'
  },
  {
    id: 'sch4',
    title: 'Fulbright Foreign Student Program',
    type: 'Fully Funded',
    destination: 'United States',
    eligibility: 'Nigerian graduates, young professionals, and artists. Requires GRE/TOEFL and excellent statement of purpose.',
    deadline: 'June 01, 2027',
    amount: 'Tuition coverage + living stipend + health insurance + airfare support',
    description: 'The flagship international educational exchange program sponsored by the U.S. government.'
  },
  {
    id: 'sch5',
    title: 'Gattigo-Partner Institutional Excellence Awards',
    type: 'Partial',
    destination: 'Canada / UK / Australia',
    eligibility: 'Gattigo clients with strong GPA (3.5/5.0 or equivalent). Direct automatic application upon admission.',
    deadline: 'Rolling Admission',
    amount: '£3,000 to £8,000 direct tuition reduction',
    description: 'Collaborative funding with top UK & Australian partner universities to ease financial strain for Nigerian applicants.'
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'blog1',
    title: 'How to Study in Canada from Nigeria: The Ultimate 2026 Checklist',
    category: 'Study in Canada',
    excerpt: 'Thinking of Canada? Learn about WAEC waivers, Blocked Accounts, proof of funds, study permits, and PGWP paths for Nigerian applicants.',
    readTime: '6 min read',
    date: 'May 28, 2026',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600',
    content: `Studying in Canada is one of the most rewarding decisions a Nigerian student can make. With amazing immigration paths and world-class universities, Canada represents safety, quality, and opportunity.

Key requirements for Nigerian applicants:
1. Academic Credentials: Your West African Senior School Certificate (WAEC) or NECO with at least C6 in key subjects. Many Canadian universities do NOT require IELTS if you can provide a certificate of English Medium of Instruction from your university.
2. Proof of Funds: Demonstrating you can support yourself and pay tuition is the #1 factor in Visa approval. Use MyBankStatement or direct bank bank statements of sponsors (preferably parents).
3. Blocked Accounts / GIC: While GIC is not mandatory for non-SDS paths, it vastly boosts visa credibility!
4. Letter of Explanation (SOP): Your study plan needs to be logically sound. Why this course? Why Canada? Why and how will you return to Nigeria? At Gattigo, our experts edit and refine your SOP to fit Visa templates perfectly.`
  },
  {
    id: 'blog2',
    title: 'UK Student Visa Requirements for Nigerian Nationals: Post-Graduate Routes',
    category: 'Visa Support',
    excerpt: 'The Graduate Route Visa offers a 2-year post-study work permit. Explore the complete tuberculosis test, IHS, and bank requirements.',
    readTime: '5 min read',
    date: 'May 15, 2026',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600',
    content: `The UK is still one of the fastest destinations to secure an offer and visa. With admission processes taking under 3 weeks in many partner institutions, you can resume studies in no time!

Important Visa Steps:
1. Confirmation of Acceptance for Studies (CAS): Issued by the university after paying your initial tuition deposit.
2. TB Test Certificate: Required for all Nigerians planning to stay over 6 months in the UK. This must be done at designated IOM clinics in Lagos or Abuja.
3. Proof of Maintenance: You need to show you have tuition fees (minus deposit paid) plus living costs (£1,334/month in London, £1,023/month out of London) held in a bank account for 28 consecutive days.
4. Immigration Health Surcharge (IHS): Lets you access the free National Health Service (NHS).

Gattigo manages this entire process, ensuring zero calculation errors that could lead to an unfortunate 28-day maintenance failure.`
  },
  {
    id: 'blog3',
    title: 'Most Affordable Universities in Australia with High Admission Rates',
    category: 'Study Options',
    excerpt: 'Australia is a premium destination with incredible post-study visas. Discover regional universities offering high tuition discounts to Nigerians.',
    readTime: '4 min read',
    date: 'April 20, 2026',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=600',
    content: `Australia is highly attractive because of its high-quality education and regional post-study visas which add extra years of stay.

Highly Affordable Australian Universities:
- Federation University: Highly popular for Business and IT, offering excellent regional scholarships.
- University of Southern Queensland (USQ): Great health science and engineering paths.
- Torrens University: Flexible intake dates and very affordable vocational certificates leading to Bachelor degrees.

Our team at Gattigo matches your budget with the best location, handling GTE (Genuine Temporary Entrant) requirements before submission.`
  },
  {
    id: 'blog4',
    title: 'Scholarships for International Students: The Golden Formula for Success',
    category: 'Funding Support',
    excerpt: 'How to write winning academic statements, secure recommendation letters, and capture full funding. Insights from a retired consular officer.',
    readTime: '7 min read',
    date: 'April 10, 2026',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600',
    content: `Winning a scholarship is not just about having a perfect GPA; it is about conveying your value to the committee.

Our 3-Step Winning Formula:
1. Align with the Funder\'s Mission: If applying for Commonwealth Shared Scholarships, focus on developmental topics (healthcare, agriculture, clean water) and show how you will transform Nigeria upon return.
2. Academic Recommendation Letters: Do not submit generic recommendation letters. Your professors should write specifically about your research potential and analytical skills.
3. Start 10 Months Ahead: Top scholarships close early. Start preparing letters, transcripts, and certificates before autumn!

Gattigo provides curated scholarship training and statement editing for all our enrolled students.`
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Chinedu Okafor',
    portrait: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400',
    destination: 'Canada',
    university: 'University of Manitoba',
    course: 'MSc in Public Health',
    quote: 'Gattigo simplified my Canadian visa. After 2 rejections applying by myself, they rectified my SOP and financial proof. Now I am in Winnipeg combining studies with part-time work!',
    videoThumbPlaceholder: 'Admissions success vlog #Winnipeg'
  },
  {
    id: 't2',
    name: 'Adebayo Funmilayo',
    portrait: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=400',
    destination: 'United Kingdom',
    university: 'Coventry University',
    course: 'MSc Data Science & AI',
    quote: 'My UK admission took only 12 days! Gattigo held my hands during the maintenance fund computation and medicals. Getting my visa within 7 days via fast-track was magical. Highly recommended!',
    videoThumbPlaceholder: 'Pre-departure briefing and flight prep chat'
  },
  {
    id: 't3',
    name: 'Amina Bello',
    portrait: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400',
    destination: 'Australia',
    university: 'Macquarie University',
    course: 'Master of Nursing',
    quote: 'Australian study visas have strict GTE evaluations. Gattigo conducted mock interviews with me three times until I was confident. I got my subclass 500 visa approved without single stress!',
    videoThumbPlaceholder: 'Nursing career opportunities in Sydney'
  },
  {
    id: 't4',
    name: 'Tochukwu Nwachukwu',
    portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    destination: 'Germany',
    university: 'Technical University of Munich',
    course: 'MSc Software Engineering',
    quote: 'Free tuition in Germany is real, but navigating the Blocked Account (Sperrkonto) and embassy appointments in Lagos is daunting. Gattigos advice was golden. I received my visa on my first attempt!',
    videoThumbPlaceholder: 'Engineering student campus tour'
  },
  {
    id: 't5',
    name: 'Olabisi Balogun',
    portrait: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    destination: 'Ireland',
    university: 'University College Dublin (UCD)',
    course: 'MSc Corporate Finance',
    quote: 'The study visa requirements for Ireland can be quite detailed. Gattigo compiled the files perfectly and connected me with local accommodation before I landed. The Dublin tech ecosystem is fabulous!',
    videoThumbPlaceholder: 'Finance graduate success stories Dublin'
  },
  {
    id: 't6',
    name: 'Dr. Emeka Eze',
    portrait: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    destination: 'United States',
    university: 'Northeastern University',
    course: 'Master of Public Health',
    quote: 'I had an incredible experience. They successfully processed my admission and guided my F1 visa mock interview focusing on my career outcomes. Gattigo is the most authentic agency in Nigeria!',
    videoThumbPlaceholder: 'Consular interview prep session'
  }
];

export const STEP_ACCORDIONS = [
  { step: '1', title: 'Book Free Consultation', content: 'Begin your journey with a virtual or physical session. We evaluate your grades (WAEC/NECO/Degree transcripts), target destinations, and budget structure.' },
  { step: '2', title: 'Choose Your Ideal Destination', content: 'We map out which country best fits your career goals whether Canada (for PGWP and immigration), UK (for express 1-year master), Germany (for zero-tuition), or USA/Australia.' },
  { step: '3', title: 'Select Universities & Programs', content: 'We narrow down to 3-5 universities where you have the highest chance of securing admission and potential institutional waivers or department scholarships.' },
  { step: '4', title: 'Submit Perfect Application', content: 'Our team completes your application forms, coordinates your English Medium of Instruction proof or IELTS, and checks your Letter of Intent / Statement of Purpose.' },
  { step: '5', title: 'Receive Offer Letters', content: 'Receive your Conditional and Unconditional Admission offers! We help you select the prime choice and process your tuition deposits safely.' },
  { step: '6', title: 'Compile & File Visa Application', content: 'The critical stage! We compile your financial proof documents, write the visa SOP, schedule Tuberculosis tests, book biometrics, and model consular mock interviews.' },
  { step: '7', title: 'Pre-Departure Briefing & Travel', content: 'We hold preparation sessions detailing weather, foreign exchange transactions, flight bookings, baggage limits, airport immigration checks, and part-time work parameters.' },
  { step: '8', title: 'Begin Studies Abroad!', content: 'You land, clear customs, resume registration, and join our Gattigo Nigerian Student Community WhatsApp networks to ease your integration.' }
];

export const PARTNERS_LOGOS = [
  // UK
  { name: 'Coventry University', country: 'UK', logo: '🏛️' },
  { name: 'University of Birmingham', country: 'UK', logo: '🏰' },
  { name: 'Heriot-Watt University', country: 'UK', logo: '🏛️' },
  { name: 'University of Hertfordshire', country: 'UK', logo: '🏫' },
  { name: 'Ulster University', country: 'UK', logo: '🏯' },
  { name: 'De Montfort University', country: 'UK', logo: '🏛️' },
  // Canada
  { name: 'University of Manitoba', country: 'Canada', logo: '🍁' },
  { name: 'Saskatchewan Polytechnic', country: 'Canada', logo: '🌲' },
  { name: 'Royal Roads University', country: 'Canada', logo: '🏔️' },
  { name: 'Capilano University', country: 'Canada', logo: '🌊' },
  { name: 'University of Winnipeg', country: 'Canada', logo: '⛪' },
  // US
  { name: 'Northeastern University', country: 'USA', logo: '🗽' },
  { name: 'Arizona State University', country: 'USA', logo: '🌵' },
  { name: 'University of South Florida', country: 'USA', logo: '🌴' },
  { name: 'Pace University', country: 'USA', logo: '🌃' },
  { name: 'Illinois Institute of Technology', country: 'USA', logo: '🏙️' },
  // Australia
  { name: 'Macquarie University', country: 'Australia', logo: '🦘' },
  { name: 'Deakin University', country: 'Australia', logo: '🐨' },
  { name: 'University of Wollongong', country: 'Australia', logo: '🏖️' },
  { name: 'Charles Sturt University', country: 'Australia', logo: '🌳' },
  { name: 'Torrens University', country: 'Australia', logo: '🌉' }
];
