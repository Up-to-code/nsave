'use client';
import React from 'react';

export default function Safety() {
  return (
    <section className="py-24 bg-[#111215] text-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 block">
              Swiss-Grade Security
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
              The safe space for your money
            </h2>
            <p className="text-grey-400 text-base sm:text-lg leading-relaxed">
              Your assets are never lent out or put at risk. nsave operates with segregated tier-1 partner accounts, ensuring your funds are strictly held 1:1 and accessible solely by you at all times.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <img src="/icons/shield.svg" alt="" className="w-6 h-6 text-emerald-400 mb-3 filter invert" />
                <h4 className="font-semibold text-white mb-1">100% Segregated</h4>
                <p className="text-xs text-grey-400 leading-normal">Funds kept entirely detached from corporate reserves.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <img src="/icons/snowflake.svg" alt="" className="w-6 h-6 text-emerald-400 mb-3 filter invert" />
                <h4 className="font-semibold text-white mb-1">Bank-Grade Encryption</h4>
                <p className="text-xs text-grey-400 leading-normal">AES-256 and multi-factor biometric authentication on every device.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md p-8 rounded-[36px] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-sm font-semibold tracking-wide">nsave Vault Status</span>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-medium px-2.5 py-1 rounded-full">Secure</span>
              </div>

              <div className="space-y-4 py-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-grey-400">Main USD Account</span>
                  <span className="font-semibold text-white font-mono">$18,450.00</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full w-full" />
                </div>

                <div className="flex justify-between items-center text-sm pt-2">
                  <span className="text-grey-400">EUR Sub-Account</span>
                  <span className="font-semibold text-white font-mono">€12,200.00</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full rounded-full w-full" />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-grey-400 text-center">
                Audited and compliant with international banking standards.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
