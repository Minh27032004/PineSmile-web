'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
  category: 'dental' | 'sustainability' | 'quality' | 'international';
  image: string;
  alt: string;
  description: string;
}

interface CertificationsSectionProps {
  className?: string;
}

const CertificationsSection = ({ className = '' }: CertificationsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const certifications: Certification[] = [
  {
    id: 1,
    name: 'Chứng Nhận Nha Khoa Việt Nam',
    issuer: 'Bộ Y Tế Việt Nam',
    year: '2022',
    category: 'dental',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12ca62b97-1766934499828.png",
    alt: 'Official Vietnamese Ministry of Health dental certification document with red seal and signatures on white paper',
    description: 'Chứng nhận sản phẩm đạt tiêu chuẩn an toàn và hiệu quả cho sức khỏe răng miệng theo quy định của Bộ Y Tế Việt Nam.'
  },
  {
    id: 2,
    name: 'USDA Organic',
    issuer: 'United States Department of Agriculture',
    year: '2021',
    category: 'sustainability',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bf65ab28-1764649835685.png",
    alt: 'Green USDA organic certification seal with white text on official certificate document',
    description: 'Chứng nhận hữu cơ quốc tế, đảm bảo 100% thành phần tự nhiên và quy trình sản xuất không sử dụng hóa chất độc hại.'
  },
  {
    id: 3,
    name: 'ISO 22716 GMP',
    issuer: 'International Organization for Standardization',
    year: '2022',
    category: 'quality',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16f93181e-1764655705959.png",
    alt: 'ISO certification badge with blue and white colors showing quality management system compliance',
    description: 'Tiêu chuẩn quốc tế về thực hành sản xuất tốt cho mỹ phẩm, đảm bảo chất lượng và an toàn sản phẩm.'
  },
  {
    id: 4,
    name: 'EU Ecolabel',
    issuer: 'European Commission',
    year: '2021',
    category: 'sustainability',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_105d3918c-1767006872476.png",
    alt: 'European Union Ecolabel certification with green flower logo on official EU document',
    description: 'Nhãn sinh thái của Liên minh Châu Âu, công nhận sản phẩm thân thiện với môi trường và bền vững.'
  },
  {
    id: 5,
    name: 'Cruelty-Free International',
    issuer: 'Leaping Bunny Program',
    year: '2021',
    category: 'international',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_109d57b2d-1764649837605.png",
    alt: 'Cruelty-free certification logo with jumping rabbit symbol on white background certificate',
    description: 'Chứng nhận không thử nghiệm trên động vật, cam kết đạo đức trong nghiên cứu và phát triển sản phẩm.'
  },
  {
    id: 6,
    name: 'Giải Thưởng Đổi Mới Bền Vững',
    issuer: 'Hiệp Hội Nha Khoa Thế Giới',
    year: '2023',
    category: 'international',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19a783acd-1764651001529.png",
    alt: 'Gold trophy award for sustainable innovation in dental care on display podium with spotlights',
    description: 'Giải thưởng quốc tế công nhận đóng góp xuất sắc trong việc phát triển giải pháp nha khoa bền vững.'
  },
  {
    id: 7,
    name: 'Chứng Nhận Xanh Việt Nam',
    issuer: 'Bộ Tài Nguyên và Môi Trường',
    year: '2022',
    category: 'sustainability',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18b4cb305-1769436388046.png",
    alt: 'Vietnamese green certification seal with leaf symbol on official government document',
    description: 'Chứng nhận sản phẩm xanh của Việt Nam, đáp ứng tiêu chí về bảo vệ môi trường và phát triển bền vững.'
  },
  {
    id: 8,
    name: 'FDA Registered',
    issuer: 'U.S. Food and Drug Administration',
    year: '2022',
    category: 'quality',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b15cb894-1768752813110.png",
    alt: 'FDA registration certificate with official seal and blue border on white paper',
    description: 'Đăng ký với Cục Quản lý Thực phẩm và Dược phẩm Hoa Kỳ, đảm bảo tiêu chuẩn an toàn cao nhất.'
  }];


  const categories = [
  { id: 'all', label: 'Tất Cả', icon: 'Squares2X2Icon' },
  { id: 'dental', label: 'Nha Khoa', icon: 'ShieldCheckIcon' },
  { id: 'sustainability', label: 'Bền Vững', icon: 'GlobeAltIcon' },
  { id: 'quality', label: 'Chất Lượng', icon: 'StarIcon' },
  { id: 'international', label: 'Quốc Tế', icon: 'TrophyIcon' }];


  const filteredCertifications = activeCategory === 'all' ?
  certifications :
  certifications.filter((cert) => cert.category === activeCategory);

  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-warning/10 rounded-full mb-4">
            <span className="text-warning font-heading font-semibold text-sm">
              Chứng Nhận & Giải Thưởng
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-primary mb-4">
            Được Công Nhận <span className="text-tropical-orange">Toàn Cầu</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Chất lượng và cam kết của chúng tôi được khẳng định qua hàng loạt chứng nhận uy tín từ các tổ chức quốc tế và trong nước.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) =>
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-heading font-semibold transition-all duration-300 ${
            activeCategory === category.id ?
            'bg-tropical-orange text-white shadow-organic' :
            'bg-card text-text-secondary hover:bg-muted'}`
            }>

              <Icon name={category.icon as any} size={20} />
              {category.label}
            </button>
          )}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCertifications.map((cert) =>
          <div
            key={cert.id}
            className="bg-white rounded-xl overflow-hidden shadow-organic hover:shadow-organic-hover transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedCert(cert)}>

              <div className="relative h-48 overflow-hidden bg-card">
                <AppImage
                src={cert.image}
                alt={cert.alt}
                className="w-full h-full object-cover" />

              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                  {cert.name}
                </h3>
                <p className="text-sm text-text-secondary mb-1">{cert.issuer}</p>
                <p className="text-sm text-tropical-orange font-semibold">{cert.year}</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedCert &&
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}>

            <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>

              <div className="relative h-64 overflow-hidden">
                <AppImage
                src={selectedCert.image}
                alt={selectedCert.alt}
                className="w-full h-full object-cover" />

                <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                aria-label="Close modal">

                  <Icon name="XMarkIcon" size={24} className="text-foreground" />
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-primary mb-2">
                      {selectedCert.name}
                    </h3>
                    <p className="text-text-secondary">{selectedCert.issuer}</p>
                  </div>
                  <span className="px-4 py-2 bg-tropical-orange/10 text-tropical-orange font-heading font-semibold rounded-full">
                    {selectedCert.year}
                  </span>
                </div>
                <p className="text-foreground leading-relaxed">
                  {selectedCert.description}
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    </section>);

};

export default CertificationsSection;