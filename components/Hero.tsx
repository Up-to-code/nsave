'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [sendAmount, setSendAmount] = useState('1000');
  const [currency, setCurrency] = useState('BDT');

  const rates: Record<string, { rate: number; symbol: string; flag: string }> = {
    BDT: { rate: 122.5, symbol: '৳', flag: '/images/flags/bd.svg' },
    PKR: { rate: 279.8, symbol: '₨', flag: '/images/flags/pk.svg' },
    EGP: { rate: 49.2, symbol: 'E£', flag: '/images/flags/eg.svg' },
    TRY: { rate: 36.4, symbol: '₺', flag: '/images/flags/tr.svg' },
    MAD: { rate: 9.85, symbol: 'DH', flag: '/images/flags/ma.svg' },
    NGN: { rate: 1540.0, symbol: '₦', flag: '/images/flags/ng.svg' },
  };

  const receiveAmount = (parseFloat(sendAmount || '0') * (rates[currency]?.rate || 1)).toLocaleString(undefined, {
    maximumFractionDigits: 2
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-headline', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from('.hero-subheadline', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      });
      gsap.from('.hero-badge', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'back.out(1.7)',
      });
      gsap.from(cardRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.1,
        delay: 0.3,
        ease: 'power4.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#FAF9F5]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAE7DC] text-grey-900 text-xs md:text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available in 100+ countries</span>
            </div>

            <h1 className="hero-headline text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-grey-900 leading-[1.08]">
              Your global USD, EUR &amp; GBP Account
            </h1>

            <p className="hero-subheadline text-lg sm:text-xl text-grey-600 max-w-xl font-normal leading-relaxed">
              Open a Swiss-engineered international account in your name. Get U.S., UK and European routing numbers, protect your savings, and send money home with zero hidden markups.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a 
                href="#download" 
                className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-grey-900 text-white font-medium text-base hover:bg-black transition-all hover:shadow-lg active:scale-95"
              >
                Open account in minutes
              </a>
              <a 
                href="/compare" 
                className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-white border border-grey-200 text-grey-800 font-medium text-base hover:bg-grey-50 transition-all active:scale-95"
              >
                See fee comparison
              </a>
            </div>

            {/* Quick stats / trust */}
            <div className="pt-8 border-t border-grey-200/60 grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-grey-900">500k+</div>
                <div className="text-xs sm:text-sm text-grey-500 mt-0.5">Active users worldwide</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-grey-900">4.8 / 5</div>
                <div className="text-xs sm:text-sm text-grey-500 mt-0.5">App Store rating</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-grey-900">100%</div>
                <div className="text-xs sm:text-sm text-grey-500 mt-0.5">Segregated funds</div>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Card */}
          <div className="lg:col-span-5">
            <div 
              ref={cardRef} 
              className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-grey-100 relative"
            >
              <div className="flex items-center justify-between pb-6 border-b border-grey-100">
                <span className="font-semibold text-grey-900 text-lg">Send Money Calculator</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Real Market Rate
                </span>
              </div>

              <div className="space-y-4 pt-6">
                {/* Send Input */}
                <div>
                  <label className="block text-xs font-medium text-grey-500 uppercase tracking-wider mb-1.5">You Send</label>
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-grey-50 border border-grey-200 focus-within:border-grey-900 transition-colors">
                    <input 
                      type="number" 
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      className="bg-transparent font-semibold text-2xl text-grey-900 focus:outline-none w-full"
                    />
                    <div className="flex items-center gap-2 pl-3 border-l border-grey-200 shrink-0 font-medium text-grey-800">
                      <img src="/images/flags/us.svg" alt="USD" className="w-5 h-5 rounded-full object-cover" />
                      <span>USD</span>
                    </div>
                  </div>
                </div>

                {/* Transfer Info Breakdown */}
                <div className="py-2 px-3 text-xs text-grey-600 space-y-1.5 border-l-2 border-grey-200 ml-4">
                  <div className="flex justify-between">
                    <span>Transfer fee</span>
                    <span className="font-medium text-grey-900">$0.00 (Zero fee)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guaranteed exchange rate</span>
                    <span className="font-medium text-grey-900">1 USD = {rates[currency]?.rate} {currency}</span>
                  </div>
                </div>

                {/* Recipient Gets */}
                <div>
                  <label className="block text-xs font-medium text-grey-500 uppercase tracking-wider mb-1.5">Recipient Gets</label>
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-grey-50 border border-grey-200 focus-within:border-grey-900 transition-colors">
                    <div className="font-semibold text-2xl text-grey-900 truncate">
                      {receiveAmount}
                    </div>
                    <div className="flex items-center gap-2 pl-3 border-l border-grey-200 shrink-0 font-medium">
                      <select 
                        value={currency} 
                        onChange={(e) => setCurrency(e.target.value)}
                        className="bg-transparent font-semibold text-grey-800 focus:outline-none cursor-pointer"
                      >
                        {Object.keys(rates).map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <a 
                  href="#download"
                  className="w-full mt-4 flex items-center justify-center h-13 py-3.5 rounded-full bg-grey-900 text-white font-medium hover:bg-black transition-colors"
                >
                  Send with nsave
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
