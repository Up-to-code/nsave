'use client';
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#FAF9F5] border-t border-grey-200/80 pt-16 pb-12 text-sm text-grey-600">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12">
          
          <div className="col-span-2 space-y-4">
            <Link href="/">
              <img src="/images/shared/nsave-logo.svg" alt="nsave logo" className="h-7 w-auto" />
            </Link>
            <p className="text-xs text-grey-500 max-w-sm leading-relaxed">
              nsave provides safe, global financial accounts for international citizens, freelancers, and businesses.
            </p>
            <div className="text-xs text-grey-400">
              © {new Date().getFullYear()} nsave SA. All rights reserved.
            </div>
          </div>

          <div>
            <div className="font-semibold text-grey-900 mb-3 text-xs uppercase tracking-wider">Product</div>
            <ul className="space-y-2 text-xs">
              <li><Link href="/cards" className="hover:text-black">Cards</Link></li>
              <li><Link href="/business" className="hover:text-black">Business</Link></li>
              <li><Link href="/invest" className="hover:text-black">Invest</Link></li>
              <li><Link href="/send-money-home" className="hover:text-black">Send Money</Link></li>
              <li><Link href="/pricing" className="hover:text-black">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-grey-900 mb-3 text-xs uppercase tracking-wider">Company</div>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-black">About</Link></li>
              <li><Link href="/careers" className="hover:text-black">Careers</Link></li>
              <li><Link href="/partnerships" className="hover:text-black">Partnerships</Link></li>
              <li><Link href="/help" className="hover:text-black">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-grey-900 mb-3 text-xs uppercase tracking-wider">Legal</div>
            <ul className="space-y-2 text-xs">
              <li><Link href="/terms-conditions" className="hover:text-black">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-black">Privacy Policy</Link></li>
              <li><Link href="/terms/cookie" className="hover:text-black">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-grey-200 text-[11px] text-grey-400 leading-relaxed">
          nsave SA is a Swiss company registered under company number CHE-228.691.036. nsave is not a bank. Banking services are provided by partner banks and regulated financial institutions in the US, UK, and EEA.
        </div>
      </div>
    </footer>
  );
}
