import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import AboutInteractive from './components/AboutInteractive';

export const metadata: Metadata = {
  title: 'Về Chúng Tôi - PineSmile',
  description: 'Khám phá câu chuyện đột phá của PineSmile: từ lá dứa đến giải pháp chăm sóc răng miệng bền vững. Tìm hiểu về nghiên cứu khoa học, đội ngũ chuyên gia, sứ mệnh môi trường và các chứng nhận quốc tế của chúng tôi.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <AboutInteractive />
      </main>
    </>
  );
}