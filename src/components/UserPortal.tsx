/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Booking } from '../types';
import { LayoutDashboard, CheckCircle, Shield, FileText, Clock, User, Award, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface UserPortalProps {
  bookings: Booking[];
  onAddDummyBooking: () => void;
}

export default function UserPortal({ bookings, onAddDummyBooking }: UserPortalProps) {
  const [activeTab, setActiveTab] = useState<'tracker' | 'checklist'>('tracker');

  // Compute status metrics
  const activeCount = bookings.length;
  const latestBooking = bookings[bookings.length - 1];

  return (
    <div id="gtg-user-portal" className="bg-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E51B13] bg-red-950/40 px-3 py-1 rounded-full">
            Gattigo Student Workspace
          </span>
          <h2 className="text-2xl font-bold tracking-tight mt-2 flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-blue-400" />
            My Admission & Visa Tracker
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Real-time milestone reporting for prospective Nigerian scholars.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'tracker' ? 'bg-[#E51B13] text-white' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'}`}
          >
            My Applications ({activeCount})
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'checklist' ? 'bg-[#E51B13] text-white' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'}`}
          >
            Pre-Flight Checklist
          </button>
        </div>
      </div>

      {activeTab === 'tracker' ? (
        <div className="space-y-6">
          {activeCount === 0 ? (
            <div className="text-center py-10 px-4 rounded-2xl bg-slate-900/50 border border-dashed border-slate-800">
              <Clock className="h-12 w-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-200">No Active Bookings Yet</h3>
              <p className="text-slate-400 text-xs max-w-sm mx-auto mt-1">
                Fill out the quick consultation form above or the inquiry widgets below to initiate evaluation files.
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <button
                  onClick={onAddDummyBooking}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold hover:bg-slate-700 hover:text-white transition"
                >
                  Load Example Nigerian Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Application details */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">Submitted Request dossiers</h3>
                {bookings.map((b) => (
                  <motion.div
                    key={b.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-700 transition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${b.type === 'Consultation' ? 'bg-red-900/30 text-red-400' : 'bg-blue-900/30 text-blue-400'}`}>
                          {b.type}
                        </span>
                        <span className="text-slate-500 text-xs font-mono">{b.dateSubmitted}</span>
                      </div>
                      <h4 className="text-md font-bold text-slate-100 mt-1">{b.fullName}</h4>
                      <p className="text-slate-400 text-xs">
                        Targeting <strong className="text-slate-200">{b.studyLevel}</strong> in <strong className="text-slate-200">{b.destination}</strong> for <strong className="text-red-400">{b.preferredIntake}</strong>
                      </p>
                      {b.message && (
                        <p className="text-slate-500 text-[11px] italic mt-1 line-clamp-1">
                          &ldquo;{b.message}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:items-end gap-2 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs font-bold text-red-400">Step: {b.status}</span>
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Advisor Assigned in Lagos
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Status Visual Pipeline */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <h3 className="text-sm font-semibold uppercase text-slate-400 mb-4 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  Consular Pipeline
                </h3>
                <div className="relative pl-6 space-y-6">
                  {/* Vertical bar connection */}
                  <div className="absolute left-[9px] top-2 bottom-5 w-0.5 bg-slate-800" />

                  {/* Node 1 */}
                  <div className="relative">
                    <div className="absolute -left-[23px] top-1.5 h-4.5 w-4.5 rounded-full bg-emerald-500 border-4 border-slate-950 flex items-center justify-center text-[8px]" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Credential Evaluation</h4>
                      <p className="text-[10px] text-slate-500">Verification of WAEC/NECO / Undergraduate GPA matching for waivers.</p>
                      <span className="inline-block text-[9px] bg-emerald-950/40 text-emerald-400 px-2 py-0.5 rounded mt-1 font-mono">COMPLETE</span>
                    </div>
                  </div>

                  {/* Node 2 */}
                  <div className="relative animate-pulse">
                    <div className="absolute -left-[23px] top-1.5 h-4.5 w-4.5 rounded-full bg-[#E51B13] border-4 border-slate-950 flex items-center justify-center text-[8px]" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Department Admission Seek</h4>
                      <p className="text-[10px] text-slate-500">Sourcing fast CAS and prompt admission evaluation in leading destinations.</p>
                      <span className="inline-block text-[9px] bg-red-950/40 text-[#E51B13] px-2 py-0.5 rounded mt-1 font-mono">ACTIVE UNDER REVIEW</span>
                    </div>
                  </div>

                  {/* Node 3 */}
                  <div className="relative opacity-60">
                    <div className="absolute -left-[23px] top-1.5 h-4.5 w-4.5 rounded-full bg-slate-800 border-4 border-slate-950 flex items-center justify-center text-[8px]" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-400">Statement of Purpose Draft</h4>
                      <p className="text-[10px] text-slate-600">Structuring personal explanations corresponding to embassy policy directives.</p>
                      <span className="inline-block text-[9px] text-slate-500 px-2 py-0.5 rounded mt-1 font-mono">LOCKED</span>
                    </div>
                  </div>

                  {/* Node 4 */}
                  <div className="relative opacity-60">
                    <div className="absolute -left-[23px] top-1.5 h-4.5 w-4.5 rounded-full bg-slate-800 border-4 border-slate-950 flex items-center justify-center text-[8px]" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-400">GTE & Embassy Filing Prep</h4>
                      <p className="text-[10px] text-slate-600">Verification of funding balances (held 28 consecutive days) and medical checks.</p>
                      <span className="inline-block text-[9px] text-slate-500 px-2 py-0.5 rounded mt-1 font-mono">LOCKED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <FileText className="h-6 w-6 text-[#E51B13] mx-auto mb-2" />
              <h4 className="text-xs font-bold text-slate-200">WAEC / Transcripts</h4>
              <p className="text-[10px] text-slate-500 mt-1">Bring scratch card / PDF academic reports.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <Shield className="h-6 w-6 text-blue-400" />
              <h4 className="text-xs font-bold text-slate-200">Passport Bio Date</h4>
              <p className="text-[10px] text-slate-500 mt-1">Must have at least 18 months validity remaining.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <Clock className="h-6 w-6 text-[#E51B13] mx-auto mb-2" />
              <h4 className="text-xs font-bold text-slate-200">Proof of Funds</h4>
              <p className="text-[10px] text-slate-500 mt-1">Provide direct bank verification code.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <Award className="h-6 w-6 text-emerald-400" />
              <h4 className="text-xs font-bold text-slate-200">SOP / Resume</h4>
              <p className="text-[10px] text-slate-500 mt-1">Letter describing study intention.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs leading-relaxed text-slate-300">
            <h4 className="font-bold text-[#E51B13] mb-2 uppercase tracking-wide">💡 Tips for fast immigration audits (Nigeria to Global)</h4>
            <ul className="list-disc leading-loose pl-4 space-y-1.5 text-slate-400">
              <li>Ensure sponsor names match parents perfectly, or compile sworn change of name affidavits!</li>
              <li>Provide clear explanations for any study gap over 18 months with letters of employment or vocational certificates.</li>
              <li>For Irish & German study paths, secure appointments early on the national immigration portal as queue delays in West Africa are highly common.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
