import ExactPage from '@/components/ExactPage';
import header from '@/components/exact/ar-header.html';
import main from '@/components/exact/ar-main.html';
import footer from '@/components/exact/ar-footer.html';
export default function Page() { return <ExactPage header={header} main={main} footer={footer} lang="ar" dir="rtl" />; }
