import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Safety from '@/components/Safety';
import Investors from '@/components/Investors';
import Faq from '@/components/Faq';
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <Investors />
        <Features />
        <Safety />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
