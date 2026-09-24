'use client';
import React from 'react';

export default function Cta() {
  return (
    <section id="download" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="rounded-[40px] bg-[#111215] text-white p-8 sm:p-14 lg:p-20 relative overflow-hidden flex flex-col items-center text-center">
          
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Get Started Now
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
              Start your journey to global financial freedom
            </h2>
            <p className="text-grey-400 text-base sm:text-lg">
              Download the nsave app today and open your Swiss-backed USD, GBP, and EUR accounts in minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a 
                href="https://apps.apple.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 h-14 rounded-full bg-white text-grey-900 font-semibold hover:bg-grey-100 transition-transform active:scale-95"
              >
                <span>Download on iOS</span>
              </a>
              <a 
                href="https://play.google.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/10 transition-transform active:scale-95"
              >
                <span>Get it on Android</span>
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-3">
            <img src="/images/shared/get-app-qr.svg" alt="Scan to download" className="w-28 h-28 p-2 bg-white rounded-2xl shadow-xl" />
            <span className="text-xs text-grey-400 font-medium">Scan QR code to install app</span>
          </div>

        </div>
      </div>
    </section>
  );
}
