'use client';
import React, { useState } from 'react';

const faqs = [
  {
    q: 'Who can open a USD, GBP or EUR account with nsave?',
    a: 'nsave is built for people in supported countries who want access to stable currencies. Download the app, verify your identity and open your account in minutes.',
  },
  {
    q: 'Are these real bank account details?',
    a: 'Yes. You get real account details in your own name — ACH and wire details for USD, sort code and account number for GBP, and an IBAN for EUR.',
  },
  {
    q: 'How safe is my money?',
    a: 'Your funds are held in segregated accounts, kept fully separate from our own, so they are always yours and never used to run the business.',
  },
  {
    q: 'How long does it take to open an account?',
    a: 'Most customers are verified and ready to go within minutes. In some cases additional checks can take up to one business day.',
  },
  {
    q: 'What does it cost?',
    a: 'Opening an account is free. You pay one transparent fee on conversions and transfers — the real exchange rate with no hidden spread.',
  },
  {
    q: 'Which currencies can I hold and convert between?',
    a: 'You can hold and convert between USD, GBP and EUR, and send money home to local currencies like PKR, BDT, EGP and more.',
  },
  {
    q: 'How do I add money or get paid?',
    a: 'Share your account details with employers, clients or platforms to receive transfers, or deposit via stablecoin and local rails in supported countries.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-24 bg-[#FAF9F5]">
      <div className="max-w-[880px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-grey-500 mb-3 block">
            Common Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-grey-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-grey-200/80 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between font-medium text-grey-900 hover:text-black gap-4"
              >
                <span className="text-base sm:text-lg">{faq.q}</span>
                <span className="text-xl shrink-0 font-light text-grey-400">
                  {openIndex === idx ? '−' : '+'}
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 text-sm sm:text-base text-grey-600 leading-relaxed border-t border-grey-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
