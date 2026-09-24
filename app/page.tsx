import ExactPage from '@/components/ExactPage';
import header from '@/components/exact/home-header.html';
import main from '@/components/exact/home-main.html';
import footer from '@/components/exact/home-footer.html';

export default function HomePage() {
  return <ExactPage header={header} main={main} footer={footer} />;
}

