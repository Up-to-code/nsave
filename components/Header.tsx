'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-grey-100">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center">
            <img src="/images/shared/nsave-logo.svg" alt="nsave logo" className="h-8 w-auto" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-grey-800">
            <div className="relative group">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className="flex items-center gap-1.5 py-2 hover:text-black transition-colors"
              >
                <span>Products</span>
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block pt-2 w-64">
                <div className="bg-white rounded-2xl shadow-xl border border-grey-100 p-3 space-y-1">
                  <Link href="/cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-grey-50 transition-colors">
                    <img src="/icons/card.svg" alt="" className="w-5 h-5 text-grey-700" />
                    <div>
                      <div className="font-medium text-grey-900 text-sm">Virtual & Physical Cards</div>
                      <div className="text-xs text-grey-500">Spend anywhere globally</div>
                    </div>
                  </Link>
                  <Link href="/business" className="flex items-center gap-3 p-3 rounded-xl hover:bg-grey-50 transition-colors">
                    <img src="/icons/bank.svg" alt="" className="w-5 h-5 text-grey-700" />
                    <div>
                      <div className="font-medium text-grey-900 text-sm">nsave Business</div>
                      <div className="text-xs text-grey-500">Global treasury & payouts</div>
                    </div>
                  </Link>
                  <Link href="/invest" className="flex items-center gap-3 p-3 rounded-xl hover:bg-grey-50 transition-colors">
                    <img src="/icons/percent.svg" alt="" className="w-5 h-5 text-grey-700" />
                    <div>
                      <div className="font-medium text-grey-900 text-sm">Investments</div>
                      <div className="text-xs text-grey-500">US stocks & ETF portfolios</div>
                    </div>
                  </Link>
                  <Link href="/send-money-home" className="flex items-center gap-3 p-3 rounded-xl hover:bg-grey-50 transition-colors">
                    <img src="/icons/shuffle.svg" alt="" className="w-5 h-5 text-grey-700" />
                    <div>
                      <div className="font-medium text-grey-900 text-sm">Send Money Home</div>
                      <div className="text-xs text-grey-500">Low fees, fast transfers</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-black transition-colors">About Us</Link>
            <Link href="/careers" className="hover:text-black transition-colors">Careers</Link>
            <Link href="/help" className="hover:text-black transition-colors">Help</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="#download" 
            className="hidden sm:inline-flex items-center justify-center h-11 px-5 rounded-full bg-grey-900 text-white font-medium text-sm hover:bg-black transition-colors shadow-sm"
          >
            Get nsave app
          </Link>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 rounded-lg text-grey-700 hover:bg-grey-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-grey-100 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3 font-medium text-grey-800">
            <Link href="/cards" onClick={() => setMobileMenuOpen(false)}>Cards</Link>
            <Link href="/business" onClick={() => setMobileMenuOpen(false)}>Business</Link>
            <Link href="/invest" onClick={() => setMobileMenuOpen(false)}>Invest</Link>
            <Link href="/send-money-home" onClick={() => setMobileMenuOpen(false)}>Send Money Home</Link>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/help" onClick={() => setMobileMenuOpen(false)}>Help Center</Link>
          </div>
          <div className="pt-4 border-t border-grey-100">
            <Link 
              href="#download" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center h-12 rounded-full bg-grey-900 text-white font-medium"
            >
              Get nsave app
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
