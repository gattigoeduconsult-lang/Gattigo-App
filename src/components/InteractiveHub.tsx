/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle, 
  TrendingUp, 
  BookOpen, 
  Globe, 
  DollarSign, 
  Sparkles,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveHubProps {
  onSelectApply: (destination: string, level: string, msg: string) => void;
}

// Fixed approximate exchange rates for calculation (2026 Naira averages)
const NAIRA_RATES = {
  USD: 1550,
  GBP: 2000,
  CAD: 1150,
  AUD: 1050,
  EUR: 1680,
};

interface DestinationSpec {
  name: string;
  currency: 'USD' | 'GBP' | 'CAD' | 'AUD' | 'EUR';
  baseTuition: number; // in host currency
  pofRequirement: number; // in host currency (2026 guideline standard)
  staybackYears: string;
  waecWaiverAcceptance: 'High' | 'Medium' | 'None';
  ieltsRecommended: boolean;
}

const DEST_SPECS: Record<string, DestinationSpec> = {
  Canada: {
    name: 'Canada',
    currency: 'CAD',
    baseTuition: 22000,
    pofRequirement: 20635, // IRCC 2024+ guideline
    staybackYears: 'Up to 3 years (PGWP)',
    waecWaiverAcceptance: 'High',
    ieltsRecommended: false,
  },
  'United Kingdom': {
    name: 'United Kingdom',
    currency: 'GBP',
    baseTuition: 16500,
    pofRequirement: 10500, // UKVI outside London average
    staybackYears: '2 years (Graduate Route)',
    waecWaiverAcceptance: 'High',
    ieltsRecommended: false,
  },
  'United States': {
    name: 'United States',
    currency: 'USD',
    baseTuition: 26000,
    pofRequirement: 16000,
    staybackYears: 'Up to 36 months (STEM OPT)',
    waecWaiverAcceptance: 'Medium',
    ieltsRecommended: true,
  },
  Australia: {
    name: 'Australia',
    currency: 'AUD',
    baseTuition: 30000,
    pofRequirement: 29710, // subclass 500 guideline
    staybackYears: 'Up to 4 years post-study',
    waecWaiverAcceptance: 'Medium',
    ieltsRecommended: true,
  },
  Germany: {
    name: 'Germany',
    currency: 'EUR',
    baseTuition: 1500, // Administration and service fees
    pofRequirement: 11904, // Blocked Account Requirement
    staybackYears: '18 months job-search',
    waecWaiverAcceptance: 'None',
    ieltsRecommended: true,
  },
  Ireland: {
    name: 'Ireland',
    currency: 'EUR',
    baseTuition: 14000,
    pofRequirement: 10000,
    staybackYears: '2 years post-study',
    waecWaiverAcceptance: 'High',
    ieltsRecommended: false,
  },
  France: {
    name: 'France',
    currency: 'EUR',
    baseTuition: 3770,
    pofRequirement: 8000,
    staybackYears: '1 year search permit',
    waecWaiverAcceptance: 'None',
    ieltsRecommended: true,
  },
  Netherlands: {
    name: 'Netherlands',
    currency: 'EUR',
    baseTuition: 13000,
    pofRequirement: 12000,
    staybackYears: '1 year orientation year',
    waecWaiverAcceptance: 'None',
    ieltsRecommended: true,
  },
};

export default function InteractiveHub({ onSelectApply }: InteractiveHubProps) {
  const [activeTab, setActiveTab] = useState<'calculator' | 'eligibility'>('calculator');
  
  // State variables for budget calculator
  const [selectedDest, setSelectedDest] = useState<string>('Canada');
  const [studyLevel, setStudyLevel] = useState<string>('Postgraduate');
  const [livingStyle, setLivingStyle] = useState<'Saver' | 'Standard' | 'Premium'>('Standard');
  const [sponsorBudget, setSponsorBudget] = useState<number>(30); // in Millions NGN

  // State variables for eligibility checker
  const [waecEnglish, setWaecEnglish] = useState<string>('B3');
  const [gpaScale, setGpaScale] = useState<string>('3.5-4.49');
  const [hasWorkExp, setHasWorkExp] = useState<boolean>(true);

  // Computed values
  const currentSpec = DEST_SPECS[selectedDest] || DEST_SPECS['Canada'];
  const rate = NAIRA_RATES[currentSpec.currency];

  // Adjust tuition based on study level
  let tuitionMultiplier = 1;
  if (studyLevel === 'Undergraduate') tuitionMultiplier = 1.1;
  if (studyLevel === 'PhD Program') tuitionMultiplier = 0.7;

  // Adjust living cost based on living style
  let livingMultiplier = 1;
  if (livingStyle === 'Saver') livingMultiplier = 0.85;
  if (livingStyle === 'Premium') livingMultiplier = 1.3;

  const estimatedTuitionHost = Math.round(currentSpec.baseTuition * tuitionMultiplier);
  const estimatedPofHost = Math.round(currentSpec.pofRequirement * livingMultiplier);
  
  const estimatedTuitionNaira = estimatedTuitionHost * rate;
  const estimatedPofNaira = estimatedPofHost * rate;
  const totalNairaRequired = estimatedTuitionNaira + estimatedPofNaira;
  const totalNairaRequiredMillions = totalNairaRequired / 1000000;

  // Budget status comparison
  const difference = sponsorBudget - totalNairaRequiredMillions;
  let budgetStatus: 'optimal' | 'moderate' | 'tight' = 'moderate';
  if (difference >= 5) {
    budgetStatus = 'optimal';
  } else if (difference < -5) {
    budgetStatus = 'tight';
  }

  // IELTS & WAEC assessment
  let waecIeltsWaiver = false;
  if (['A1', 'B2', 'B3', 'C4', 'C5', 'C6'].includes(waecEnglish) && currentSpec.waecWaiverAcceptance !== 'None') {
    waecIeltsWaiver = true;
  }

  const handleApplyPreset = () => {
    const detailMsg = `Used Interactive Hub. Est. Tuition: ${currentSpec.currency} ${estimatedTuitionHost.toLocaleString()} (${(estimatedTuitionNaira/1000000).toFixed(1)}M ₦). Est. Visa POF: ${currentSpec.currency} ${estimatedPofHost.toLocaleString()} (${(estimatedPofNaira/1000000).toFixed(1)}M ₦). WAEC English Grade: ${waecEnglish}. GPA Group: ${gpaScale}.`;
    onSelectApply(selectedDest, `${studyLevel} Studies`, detailMsg);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden font-sans">
      
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-[#063970] to-[#04254b] p-6 text-white text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#F38B0E] bg-orange-950/40 px-2.5 py-1 rounded border border-orange-500/20 inline-block mb-1.5">
            Interactive Tools
          </span>
          <h3 className="font-display font-extrabold text-2xl text-white">Smart Study Abroad Hub</h3>
          <p className="text-xs text-blue-200 mt-1">
            Calculate target budgets, convert currency, and evaluate WAEC admission pathways.
          </p>
        </div>
        
        {/* Tab Selector */}
        <div className="flex bg-slate-900/60 p-1 rounded-xl border border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'calculator' ? 'bg-[#F38B0E] text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            <Calculator className="h-3.5 w-3.5" />
            Naira Cost Calculator
          </button>
          <button
            onClick={() => setActiveTab('eligibility')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'eligibility' ? 'bg-[#F38B0E] text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Waiver & GPA Evaluator
          </button>
        </div>
      </div>

      {/* TAB 1: BUDGET CALCULATOR */}
      <AnimatePresence mode="wait">
        {activeTab === 'calculator' && (
          <motion.div
            key="calculator"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Input panel */}
            <div className="lg:col-span-7 space-y-5">
              <h4 className="font-display font-bold text-gray-900 text-lg flex items-center gap-2">
                <span className="p-1 rounded bg-orange-100 text-[#F38B0E]">💡</span> Select Your Profile Details
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Destination Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Target Country</label>
                  <select
                    value={selectedDest}
                    onChange={(e) => setSelectedDest(e.target.value)}
                    className="w-full text-xs rounded-xl border border-gray-200 p-3 bg-slate-50 font-semibold text-gray-800 outline-none focus:border-[#063970]"
                  >
                    {Object.keys(DEST_SPECS).map((name) => (
                      <option key={name} value={name}>
                        {name} ({DEST_SPECS[name].currency})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level of Study */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Study Level</label>
                  <select
                    value={studyLevel}
                    onChange={(e) => setStudyLevel(e.target.value)}
                    className="w-full text-xs rounded-xl border border-gray-200 p-3 bg-slate-50 font-semibold text-gray-800 outline-none focus:border-[#063970]"
                  >
                    <option value="Undergraduate">Bachelor (Undergraduate)</option>
                    <option value="Postgraduate">Master (Postgraduate)</option>
                    <option value="PhD Program">PhD / Doctorate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Cost standard preference */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Living Style Budget</label>
                  <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
                    {(['Saver', 'Standard', 'Premium'] as const).map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setLivingStyle(style)}
                        className={`py-1.5 rounded-lg text-[10px] font-bold uppercase transition ${livingStyle === style ? 'bg-white text-[#063970] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* WAEC English */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">WAEC English Grade</label>
                  <select
                    value={waecEnglish}
                    onChange={(e) => setWaecEnglish(e.target.value)}
                    className="w-full text-xs rounded-xl border border-gray-200 p-2.5 bg-slate-50 font-semibold text-gray-800 outline-none focus:border-[#063970]"
                  >
                    <option value="A1">A1 (Excellent)</option>
                    <option value="B2">B2 (Very Good)</option>
                    <option value="B3">B3 (Good)</option>
                    <option value="C4">C4 (Credit)</option>
                    <option value="C5">C5 (Credit)</option>
                    <option value="C6">C6 (Credit)</option>
                    <option value="D7">D7 (Pass)</option>
                    <option value="E8">E8 (Pass)</option>
                    <option value="F9">F9 (Fail)</option>
                  </select>
                </div>
              </div>

              {/* Sponsor Budget Slider */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-gray-600">Your Sponsor's Maximum Budget Availability</span>
                  <span className="font-extrabold text-[#F38B0E] text-base">₦{sponsorBudget} Million</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={sponsorBudget}
                  onChange={(e) => setSponsorBudget(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#F38B0E]"
                />
                <div className="flex justify-between text-[9px] text-gray-400 font-bold font-mono">
                  <span>₦5 Million</span>
                  <span>₦30 Million</span>
                  <span>₦50 Million</span>
                  <span>₦75 Million</span>
                  <span>₦100 Million+</span>
                </div>
              </div>
            </div>

            {/* Right Output panel */}
            <div className="lg:col-span-5 bg-slate-50 border border-gray-100 rounded-2xl p-5 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-3">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-[#063970] block">Estimated Cost breakdown</span>
                  <h5 className="font-display font-extrabold text-lg text-slate-900 mt-0.5">{selectedDest} Budget Evaluation</h5>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Yearly Tuition Cost</span>
                    <div className="text-right">
                      <span className="block font-bold text-slate-800">{currentSpec.currency} {estimatedTuitionHost.toLocaleString()}</span>
                      <span className="block text-[10px] text-gray-400 font-medium">₦{(estimatedTuitionNaira / 1000000).toFixed(1)} Million</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 flex items-center gap-1">
                      Required Proof of Funds (POF)
                      <HelpCircle className="h-3.5 w-3.5 text-gray-400" title="The minimum financial holding required by embassies for student visa applications." />
                    </span>
                    <div className="text-right">
                      <span className="block font-bold text-slate-800">{currentSpec.currency} {estimatedPofHost.toLocaleString()}</span>
                      <span className="block text-[10px] text-gray-400 font-medium">₦{(estimatedPofNaira / 1000000).toFixed(1)} Million</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center text-sm">
                    <span className="font-bold text-gray-700">Estimated Total Capital</span>
                    <div className="text-right">
                      <span className="block font-black text-[#063970] text-base">₦{totalNairaRequiredMillions.toFixed(1)} Million</span>
                      <span className="block text-[9px] text-gray-400">({currentSpec.currency} {(estimatedTuitionHost + estimatedPofHost).toLocaleString()})</span>
                    </div>
                  </div>
                </div>

                {/* Status Indicator Gauge */}
                <div className="pt-3">
                  {budgetStatus === 'optimal' && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-start gap-2.5 text-xs leading-normal">
                      <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Excellent Budget Match!</span>
                        Your sponsor's budget has solid safety cushions. Highly eligible for fast waiver routing!
                      </div>
                    </div>
                  )}

                  {budgetStatus === 'moderate' && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 flex items-start gap-2.5 text-xs leading-normal">
                      <Sparkles className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Moderate Match</span>
                        Tight but perfectly feasible. We recommend looking into partial partner scholarships to secure extra cushions.
                      </div>
                    </div>
                  )}

                  {budgetStatus === 'tight' && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 flex items-start gap-2.5 text-xs leading-normal">
                      <AlertTriangle className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Action Required</span>
                        This budget is tight for {selectedDest}. We strongly recommend Germany (free public tuition) or regional French tuition routes!
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleApplyPreset}
                className="w-full mt-4 py-3 bg-[#063970] hover:bg-[#F38B0E] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition duration-200 flex items-center justify-center gap-1.5"
              >
                Auto-Fill Consultation with this Estimate
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TAB 2: ELIGIBILITY & WAIVER CHECKER */}
      <AnimatePresence mode="wait">
        {activeTab === 'eligibility' && (
          <motion.div
            key="eligibility"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Input panel */}
            <div className="lg:col-span-6 space-y-5">
              <h4 className="font-display font-bold text-gray-900 text-lg flex items-center gap-2">
                <span className="p-1 rounded bg-orange-100 text-[#F38B0E]">🎓</span> Academic Profile Evaluator
              </h4>

              <div className="space-y-4">
                {/* GPA Grade */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Undergraduate GPA (if Postgraduate) / WAEC Average</label>
                  <select
                    value={gpaScale}
                    onChange={(e) => setGpaScale(e.target.value)}
                    className="w-full text-xs rounded-xl border border-gray-200 p-3 bg-slate-50 font-semibold text-gray-800 outline-none focus:border-[#063970]"
                  >
                    <option value="4.5+">First Class / Distinction (GPA 4.50+ / 5.00)</option>
                    <option value="3.5-4.49">Second Class Upper / 2-1 (GPA 3.50 - 4.49)</option>
                    <option value="2.5-3.49">Second Class Lower / 2-2 (GPA 2.50 - 3.49)</option>
                    <option value="Under 2.5">Third Class / Pass (GPA Below 2.50)</option>
                  </select>
                </div>

                {/* WAEC English Grade Selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">WAEC English Language Score</label>
                  <select
                    value={waecEnglish}
                    onChange={(e) => setWaecEnglish(e.target.value)}
                    className="w-full text-xs rounded-xl border border-gray-200 p-3 bg-slate-50 font-semibold text-gray-800 outline-none focus:border-[#063970]"
                  >
                    <option value="A1">A1 (Excellent)</option>
                    <option value="B2">B2 (Very Good)</option>
                    <option value="B3">B3 (Good)</option>
                    <option value="C4">C4 (Credit)</option>
                    <option value="C5">C5 (Credit)</option>
                    <option value="C6">C6 (Credit)</option>
                    <option value="D7">D7 (Pass - No Waiver)</option>
                    <option value="E8">E8 (Pass - No Waiver)</option>
                    <option value="F9">F9 (Fail - Redo required)</option>
                  </select>
                </div>

                {/* Destination Selector for Context */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Preferred Target Destination</label>
                  <select
                    value={selectedDest}
                    onChange={(e) => setSelectedDest(e.target.value)}
                    className="w-full text-xs rounded-xl border border-gray-200 p-3 bg-slate-50 font-semibold text-gray-800 outline-none focus:border-[#063970]"
                  >
                    {Object.keys(DEST_SPECS).map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>

                {/* Professional Work Experience */}
                <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-gray-100">
                  <input
                    type="checkbox"
                    id="work-exp-chk"
                    checked={hasWorkExp}
                    onChange={(e) => setHasWorkExp(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#063970] focus:ring-[#063970]"
                  />
                  <label htmlFor="work-exp-chk" className="text-xs font-semibold text-gray-700 select-none cursor-pointer">
                    I have 2+ years of relevant professional work experience
                  </label>
                </div>
              </div>
            </div>

            {/* Assessment results */}
            <div className="lg:col-span-6 bg-slate-50 border border-gray-100 rounded-2xl p-5 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-3">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-[#F38B0E] block">Admissions Evaluation Result</span>
                  <h5 className="font-display font-extrabold text-base text-slate-900 mt-0.5">Nigeria Academic Profile Status</h5>
                </div>

                <div className="space-y-3">
                  {/* IELTS WAEC English Waiver status */}
                  <div className="p-3.5 rounded-xl bg-white border border-gray-100 flex items-start gap-3">
                    <span className="text-xl shrink-0">📜</span>
                    <div className="text-xs">
                      <span className="font-bold block text-slate-800">WAEC English IELTS Waiver</span>
                      {waecIeltsWaiver ? (
                        <span className="text-emerald-600 font-semibold block mt-0.5">
                          ✓ ELIGIBLE! Your WAEC score ({waecEnglish}) qualifies for full IELTS/TOEFL waivers in the UK, Canada, and Ireland.
                        </span>
                      ) : (
                        <span className="text-amber-600 font-semibold block mt-0.5">
                          ⚠ TEST RECOMMENDED. WAEC {waecEnglish} is usually below waiver standard. IELTS, Duolingo, or WAEC redo is recommended.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Program acceptance chances */}
                  <div className="p-3.5 rounded-xl bg-white border border-gray-100 flex items-start gap-3">
                    <span className="text-xl shrink-0">🎓</span>
                    <div className="text-xs">
                      <span className="font-bold block text-slate-800">Direct Entry Admissions Potential</span>
                      {gpaScale === '4.5+' && (
                        <span className="text-emerald-600 font-semibold block mt-0.5">
                          ★ HIGH! Direct entries to top research-oriented universities. High eligibility for Fully-Funded grants.
                        </span>
                      )}
                      {gpaScale === '3.5-4.49' && (
                        <span className="text-emerald-600 font-semibold block mt-0.5">
                          ✓ HIGH! Strong fit for most direct programs in Canada, UK, and USA. Eligible for standard waivers.
                        </span>
                      )}
                      {gpaScale === '2.5-3.49' && (
                        <span className="text-amber-600 font-semibold block mt-0.5">
                          ⚠ MODERATE. Best matches are fast-route professional courseworks in the UK and specific Canadian colleges.
                        </span>
                      )}
                      {gpaScale === 'Under 2.5' && (
                        <span className="text-rose-600 font-semibold block mt-0.5">
                          ⚠ CHALLENGING. Requires pathway/pre-master options. 2+ years of professional experience boosts your profile.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Recommendation block */}
                  <div className="p-3.5 rounded-xl bg-orange-50/50 border border-orange-100/50 flex items-start gap-3">
                    <span className="text-xl shrink-0">💡</span>
                    <div className="text-xs text-slate-700 leading-normal">
                      <span className="font-bold block text-slate-900">Custom Advisor Strategy Recommendation</span>
                      {gpaScale === '4.5+' || gpaScale === '3.5-4.49' ? (
                        <span>Target fully-funded scholarships like **Commonwealth Shared** (UK) or **Mastercard Foundation** (Canada). Get fast, direct letters of offer without stress.</span>
                      ) : (
                        <span>Look into fast-track masters in the **United Kingdom** or **Germany** which are highly accommodating of 2-2 grades with solid SOP work!</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleApplyPreset}
                className="w-full py-3 bg-[#063970] hover:bg-[#F38B0E] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition duration-200 flex items-center justify-center gap-1.5"
              >
                Auto-Fill Consultation with this Profile
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
