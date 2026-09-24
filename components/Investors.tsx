'use client';
import React from 'react';

export default function Investors() {
  const investors = [
    { name: 'Sequoia', src: '/images/investors/sequoia.png' },
    { name: 'Y Combinator', src: '/images/investors/yc.png' },
    { name: 'Ace Ventures', src: '/images/investors/ace.png' },
    { name: 'Basis Set', src: '/images/investors/basis-set.png' },
    { name: 'Humba Ventures', src: '/images/investors/humba.png' },
    { name: 'Pioneer Fund', src: '/images/investors/pioneer.png' },
  ];

  return (
    <section className="py-20 bg-white border-b border-grey-100">
      <div className="max-w-[1280px] mx-auto px-6 text-center">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-grey-400 mb-10">
          Backed by the same investors as the world&apos;s best
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-80 hover:opacity-100 transition-opacity">
          {investors.map((inv) => (
            <div key={inv.name} className="flex items-center justify-center h-12 grayscale hover:grayscale-0 transition-all duration-300">
              <img src={inv.src} alt={inv.name} className="max-h-8 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
