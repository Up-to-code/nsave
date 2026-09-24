'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="py-24 bg-white border-b border-grey-100">
      <div className="max-w-[1280px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-grey-500 mb-3 block">
            Complete Financial Freedom
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-grey-900 tracking-tight">
            Everything you need to receive, hold, convert and spend
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#FAF9F5] rounded-[32px] p-8 border border-grey-200/60 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <img src="/icons/bank.svg" alt="Receive" className="w-7 h-7 text-grey-900" />
              </div>
              <h3 className="text-2xl font-semibold text-grey-900 mb-3">Dedicated Bank Accounts</h3>
              <p className="text-grey-600 text-sm leading-relaxed mb-6">
                Receive domestic ACH and Wire transfers in USD, Faster Payments in GBP, and SEPA in EUR — under your legal name.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-grey-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-grey-500">
                <span>Account type</span>
                <span className="font-semibold text-grey-900">Checking / ACH</span>
              </div>
              <div className="flex items-center justify-between text-xs text-grey-500">
                <span>Supported Rails</span>
                <span className="font-semibold text-grey-900">ACH, Wire, SEPA, FPS</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FAF9F5] rounded-[32px] p-8 border border-grey-200/60 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <img src="/icons/shuffle.svg" alt="Convert" className="w-7 h-7 text-grey-900" />
              </div>
              <h3 className="text-2xl font-semibold text-grey-900 mb-3">Instant Multi-Currency</h3>
              <p className="text-grey-600 text-sm leading-relaxed mb-6">
                Convert USD, GBP, and EUR instantly 24/7 with zero hidden markups. Diversify your wealth away from local devaluations.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-grey-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-grey-500">
                <span>FX Spread</span>
                <span className="font-semibold text-emerald-600">0.0% hidden spread</span>
              </div>
              <div className="flex items-center justify-between text-xs text-grey-500">
                <span>Speed</span>
                <span className="font-semibold text-grey-900">Immediate</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FAF9F5] rounded-[32px] p-8 border border-grey-200/60 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <img src="/icons/card.svg" alt="Card" className="w-7 h-7 text-grey-900" />
              </div>
              <h3 className="text-2xl font-semibold text-grey-900 mb-3">Global Mastercard®</h3>
              <p className="text-grey-600 text-sm leading-relaxed mb-6">
                Spend your funds anywhere Mastercard is accepted. Connect directly to Apple Pay or Google Wallet for smooth checkout.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-grey-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-grey-500">
                <span>Compatibility</span>
                <span className="font-semibold text-grey-900">Apple Pay &amp; Google Pay</span>
              </div>
              <div className="flex items-center justify-between text-xs text-grey-500">
                <span>Acceptance</span>
                <span className="font-semibold text-grey-900">200+ countries</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
